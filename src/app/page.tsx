import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import Providers from "@/components/Providers";
import Architecture from "@/components/Architecture";
import OpenSource from "@/components/OpenSource";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Architecture />
        <Features />
        <Providers />
        <OpenSource />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
