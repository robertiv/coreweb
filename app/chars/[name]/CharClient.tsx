"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	Swords,
	Skull,
	Target,
	Briefcase,
	Shield,
	Sparkles,
	Users,
	Star,
	Clock,
	Globe,
	User,
	Zap,
	Brain,
	Award,
	MessageCircle,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LycanBox } from "@/components/ui/lycan-box";

// Mock active buffs
const mockBuffs = [
	{
		name: "STR Increase",
		icon: "/api/placeholder/32/32",
		duration: "2h 30m",
	},
	{
		name: "INT Increase",
		icon: "/api/placeholder/32/32",
		duration: "2h 30m",
	},
	{ name: "Speed Boost", icon: "/api/placeholder/32/32", duration: "1h 15m" },
	{ name: "EXP Bonus", icon: "/api/placeholder/32/32", duration: "45m" },
];

type TabType = "pvp" | "job" | "uniques" | "globals";

interface CharResponse {
	character: any;
	inventory: any[];
	uniques: any[];
	killHistory: {
		pvp: any[];
		job: any[];
		unique: any[];
		global: any[];
	};
}

export default function CharacterPage({ params }: { params: CharResponse }) {
	const [activeTab, setActiveTab] = useState<TabType>("pvp");
	const [showEquipment, setShowEquipment] = useState(true);

	const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
	const [tooltipVisibleIndex, setTooltipVisibleIndex] = useState<
		number | null
	>(null);

	const { character, inventory, uniques } = params;
	const { pvp, job, unique, global } = params.killHistory;

	const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
		{ id: "pvp", label: "PVP", icon: <Swords className="h-4 w-4" /> },
		{ id: "job", label: "Job", icon: <Briefcase className="h-4 w-4" /> },
		{
			id: "uniques",
			label: "Uniques",
			icon: <Skull className="h-4 w-4" />,
		},
		{
			id: "globals",
			label: "Globals",
			icon: <Globe className="h-4 w-4" />,
		},
	];

	const renderTabContent = () => {
		switch (activeTab) {
			case "pvp":
				return (
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-[var(--border)]">
									<th className="px-4 py-3 text-left text-sm font-semibold text-[var(--lycan-gold)]">
										Opponent
									</th>
									<th className="px-4 py-3 text-left text-sm font-semibold text-[var(--lycan-gold)]">
										Time
									</th>
								</tr>
							</thead>
							<tbody>
								{pvp.length > 0 ? (
									pvp.map((kill, index) => (
										<tr
											key={index}
											className={
												index % 2 === 0
													? "bg-[var(--lycan-card-hover)]/30"
													: ""
											}
										>
											<td className="px-4 py-3">
												<Link
													href={`/chars/${kill.KilledName}`}
													className="font-light text-sm text-[var(--foreground)] hover:text-[var(--lycan-gold)]"
												>
													<span className="text-[var(--lycan-gold)] font-semibold">
														<Swords
															width={14}
															height={14}
															className="inline-block ml-2 mr-2 rounded"
														/>{" "}
														[{kill.KillerName}]
													</span>{" "}
													Killed{" "}
													<span className="text-[var(--lycan-gold)] font-semibold">
														[{kill.KilledName}]
													</span>
												</Link>
											</td>
											<td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">
												{kill.TimeAgo}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={2}
											className="px-4 py-8 text-center text-[var(--muted-foreground)]"
										>
											Player {character.CharName16} has no PvP kills yet.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				);
			case "job":
				return (
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-[var(--border)]">
									<th className="px-4 py-3 text-left text-sm font-semibold text-[var(--lycan-gold)]">
										Opponent
									</th>
									<th className="px-4 py-3 text-left text-sm font-semibold text-[var(--lycan-gold)]">
										Time
									</th>
								</tr>
							</thead>
							<tbody>
								{job.length > 0 ? (
									job.map((kill, index) => (
										<tr
											key={index}
											className={
												index % 2 === 0
													? "bg-[var(--lycan-card-hover)]/30"
													: ""
											}
										>
											<td className="px-4 py-3">
												<Link
													href={`/chars/${kill.DeadName}`}
													className="font-light text-sm text-[var(--foreground)] hover:text-[var(--lycan-gold)]"
												>
													<span className="text-[var(--lycan-gold)] font-semibold">
														<Image
															src={`/images/jobs/${kill.KillerJob}.png`}
															alt={kill.KillerJob}
															width={14}
															height={14}
															className="inline-block ml-2 mr-2 rounded"
														/>
														[{character.CharName16}]
													</span>{" "}
													Killed{" "}
													<span className="text-[var(--lycan-gold)] font-semibold">
														<Image
															src={`/images/jobs/${kill.DeadJob}.png`}
															alt={
																kill.DeadJob
															}
															width={14}
															height={14}
															className="inline-block ml-2 mr-1 rounded"
														/>
														[{kill.DeadName}]
													</span>
												</Link>
											</td>
											<td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">
												{kill.TimeAgo}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={2}
											className="px-4 py-8 text-center text-[var(--muted-foreground)]"
										>
											Player {character.CharName16} has no Job kills yet.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				);
			case "uniques":
				return (
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-[var(--border)]">
									<th className="px-4 py-3 text-left text-sm font-semibold text-[var(--lycan-gold)]">
										Unique
									</th>
									<th className="px-4 py-3 text-left text-sm font-semibold text-[var(--lycan-gold)]">
										Time
									</th>
								</tr>
							</thead>
							<tbody>
								{unique.length > 0 ? (
									unique.map((kill, index) => (
										<tr
											key={index}
											className={
												index % 2 === 0
													? "bg-[var(--lycan-card-hover)]/30"
													: ""
											}
										>
											<td className="px-4 py-3 text-[var(--foreground)] font-light text-sm">
												<span className="text-[var(--lycan-gold)] font-semibold">
													<Skull
														width={14}
														height={14}
														className="inline-block ml-2 mr-2 rounded"
													/>{" "}
													[{character.CharName16}]
												</span>{" "}
												Killed{" "}
												<span className="text-[#aaffaa]">
													[{kill.UniqueName}]
												</span>
											</td>
											<td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">
												{kill.TimeAgo}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={2}
											className="px-4 py-8 text-center text-[var(--muted-foreground)]"
										>
											Player {character.CharName16} has no Unique kills yet.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				);
			case "globals":
				return (
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-[var(--border)]">
									<th className="px-4 py-3 text-left text-sm font-semibold text-[var(--lycan-gold)]">
										Message
									</th>
									<th className="px-4 py-3 text-left text-sm font-semibold text-[var(--lycan-gold)]">
										Time
									</th>
								</tr>
							</thead>
							<tbody>
								{global.length > 0 ? (
									global.map((global, index) => (
										<tr
											key={index}
											className={
												index % 2 === 0
													? "bg-[var(--lycan-card-hover)]/30"
													: ""
											}
										>
											<td className="px-4 py-3 text-[var(--foreground)]">
												<MessageCircle
													width={14}
													height={14}
													className="inline-block ml-2 mr-2 rounded text-[var(--lycan-gold)]"
												/>
												{global.Message}
											</td>
											<td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">
												{global.TimeAgo}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={2}
											className="px-4 py-8 text-center text-[var(--muted-foreground)]"
										>
											Player {character.CharName16} has no global messages found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				);
		}
	};

	const leftSlotOrder = [6, 0, 1, 4, 9, 11];
	const rightSlotOrder = [7, 2, 3, 5, 10, 12];
	const inventoryItems = Array.isArray(inventory) ? inventory : [];
	const inventoryBySlot = new Map<number, any>();

	for (const item of inventoryItems) {
		const slot = Number(item?.Slot);
		if (!Number.isNaN(slot)) {
			inventoryBySlot.set(slot, item);
		}
	}

	const leftItems = leftSlotOrder.map(
		(slot) => inventoryBySlot.get(slot) ?? null,
	);
	const rightItems = rightSlotOrder.map(
		(slot) => inventoryBySlot.get(slot) ?? null,
	);

	const renderEquipmentSlot = (item: any, index: number) => {
		const totalplus = item.Item + item.AdvE;
		const phydef_white = Math.floor(
			(((item.wstats >> 15) & 31) * 100) / 31,
		);
		const magdef_white = Math.floor(
			(((item.wstats >> 20) & 31) * 100) / 31,
		);
		const parry_white = Math.floor((((item.wstats >> 25) & 31) * 100) / 31);
		const dura_white = Math.floor((((item.wstats >> 0) & 31) * 100) / 31);
		const phyreinf_white = Math.floor(
			(((item.wstats >> 5) & 31) * 100) / 31,
		);
		const magreinf_white = Math.floor(
			(((item.wstats >> 10) & 31) * 100) / 31,
		);

		const phydef = item.PhyDef + item.PhyDefInc * totalplus;
		const magdef = item.MagDef + item.MagDefInc * totalplus;

		const extraphydef =
			(item.PhyDef_u - item.PhyDef) * (Math.floor(phydef_white) / 100);

		const extramagdef =
			(item.MagDef_u - item.MagDef) * (Math.floor(magdef_white) / 100);

		const extrahit =
			(item.Parry_u - item.Parry) * (Math.floor(parry_white) / 100);

		const extraphyreinf =
			(item.PhyReinf_u - item.PhyReinf) *
			(Math.floor(phyreinf_white) / 100);

		const extramagreinf =
			(item.MagReinf_u - item.MagReinf) *
			(Math.floor(magreinf_white) / 100);

		const phyatk_white = Math.floor(
			(((item.wstats >> 20) & 31) * 100) / 31,
		);
		const magatk_white = Math.floor(
			(((item.wstats >> 25) & 31) * 100) / 31,
		);

		const hit_white = Math.floor((((item.wstats >> 15) & 31) * 100) / 31);
		const crit_white = Math.floor((((item.wstats >> 30) & 31) * 100) / 31);

		const phyatk_min = item.phyMin + Math.floor(item.phyInc * totalplus);
		const phyatk_max = item.phyMax + Math.floor(item.phyInc * totalplus);
		const magatk_min = item.magMin + Math.floor(item.magInc * totalplus);
		const magatk_max = item.magMax + Math.floor(item.magInc * totalplus);

		const extraphyatk_min = Math.floor(
			(item.phyMin_u - item.phyMin) * (Math.floor(phyatk_white) / 100),
		);

		const extraphyatk_max = Math.floor(
			(item.phyMax_u - item.phyMax) * (Math.floor(phyatk_white) / 100),
		);

		const extramagatk_min = Math.floor(
			(item.magMin_u - item.magMin) * (Math.floor(magatk_white) / 100),
		);

		const extramagatk_max = Math.floor(
			(item.magMax_u - item.magMax) * (Math.floor(magatk_white) / 100),
		);

		const extrahitrate = Math.round(item.atkRate * (hit_white / 100));

		const extracrit = Math.round(item.CriticalMax * (crit_white / 100));

		const extraphyreinf_min = Math.floor(
			(item.phyReinforceMin_u - item.phyReinforceMin) *
				(Math.floor(phyreinf_white) / 100),
		);

		const extraphyreinf_max = Math.floor(
			(item.phyReinforceMax_u - item.phyReinforceMax) *
				(Math.floor(phyreinf_white) / 100),
		);

		const extramagreinf_min = Math.floor(
			(item.magReinforceMin_u - item.magReinforceMin) *
				(Math.floor(magreinf_white) / 100),
		);

		const extramagreinf_max = Math.floor(
			(item.magReinforceMax_u - item.magReinforceMax) *
				(Math.floor(magreinf_white) / 100),
		);

		const phyabs_white = Math.floor((((item.wstats >> 0) & 31) * 100) / 31);
		const magabs_white = Math.floor((((item.wstats >> 5) & 31) * 100) / 31);

		const phyabs = item.PhyAbs + item.PhyAbsInc * totalplus;
		const magabs = item.MagAbs + item.MagAbsInc * totalplus;

		const jextraphydef = Math.floor(
			(item.PhyAbs_u - item.PhyAbs) * (Math.floor(phyabs_white) / 100),
		);

		const jextramagdef = Math.floor(
			(item.MagAbs_u - item.MagAbs) * (Math.floor(magabs_white) / 100),
		);

		const src =
			item?.imgDir && item.imgDir !== "xxx"
				? `/images/${item.imgDir.replace("bmp", "jpg")}`
				: "/images/item/clean.png";
		const label =
			item?.ItemName || item?.name || item?.ItemType || "Empty Slot";

		const detailLines = [
			{ label: "Sort of item:", value: item?.ClothType },
			{
				label: "Mounting part:",
				value: item?.ItemType,
				exclude: [6, 7, 9, 10, 11, 12],
			},
			{ label: "Degree:", value: item?.Degree + ` degrees` },
			{
				label: "Phy. def. pwr.",
				value:
					Number(
						Math.round((phydef + extraphydef) * 10) / 10,
					).toFixed(1) + ` (+${phydef_white}%)`,
				exclude: [6, 9, 10, 11, 12],
				className: "text-white",
				newLine: true,
			},
			{
				label: "Mag. def. pwr.",
				value:
					Math.round((magdef + extramagdef) * 10) / 10 +
					` (+${magdef_white}%)`,

				className: "text-white",
				exclude: [6, 9, 10, 11, 12],
			},
			{
				label: "Phy. atk. pwr.",
				value:
					`${Math.round(phyatk_min + extraphyatk_min)} ~ ` +
					`${Math.round(phyatk_max + extraphyatk_max)} ` +
					`(+${Math.floor(phyatk_white)}%)`,

				exclude: [0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
				className: "text-white",
				newLine: true,
			},
			{
				label: "Mag. atk. pwr.",
				value:
					`${Math.round(magatk_min + extramagatk_min)} ~ ` +
					`${Math.round(magatk_max + extramagatk_max)} ` +
					`(+${Math.floor(magatk_white)}%)`,
				className: "text-white",
				exclude: [0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
			},
			{
				label: "Durability",
				value:
					item?.Quantity +
					`/` +
					item?.Quantity +
					` (+${dura_white}%)`,
				className: "text-white",
				exclude: [9, 10, 11, 12],
			},
			{
				label: "Attack distance",
				value: (item.Range / 10).toFixed(1) + ` m`,
				exclude: [0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
				className: "text-white",
			},
			{
				label: "Attack rate",
				value:
					Number((item.atkRate + extrahitrate).toFixed(1)) +
					` (+${hit_white}%)`,
				exclude: [0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
				className: "text-white",
			},
			{
				label: "Critical",
				value: item.Critical + extracrit + ` (+${crit_white}%)`,
				exclude: [0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
				className: "text-white",
			},
			{
				label: "Parry rate",
				value:
					Math.round((item.Parry + extrahit) * 10) / 10 +
					` (+${parry_white}%)`,
				exclude: [6, 7, 9, 10, 11, 12],
				className: "text-white",
			},
			{
				label: "Phy. reinforce",
				value:
					Math.round(((item.PhyReinf + extraphyreinf) / 10) * 10) /
						10 +
					` % (+${phyreinf_white}%)`,
				exclude: [6, 9, 10, 11, 12],
				className: "text-white",
			},
			{
				label: "Mag. reinforce",
				value:
					Math.round(((item.MagReinf + extramagreinf) / 10) * 10) /
						10 +
					` % (+${magreinf_white}%)`,
				exclude: [6, 9, 10, 11, 12],
				className: "text-white",
			},
			{
				label: "Phy. reinforce",
				value:
					`${((item.phyReinforceMin + extraphyreinf_min) / 10).toFixed(1)} % ~ ` +
					`${((item.phyReinforceMax + extraphyreinf_max) / 10).toFixed(1)} % ` +
					`(+${Math.floor(phyreinf_white)}%)`,
				exclude: [0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
				className: "text-white",
			},
			{
				label: "Mag. reinforce",
				value:
					`${((item.magReinforceMin + extramagreinf_min) / 10).toFixed(1)} % ~ ` +
					`${((item.magReinforceMax + extramagreinf_max) / 10).toFixed(1)} % ` +
					`(+${Math.floor(magreinf_white)}%)`,
				exclude: [0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12],
				className: "text-white",
			},
			{
				label: "Phy. absorption",
				value: `${(phyabs + jextraphydef).toFixed(1)} (+${phyabs_white}%)`,
				exclude: [0, 1, 2, 3, 4, 5, 6, 7],
				className: "text-white mt-5",
			},
			{
				label: "Mag. absorption",
				value: `${(magabs + jextramagdef).toFixed(1)} (+${magabs_white}%)`,
				exclude: [0, 1, 2, 3, 4, 5, 6, 7],
				className: "text-white",
			},
			{
				label: "Required level",
				value: item?.ItemLevel,
				newLine: true,
				className: "text-white",
			},
			{
				label: item.Gender,
				value: " ",
				exclude: [6, 7, 9, 10, 11, 12],
				className: "text-white",
			},
			{ label: item.ItemOrigin, value: " ", className: "text-white" },
			{
				label: "Max. no. of magic options:",
				value: item.maxOpt + `Unit`,
			},

			// <br />Phy. absorption '. number_format($phyabs + $extraphydef, 1) .' (+'.$phyabs_white.'%)
			// <br />Mag. absorption '. number_format($magabs + $extramagdef, 1) .' (+'.$magabs_white.'%)
		].filter((line) => line.value !== undefined && line.value !== null);

		const blueLines = [
			{
				label: item.MagName1,
				value: item.MagValue1,
				suffix: `${["Astral", "Immortal"].includes(item.MagName1) ? " Time/times" : " Increase"}`,
				className: `${item.MagName1 !== "Repair invalid" ? "text-[#00eaff]" : "text-[#ff4a4a]"}`,
			},
			{
				label: item.MagName2,
				value: item.MagValue2,
				suffix: `${["Astral", "Immortal"].includes(item.MagName2) ? " Time/times" : " Increase"}`,
				className: `${item.MagName2 !== "Repair invalid" ? "text-[#00eaff]" : "text-[#ff4a4a]"}`,
			},
			{
				label: item.MagName3,
				value: item.MagValue3,
				suffix: `${["Astral", "Immortal"].includes(item.MagName3) ? " Time/times" : " Increase"}`,
				className: `${item.MagName3 !== "Repair invalid" ? "text-[#00eaff]" : "text-[#ff4a4a]"}`,
			},
			{
				label: item.MagName4,
				value: item.MagValue4,
				suffix: `${["Astral", "Immortal"].includes(item.MagName4) ? " Time/times" : " Increase"}`,
				className: `${item.MagName4 !== "Repair invalid" ? "text-[#00eaff]" : "text-[#ff4a4a]"}`,
			},
			{
				label: item.MagName5,
				value: item.MagValue5,
				suffix: `${["Astral", "Immortal"].includes(item.MagName5) ? " Time/times" : " Increase"}`,
				className: `${item.MagName5 !== "Repair invalid" ? "text-[#00eaff]" : "text-[#ff4a4a]"}`,
			},
			{
				label: item.MagName6,
				value: item.MagValue6,
				suffix: `${["Astral", "Immortal"].includes(item.MagName6) ? " Time/times" : " Increase"}`,
				className: `${item.MagName6 !== "Repair invalid" ? "text-[#00eaff]" : "text-[#ff4a4a]"}`,
			},
			{
				label: item.MagName7,
				value: item.MagValue7,
				suffix: `${["Astral", "Immortal"].includes(item.MagName7) ? " Time/times" : " Increase"}`,
				className: `${item.MagName7 !== "Repair invalid" ? "text-[#00eaff]" : "text-[#ff4a4a]"}`,
			},
			{
				label: item.MagName8,
				value: item.MagValue8,
				suffix: `${["Astral", "Immortal"].includes(item.MagName8) ? " Time/times" : " Increase"}`,
				className: `${item.MagName8 !== "Repair invalid" ? "text-[#00eaff]" : "text-[#ff4a4a]"}`,
			},
			{
				label: item.MagName9,
				value: item.MagValue9,
				suffix: `${["Astral", "Immortal"].includes(item.MagName9) ? " Time/times" : " Increase"}`,
				className: `${item.MagName9 !== "Repair invalid" ? "text-[#00eaff]" : "text-[#ff4a4a]"}`,
			},
			{
				label: item.MagName10,
				value: item.MagValue10,
				suffix: `${["Astral", "Immortal"].includes(item.MagName10) ? " Time/times" : " Increase"}`,
				className: `${item.MagName10 !== "Repair invalid" ? "text-[#00eaff]" : "text-[#ff4a4a]"}`,
			},
			{
				label: item.MagName11,
				value: item.MagValue11,
				suffix: `${["Astral", "Immortal"].includes(item.MagName11) ? " Time/times" : " Increase"}`,
				className: `${item.MagName11 !== "Repair invalid" ? "text-[#00eaff]" : "text-[#ff4a4a]"}`,
			},
			{
				label: item.MagName12,
				value: item.MagValue12,
				suffix: `${["Astral", "Immortal"].includes(item.MagName12) ? " Time/times" : " Increase"}`,
				className: `${item.MagName12 !== "Repair invalid" ? "text-[#00eaff]" : "text-[#ff4a4a]"}`,
			},
		].filter((line) => line.value !== undefined && line.value !== null);

		const elixirLines = [
			{
				label:
					item.AdvE === 0
						? "Able to use advanced elixir."
						: `Advanced elixir is in effect [+${item.AdvE}]`,
				value: " ",
				className: "font-bold text-[#c8c8c8] mt-1",
			},
		];

		return (
			<div
				key={`tooltip-${index}-${label}`}
				className="relative flex h-12 w-12 items-center justify-center rounded border border-[var(--border)] bg-[var(--lycan-card-hover)]/40"
				title=""
				onMouseEnter={() => setTooltipVisibleIndex(index)}
				onMouseLeave={() => setTooltipVisibleIndex(null)}
				onMouseMove={(e) => {
					setTooltipPos({ x: e.clientX, y: e.clientY });
					setTooltipVisibleIndex(index);
				}}
			>
				<div className="relative h-8 w-8">
					<Image
						src={src}
						alt={label}
						width={32}
						height={32}
						className="h-8 w-8 object-contain"
					/>
					{item?.SealType && item.SealType !== "Normal" && (
						<Image
							src="/images/inventory/seal.gif"
							alt="Seal"
							key={`seal-${index}`}
							width={32}
							height={32}
							className="absolute inset-0 h-8 w-8 object-contain"
						/>
					)}
				</div>
				{item?.ItemCode != null && label !== "Empty Slot" && (
					<div
						style={{
							position: "fixed",
							left: tooltipPos.x + 12,
							top: tooltipPos.y + 12,
							pointerEvents: "none",
						}}
						className={`text-shadow-[2px_2px_0_black] text-xs z-20 w-64 rounded-[5px] border border-[#808bba] bg-[#1c1e34]/80 p-2 text-[var(--foreground)] shadow-2xl ${
							tooltipVisibleIndex === index ? "block" : "hidden"
						}`}
					>
						<div
							className={`mb-5 font-semibold ${item.MagParamNum === 0 && item.Seal === 0 ? "text-white" : item.MagParamNum > 0 && item.Seal === 0 ? "text-[#00eaff]" : "text-[#ffd953]"}`}
						>
							<Image
								src={`/images/inventory/dot.png`}
								alt="Item"
								width={16}
								height={16}
								className="inline-block mr-2"
							/>
							{`${item.Name} ${totalplus > 0 ? `(+${totalplus})` : ""}`}
						</div>
						{item?.SealType && item.SealType !== "Normal" && (
							<div className="text-[#ffd953] font-bold mb-1">
								{item.SealType}
							</div>
						)}
						<ul className="space-y-1 text-[#efdaa4]">
							{detailLines.map((line) =>
								line?.exclude &&
								line?.exclude?.includes(item.Slot) ? (
									""
								) : (
									<li
										key={line.label}
										className={`flex justify-between gap-3 ${line.newLine ? "mt-5" : ""} ${line.className ? line.className : ""}`}
									>
										<span>
											{line.label} {String(line.value)}
										</span>
									</li>
								),
							)}
						</ul>
						{item.MagParamNum > 0 && (
							<ul className="space-y-1 text-[#efdaa4] mt-5">
								{blueLines.map((line) => (
									<li
										key={`${line.label}-${item.Slot}`}
										className={`flex justify-between gap-3 ${line.className ? line.className : ""}`}
									>
										<span>
											{line.label} {String(line.value)}{" "}
											{line.suffix}
										</span>
									</li>
								))}
							</ul>
						)}
						<ul className="space-y-1 text-[#efdaa4]">
							{elixirLines.map((line) => (
								<li
									key={line.label}
									className={`flex justify-between gap-3 ${line.className ? line.className : ""}`}
								>
									<span>
										{line.label} {String(line.value)}
									</span>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="flex min-h-screen flex-col bg-[var(--lycan-dark)]">
			<Navbar />

			<main className="flex-1 pt-16">
				{/* Header */}
				<section className="relative overflow-hidden py-8">
					<div className="absolute inset-0 bg-gradient-to-b from-[var(--lycan-gold)]/5 via-transparent to-transparent" />

					<div className="container relative mx-auto px-4">
						{/* Character Header */}
						<div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
							{/* Avatar */}
							<div className="relative">
								<div className="h-32 w-32 overflow-hidden rounded-lg border-2 border-[var(--lycan-gold)] bg-[var(--lycan-card)]">
									<Image
										src={`/images/chars/${character.RefObjID}.gif`}
										alt={character.CharName16}
										width={128}
										height={128}
										className="h-full w-full object-cover"
									/>
								</div>
							</div>

							{/* Character Info */}
							<div className="flex-1 text-center md:text-left">
								<div className="flex items-center mt-4 justify-center gap-3 md:justify-start">
									<Image
										src={`/images/${character.RefObjID < 1000 ? "chinese" : "european"}.png`}
										alt={
											character.RefObjID < 1000
												? "chinese"
												: "european"
										}
										width={32}
										height={32}
										className="h-8 w-8 flex-shrink-0 rounded"
									/>
									<h1 className="font-serif text-4xl font-bold text-[var(--foreground)]">
										{character.CharName16}
									</h1>
									{/* Online indicator */}
									<div
										className={`relative flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
											character.isOnline
												? "bg-green-500/20 text-green-400"
												: "bg-red-500/20 text-red-400"
										}`}
									>
										<span
											className={`h-2 w-2 rounded-full ${character.isOnline ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
										/>
										{character.isOnline
											? "Online".toUpperCase()
											: "Offline".toUpperCase()}
									</div>
								</div>

								{/* Quick Stats */}
								<div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
									<div className="flex items-center gap-2 rounded-lg bg-[var(--lycan-card)] px-3 py-2">
										<Star className="h-4 w-4 text-[var(--lycan-gold)]" />
										<span className="text-sm text-[var(--muted-foreground)]">
											Level
										</span>
										<span className="font-bold text-[var(--foreground)]">
											{character.CurLevel} /{" "}
											{character.MaxLevel}
										</span>
									</div>
									<div className="flex items-center gap-2 rounded-lg bg-[var(--lycan-card)] px-3 py-2">
										<Award className="h-4 w-4 text-[var(--lycan-gold)]" />
										<span className="text-sm text-[var(--muted-foreground)]">
											Item Points
										</span>
										<span className="font-bold text-[var(--foreground)]">
											{character.ItemPoints}
										</span>
									</div>

									<Link
										href={
											character.GuildID > 0
												? `/guilds/${character.GuildID}`
												: "#"
										}
										//href={`/guilds/${character.GuildID}`}
										className="flex items-center gap-2 rounded-lg bg-[var(--lycan-card)] px-3 py-2 transition-colors hover:bg-[var(--lycan-card-hover)]"
									>
										<Users className="h-4 w-4 text-[var(--lycan-gold)]" />
										<span className="text-sm text-[var(--muted-foreground)]">
											Guild
										</span>
										<span className="font-bold text-[var(--lycan-gold)]">
											[
											{character.GuildName === "dummy"
												? "No Guild"
												: character.GuildName}
											]
										</span>
									</Link>

									<div className="flex items-center gap-2 rounded-lg bg-[var(--lycan-card)] px-3 py-2">
										<Briefcase className="h-4 w-4 text-[var(--lycan-gold)]" />
										<span className="text-sm text-[var(--muted-foreground)]">
											Job
										</span>
										<span className="font-bold text-[var(--foreground)]">
											{character.JobType > 0 && (
												<Image
													src={`/images/jobs/${character.JobType}.png`}
													alt={"Job Type"}
													width={14}
													height={14}
													className="inline-block ml-2 mr-2 rounded"
												/>
											)}
											{character.JobType === 0 &&
												"No Job"}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Kill Counters */}
				<section className="container mx-auto px-4 py-6">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
						{/* STR */}
						<div className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--lycan-card)] p-6 transition-all hover:border-[var(--lycan-gold)]/50">
							<div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
							<div className="relative flex items-center justify-between">
								<div>
									<p className="text-sm text-[var(--muted-foreground)]">
										STR
									</p>
									<p className="font-serif text-4xl font-bold text-[var(--foreground)]">
										{character.Strength}
									</p>
								</div>
								<div className="rounded-full bg-red-500/10 p-4">
									<Zap className="h-8 w-8 text-red-400" />
								</div>
							</div>
						</div>

						{/* INT */}
						<div className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--lycan-card)] p-6 transition-all hover:border-[var(--lycan-gold)]/50">
							<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
							<div className="relative flex items-center justify-between">
								<div>
									<p className="text-sm text-[var(--muted-foreground)]">
										INT
									</p>
									<p className="font-serif text-4xl font-bold text-[var(--foreground)]">
										{character.Intellect}
									</p>
								</div>
								<div className="rounded-full bg-blue-500/10 p-4">
									<Brain className="h-8 w-8 text-blue-400" />
								</div>
							</div>
						</div>
						{/* PVP Kills */}
						<div className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--lycan-card)] p-6 transition-all hover:border-[var(--lycan-gold)]/50">
							<div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
							<div className="relative flex items-center justify-between">
								<div>
									<p className="text-sm text-[var(--muted-foreground)]">
										PVP Kills
									</p>
									<p className="font-serif text-4xl font-bold text-[var(--foreground)]">
										{character.PvPCount}
									</p>
								</div>
								<div className="rounded-full bg-red-500/10 p-4">
									<Swords className="h-8 w-8 text-red-400" />
								</div>
							</div>
						</div>

						{/* Job Kills */}
						<div className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--lycan-card)] p-6 transition-all hover:border-[var(--lycan-gold)]/50">
							<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
							<div className="relative flex items-center justify-between">
								<div>
									<p className="text-sm text-[var(--muted-foreground)]">
										Job Kills
									</p>
									<p className="font-serif text-4xl font-bold text-[var(--foreground)]">
										{character.JobKillsCount}
									</p>
								</div>
								<div className="rounded-full bg-blue-500/10 p-4">
									<Briefcase className="h-8 w-8 text-blue-400" />
								</div>
							</div>
						</div>

						{/* Unique Kills */}
						<div className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--lycan-card)] p-6 transition-all hover:border-[var(--lycan-gold)]/50">
							<div className="absolute inset-0 bg-gradient-to-br from-[var(--lycan-gold)]/5 to-transparent" />
							<div className="relative flex items-center justify-between">
								<div>
									<p className="text-sm text-[var(--muted-foreground)]">
										Unique Kills
									</p>
									<p className="font-serif text-4xl font-bold text-[var(--foreground)]">
										{character.UniqueKillsCount}
									</p>
								</div>
								<div className="rounded-full bg-[var(--lycan-gold)]/10 p-4">
									<Skull className="h-8 w-8 text-[var(--lycan-gold)]" />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Main Content */}
				<section className="container mx-auto px-4 pb-16">
					<div className="grid gap-6 lg:grid-cols-3">
						{/* Left Column - Character Info */}
						<div className="space-y-6 lg:col-span-1">
							{/* Equipment Toggle */}
							<LycanBox
								title="Equipment"
								icon={<Shield className="h-4 w-4" />}
								clipOverflow={false}
								className="overflow-visible"
								contentClassName="overflow-visible"
							>
								{showEquipment ? (
									<div className="flex justify-center overflow-visible">
										<div className="inline-grid grid-cols-[auto_auto_auto] items-center gap-10 overflow-visible">
											<div className="flex flex-col items-center gap-2 overflow-visible">
												{leftItems.length > 0
													? leftItems.map(
															(item, index) =>
																renderEquipmentSlot(
																	item,
																	index,
																),
														)
													: "No char data found."}
											</div>

											<div className="flex items-center justify-center overflow-visible">
												<div className="flex h-52 w-32 items-center justify-center">
													<Image
														src={`/images/inventory/chars/${character.RefObjID}.png`}
														alt={
															character.CharName16
														}
														width={128}
														height={208}
														className="h-75 w-75 object-contain"
													/>
												</div>
											</div>

											<div className="flex flex-col items-center gap-2 overflow-visible">
												{rightItems.length > 0
													? rightItems.map(
															(item, index) =>
																renderEquipmentSlot(
																	item,
																	index + 6,
																),
														)
													: "No char data found."}
											</div>
										</div>
									</div>
								) : (
									<div className="flex items-center justify-center py-8">
										<div className="h-48 w-32 rounded-lg border border-[var(--border)] bg-[var(--lycan-card-hover)]/30 flex items-center justify-center">
											<User className="h-16 w-16 text-[var(--muted-foreground)]" />
										</div>
									</div>
								)}
							</LycanBox>

							{/* Active Buffs */}
							<LycanBox
								title="Active Buffs"
								icon={<Sparkles className="h-4 w-4" />}
							>
								{mockBuffs.length > 0 ? (
									<div className="flex flex-wrap justify-center gap-2">
										{mockBuffs.map((buff, index) => (
											<div
												key={index}
												className="group relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-[var(--border)] bg-[var(--lycan-card-hover)]/50 transition-all hover:border-[var(--lycan-gold)]/50"
												title={`${buff.name} - ${buff.duration}`}
											>
												<Image
													src={
														buff.icon ||
														"/placeholder.svg"
													}
													alt={buff.name}
													width={32}
													height={32}
													className="h-8 w-8 object-contain"
												/>
												{/* Tooltip */}
												<div className="absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-[var(--lycan-dark)] px-2 py-1 text-xs text-[var(--foreground)] shadow-lg group-hover:block">
													{buff.name}
													<br />
													<span className="text-[var(--muted-foreground)]">
														{buff.duration}
													</span>
												</div>
											</div>
										))}
									</div>
								) : (
									<p className="py-4 text-center text-sm text-[var(--muted-foreground)]">
										No active buffs
									</p>
								)}
							</LycanBox>
						</div>

						{/* Right Column - Kill Logs */}
						<div className="space-y-6 lg:col-span-2">
							{/* Kill Logs Tabs */}
							<LycanBox
								title="Kill History"
								icon={<Clock className="h-4 w-4" />}
							>
								{/* Tabs */}
								<div className="mb-4 flex border-b border-[var(--border)]">
									{tabs.map((tab) => (
										<button
											key={tab.id}
											type="button"
											onClick={() => setActiveTab(tab.id)}
											className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
												activeTab === tab.id
													? "border-b-2 border-[var(--lycan-gold)] text-[var(--lycan-gold)]"
													: "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
											}`}
										>
											{tab.icon}
											{tab.label}
										</button>
									))}
								</div>

								{/* Tab Content */}
								{renderTabContent()}
							</LycanBox>

							{/* Unique Kill Summary */}
							<LycanBox
								title="Unique Kill Summary"
								icon={<Target className="h-4 w-4" />}
							>
								{uniques.length > 0 ? (
									<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
										{uniques.map((unique, index) => (
											<div
												key={index}
												className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--lycan-card-hover)]/30 p-3"
											>
												<div className="flex justify-items-start items-center gap-3 w-full">
													<div className="rounded-full bg-yellow-500/20 p-1 inline">
														<Swords className="h-6 w-6 inline text-yellow-600 p-1" />
													</div>
													<span className="text-sm text-[var(--foreground)]">
														{unique.MonsterName}
													</span>
												</div>
												<span className="font-serif font-bold text-[var(--lycan-gold)]">
													{unique.KillCount}
												</span>
											</div>
										))}
									</div>
								) : (
									<p className="py-4 text-center text-sm text-[var(--muted-foreground)]">
										No unique kills recorded
									</p>
								)}
							</LycanBox>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
