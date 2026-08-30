/**
 * ScoreUp API layer.
 *
 * The real ScoreUp backend is connected separately. These functions are the
 * single integration point — do NOT scatter fetch calls across components.
 * They currently throw so that no fake data leaks into the UI; wire them to
 * the live API by reading `API_BASE_URL` below.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface CreditScore {
  score: number
  delta: number
  updatedAt: string
}

export interface FinancialProfile {
  utilisation: number
  onTimeRate: number
  hardInquiries: number
}

function notConfigured(fn: string): never {
  throw new Error(
    `[ScoreUp] ${fn} is not connected yet. Set NEXT_PUBLIC_API_BASE_URL and implement the request.`,
  )
}

export async function getChatResponse(_messages: ChatMessage[]): Promise<ChatMessage> {
  notConfigured('getChatResponse')
}

export async function getCreditScore(): Promise<CreditScore> {
  notConfigured('getCreditScore')
}

export async function getFinancialProfile(): Promise<FinancialProfile> {
  notConfigured('getFinancialProfile')
}
