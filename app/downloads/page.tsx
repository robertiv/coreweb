import {
	Download,
	HardDrive,
	FileArchive,
	Monitor,
	Cpu,
	MemoryStick,
	Disc,
	Layers,
	MessageCircle,
	Wrench,
	ExternalLink,
	CloudDownload,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LycanBox } from "@/components/ui/lycan-box";
import { PUBLIC_CONFIG } from "@/lib/public-config";

const systemRequirements = {
	headers: ["Component", "Minimum", "Recommended"],
	rows: [
		{
			component: "CPU",
			icon: <Cpu className="h-4 w-4" />,
			minimum: "Intel Core i3 or equivalent",
			recommended: "Intel Core i5 or better",
		},
		{
			component: "RAM",
			icon: <MemoryStick className="h-4 w-4" />,
			minimum: "4 GB",
			recommended: "8 GB or more",
		},
		{
			component: "GPU",
			icon: <Monitor className="h-4 w-4" />,
			minimum: "GeForce 6600 GT / Radeon X1600",
			recommended: "GeForce 7600 GT / Radeon X1800",
		},
		{
			component: "Storage",
			icon: <HardDrive className="h-4 w-4" />,
			minimum: "30 GB HDD",
			recommended: "30 GB SSD",
		},
		{
			component: "DirectX",
			icon: <Disc className="h-4 w-4" />,
			minimum: "DirectX 9.0c",
			recommended: "DirectX 9.0c",
		},
		{
			component: "OS",
			icon: <Layers className="h-4 w-4" />,
			minimum: "Windows 7 / 10 / 11",
			recommended: "Windows 10 / 11",
		},
	],
};

const installationSteps = [
	"Download the latest release from one of the links above.",
	"Extract the downloaded archive to a location of your choice.",
	"Run the installer and follow the on-screen instructions.",
	"Once installation is complete, launch the application and enjoy!",
];

const usefulTools = [
	{
		name: "DirectX 9.0c",
		description: "Required runtime for the game",
		url: "https://www.microsoft.com/en-us/download/details.aspx?id=35",
	},
	{
		name: ".NET Framework 4.8",
		description: "Required for launcher and tools",
		url: "https://dotnet.microsoft.com/download/dotnet-framework/net48",
	},
	{
		name: "Visual C++ Redistributable",
		description: "Required runtime for the game",
		url: "https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads",
	},
	{
		name: "7-Zip",
		description: "Recommended tool for extracting the downloaded archive",
		url: "https://www.7-zip.org/",
	},
];

