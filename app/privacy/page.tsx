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
import { Lock } from "lucide-react";
import { PUBLIC_CONFIG } from "@/lib/public-config";

const sections = [
  {
    title: "1. Introduction",
    body: `${PUBLIC_CONFIG.serverName} ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and the measures we take to keep it safe. By using our service, you agree to the collection and use of information in accordance with this policy.`,
  },
  {
    title: "2. Information We Collect",
    body: "We collect the following information when you register and use our service: (a) Account information such as username, email address, and hashed password — we never store passwords in plain text; (b) Technical data such as IP address, browser type, and device information for security purposes; (c) In-game data including character names, activity logs, and transaction history.",
  },
  {
    title: "3. How Your Password Is Protected",
    body: "All passwords are hashed using industry-standard cryptographic algorithms (bcrypt) before being stored in our database. This means that your actual password is never stored anywhere in our systems — not even the server owners or administrators can see it. In the event of a data breach, your plain-text password remains protected.",
  },
  {
    title: "4. Data Encryption",
    body: "All data transmitted between your device and our servers is encrypted using TLS (Transport Layer Security). Sensitive data stored in our databases is encrypted at rest. We follow security best practices to ensure your data is protected at every layer.",
  },
  {
    title: "5. Who Has Access to Your Data",
    body: "Access to your personal data is strictly limited. Only automated systems handle data processing. No administrator, GM, or staff member has access to your password, payment details, or private messages. Operational data (such as ban logs and IP logs) is only accessible to senior administrators for security and anti-cheat purposes, and only when strictly necessary.",
  },
  {
    title: "6. How We Use Your Information",
    body: "Your information is used exclusively to: (a) operate and maintain your account; (b) communicate with you regarding account status, security alerts, and support; (c) detect and prevent fraud, cheating, and unauthorized access; (d) improve server performance and player experience.",
  },
  {
    title: "7. Data Sharing & Third Parties",
    body: "We do not sell, rent, or trade your personal information to any third party for marketing or commercial purposes. We may share information only when required by law (e.g., in response to a valid legal request from law enforcement), or with third-party service providers strictly necessary for operating the service (e.g., payment processors), always subject to confidentiality obligations.",
  },
  {
    title: "8. Cookies",
    body: "We use cookies solely for session management and authentication purposes. We do not use tracking cookies, advertising cookies, or any third-party analytics cookies that profile your browsing behavior. You can disable cookies in your browser settings, however this may affect your ability to log into your account.",
  },
  {
    title: "9. Data Retention",
    body: "We retain your account data for as long as your account remains active or as needed to provide you with our service. If you request account deletion, your personal data will be purged from our systems within 30 days, except where retention is required by law or for legitimate security purposes (e.g., ban records).",
  },
  {
    title: "10. Your Rights",
    body: "You have the right to: (a) access the personal data we hold about you; (b) request correction of inaccurate data; (c) request deletion of your account and associated personal data; (d) withdraw consent at any time. To exercise any of these rights, please open a support ticket through our Discord server.",
  },
  {
    title: "11. Security Measures",
    body: "We implement technical and organizational security measures including firewalls, intrusion detection systems, rate limiting, and regular security audits to protect your data against unauthorized access, alteration, disclosure, or destruction. No method of transmission or storage is 100% secure, however, and we continuously work to improve our protections.",
  },
  {
    title: "12. Changes to This Policy",
    body: "We may update this Privacy Policy periodically. We will notify users of significant changes via an announcement on our website or Discord server. Your continued use of the service after changes are posted constitutes acceptance of the updated policy.",
  },
  {
    title: "13. Contact",
    body: `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us through our Discord support server. We take all inquiries seriously and will respond within a reasonable timeframe.`,
  },
];

export default function PrivacyPage() {
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
              Privacy <span className="gradient-text">Policy</span>
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
              <LycanBox title="Privacy Policy" icon={<Lock className="h-4 w-4" />}>
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
