"use client";

import { LycanBox } from "@/components/ui/lycan-box";
import { Clock, CrossIcon, Brain, ShieldPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";

export default function RankingPage() {
	const [activeTab, setActiveTab] = useState<TabType>("players");
	const [data, setData] = useState<any[]>([]);
	const [rankingData, setRankingData] = useState<
		Partial<Record<TabType, any[]>>
	>({});

	const tabss = [
		"players",
		"guilds",
		"traders",
		"hunters",
		"thieves",
		"honor",
		"uniques",
		"pvp-match",
	] as const;
	type TabType = (typeof tabss)[number];

	type RankingConfig<T> = {
		label: string;
		endpoint: string;
		columns: {
			key: keyof T;
			label: string;
			render?: (value: any, row: T) => React.ReactNode;
		}[];
	};

	const RANKINGS: Record<TabType, RankingConfig<any>> = {
		players: {
			label: "Players",
			endpoint: "/api/rankings/players",
			columns: [
				{ key: "RankNo", label: "Rank" },
				{
					key: "CharName16",
					label: "Name",
					render: (value) => (
						<a
							className="hover:text-[var(--lycan-gold)] transition duration-300 ease-in-out"
							href={`/chars/${value}`}
						>
							{value}
						</a>
					),
				},
				{
					key: "guildname",
					label: "Guild",
					render: (value) =>
						value === "<none>" ? (
							"none"
						) : (
							<a
								className="hover:text-[var(--lycan-gold)] transition duration-300 ease-in-out"
								href={`/guilds/${value}`}
							>
								{value}
							</a>
						),
				},
				{
					key: "class",
					label: "Race / Stats",
					render: (value) => (
						<div className="flex items-center gap-3 w-full justify-center">
							{value.includes("chinese") ? (
								<div className="rounded-full bg-red-500/20 p-0 inline">
									<Image
										src={`/images/chinese.png`}
										alt={value}
										width={32}
										height={32}
										className="mx-auto inline"
									/>
								</div>
							) : (
								<div className="rounded-full bg-red-500/20 p-0 inline">
									<Image
										src={`/images/european.png`}
										alt={value}
										width={32}
										height={32}
										className="mx-auto inline"
									/>
								</div>
							)}
							{value.includes("int") ? (
								<div className="rounded-full bg-blue-500/20 p-1 inline">
									<Brain className="h-6 w-6 inline text-blue-600 p-1" />
								</div>
							) : (
								<div className="rounded-full bg-red-500/20 p-1 inline">
									<ShieldPlus className="h-6 w-6 inline text-red-600 p-1" />
								</div>
							)}
						</div>
					),
				},
				{
					key: "jobType",
					label: "Job",
					render: (value) =>
						value > 0 ? (
							<Image
								src={`/images/jobs/${value}.png`}
								alt={value}
								width={32}
								height={32}
								className="mx-auto"
							/>
						) : (
							"<none>"
						),
				},
				{ key: "ItemPoints", label: "Item Points" },
				{
					key: "LastLogout",
					label: "Last Online",
					render: (value) => {
						const date = new Date(value);
						return date.toLocaleString();
					},
				},
			],
		},

		guilds: {
			label: "Guilds",
			endpoint: "/api/rankings/guilds",
			columns: [
				{ key: "rank", label: "Rank" },
				{
					key: "name",
					label: "Guild Name",
					render: (value) => (
						<a
							className="hover:text-[var(--lycan-gold)] transition duration-300 ease-in-out"
							href={`/guilds/${value}`}
						>
							{value}
						</a>
					),
				},
				{ key: "members", label: "Members" },
				{ key: "fortress", label: "Fortress Won" },
				{ key: "itempoints", label: "Item Points" },
			],
		},
		traders: {
			label: "Traders",
			endpoint: "/api/rankings/jobs/1",
			columns: [
				{ key: "rank", label: "Rank" },
				{
					key: "name",
					label: "Name",
					render: (value) => (
						<a
							className="hover:text-[var(--lycan-gold)] transition duration-300 ease-in-out"
							href={`/chars/${value}`}
						>
							{value}
						</a>
					),
				},
				{
					key: "class",
					label: "Race / Stats",
					render: (value) => (
						<div className="flex items-center gap-3 w-full justify-center">
							{value.includes("chinese") ? (
								<div className="rounded-full bg-red-500/20 p-0 inline">
									<Image
										src={`/images/chinese.png`}
										alt={value}
										width={32}
										height={32}
										className="mx-auto inline"
									/>
								</div>
							) : (
								<div className="rounded-full bg-red-500/20 p-0 inline">
									<Image
										src={`/images/european.png`}
										alt={value}
										width={32}
										height={32}
										className="mx-auto inline"
									/>
								</div>
							)}
							{value.includes("int") ? (
								<div className="rounded-full bg-blue-500/20 p-1 inline">
									<Brain className="h-6 w-6 inline text-blue-600 p-1" />
								</div>
							) : (
								<div className="rounded-full bg-red-500/20 p-1 inline">
									<ShieldPlus className="h-6 w-6 inline text-red-600 p-1" />
								</div>
							)}
						</div>
					),
				},
				{ key: "guild", label: "Guild" },
				{ key: "points", label: "Points" },

				// ...add relevant columns...
			],
		},
		hunters: {
			label: "Hunters",
			endpoint: "/api/rankings/jobs/3",
			columns: [
				{ key: "rank", label: "Rank" },
				{
					key: "name",
					label: "Name",
					render: (value) => (
						<a
							className="hover:text-[var(--lycan-gold)] transition duration-300 ease-in-out"
							href={`/chars/${value}`}
						>
							{value}
						</a>
					),
				},
				{
					key: "class",
					label: "Race / Stats",
					render: (value) => (
						<div className="flex items-center gap-3 w-full justify-center">
							{value.includes("chinese") ? (
								<div className="rounded-full bg-red-500/20 p-0 inline">
									<Image
										src={`/images/chinese.png`}
										alt={value}
										width={32}
										height={32}
										className="mx-auto inline"
									/>
								</div>
							) : (
								<div className="rounded-full bg-red-500/20 p-0 inline">
									<Image
										src={`/images/european.png`}
										alt={value}
										width={32}
										height={32}
										className="mx-auto inline"
									/>
								</div>
							)}
							{value.includes("int") ? (
								<div className="rounded-full bg-blue-500/20 p-1 inline">
									<Brain className="h-6 w-6 inline text-blue-600 p-1" />
								</div>
							) : (
								<div className="rounded-full bg-red-500/20 p-1 inline">
									<ShieldPlus className="h-6 w-6 inline text-red-600 p-1" />
								</div>
							)}
						</div>
					),
				},
				{ key: "guild", label: "Guild" },
				{ key: "points", label: "Points" },

				// ...add relevant columns...
			],
		},
		thieves: {
			label: "Thieves",
			endpoint: "/api/rankings/jobs/2",
			columns: [
				{ key: "rank", label: "Rank" },
				{
					key: "name",
					label: "Name",
					render: (value) => (
						<a
							className="hover:text-[var(--lycan-gold)] transition duration-300 ease-in-out"
							href={`/chars/${value}`}
						>
							{value}
						</a>
					),
				},
				{
					key: "class",
					label: "Race / Stats",
					render: (value) => (
						<div className="flex items-center gap-3 w-full justify-center">
							{value.includes("chinese") ? (
								<div className="rounded-full bg-red-500/20 p-0 inline">
									<Image
										src={`/images/chinese.png`}
										alt={value}
										width={32}
										height={32}
										className="mx-auto inline"
									/>
								</div>
							) : (
								<div className="rounded-full bg-red-500/20 p-0 inline">
									<Image
										src={`/images/european.png`}
										alt={value}
										width={32}
										height={32}
										className="mx-auto inline"
									/>
								</div>
							)}
							{value.includes("int") ? (
								<div className="rounded-full bg-blue-500/20 p-1 inline">
									<Brain className="h-6 w-6 inline text-blue-600 p-1" />
								</div>
							) : (
								<div className="rounded-full bg-red-500/20 p-1 inline">
									<ShieldPlus className="h-6 w-6 inline text-red-600 p-1" />
								</div>
							)}
						</div>
					),
				},
				{ key: "guild", label: "Guild" },
				{ key: "points", label: "Points" },

				// ...add relevant columns...
			],
		},
		uniques: {
			label: "Uniques",
			endpoint: "/api/rankings/uniques",
			columns: [
				{ key: "RankNo", label: "Rank" },
				{
					key: "charname",
					label: "Name",
					render: (value) => (
						<a
							className="hover:text-[var(--lycan-gold)] transition duration-300 ease-in-out"
							href={`/chars/${value}`}
						>
							{value}
						</a>
					),
				},
				{
					key: "guildname",
					label: "Guild",
					render: (value) => (
						<a
							className="hover:text-[var(--lycan-gold)] transition duration-300 ease-in-out"
							href={`/guilds/${value}`}
						>
							{value}
						</a>
					),
				},
				{
					key: "class",
					label: "Race / Stats",
					render: (value) => (
						<div className="flex items-center gap-3 w-full justify-center">
							{value.includes("chinese") ? (
								<div className="rounded-full bg-red-500/20 p-0 inline">
									<Image
										src={`/images/chinese.png`}
										alt={value}
										width={32}
										height={32}
										className="mx-auto inline"
									/>
								</div>
							) : (
								<div className="rounded-full bg-red-500/20 p-0 inline">
									<Image
										src={`/images/european.png`}
										alt={value}
										width={32}
										height={32}
										className="mx-auto inline"
									/>
								</div>
							)}
							{value.includes("int") ? (
								<div className="rounded-full bg-blue-500/20 p-1 inline">
									<Brain className="h-6 w-6 inline text-blue-600 p-1" />
								</div>
							) : (
								<div className="rounded-full bg-red-500/20 p-1 inline">
									<ShieldPlus className="h-6 w-6 inline text-red-600 p-1" />
								</div>
							)}
						</div>
					),
				},
				{
					key: "jobType",
					label: "Job",
					render: (value) =>
						value > 0 ? (
							<Image
								src={`/images/jobs/${value}.png`}
								alt={value}
								width={32}
								height={32}
								className="mx-auto"
							/>
						) : (
							"<none>"
						),
				},
				{ key: "uniquepoints", label: "Unique Points" },
				{
					key: "LastLogout",
					label: "Last Online",
					render: (value) => {
						const date = new Date(value);
						return date.toLocaleString();
					},
				},
			],
		},
		honor: {
			label: "Honor",
			endpoint: "/api/rankings/honor",
			columns: [
				{ key: "RankNo", label: "Rank" },
				{
					key: "charname",
					label: "Name",
					render: (value) => (
						<a
							className="hover:text-[var(--lycan-gold)] transition duration-300 ease-in-out"
							href={`/chars/${value}`}
						>
							{value}
						</a>
					),
				},
				{
					key: "class",
					label: "Race / Stats",
					render: (value) => (
						<div className="flex items-center gap-3 w-full justify-center">
							{value.includes("chinese") ? (
								<div className="rounded-full bg-red-500/20 p-0 inline">
									<Image
										src={`/images/chinese.png`}
										alt={value}
										width={32}
										height={32}
										className="mx-auto inline"
									/>
								</div>
							) : (
								<div className="rounded-full bg-red-500/20 p-0 inline">
									<Image
										src={`/images/european.png`}
										alt={value}
										width={32}
										height={32}
										className="mx-auto inline"
									/>
								</div>
							)}
							{value.includes("int") ? (
								<div className="rounded-full bg-blue-500/20 p-1 inline">
									<Brain className="h-6 w-6 inline text-blue-600 p-1" />
								</div>
							) : (
								<div className="rounded-full bg-red-500/20 p-1 inline">
									<ShieldPlus className="h-6 w-6 inline text-red-600 p-1" />
								</div>
							)}
						</div>
					),
				},
				{
					key: "jobType",
					label: "Job",
					render: (value) =>
						value > 0 ? (
							<Image
								src={`/images/jobs/${value}.png`}
								alt={value}
								width={32}
								height={32}
								className="mx-auto"
							/>
						) : (
							"<none>"
						),
				},
				{ key: "honorpoints", label: "Honor Points" },
				{
					key: "LastLogout",
					label: "Last Online",
					render: (value) => {
						const date = new Date(value);
						return date.toLocaleString();
					},
				},
			],
		},
		"pvp-match": {
			label: "Traders",
			endpoint: "/api/rankings/traders",
			columns: [
				{ key: "rank", label: "Rank" },
				{ key: "name", label: "Name" },
				// ...add relevant columns...
			],
		},
	};

	function RankingTable<T>({
		config,
		data,
	}: {
		config: RankingConfig<T>;
		data: T[];
	}) {
		return (
			<table className="min-w-full table-auto">
				<thead>
					<tr className="border-b border-[var(--border)] text-center">
						{config.columns.map((col) => (
							<th
								key={String(col.key)}
								className="px-4 py-3 font-serif text-sm font-bold text-[var(--lycan-gold)]"
							>
								{col.label}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{data.map((row, index) => (
						<tr
							key={index}
							className={
								index % 2 === 0
									? "bg-[var(--lycan-card-hover)]/30"
									: ""
							}
						>
							{config.columns.map((col) => (
								<td
									key={String(col.key)}
									className="px-4 py-3 text-center"
								>
									{col.render
										? col.render(row[col.key], row)
										: String(row[col.key])}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	}

	useEffect(() => {
		if (rankingData[activeTab]) return;

		fetch(RANKINGS[activeTab].endpoint)
			.then((res) => res.json())
			.then((result) => {
				setRankingData((prev) => ({
					...prev,
					[activeTab]: result ?? [],
				}));
			});
	}, [activeTab]);

	const tabs = [
		"players",
		"guilds",
		"traders",
		"hunters",
		"thieves",
		"honor",
		"uniques",
		"pvp-match",
	];

	return (
		<div className="flex min-h-screen flex-col relative">
			{/* Background Image with Overlay */}
			<div
				className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
				style={{ backgroundImage: "url('/images/trsro_bg1.png')" }}
			/>
			<div className="fixed inset-0 bg-black/70 z-10" />

			<div className="relative z-20 flex min-h-screen flex-col bg-transparent">
				<Navbar />
				<main className="pt-16">
					<section className="max-w-7xl mx-auto px-4 py-8">
						<div className="flex flex-col items-center text-center pb-8">
							<h1 className="font-serif text-4xl font-bold text-[var(--foreground)] md:text-5xl">
								Lycan Rankings
							</h1>
							<p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
								Check out highscores and players stats!
							</p>
						</div>
						<LycanBox
							title="Server Rankings"
							icon={<Clock className="h-4 w-4" />}
						>
							<div className="flex flex-wrap gap-2 justify-center mb-6">
								{tabs.map((tab) => (
									<button
										key={tab}
										type="button"
										onClick={() =>
											setActiveTab(
												tab.toString() as TabType,
											)
										}
										className={`flex items-center gap-2 px-4 cursor-pointer py-3 font-serif text-sm font-bold text-[var(--lycan-gold)] transition-colors ${
											activeTab === tab
												? "border-b-2 border-[var(--lycan-gold)] text-[var(--lycan-gold)]"
												: "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
										}`}
									>
										{tab}
									</button>
								))}
							</div>
							<RankingTable
								config={RANKINGS[activeTab]}
								data={rankingData[activeTab] ?? []}
							/>
						</LycanBox>
					</section>
				</main>
				<Footer />
			</div>
		</div>
	);
}
