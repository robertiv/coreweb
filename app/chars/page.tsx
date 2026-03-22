"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LoginBox } from "@/components/sidebar/login-box";
import { FortressWar } from "@/components/sidebar/fortress-war";
import { UniqueKills } from "@/components/sidebar/unique-kills";
// import { EventSchedule } from "@/components/sidebar/event-schedule";
import { ServerStatus } from "@/components/sidebar/server-status";
import { DiscordWidget } from "@/components/sidebar/discord-widget";
import { TopPlayers } from "@/components/top-players";
import { TopGuilds } from "@/components/top-guilds";
import { LycanBox } from "@/components/ui/lycan-box";
import Link from "next/link";
import {
	isValidCharacterName,
	sanitizeCharacterName,
} from "@/lib/character-name";
import {
	searchCharacterAction,
	type CharacterSearchState,
} from "./actions";
import { Search, Swords, ShieldAlert, AlertTriangle } from "lucide-react";

const initialCharacterSearchState: CharacterSearchState = {
	error: "",
	searchedName: "",
	suggestions: [],
	noMatches: false,
};

function getJobTypeLabel(jobType: number) {
	switch (jobType) {
		case 1:
			return "Trader";
		case 2:
			return "Thief";
		case 3:
			return "Hunter";
		default:
			return "None";
	}
}

function renderJobType(jobType: number) {
	if (jobType === 1 || jobType === 2 || jobType === 3) {
		return (
			<img
				src={`/images/jobs/${jobType}.png`}
				alt={getJobTypeLabel(jobType)}
				title={getJobTypeLabel(jobType)}
				className="mx-auto h-7 w-7 object-contain"
			/>
		);
	}

	return <span className="text-xs text-[var(--muted-foreground)]">no job</span>;
}


