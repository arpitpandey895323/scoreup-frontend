import { FAQAccordion } from '@/components/FAQAccordion'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { FAQS } from '@/lib/constants'

export function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-20 lg:py-28">
      <RevealOnScroll className="mb-10 max-w-2xl">
        <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-green uppercase">
          FAQ
        </span>
        <h2 className="font-display mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Aapke sawaal,
          <br />
          <span className="text-green">jawaab ke saath.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll>
        <FAQAccordion items={FAQS} />
      </RevealOnScroll>
    </section>
  )
}
