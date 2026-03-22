import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { LycanBox } from "@/components/ui/lycan-box";
import {
	getRankingByTab,
	type RankingTab,
	rankingTabs,
	RANKING_CACHE_SECONDS,
} from "@/lib/rankings";
import { Brain, Clock, ShieldPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type RankingColumn = {
	key: string;
	label: string;
	render?: (value: unknown) => ReactNode;
};

const TAB_LABELS: Record<RankingTab, string> = {
	players: "Players",
	guilds: "Guilds",
	traders: "Traders",
	hunters: "Hunters",
	thieves: "Thieves",
	honor: "Honor",
	uniques: "Uniques",
	"pvp-match": "PVP Match",
};

function normalizeTab(value: string | string[] | undefined): RankingTab {
	const selected = Array.isArray(value) ? value[0] : value;
	if (!selected) {
		return "players";
	}

	if ((rankingTabs as readonly string[]).includes(selected)) {
		return selected as RankingTab;
	}

	return "players";
}

function renderRaceStats(value: unknown) {
	const text = String(value ?? "").toLowerCase();
	const isChinese = text.includes("chinese");
	const isInt = text.includes("int");

	return (
		<div className="flex w-full items-center justify-center gap-3">
			<div className="rounded-full bg-red-500/20 p-0 inline">
				<Image
					src={isChinese ? "/images/chinese.png" : "/images/european.png"}
					alt={text || "race"}
					width={32}
					height={32}
					className="mx-auto inline"
				/>
			</div>
			{isInt ? (
				<div className="rounded-full bg-blue-500/20 p-1 inline">
					<Brain className="h-6 w-6 inline text-blue-600 p-1" />
				</div>
			) : (
				<div className="rounded-full bg-red-500/20 p-1 inline">
					<ShieldPlus className="h-6 w-6 inline text-red-600 p-1" />
				</div>
			)}
		</div>
	);
}

function renderJobType(value: unknown) {
	const jobType = Number(value);
	if (jobType > 0) {
		return (
			<Image
				src={`/images/jobs/${jobType}.png`}
				alt={`Job ${jobType}`}
				width={32}
				height={32}
				className="mx-auto"
			/>
		);
	}

	return "<none>";
}

function renderLastOnline(value: unknown) {
	if (!value) {
		return "-";
	}

	const date = new Date(String(value));
	if (Number.isNaN(date.getTime())) {
		return "-";
	}

	return date.toLocaleString();
}

function getColumnsForTab(tab: RankingTab): RankingColumn[] {
	switch (tab) {
		case "players":
			return [
				{ key: "RankNo", label: "Rank" },
				{
					key: "CharName16",
					label: "Name",
					render: (value) => (
						<Link
							className="transition duration-300 ease-in-out hover:text-[var(--lycan-gold)]"
							href={`/chars/${value}`}
						>
							{String(value ?? "")}
						</Link>
					),
				},
				{
					key: "guildname",
					label: "Guild",
					render: (value) => {
						const guild = String(value ?? "");
						if (!guild || guild === "<none>") {
							return "none";
						}

						return (
							<Link
								className="transition duration-300 ease-in-out hover:text-[var(--lycan-gold)]"
								href={`/guilds/${guild}`}
							>
								{guild}
							</Link>
						);
					},
				},
				{ key: "class", label: "Race / Stats", render: renderRaceStats },
				{ key: "jobType", label: "Job", render: renderJobType },
				{ key: "ItemPoints", label: "Item Points" },
				{ key: "LastLogout", label: "Last Online", render: renderLastOnline },
			];
		case "guilds":
			return [
				{ key: "rank", label: "Rank" },
				{
					key: "name",
					label: "Guild Name",
					render: (value) => (
						<Link
							className="transition duration-300 ease-in-out hover:text-[var(--lycan-gold)]"
							href={`/guilds/${value}`}
						>
							{String(value ?? "")}
						</Link>
					),
				},
				{ key: "members", label: "Members" },
				{ key: "fortress", label: "Fortress Won" },
				{ key: "itempoints", label: "Item Points" },
			];
		case "traders":
		case "hunters":
		case "thieves":
			return [
				{ key: "rank", label: "Rank" },
				{
					key: "name",
					label: "Name",
					render: (value) => (
						<Link
							className="transition duration-300 ease-in-out hover:text-[var(--lycan-gold)]"
							href={`/chars/${value}`}
						>
							{String(value ?? "")}
						</Link>
					),
				},
				{ key: "class", label: "Race / Stats", render: renderRaceStats },
				{ key: "guild", label: "Guild" },
				{ key: "points", label: "Points" },
			];
		case "honor":
			return [
				{ key: "RankNo", label: "Rank" },
				{
					key: "charname",
					label: "Name",
					render: (value) => (
						<Link
							className="transition duration-300 ease-in-out hover:text-[var(--lycan-gold)]"
							href={`/chars/${value}`}
						>
							{String(value ?? "")}
						</Link>
					),
				},
				{ key: "class", label: "Race / Stats", render: renderRaceStats },
				{ key: "jobType", label: "Job", render: renderJobType },
				{ key: "honorpoints", label: "Honor Points" },
				{ key: "LastLogout", label: "Last Online", render: renderLastOnline },
			];
		case "uniques":
			return [
				{ key: "RankNo", label: "Rank" },
				{
					key: "charname",
					label: "Name",
					render: (value) => (
						<Link
							className="transition duration-300 ease-in-out hover:text-[var(--lycan-gold)]"
							href={`/chars/${value}`}
						>
							{String(value ?? "")}
						</Link>
					),
				},
				{
					key: "guildname",
					label: "Guild",
					render: (value) => {
						const guild = String(value ?? "");
						if (!guild || guild === "<none>") {
							return "none";
						}

						return (
							<Link
								className="transition duration-300 ease-in-out hover:text-[var(--lycan-gold)]"
								href={`/guilds/${guild}`}
							>
								{guild}
							</Link>
						);
					},
				},
				{ key: "class", label: "Race / Stats", render: renderRaceStats },
				{ key: "jobType", label: "Job", render: renderJobType },
				{ key: "uniquepoints", label: "Unique Points" },
				{ key: "LastLogout", label: "Last Online", render: renderLastOnline },
			];
		case "pvp-match":
			return [
				{ key: "rank", label: "Rank" },
				{ key: "name", label: "Name" },
				{ key: "score", label: "Score" },
			];
		default:
			return [];
	}
}

type RankingPageProps = {
	searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RankingPage({ searchParams }: RankingPageProps) {
	const resolvedSearchParams = searchParams ? await searchParams : {};
	const activeTab = normalizeTab(resolvedSearchParams.tab);
	const data = await getRankingByTab(activeTab);
	const columns = getColumnsForTab(activeTab);

	return (
		<div className="relative flex min-h-screen flex-col">
			<div
				className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: "url('/images/trsro_bg1.png')" }}
			/>
			<div className="fixed inset-0 z-10 bg-black/70" />

			<div className="relative z-20 flex min-h-screen flex-col bg-transparent">
				<Navbar />
				<main className="pt-16">
					<section className="mx-auto max-w-7xl px-4 py-8">
						<div className="flex flex-col items-center pb-8 text-center">
							<h1 className="font-serif text-4xl font-bold text-[var(--foreground)] md:text-5xl">
								Lycan Rankings
							</h1>
							<p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
								Check out highscores and players stats. Rank updates every {RANKING_CACHE_SECONDS / 60} minutes.
							</p>
						</div>

						<LycanBox title="Server Rankings" icon={<Clock className="h-4 w-4" />}>
							<div className="mb-6 flex flex-wrap justify-center gap-2">
								{rankingTabs.map((tab) => (
									<Link
										key={tab}
										href={`/ranking?tab=${tab}`}
										className={`flex items-center gap-2 px-4 py-3 font-serif text-sm font-bold transition-colors ${
											activeTab === tab
												? "border-b-2 border-[var(--lycan-gold)] text-[var(--lycan-gold)]"
												: "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
										}`}
									>
										{TAB_LABELS[tab]}
									</Link>
								))}
							</div>

							<div className="overflow-x-auto">
								<table className="min-w-full table-auto">
									<thead>
										<tr className="border-b border-[var(--border)] text-center">
											{columns.map((col) => (
												<th
													key={col.key}
													className="px-4 py-3 font-serif text-sm font-bold text-[var(--lycan-gold)]"
												>
													{col.label}
												</th>
											))}
										</tr>
									</thead>
									<tbody>
										{data.length > 0 ? (
											data.map((row: Record<string, unknown>, index: number) => (
												<tr
													key={`${activeTab}-${index}`}
													className={index % 2 === 0 ? "bg-[var(--lycan-card-hover)]/30" : ""}
												>
													{columns.map((col) => (
														<td key={col.key} className="px-4 py-3 text-center">
															{col.render
																? col.render(row[col.key])
																: String(row[col.key] ?? "-")}
														</td>
													))}
												</tr>
											))
										) : (
											<tr>
												<td
													colSpan={Math.max(columns.length, 1)}
													className="px-4 py-8 text-center text-[var(--muted-foreground)]"
												>
													No ranking data available for this tab yet.
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</LycanBox>
					</section>
				</main>
				<Footer />
			</div>
		</div>
	);
}
