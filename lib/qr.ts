/**
 * Compact QR encoder (byte mode, ECC L, versions 1–4).
 * Used by the Final CTA so the on-page code is a real scannable code.
 */

const EXP = new Uint8Array(512)
const LOG = new Uint8Array(256)
;(() => {
  let x = 1
  for (let i = 0; i < 255; i++) {
    EXP[i] = x
    LOG[x] = i
    x <<= 1
    if (x & 0x100) x ^= 0x11d
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255]
})()

function gfMul(a: number, b: number) {
  if (a === 0 || b === 0) return 0
  return EXP[LOG[a] + LOG[b]]
}

function rsGenerator(nsym: number) {
  let poly = [1]
  for (let i = 0; i < nsym; i++) {
    const next = new Array(poly.length + 1).fill(0)
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= gfMul(poly[j], EXP[i])
      next[j + 1] ^= poly[j]
    }
    poly = next
  }
  return poly
}

function rsEncode(data: number[], nsym: number) {
  const gen = rsGenerator(nsym)
  const ecc = new Array(nsym).fill(0)
  for (const byte of data) {
    const coef = byte ^ ecc[0]
    ecc.shift()
    ecc.push(0)
    if (coef === 0) continue
    for (let i = 0; i < nsym; i++) {
      ecc[i] ^= gfMul(gen[i + 1], coef)
    }
  }
  return ecc
}

/** Version 1–4, ECC L: total codewords, EC codewords, alignment center (0 if none). */
const VERSIONS = [
  { version: 1, size: 21, total: 26, ecc: 7, align: 0 },
  { version: 2, size: 25, total: 44, ecc: 10, align: 18 },
  { version: 3, size: 29, total: 70, ecc: 15, align: 22 },
  { version: 4, size: 33, total: 100, ecc: 20, align: 26 },
] as const

function pickVersion(byteLen: number) {
  for (const v of VERSIONS) {
    const dataCapacity = v.total - v.ecc
    // mode(4) + len(8) + data + terminator/pad
    if (byteLen + 2 <= dataCapacity) return v
  }
  return VERSIONS[VERSIONS.length - 1]
}

function encodeData(value: string, dataCodewords: number) {
  const bytes = Array.from(new TextEncoder().encode(value))
  const bits: number[] = []
  const push = (n: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bits.push((n >> i) & 1)
  }
  push(0b0100, 4) // byte mode
  push(bytes.length, 8)
  for (const b of bytes) push(b, 8)
  const maxBits = dataCodewords * 8
  const term = Math.min(4, maxBits - bits.length)
  for (let i = 0; i < term; i++) bits.push(0)
  while (bits.length % 8 !== 0) bits.push(0)
  const codewords: number[] = []
  for (let i = 0; i < bits.length; i += 8) {
    let n = 0
    for (let j = 0; j < 8; j++) n = (n << 1) | (bits[i + j] ?? 0)
    codewords.push(n)
  }
  const pads = [0xec, 0x11]
  let p = 0
  while (codewords.length < dataCodewords) {
    codewords.push(pads[p % 2])
    p++
  }
  return codewords.slice(0, dataCodewords)
}

function reservedMask(size: number, align: number) {
  const r = Array.from({ length: size }, () => new Uint8Array(size))
  const mark = (x: number, y: number) => {
    if (x >= 0 && y >= 0 && x < size && y < size) r[y][x] = 1
  }
  const finder = (ox: number, oy: number) => {
    for (let y = -1; y < 8; y++) {
      for (let x = -1; x < 8; x++) mark(ox + x, oy + y)
    }
  }
  finder(0, 0)
  finder(size - 7, 0)
  finder(0, size - 7)
  for (let i = 0; i < size; i++) {
    mark(i, 6)
    mark(6, i)
  }
  if (align) {
    for (let y = -2; y <= 2; y++) {
      for (let x = -2; x <= 2; x++) mark(align + x, align + y)
    }
  }
  for (let i = 0; i < 9; i++) {
    mark(8, i)
    mark(i, 8)
    mark(size - 1 - i, 8)
    mark(8, size - 1 - i)
  }
  mark(8, size - 8)
  return r
}

function placeFinders(mod: Uint8Array[], size: number) {
  const draw = (ox: number, oy: number) => {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const edge = x === 0 || y === 0 || x === 6 || y === 6
        const core = x >= 2 && x <= 4 && y >= 2 && y <= 4
        mod[oy + y][ox + x] = edge || core ? 1 : 0
      }
    }
  }
  draw(0, 0)
  draw(size - 7, 0)
  draw(0, size - 7)
}

function placeTiming(mod: Uint8Array[], size: number) {
  for (let i = 8; i < size - 8; i++) {
    const v = i % 2 === 0 ? 1 : 0
    mod[6][i] = v
    mod[i][6] = v
  }
}

function placeAlignment(mod: Uint8Array[], align: number) {
  if (!align) return
  for (let y = -2; y <= 2; y++) {
    for (let x = -2; x <= 2; x++) {
      const edge = Math.max(Math.abs(x), Math.abs(y)) === 2
      const center = x === 0 && y === 0
      mod[align + y][align + x] = edge || center ? 1 : 0
    }
  }
}

