import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LoginBox } from "@/components/sidebar/login-box";
import { FortressWar } from "@/components/sidebar/fortress-war";
import { UniqueKills } from "@/components/sidebar/unique-kills";
import { ServerStatus } from "@/components/sidebar/server-status";
import { DiscordWidget } from "@/components/sidebar/discord-widget";
import { TopPlayers } from "@/components/top-players";
import { TopGuilds } from "@/components/top-guilds";
import { LycanBox } from "@/components/ui/lycan-box";
import { ScrollText } from "lucide-react";
import { PUBLIC_CONFIG } from "@/lib/public-config";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or playing ${PUBLIC_CONFIG.serverName}, you confirm that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws. If you do not agree, you must discontinue use of the service immediately. We reserve the right to update these terms at any time without prior notice.`,
  },
  {
    title: "2. Eligibility",
    body: "This service is available to individuals aged 13 and older. Players under 18 must have parental or guardian consent. By registering an account, you represent that you meet the eligibility requirements.",
  },
  {
    title: "3. Account Registration",
    body: "You must provide accurate and complete information when creating an account. You are solely responsible for all activity that occurs under your account and for maintaining the confidentiality of your credentials. You must notify us immediately of any unauthorized use of your account.",
  },
  {
    title: "4. Virtual Items & Currency",
    body: "All virtual items, currency, characters, and in-game assets are the property of the server and are licensed to you on a limited, non-exclusive, non-transferable basis. You have no ownership rights over any virtual goods. Virtual items have no real-world monetary value and cannot be exchanged for cash.",
  },
  {
    title: "5. Prohibited Conduct",
    body: "You agree not to: (a) use cheats, exploits, automation software, bots, hacks, mods, or any unauthorized third-party software; (b) engage in fraud, impersonation, or deceptive practices; (c) harass, threaten, or harm other players; (d) transmit viruses or malicious code; (e) attempt to gain unauthorized access to the server systems.",
  },
  {
    title: "6. Intellectual Property",
    body: `All content included on ${PUBLIC_CONFIG.serverName} — including but not limited to graphics, logos, icons, images, audio clips, and code — is the property of the respective rights holders and is protected under applicable intellectual property laws.`,
  },
  {
    title: "7. Termination",
    body: "We reserve the right to suspend or permanently terminate your account at any time and for any reason, including but not limited to violation of these Terms. Upon termination, your right to use the service ceases immediately and you forfeit all virtual items and currency associated with the account.",
  },
  {
    title: "8. Disclaimers",
    body: "The service is provided \"as is\" without warranties of any kind. We do not warrant that the service will be uninterrupted, error-free, or free of viruses. We disclaim all implied warranties including merchantability and fitness for a particular purpose.",
  },
  {
    title: "9. Limitation of Liability",
    body: "To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use or inability to use the service, even if we have been advised of the possibility of such damages.",
  },
  {
    title: "10. Governing Law",
    body: "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the server operator is established, without regard to its conflict of law provisions.",
  },
  {
    title: "11. Changes to Terms",
    body: "We may revise these Terms at any time by posting an updated version. Your continued use of the service after any such changes constitutes your acceptance of the new Terms.",
  },
];

export default function TosPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/trsro_bg1.png')" }}
      />
      <div className="fixed inset-0 z-10 bg-black/70" />

      <div className="relative z-20 flex min-h-screen flex-col bg-transparent">
        <Navbar />

        <section className="relative z-10 bg-[var(--lycan-dark)] pt-16">
        {/* Header */}
        <div className="relative overflow-hidden py-12">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--lycan-gold)]/5 via-transparent to-transparent" />
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl font-bold text-[var(--foreground)] md:text-5xl">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--muted-foreground)]">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>

        {/* Three-column layout */}
        <div className="mx-auto max-w-7xl px-4 pb-16">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Sidebar */}
            <aside className="space-y-6 lg:col-span-3">
              <LoginBox />
              <FortressWar />
              <UniqueKills />
            </aside>

            {/* Main Content */}
            <div className="space-y-6 lg:col-span-6">
              <LycanBox title="Terms of Service" icon={<ScrollText className="h-4 w-4" />}>
                <div className="space-y-6">
                  {sections.map((section) => (
                    <div key={section.title} className="border-b border-[var(--border)] pb-5 last:border-0 last:pb-0">
                      <h3 className="font-serif mb-2 text-base font-bold text-[var(--lycan-gold)]">
                        {section.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>
              </LycanBox>
            </div>

            {/* Right Sidebar */}
            <aside className="space-y-6 lg:col-span-3">
              <ServerStatus />
              <DiscordWidget />
              <TopPlayers />
              <TopGuilds />
            </aside>
          </div>
        </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