export default function Chars() {
	const [characterName, setCharacterName] = useState("");
	const [clientError, setClientError] = useState("");
	const [searchState, searchAction] = useActionState(
		searchCharacterAction,
		initialCharacterSearchState,
	);
	const resolvedSearchState = searchState ?? initialCharacterSearchState;
	const suggestions = Array.isArray(resolvedSearchState?.suggestions)
		? resolvedSearchState.suggestions
		: [];

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setClientError("");

		const sanitizedName = sanitizeCharacterName(characterName);

		if (!sanitizedName) {
			e.preventDefault();
			setClientError("Enter a character name before searching.");
			return;
		}

		if (!isValidCharacterName(sanitizedName)) {
			e.preventDefault();
			setClientError(
				"Character names can only contain letters, numbers, underscores, or hyphens.",
			);
			return;
		}
	};

	const errorMessage = clientError || resolvedSearchState.error;

	return (
		<div className="flex min-h-screen flex-col relative">
			<div
				className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
				style={{ backgroundImage: "url('/images/trsro_bg1.png')" }}
			/>
			<div className="fixed inset-0 bg-black/70 z-10" />

			<div className="relative z-20 flex min-h-screen flex-col bg-transparent">
				<Navbar />

				<main className="flex-1 pt-16">
					<section className="relative overflow-hidden py-16">
						<div className="absolute inset-0 bg-gradient-to-b from-[var(--lycan-gold)]/5 via-transparent to-transparent" />

						<div className="container relative mx-auto px-4">
							<div className="flex flex-col items-center text-center">
								<h1 className="font-serif text-4xl font-bold text-[var(--foreground)] md:text-5xl">
									Character Search
								</h1>
								<p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
									Search any adventurer by name and jump directly to their
									stats page.
								</p>
							</div>
						</div>
					</section>

					<section className="mx-auto max-w-7xl px-4 pb-16">
						<div className="grid gap-6 lg:grid-cols-12">
							<aside className="space-y-6 lg:col-span-3">
								<LoginBox />
								<FortressWar />
								<UniqueKills />
								{/* <EventSchedule /> */}
							</aside>

							<div className="space-y-6 lg:col-span-6">
								<LycanBox
									title="Find Character"
									icon={<Search className="h-4 w-4" />}
								>
									<form
										action={searchAction}
										onSubmit={handleSubmit}
										className="space-y-6"
									>
										

										<div>
											<label
												htmlFor="charName"
												className="mb-2 block text-sm font-medium text-[var(--foreground)]"
											>
												Character Name
											</label>
											<div className="relative">
												<Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted-foreground)]" />
												<input
													id="charName"
													name="characterName"
													type="text"
													value={characterName}
													onChange={(e) => setCharacterName(e.target.value)}
													placeholder="Example: WolfKing"
													maxLength={16}
													autoComplete="off"
													spellCheck={false}
													className="w-full rounded-lg border border-[var(--border)] bg-[var(--lycan-card)] py-4 pl-12 pr-4 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--lycan-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--lycan-gold)]"
												/>
											</div>
										</div>

										{errorMessage && (
											<div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
												<p className="text-sm text-red-300">{errorMessage}</p>
											</div>
										)}

										<button
											type="submit"
											className="glow-gold inline-flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[var(--lycan-gold)] to-[var(--lycan-orange)] px-6 py-4 font-serif font-bold text-[var(--lycan-dark)] transition-all hover:scale-[1.01] hover:shadow-lg"
										>
											<Swords className="h-5 w-5" />
											Search Character
										</button>
									</form>
								</LycanBox>

								{suggestions.length > 0 && (
									<LycanBox
										title="Similar Characters"
										icon={<Swords className="h-4 w-4" />}
									>
										<p className="mb-4 text-sm text-[var(--muted-foreground)]">
											No exact match was found for
											<span className="ml-1 font-semibold text-[var(--lycan-gold)]">
												{resolvedSearchState.searchedName}
											</span>
											. These characters look similar:
										</p>
										<div className="overflow-x-auto">
											<table className="w-full table-fixed">
												<colgroup>
													<col className="w-[32%]" />
													<col className="w-[12%]" />
													<col className="w-[14%]" />
													<col className="w-[18%]" />
													<col className="w-[24%]" />
												</colgroup>
												<thead>
													<tr className="border-b border-[var(--border)] text-left">
														<th className="px-3 py-3 font-serif text-sm font-bold text-[var(--lycan-gold)]">
															Name
														</th>
														<th className="px-3 py-3 text-center font-serif text-sm font-bold text-[var(--lycan-gold)]">
															Level
														</th>
														<th className="px-3 py-3 text-center font-serif text-sm font-bold text-[var(--lycan-gold)]">
															Race
														</th>
														<th className="px-3 py-3 text-center font-serif text-sm font-bold text-[var(--lycan-gold)]">
															Job Type
														</th>
														<th className="px-3 py-3 font-serif text-sm font-bold text-[var(--lycan-gold)]">
															Guild
														</th>
													</tr>
												</thead>
												<tbody>
													{suggestions.map((suggestion, index) => (
														<tr
															key={`${suggestion.name}-${index}`}
															className={
																index % 2 === 0
																	? "bg-[var(--lycan-card-hover)]/30"
																	: ""
															}
														>
															<td className="px-3 py-3 text-sm">
																<Link
																	href={`/chars/${encodeURIComponent(suggestion.name)}`}
																	className="block truncate font-medium text-[var(--foreground)] transition-colors hover:text-[var(--lycan-gold)]"
																	title={suggestion.name}
																>
																	{suggestion.name}
																</Link>
															</td>
															<td className="px-3 py-3 text-center text-sm text-[var(--foreground)]">
																{suggestion.level}
															</td>
															<td className="px-3 py-3 text-center text-sm text-[var(--foreground)]">
																<img
																	src={
																		suggestion.race === "Chinese"
																			? "http://localhost:3000/images/chinese.png"
																			: "http://localhost:3000/images/european.png"
																	}
																	alt={suggestion.race}
																	className="mx-auto h-7 w-7 object-contain"
																/>
															</td>
															<td className="px-3 py-3 text-center text-sm text-[var(--foreground)]">
																{renderJobType(suggestion.jobType)}
															</td>
															<td className="px-3 py-3 text-sm">
																{suggestion.guild === "<none>" ? (
																	<span className="text-[var(--muted-foreground)]">
																		&lt;none&gt;
																	</span>
																) : (
																	<Link
																		href={`/guilds/${encodeURIComponent(suggestion.guild)}`}
																		className="block truncate font-medium text-[var(--foreground)] transition-colors hover:text-[var(--lycan-gold)]"
																		title={suggestion.guild}
																	>
																		{suggestion.guild}
																	</Link>
																)}
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</LycanBox>
								)}

								{resolvedSearchState.noMatches && !resolvedSearchState.error && (
									<div className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-4">
										<div className="flex items-start gap-3">
											<AlertTriangle className="mt-0.5 h-5 w-5 text-amber-300" />
											<div>
												<p className="font-semibold text-amber-200">
													No matching character was found.
												</p>
												<p className="mt-1 text-sm text-amber-100/90">
													We could not find an exact match or any likely character names for
													<span className="ml-1 font-semibold">
														{resolvedSearchState.searchedName}
													</span>
													.
												</p>
											</div>
										</div>
									</div>
								)}
							</div>

							<aside className="space-y-6 lg:col-span-3">
								<ServerStatus />
								<DiscordWidget />
								<TopPlayers />
								<TopGuilds />
								<LycanBox
									title="Search Rules"
									icon={<ShieldAlert className="h-4 w-4" />}
								>
									<ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
										<li>Use the exact character name as it appears in game.</li>
										<li>Names are limited to safe characters before any DB lookup.</li>
										<li>Invalid names are blocked before navigation.</li>
									</ul>
								</LycanBox>
							</aside>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</div>
	);
}
