"use client";

import { Castle, Crown, Swords } from "lucide-react";
import { LycanBox } from "@/components/ui/lycan-box";
import Image from "next/image";

interface Fortress {
	name: string;
	owner: string;
	ownerGuild: string;
	type: "hotan" | "jangan" | "bandit";
	enabled?: boolean;
}

const fortresses: Fortress[] = [
	{
		name: "Hotan Fortress",
		owner: "DragonSlayer",
		ownerGuild: "Legends",
		type: "hotan",
		enabled: false,
	},
	{
		name: "Jangan Fortress",
		owner: "ShadowKnight",
		ownerGuild: "DarkForce",
		type: "jangan",
		enabled: true,
	},
	{
		name: "Bandit Fortress",
		owner: "WolfHunter",
		ownerGuild: "Wolves",
		type: "bandit",
	},
];

export function FortressWar() {
	return (
		<LycanBox
			title="Fortress War"
			icon={<Swords className="h-4 w-4" />}
			contentClassName="p-0"
		>
			{/* Content */}
			<div className="divide-y divide-[var(--border)]">
				{fortresses
					.filter((item) => item.enabled)
					.map((fortress) => (
						<div
							key={fortress.name}
							className="flex items-center gap-3 p-3 transition-colors hover:bg-[var(--lycan-card-hover)]"
						>
							<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--lycan-gold)]/20 to-[var(--lycan-orange)]/20">
								{/* <Castle className="h-5 w-5 text-[var(--lycan-gold)]" /> */}
								<Image
									src={"/images/fort_jangan.jpg"}
									alt={fortress.name}
                  width={24}
                  height={24}
								/>
							</div>
							<div className="flex-1 min-w-0 mb-0">
								<span className="text-sm font-medium font-serif uppercase text-[var(--foreground)] truncate">
									{fortress.name}
								</span>
								<div className="flex items-center gap-1 font-semibold">
									<Crown className="h-4 w-4 text-[var(--lycan-gold)]" />
									<span className="text-xs font-medium font-serif text-[var(--foreground)] truncate">
										Guild:
									</span>
									<span className="text-xs text-[var(--lycan-gold)] truncate py-1">
										[{fortress.ownerGuild}]
									</span>
								</div>
							</div>
						</div>
					))}
			</div>

			{/* Next War Timer */}
			<div className="border-t border-[var(--border)] bg-[var(--lycan-dark)]/50 p-3">
				<div className="flex items-center justify-between">
					<span className="text-xs text-[var(--muted-foreground)]">
						Next Fortress:
					</span>
					<span className="font-mono text-sm font-medium text-[var(--lycan-gold)]">
						2d : 14h : 32m : 20s
					</span>
				</div>
			</div>
		</LycanBox>
	);
}
