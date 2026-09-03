import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import HowItWorks from "@/components/HowItWorks";
import MarginCalculator from "@/components/MarginCalculator";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col overflow-x-hidden bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1">
        <Hero />
        <Pillars />
        <HowItWorks />
        <MarginCalculator />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
