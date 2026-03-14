"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import checkSession from "@/lib/checkSession";
import deleteSession from "@/lib/deleteSession";
import { useRouter } from "next/navigation";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/downloads", label: "Download" },
	{ href: "/ranking", label: "Rankings" },
	{ href: "/free-silk", label: "Free silk" },
	{ href: "/buy-silk", label: "Buy Silk" },
];

export function Navbar() {
	const [hasToken, setHasToken] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = async () => {
		const result = await deleteSession();		

		console.log("Logout result:", result);
		// Redirigir a la página de inicio después del logout
		if(result.success) {
			setHasToken(false);
			router.push("/");
		}
	}

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const checkSessionStatus = async () => {
			const result = await checkSession();
			setHasToken(result);
		};
		checkSessionStatus();
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				!isScrolled && pathname === "/"
					? "bg-transparent"
					: "bg-[var(--lycan-dark)]/95 shadow-lg backdrop-blur-md border-b border-[var(--border)]"
			}`}
		>
			<nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2">
					<Image
						src="/images/name.png"
						alt="Lycan"
						width={100}
						height={30}
						className="hidden drop-shadow-lg sm:block"
					/>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden items-center gap-6 md:flex">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="font-semibold uppercase text-[var(--foreground)]/80 transition-colors hover:text-[var(--lycan-gold)]"
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* Auth Buttons */}
				{hasToken ? (
					<div
						className={`hidden items-center gap-3 md:flex font-serif`}
					>
						<a
							href="/dashboard"
							className="cursor-pointer rounded-md bg-gradient-to-r from-[var(--lycan-gold)] to-[var(--lycan-orange)] px-4 py-2 text-sm font-bold text-[var(--lycan-dark)] transition-all hover:scale-105"
						>
							Your account
						</a>
						<button
							className="cursor-pointer rounded-md px-4 py-2 text-sm font-bold text-[var(--lycan-gold)] hover:bg-[var(--lycan-gold)]/10 transition-all "
							onClick={handleLogout}
						>
							Logout
						</button>						
					</div>
				) : (
					<div
						className={`hidden items-center gap-3 md:flex font-serif ${
							isScrolled && pathname === "/" && "invisible"
						}`}
					>
						<a
							href="/account"
							className="cursor-pointer rounded-md px-4 py-2 text-sm font-bold text-[var(--lycan-gold)] hover:bg-[var(--lycan-gold)]/10 transition-all "
						>
							Login
						</a>
						<a
							href="/account?mod=register"
							className="cursor-pointer rounded-md bg-gradient-to-r from-[var(--lycan-gold)] to-[var(--lycan-orange)] px-4 py-2 text-sm font-bold text-[var(--lycan-dark)] transition-all hover:scale-105"
						>
							Register
						</a>
					</div>
				)}

				{/* Mobile Menu Button */}
				<button
					type="button"
					className="text-[var(--foreground)] md:hidden"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					aria-label="Toggle menu"
				>
					{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</nav>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="bg-[var(--lycan-dark)]/95 backdrop-blur-md md:hidden">
					<div className="flex flex-col gap-2 px-4 py-4">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="uppercase font-bold rounded-md px-4 py-3 text-[var(--foreground)]/80 transition-colors hover:bg-[var(--lycan-gold)]/10 hover:text-[var(--lycan-gold)]"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{link.label}
							</Link>
						))}
						<div className="mt-4 flex gap-2 border-t border-[var(--border)] pt-4 font-serif">
							<a
								href="/account"
								className="text-center cursor-pointer flex-1 rounded-md border border-[var(--lycan-gold)] py-2 text-[var(--lycan-gold)] font-bold"
							>
								Login
							</a>
							<a
								href="/account?mod=register"
								className="text-center cursor-pointer flex-1 rounded-md bg-gradient-to-r from-[var(--lycan-gold)] to-[var(--lycan-orange)] py-2 font-bold text-[var(--lycan-dark)]"
							>
								Register
							</a>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
