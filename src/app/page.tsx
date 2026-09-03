import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Pillars from "@/components/Pillars";
import HowItWorks from "@/components/HowItWorks";
import MarginCalculator from "@/components/MarginCalculator";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import { Footerdemo } from "@/components/ui/footer-section";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col overflow-x-hidden bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1">
        <Hero />
        <Metrics />
        <Pillars />
        <HowItWorks />
        <MarginCalculator />
        <FAQ />
        <CTASection />
      </main>
      <Footerdemo />
    </div>
  );
}
