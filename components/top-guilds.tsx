"use client";

import { useEffect, useState } from "react";
import { Shield, Users, Star } from "lucide-react";
import Link from "next/link";
import { LycanBox } from "./ui/lycan-box";
import {
  getTopGuildsAction,
  type TopGuildData,
} from "@/app/actions/top-guilds";

export function TopGuilds() {
  const [topGuilds, setTopGuilds] = useState<TopGuildData[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadTopGuilds = async () => {
      const data = await getTopGuildsAction();

      if (cancelled) {
        return;
      }

      setTopGuilds(data);
    };

    loadTopGuilds();
    const interval = setInterval(loadTopGuilds, 60_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <LycanBox title="Top Guilds" icon={<Shield className="h-4 w-4" />} contentClassName="p-0">

      {/* Content */}
      <div className="divide-y divide-[var(--border)]">
        {topGuilds.map((guild) => (
          <div
            key={guild.guildName}
            className="flex items-center gap-3 p-3 transition-colors hover:bg-[var(--lycan-card-hover)]"
          >
            {/* Rank */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--lycan-gold)]/20 to-[var(--lycan-orange)]/20">
              <span className="text-sm font-bold text-[var(--lycan-gold)]">
                #{guild.rank}
              </span>
            </div>

            {/* Guild Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--foreground)] truncate">
                {guild.guildName}
              </p>
              <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-[var(--lycan-gold)]" />
                  Fw: {guild.fortressWins}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-[var(--lycan-gold)]" />
                  Points: {guild.itemPoints}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {guild.memberCount}/24
                </span>
              </div>
            </div>
          </div>
        ))}

        {topGuilds.length === 0 ? (
          <div className="p-3 text-sm text-[var(--muted-foreground)]">
            No guilds found.
          </div>
        ) : null}
      </div>

      <div className="border-t border-[var(--border)] p-3">
        <Link
          href="/ranking"
          className="font-serif font-semibold block w-full rounded-md bg-[var(--lycan-card-hover)] py-2 text-center text-sm text-[var(--lycan-gold)] transition-colors hover:bg-[var(--lycan-gold)]/10"
        >
          View Full Ranking
        </Link>
      </div>
    </LycanBox>
  );
}
