import {Navbar} from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ServerStatus } from "@/components/sidebar/server-status";
import { LoginBox } from "@/components/sidebar/login-box";
import { FortressWar } from "@/components/sidebar/fortress-war";
import { UniqueKills } from "@/components/sidebar/unique-kills";
// import { EventSchedule } from "@/components/sidebar/event-schedule";
import { DiscordWidget } from "@/components/sidebar/discord-widget";
import { MediaCarousel } from "@/components/media-carousel";
import { DiscordNews } from "@/components/discord-news";
import { TopPlayers } from "@/components/top-players";
import { TopGuilds } from "@/components/top-guilds";
import { Footer } from "@/components/footer";
import { PUBLIC_CONFIG } from "@/lib/public-config";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Video Background */}
      <HeroSection />

      {/* Main Content Area */}
      <section
        id="main-content"
        className="relative z-10 bg-[var(--lycan-dark)]"
      >
        {/* Gradient transition from hero */}
        <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[var(--lycan-dark)] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Three-column layout */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Sidebar */}
            <aside className="space-y-6 lg:col-span-3">
              <LoginBox />                           
              <FortressWar />
              <UniqueKills />              
              {/* <EventSchedule /> */}
            </aside>

            {/* Main Content */}
            <div className="space-y-6 lg:col-span-6">
              <MediaCarousel />
              <DiscordNews />
            </div>

            {/* Right Sidebar */}
            <aside className="space-y-6 lg:col-span-3">
              <ServerStatus /> 
              <DiscordWidget />
              {/*<ServerFeatures />*/}
              <TopPlayers />
              <TopGuilds />
            </aside>
          </div>
        </div>

        {/* Download Section */}
        <section className="border-y border-[var(--border)] bg-gradient-to-r from-[var(--lycan-card)] to-[var(--lycan-dark)] py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-serif mb-4 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              Ready to <span className="gradient-text">Begin Your Journey?</span>
            </h2>
            <p className="mb-8 text-lg text-[var(--muted-foreground)]">
              Download the game client and join thousands of players in the
              world of {PUBLIC_CONFIG.serverName}.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                className="glow-gold flex items-center gap-3 rounded-lg bg-gradient-to-r from-[var(--lycan-gold)] to-[var(--lycan-orange)] px-8 py-4 text-lg font-semibold text-[var(--lycan-dark)] transition-all hover:scale-105"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Client
              </button>
              <div className="text-sm text-[var(--muted-foreground)]">
                <p>Version 2.5.1 | 2.3 GB</p>
                <p className="text-xs">Windows 10/11 64-bit</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-serif mb-12 text-center text-3xl font-bold text-[var(--foreground)]">
              Why Choose <span className="gradient-text">{PUBLIC_CONFIG.serverName}?</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "High Rates",
                  description: "Enjoy 300x EXP and 30x drop rates for faster progression and more fun.",
                },
                {
                  icon: (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Anti-Cheat",
                  description: "Advanced anti-cheat protection ensures fair gameplay for everyone.",
                },
                {
                  icon: (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: "Active Community",
                  description: "Join thousands of active players and make new friends.",
                },
                {
                  icon: (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Weekly Events",
                  description: "Participate in exciting events with unique rewards every week.",
                },
              ].map((feature, index) => (
                <div
                  key={`feature-${index}`}
                  className="lycan-card group rounded-lg p-6 transition-all hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--lycan-gold)]/20 to-[var(--lycan-orange)]/20 text-[var(--lycan-gold)] transition-colors group-hover:from-[var(--lycan-gold)]/30 group-hover:to-[var(--lycan-orange)]/30">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif mb-2 text-lg font-bold text-[var(--foreground)]">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}