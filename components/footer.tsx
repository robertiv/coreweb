"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const leftMenuLinks = [
  { label: "Download", href: "/downloads" },
  { label: "Features", href: "/features" },
  { label: "Rankings", href: "/rankings" },
  { label: "News", href: "/" },
  { label: "FAQ", href: "/faq" },
  { label: "Support Ticket", href: "/contact-us" },
  { label: "Server Rules", href: "/rules" },
  { label: "Contact Us", href: "/contact-us" },
];

const rightMenuLinks = [
  { label: "Discord", href: "https://discord.gg/lycan", external: true },
  { label: "Facebook", href: "https://facebook.com/lycan", external: true },
  { label: "YouTube", href: "https://youtube.com/lycan", external: true },
  { label: "Forums", href: "#forums" },
  { label: "Terms of Service", href: "/tos" },
  { label: "Privacy Policy", href: "/tos" },
  { label: "Refund Policy", href: "/tos" },
];

const partnerLinks = [
  { name: "Elitepvpers 1", logo: "/images/partners/epvp.png", href: "https://elitepvpers.com" },
  { name: "Elitepvpers 2", logo: "/images/partners/epvp.png", href: "https://elitepvpers.com" },
  { name: "Elitepvpers 3", logo: "/images/partners/epvp.png", href: "https://elitepvpers.com" },
  { name: "Elitepvpers 4", logo: "/images/partners/epvp.png", href: "https://elitepvpers.com" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--lycan-darker)]">
      {/* Decorative top border */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--lycan-gold)] to-transparent" />
      
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Main 3-Column Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Left Column - Game & Support */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif mb-4 text-sm font-bold uppercase tracking-wider text-[var(--lycan-gold)]">
              Game & Support
            </h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-center md:text-left">
              {leftMenuLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--lycan-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Column - Logo & Partners */}
          <div className="flex flex-col items-center">
            {/* Logo */}
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/images/logo.png"
                alt="Lycan Online"
                width={234}
                height={156}
                className="drop-shadow-[0_0_15px_rgba(212,168,75,0.3)]"
              />
            </Link>

            {/* Partners Section */}            
            <div className="flex flex-wrap items-center justify-center gap-4">
              {partnerLinks.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-10 w-10 items-center justify-center rounded-md bg-[var(--lycan-card)] p-1.5 transition-all hover:bg-[var(--lycan-card-hover)] hover:scale-110"
                  title={partner.name}
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={32}
                    height={32}
                    className="object-contain opacity-60 transition-opacity group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Community & Legal */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-serif mb-4 text-sm font-bold uppercase tracking-wider text-[var(--lycan-gold)]">
              Community & Legal
            </h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-center md:text-right">
              {rightMenuLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center justify-center gap-1 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--lycan-gold)] md:justify-end"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="h-3 w-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className="mt-10 border-t border-[var(--border)] pt-6">
          <p className="text-center text-sm text-[var(--lycan-gold)]">
             {new Date().getFullYear()} Copyright &copy; LycanSRO. All rights reserved. Design and coded by <a className="text-[var(--muted-foreground)] hover:text-[var(--lycan-gold-light)]" href="https://discord.com/users/379045987676717058">vroberti</a>.
          </p>          
        </div>        
      </div>
    </footer>
  );
}