function maskBit(mask: number, x: number, y: number) {
  switch (mask) {
    case 0:
      return (x + y) % 2 === 0
    case 1:
      return y % 2 === 0
    case 2:
      return x % 3 === 0
    case 3:
      return (x + y) % 3 === 0
    case 4:
      return (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0
    case 5:
      return ((x * y) % 2) + ((x * y) % 3) === 0
    case 6:
      return (((x * y) % 2) + ((x * y) % 3)) % 2 === 0
    default:
      return (((x + y) % 2) + ((x * y) % 3)) % 2 === 0
  }
}

function placeData(
  reserved: Uint8Array[],
  bits: number[],
  size: number,
  mask: number,
) {
  const mod = Array.from({ length: size }, () => new Uint8Array(size))
  let i = 0
  let dir = -1
  let y = size - 1
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--
    for (;;) {
      for (let dx = 0; dx < 2; dx++) {
        const x = col - dx
        if (!reserved[y][x]) {
          const bit = bits[i++] ?? 0
          mod[y][x] = (bit ^ (maskBit(mask, x, y) ? 1 : 0)) as 0 | 1
        }
      }
      y += dir
      if (y < 0 || y >= size) {
        dir = -dir
        y += dir
        break
      }
    }
  }
  return mod
}

const FORMAT_L = [
  0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976,
]

function placeFormat(mod: Uint8Array[], size: number, mask: number) {
  const bits = FORMAT_L[mask]
  const get = (i: number) => ((bits >> (14 - i)) & 1) as 0 | 1
  for (let i = 0; i < 8; i++) {
    const b = get(i)
    if (i < 6) mod[i][8] = b
    else if (i === 6) mod[i + 1][8] = b
    else mod[size - 15 + i][8] = b
  }
  for (let i = 0; i < 7; i++) {
    const b = get(14 - i)
    if (i < 6) mod[8][i] = b
    else mod[8][i + 1] = b
  }
  for (let i = 0; i < 8; i++) mod[8][size - 1 - i] = get(i)
  for (let i = 0; i < 7; i++) mod[size - 7 + i][8] = get(7 + i)
  mod[size - 8][8] = 1
}

function penalty(mod: Uint8Array[], size: number) {
  let score = 0
  for (let y = 0; y < size; y++) {
    let run = 1
    for (let x = 1; x <= size; x++) {
      if (x < size && mod[y][x] === mod[y][x - 1]) run++
      else {
        if (run >= 5) score += 3 + (run - 5)
        run = 1
      }
    }
  }
  for (let x = 0; x < size; x++) {
    let run = 1
    for (let y = 1; y <= size; y++) {
      if (y < size && mod[y][x] === mod[y - 1][x]) run++
      else {
        if (run >= 5) score += 3 + (run - 5)
        run = 1
      }
    }
  }
  for (let y = 0; y < size - 1; y++) {
    for (let x = 0; x < size - 1; x++) {
      const v = mod[y][x]
      if (v === mod[y][x + 1] && v === mod[y + 1][x] && v === mod[y + 1][x + 1]) score += 3
    }
  }
  const finder = [1, 0, 1, 1, 1, 0, 1]
  const hasFinder = (seq: number[]) => {
    for (let i = 0; i <= seq.length - 7; i++) {
      let ok = true
      for (let j = 0; j < 7; j++) if (seq[i + j] !== finder[j]) ok = false
      if (!ok) continue
      const left = i >= 4 && seq.slice(i - 4, i).every((n) => n === 0)
      const right = i + 11 <= seq.length && seq.slice(i + 7, i + 11).every((n) => n === 0)
      if (left || right) score += 40
    }
  }
  for (let y = 0; y < size; y++) hasFinder(Array.from(mod[y]))
  for (let x = 0; x < size; x++) {
    const col = []
    for (let y = 0; y < size; y++) col.push(mod[y][x])
    hasFinder(col)
  }
  let dark = 0
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) dark += mod[y][x]
  const k = Math.abs((dark * 100) / (size * size) - 50) / 5
  score += 10 * Math.floor(k)
  return score
}

export function qrModules(value: string): boolean[][] {
  const bytes = new TextEncoder().encode(value)
  const spec = pickVersion(bytes.length)
  const data = encodeData(value, spec.total - spec.ecc)
  const ecc = rsEncode(data, spec.ecc)
  const all = [...data, ...ecc]
  const bits: number[] = []
  for (const b of all) {
    for (let i = 7; i >= 0; i--) bits.push((b >> i) & 1)
  }
  const reserved = reservedMask(spec.size, spec.align)
  let best: Uint8Array[] | null = null
  let bestScore = Infinity
  for (let mask = 0; mask < 8; mask++) {
    const mod = placeData(reserved, bits, spec.size, mask)
    placeFinders(mod, spec.size)
    placeTiming(mod, spec.size)
    placeAlignment(mod, spec.align)
    placeFormat(mod, spec.size, mask)
    const s = penalty(mod, spec.size)
    if (s < bestScore) {
      bestScore = s
      best = mod
    }
  }
  return (best ?? []).map((row) => Array.from(row, (n) => n === 1))
}
