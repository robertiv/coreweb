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
import { ReceiptText } from "lucide-react";
import { PUBLIC_CONFIG } from "@/lib/public-config";

const sections = [
  {
    title: "1. General Policy",
    body: `All purchases made on ${PUBLIC_CONFIG.serverName} — including Silk, premium packages, and cosmetic items — are generally considered final and non-refundable. By completing a purchase, you acknowledge that you are buying a digital product that is consumed or made available immediately upon delivery.`,
  },
  {
    title: "2. Eligibility for Refund",
    body: "Refunds may be considered under the following limited circumstances: (a) you were charged more than once for the same transaction due to a technical error; (b) the item or package purchased was never delivered to your account due to a verified server-side error; (c) the purchase was made fraudulently without your authorization and you can provide adequate proof.",
  },
  {
    title: "3. Non-Refundable Items",
    body: "The following are explicitly non-refundable: (a) Silk or premium currency that has been fully or partially spent; (b) items or packages that have already been consumed, used, or activated; (c) purchases made on accounts that were subsequently banned for violations of our Terms of Service or Server Rules; (d) purchases made through unauthorized resellers or third-party platforms.",
  },
  {
    title: "4. How to Request a Refund",
    body: `To request a refund, open a support ticket in our Discord server within 7 days of the transaction date. You must provide: your account username, the date of purchase, the item or package purchased, proof of payment (transaction ID or receipt), and a clear description of the issue. Requests submitted after 7 days will not be considered.`,
  },
  {
    title: "5. Review Process",
    body: "All refund requests are reviewed by our billing team within 3–5 business days. We reserve the right to request additional information or documentation to complete the review. Decisions made by the billing team are final.",
  },
  {
    title: "6. Chargebacks",
    body: "Initiating a chargeback or payment dispute with your bank or payment processor without first contacting our support team will result in the immediate suspension of your account pending investigation. Accounts found to have abused the chargeback process will be permanently banned and may be subject to legal action.",
  },
  {
    title: "7. Currency & Exchange Rate Fluctuations",
    body: "We are not responsible for any losses resulting from currency exchange rate fluctuations, bank fees, or payment processor charges applied to your transaction. Refunds, if approved, will be issued in the original amount and currency of the transaction.",
  },
  {
    title: "8. Modifications to This Policy",
    body: "We reserve the right to update this Refund Policy at any time. Changes will be posted on this page with an updated effective date. Continued use of the service after changes are posted constitutes your acceptance of the revised policy.",
  },
];

export default function RefundPage() {
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
              Refund <span className="gradient-text">Policy</span>
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
              <LycanBox title="Refund Policy" icon={<ReceiptText className="h-4 w-4" />}>
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
