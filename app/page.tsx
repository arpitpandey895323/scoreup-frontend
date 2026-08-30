import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/sections/Hero"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { CreditScoreSection } from "@/components/sections/CreditScoreSection"
import { FinancialPulse } from "@/components/sections/FinancialPulse"
import { PaymentSection } from "@/components/sections/PaymentSection"
import { EMISection } from "@/components/sections/EMISection"
import { Testimonials } from "@/components/sections/Testimonials"
import { DarkCTA } from "@/components/sections/DarkCTA"
import { FAQSection } from "@/components/sections/FAQSection"
import { FinalCTA } from "@/components/sections/FinalCTA"

export default function HomePage() {
  return (
    <main className="min-h-dvh">
      <Navbar />
      <Hero />
      <HowItWorks />
      <CreditScoreSection />
      <FinancialPulse />
      <PaymentSection />
      <EMISection />
      <Testimonials />
      <DarkCTA />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
