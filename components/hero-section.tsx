"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    }
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById("main-content");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden font-serif">
      {/* Video Background - Fixed position for parallax effect */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--lycan-dark)]/60 via-transparent to-[var(--lycan-dark)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--lycan-dark)]/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <Image
            src="/images/logo.png"
            alt="Lycan Online"
            width={400}
            height={300}
            className="drop-shadow-2xl"
            priority
          />
        </div>

        {/* Tagline */}
        <p className="text-shadow-[3px_3px_0_black] font-serif font-bold mb-8 max-w-2xl text-xl text-[var(--foreground)]/90 md:text-2xl">
          Unleash Your Inner Beast
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <a 
            href="/account"
            className="cursor-pointer glow-gold rounded-lg bg-gradient-to-r from-[var(--lycan-gold)] to-[var(--lycan-orange)] px-8 py-4 font-bold text-[var(--lycan-dark)] transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Play Free Now
          </a>
          <a 
            href="/downloads"
            className="cursor-pointer font-bold rounded-lg border-2 border-[var(--lycan-gold)] bg-transparent px-8 py-4 text-[var(--lycan-gold)] transition-all duration-300 hover:bg-[var(--lycan-gold)]/10"
          >
            Download Client
          </a>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-[var(--lycan-gold)]"
          aria-label="Scroll to content"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
