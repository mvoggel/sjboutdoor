import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroVideo } from "@/components/home/HeroVideo";
import { IntroStatement } from "@/components/home/IntroStatement";
import { ProductCallouts } from "@/components/home/ProductCallouts";
import { ProductRowsTest } from "@/components/home/ProductRowsTest";
import { CtaBand } from "@/components/home/CtaBand";
import { WhyUs } from "@/components/home/WhyUs";
import { GoogleReviews } from "@/components/home/GoogleReviews";

// TODO: Gallery strip — post-POC (see spec sec 5.5)

export default function HomePage() {
  return (
    <>
      {/* Header overlays hero absolutely; becomes fixed on scroll */}
      <Header />

      <main id="main-content">
        {/* 5.1 Hero */}
        <HeroVideo />

        {/* Intro statement */}
        <IntroStatement />
        

        {/* TEST — expandable product rows */}
        <ProductRowsTest />


        {/* Google Reviews marquee */}
        <GoogleReviews />

        {/* 5.4 Why SJBB */}
        <WhyUs />

        {/* 5.6 CTA Band #2 — inverted (warm white bg) */}
        <CtaBand inverted />
      </main>

      <Footer />
    </>
  );
}
