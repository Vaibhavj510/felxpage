import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { Ticker } from "@/components/ui/Ticker";
import { ProblemSolution } from "@/components/ui/ProblemSolution";
import { PageTypes } from "@/components/ui/PageTypes";
import { ShieldFeature } from "@/components/ui/ShieldFeature";
import { Pricing } from "@/components/ui/Pricing";
import { FAQ } from "@/components/ui/FAQ";
import { FinalCTA } from "@/components/ui/FinalCTA";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <ProblemSolution />
      <PageTypes />
      <ShieldFeature />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}