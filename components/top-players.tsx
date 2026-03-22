"use client";

import { useEffect, useState } from "react";
import { Trophy, Crown, Medal, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LycanBox } from "@/components/ui/lycan-box";
import {
  getTopPlayersAction,
  type TopPlayerData,
} from "@/app/actions/top-players";

function getRaceFromRefCharId(refCharId: number): "chinese" | "european" {
  return refCharId > 2000 ? "european" : "chinese";
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="h-5 w-5 text-yellow-400" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-300" />;
    case 3:
      return <Medal className="h-5 w-5 text-amber-600" />;
    default:
      return <Award className="h-4 w-4 text-[var(--muted-foreground)]" />;
  }
}

function getRankBg(rank: number) {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-500/20 to-transparent";
    case 2:
      return "bg-gradient-to-r from-gray-400/20 to-transparent";
    case 3:
      return "bg-gradient-to-r from-amber-600/20 to-transparent";
    default:
      return "";
  }
}

export function TopPlayers() {
  const [topPlayers, setTopPlayers] = useState<TopPlayerData[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadTopPlayers = async () => {
      const data = await getTopPlayersAction();

      if (cancelled) {
        return;
      }

      setTopPlayers(data);
    };

    loadTopPlayers();
    const interval = setInterval(loadTopPlayers, 30_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <LycanBox title="Top Players" icon={<Trophy className="h-4 w-4" />} contentClassName="p-0">
    
      

      {/* Content */}
      <div className="divide-y divide-[var(--border)]">
        {topPlayers.map((player) => (
          <Link
            key={player.name}
            href={`/chars/${player.name}`}
            className={`flex items-center gap-3 p-3 transition-colors hover:bg-[var(--lycan-card-hover)] ${getRankBg(player.rank)}`}
          >
            {/* Rank */}
            <div className="flex h-8 w-8 items-center justify-center">
              {getRankIcon(player.rank)}
            </div>

            {/* Player Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span>
                  <Image
                    src={`/images/${getRaceFromRefCharId(player.refCharId)}.png`}
                    alt={getRaceFromRefCharId(player.refCharId)}
                    width={30}
                    height={30}
                  />
                </span>
                <span className="text-sm font-semibold text-[var(--foreground)] truncate">
                  {player.name}
                </span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">
                <span className="text-[var(--lycan-white)] font-serif font-semibold">
                  Guild: 
                  <span className="px-2 text-[var(--lycan-gold)] font-sans font-medium">
                     [{player.guild}]
                  </span>
                </span>
              </p>
            </div>

            {/* Points */}
            <div className="text-right">
              <p className="text-sm font-bold text-[var(--lycan-gold)]">
                P: {player.points.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}

        {topPlayers.length === 0 ? (
          <div className="p-3 text-sm text-[var(--muted-foreground)]">
            No players found.
          </div>
        ) : null}
      </div>

      {/* View All */}
      <div className="border-t border-[var(--border)] p-3">
        <button
          type="button"
          className="font-serif font-semibold w-full rounded-md bg-[var(--lycan-card-hover)] py-2 text-sm  text-[var(--lycan-gold)] transition-colors hover:bg-[var(--lycan-gold)]/10"
        >
          View Full Rankings
        </button>
      </div>
    
    </LycanBox>
  );
}
