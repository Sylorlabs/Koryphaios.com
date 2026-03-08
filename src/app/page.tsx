import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import VibeCoder from "@/components/VibeCoder";
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
        <VibeCoder />
        <Features />
        <Providers />
        <Architecture />
        <OpenSource />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
