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
import { ShieldAlert } from "lucide-react";
import { PUBLIC_CONFIG } from "@/lib/public-config";

const rules = [
  {
    title: "1. Respect All Players",
    body: "Any form of racism, discrimination, harassment, hate speech, or offensive behavior directed at other players based on nationality, gender, religion, or any other personal attribute is strictly prohibited. Violations will result in an immediate permanent ban.",
  },
  {
    title: "2. No Toxic Behavior",
    body: "Unsportsmanlike conduct — including excessive trash talk, intentional griefing, spawn-killing outside PvP zones, or using in-game mechanics to deliberately ruin another player's experience — is not tolerated. Play hard, but play fair.",
  },
  {
    title: "3. No Hacking, Cheating, or Exploiting",
    body: "The use of third-party programs, bots, speed hacks, packet editors, memory editors, or any software that gives an unfair advantage is forbidden. Exploiting known bugs without reporting them is also considered cheating. All characters on the offending account will be permanently banned.",
  },
  {
    title: "4. No Account Sharing or Trading",
    body: "Sharing or selling your account to other players is done at your own risk. The staff will not provide support for accounts that have been shared or traded. Any bans resulting from shared account activity remain in effect.",
  },
  {
    title: "5. No Real-Money Trading (RMT)",
    body: "Selling, buying, or trading in-game items, currencies, or accounts for real money outside of official channels is strictly forbidden and will result in a permanent ban of all involved accounts.",
  },
  {
    title: "6. Appropriate Character & Guild Names",
    body: "Names that are offensive, sexual, racist, or impersonate staff members are not allowed. Staff reserves the right to rename or delete any character or guild violating this rule without prior notice.",
  },
  {
    title: "7. No Multiboxing in PvP / Fortress War",
    body: "Running multiple clients to gain an unfair advantage in PvP zones, fortress wars, or events is prohibited. Multiple clients may be used for grinding, but must not interfere with other players.",
  },
  {
    title: "8. Language in Public Chat",
    body: "Use English or the server's regional language in public channels so that the community and staff can moderate effectively. Private communication may be in any language.",
  },
  {
    title: "9. Respect Staff Decisions",
    body: "Game Masters and administrators have the final word on all in-game matters. Arguing, threatening, or attempting to intimidate staff members through any channel (in-game, Discord, forum) will result in sanctions. If you disagree with a decision, open a support ticket.",
  },
  {
    title: "10. Report Bugs & Issues",
    body: "If you discover a bug or exploit, report it immediately through our Discord support channel or ticket system. Players who exploit bugs instead of reporting them will be punished according to the severity of the exploit.",
  },
];

export default function RulesPage() {
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
              Server <span className="gradient-text">Rules</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--muted-foreground)]">
              By playing on {PUBLIC_CONFIG.serverName} you agree to abide by the following rules.
              Ignorance of the rules is not an excuse.
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
              <LycanBox title="Server Rules" icon={<ShieldAlert className="h-4 w-4" />}>
                <div className="space-y-6">
                  {rules.map((rule) => (
                    <div key={rule.title} className="border-b border-[var(--border)] pb-5 last:border-0 last:pb-0">
                      <h3 className="font-serif mb-2 text-base font-bold text-[var(--lycan-gold)]">
                        {rule.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                        {rule.body}
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
