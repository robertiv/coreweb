
export const PUBLIC_CONFIG = {
	serverName: "LycanSRO",
    rankingCacheSeconds: 300,
	socials: {
		discordLink: "https://discord.gg/lycan",
		whatsappLink: "#",
		facebookLink: "#",
		twitterLink: "#",
        youtubeLink: "#",
	},	
	downloadLinks: [
		{ name: "Google Drive", url: "#", size: "2.8 GB" },
		{ name: "Mega.NZ", url: "#", size: "2.8 GB" },
		{ name: "MediaFire", url: "#", size: "2.8 GB" },
		{ name: "Direct Link", url: "#", size: "2.8 GB" },
	],
	fortressWar: [
		{ id: 1, name: "Jangan Fortress", enabled: true },
		{ id: 3, name: "Bandit Fortress", enabled: false },
		{ id: 6, name: "Hotan Fortress", enabled: false },
	],
} as const;
