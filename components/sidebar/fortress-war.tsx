"use client";

import { useEffect, useState } from "react";
import { Crown, Swords } from "lucide-react";
import { LycanBox } from "@/components/ui/lycan-box";
import Image from "next/image";
import {
	getFortressWarDataAction,
	type FortressWarData,
	type FortressWarSchedule,
} from "@/app/actions/fortress-war";

function getFortressImageName(fortressId: number): string {
	switch (fortressId) {
		case 1:
			return "fort_jangan";
		case 3:
			return "fort_bandit";
		case 6:
			return "fort_hotan";
		default:
			return "fort_jangan";
	}
}

export function FortressWar() {
	const [fortresses, setFortresses] = useState<FortressWarData[]>([]);
	const [schedule, setSchedule] = useState<FortressWarSchedule>(null);
	const [countdown, setCountdown] = useState("--d : --h : --m");

	const formatCountdown = (value: FortressWarSchedule) => {
		if (!value) {
			return "--d : --h : --m";
		}

		const now = new Date();
		const target = new Date(now);
		const nowDay = now.getDay();
		let dayDiff = (value.dayOfWeek - nowDay + 7) % 7;

		target.setDate(now.getDate() + dayDiff);
		target.setHours(value.startHour, value.startMinute, 0, 0);

		if (dayDiff === 0 && target.getTime() <= now.getTime()) {
			target.setDate(target.getDate() + 7);
		}

		const diffMs = target.getTime() - now.getTime();
		const totalMinutes = Math.max(0, Math.floor(diffMs / 60000));
		const days = Math.floor(totalMinutes / (24 * 60));
		const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
		const minutes = totalMinutes % 60;

		return `${days}d : ${hours}h : ${minutes}m`;
	};

	useEffect(() => {
		let cancelled = false;

		const loadFortressData = async () => {
			const data = await getFortressWarDataAction();

			if (cancelled) {
				return;
			}

			setFortresses(data.fortresses);
			setSchedule(data.schedule);
		};

		loadFortressData();
		const interval = setInterval(loadFortressData, 30_000);

		return () => {
			cancelled = true;
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		const updateCountdown = () => {
			setCountdown(formatCountdown(schedule));
		};

		updateCountdown();
		const interval = setInterval(updateCountdown, 30_000);

		return () => clearInterval(interval);
	}, [schedule]);

	return (
		<LycanBox
			title="Fortress War"
			icon={<Swords className="h-4 w-4" />}
			contentClassName="p-0"
		>
			{/* Content */}
			<div className="divide-y divide-[var(--border)]">
				{fortresses.map((fortress) => (
						<div
							key={fortress.id}
							className="flex items-center gap-3 p-3 transition-colors hover:bg-[var(--lycan-card-hover)]"
						>
							<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--lycan-gold)]/20 to-[var(--lycan-orange)]/20">
								<Image
									src={`/images/${getFortressImageName(fortress.id)}.jpg`}
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
										[{fortress.guildOwner}]
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
						{countdown}
					</span>
				</div>
			</div>
		</LycanBox>
	);
}