export default function DownloadPage() {
	const links = PUBLIC_CONFIG.downloadLinks;

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

				<main className="flex-1 pt-16">
					{/* Hero Section */}
					<section className="relative overflow-hidden py-16">
						{/* Background gradient */}
						<div className="absolute inset-0 bg-gradient-to-b from-[var(--lycan-gold)]/5 via-transparent to-transparent" />

						<div className="container relative mx-auto px-4">
							<div className="flex flex-col items-center text-center">
								<h1 className="font-serif text-4xl font-bold text-[var(--foreground)] md:text-5xl">
									Start Playing
								</h1>
								<p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
									Download the game client and begin your
									adventure in just a few clicks!
								</p>
							</div>
						</div>
					</section>

					{/* Download Links */}
					<section className="container mx-auto px-4 pb-12">
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{links.length > 0 ? (
								links.map((link, index) => (
									<a
										key={index}
										href={link.url}
										className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--lycan-card)] p-6 transition-all hover:border-[var(--lycan-gold)] hover:shadow-lg hover:shadow-[var(--lycan-gold)]/10"
									>
										<div className="flex flex-col items-center text-center">
											<div className="mb-4 rounded-full bg-gradient-to-br from-[var(--lycan-gold)]/20 to-[var(--lycan-orange)]/20 p-4 text-[var(--lycan-gold)] transition-transform group-hover:scale-110">
												<CloudDownload className="h-8 w-8" />
											</div>
											<h3 className="font-serif text-lg font-bold text-[var(--foreground)]">
												{link.name}
											</h3>
											<p className="mt-1 text-sm text-[var(--muted-foreground)]">
												{link.size}
											</p>
											<span className="mt-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[var(--lycan-gold)] to-[var(--lycan-orange)] px-4 py-2 text-sm font-semibold text-[var(--lycan-dark)] transition-transform group-hover:scale-105">
												<Download className="h-4 w-4" />
												Download
											</span>
										</div>
									</a>
								))
							) : (
								<div className="lg:col-span-6 space-y-6">
									{/* Installation Instructions */}
									<LycanBox
										title="Downloads"
										icon={
											<FileArchive className="h-4 w-4" />
										}
									>
										<ol className="space-y-4"></ol>

										<div className="mt-6 rounded-lg border border-[var(--lycan-gold)]/30 bg-[var(--lycan-gold)]/5 p-4">
											<p className="text-sm text-[var(--muted-foreground)]">
												<span className="font-semibold text-[var(--lycan-gold)]">
													Note:
												</span>{" "}
												There is no downloads available
												at the moment.
											</p>
										</div>
									</LycanBox>
								</div>
							)}
						</div>
					</section>

					{/* Main Content Grid */}
					<section className="container mx-auto px-4 pb-16">
						<div className="grid gap-6 lg:grid-cols-3">
							{/* Left Column - Installation Instructions */}
							<div className="lg:col-span-2 space-y-6">
								{/* Installation Instructions */}
								<LycanBox
									title="Installation Instructions"
									icon={<FileArchive className="h-4 w-4" />}
								>
									<ol className="space-y-4">
										{installationSteps.map(
											(step, index) => (
												<li
													key={step}
													className="flex gap-3 text-sm text-[var(--muted-foreground)]"
												>
													<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--lycan-gold)]/15 font-semibold text-[var(--lycan-gold)]">
														{index + 1}
													</span>
													<span>{step}</span>
												</li>
											),
										)}
									</ol>

									<div className="mt-6 rounded-lg border border-[var(--lycan-gold)]/30 bg-[var(--lycan-gold)]/5 p-4">
										<p className="text-sm text-[var(--muted-foreground)]">
											<span className="font-semibold text-[var(--lycan-gold)]">
												Note:
											</span>{" "}
											If you already have the game
											installed, download only the latest
											patch and extract it to your game
											folder, replacing all files.
										</p>
									</div>
								</LycanBox>

								{/* System Requirements */}
								<LycanBox
									title="System Requirements"
									icon={<Monitor className="h-4 w-4" />}
								>
									<div className="overflow-x-auto">
										<table className="w-full">
											<thead>
												<tr className="border-b border-[var(--border)]">
													{systemRequirements.headers.map(
														(header) => (
															<th
																key={header}
																className="px-4 py-3 text-left font-serif text-sm font-bold text-[var(--lycan-gold)]"
															>
																{header}
															</th>
														),
													)}
												</tr>
											</thead>
											<tbody>
												{systemRequirements.rows.map(
													(row, index) => (
														<tr
															key={row.component}
															className={
																index % 2 === 0
																	? "bg-[var(--lycan-card-hover)]/30"
																	: ""
															}
														>
															<td className="px-4 py-3">
																<div className="flex items-center gap-2 text-[var(--foreground)]">
																	<span className="text-[var(--lycan-gold)]">
																		{
																			row.icon
																		}
																	</span>
																	{
																		row.component
																	}
																</div>
															</td>
															<td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">
																{row.minimum}
															</td>
															<td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">
																{
																	row.recommended
																}
															</td>
														</tr>
													),
												)}
											</tbody>
										</table>
									</div>
								</LycanBox>
							</div>

							{/* Right Column - Sidebar */}
							<div className="space-y-6">
								{/* Need Help */}
								<LycanBox
									title="Need Help?"
									icon={<MessageCircle className="h-4 w-4" />}
								>
									<p className="mb-4 text-sm text-[var(--muted-foreground)]">
										Having trouble installing the game?
										Contact our support team for assistance.
									</p>
									<div className="flex flex-col gap-2">
										<a
											href={
												PUBLIC_CONFIG.socials
													.discordLink
											}
											className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[#5865F2] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#5865F2]/90"
											target="_blank"
										>
											<svg
												className="h-5 w-5"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
											</svg>
											Discord Support
										</a>
										<a
											href={
												PUBLIC_CONFIG.socials
													.whatsappLink
											}
											className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[#25D366] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#25D366]/90"
											target="_blank"
										>
											<svg
												className="h-5 w-5"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
											</svg>
											WhatsApp Support
										</a>
									</div>
								</LycanBox>

								{/* Useful Tools */}
								<LycanBox
									title="Useful Tools"
									icon={<Wrench className="h-4 w-4" />}
								>
									<div className="space-y-3">
										{usefulTools.length > 0 ? (
											usefulTools.map((tool) => (
												<a
													key={tool.name}
													href={tool.url}
													target="_blank"
													rel="noopener noreferrer"
													className="group flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--lycan-card-hover)]/30 p-3 transition-all hover:border-[var(--lycan-gold)]/50"
												>
													<div>
														<h4 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--lycan-gold)]">
															{tool.name}
														</h4>
														<p className="text-xs text-[var(--muted-foreground)]">
															{tool.description}
														</p>
													</div>
													<ExternalLink className="h-4 w-4 shrink-0 text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--lycan-gold)]" />
												</a>
											))
										) : (
											<div className="rounded-lg border border-[var(--lycan-gold)]/30 bg-[var(--lycan-gold)]/5 p-4">
												<p className="text-sm text-[var(--muted-foreground)]">
													No useful tools available.
												</p>
											</div>
										)}
									</div>
								</LycanBox>
							</div>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</div>
	);
}
