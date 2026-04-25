import { About } from "@/components/home/sections/About";
import { Education } from "@/components/home/sections/Education";
import { Faq } from "@/components/home/sections/Faq";
import { Footer } from "@/components/home/sections/Footer";
import { Gallery } from "@/components/home/sections/Gallery";
import { Header } from "@/components/home/sections/Header";
import { Hero } from "@/components/home/sections/Hero";
import { HowItWorks } from "@/components/home/sections/HowItWorks";
import { Pricing } from "@/components/home/sections/Pricing";
import { Quote } from "@/components/home/sections/Quote";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <Education />
      <Gallery />
      <About />
      <Pricing />
      <Quote />
      <Faq />
      <Footer />
    </>
  );
}
