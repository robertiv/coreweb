"use client";

import { useEffect, useState } from "react";
import { Skull, Clock, Flame } from "lucide-react";
import { LycanBox } from "@/components/ui/lycan-box";
import {
  getUniqueKillsAction,
  type UniqueKillData,
} from "@/app/actions/unique-kills";

export function UniqueKills() {
  const [uniqueKills, setUniqueKills] = useState<UniqueKillData[]>([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const data = await getUniqueKillsAction();
      if (!cancelled) setUniqueKills(data);
    };

    load();
    const interval = setInterval(load, 30_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <LycanBox title="Last Unique Kills" icon={<Skull className="h-4 w-4" />} contentClassName="p-0">
      {/* Content */}
      <div className="divide-y divide-[var(--border)]">
        {uniqueKills.map((kill, index) => (
          <div
            key={`${kill.player}-${kill.monster}-${index}`}
            className="flex items-center gap-3 p-3 transition-colors hover:bg-[var(--lycan-card-hover)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--lycan-gold)]/20 to-[var(--lycan-orange)]/20">
              <Flame className="h-5 w-5 text-[var(--lycan-gold)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--foreground)] truncate">
                {kill.player}
              </p>
              <div className="flex items-center gap-1">
                <Skull className="h-3 w-3 text-[var(--lycan-gold)]" />
                <span className="text-xs text-[var(--lycan-gold)] truncate">
                  {kill.monster}
                </span>
                {/*<span className="text-xs text-[var(--muted-foreground)] truncate">
                  guildname
                </span>*/}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-xs text-[var(--muted-foreground)]">
              <Clock className="h-3 w-3" />
              {kill.time}
            </div>
          </div>
        ))}

        {uniqueKills.length === 0 ? (
          <div className="p-3 text-sm text-[var(--muted-foreground)]">
            No kills found.
          </div>
        ) : null}
      </div>
    </LycanBox>
  );
}
