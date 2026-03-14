"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, User, Lock, Mail, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import loginUser from "@/lib/loginUser";

export default function AccountPage() {
	const [mode, setMode] = useState<"login" | "register">("login");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const router = useRouter();
	const searchParams = useSearchParams();
	const urlerror = searchParams.get("error");
	const modtype = searchParams.get("mod");
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	if(modtype === "register" && mode !== "register") {
		setMode("register");
	}
	if(modtype === "login" && mode !== "login") {
		setMode("login");
	}
	//urlerror === "not_authorized" && setError("You must be logged in to access that page.");
	//urlerror === "session_expired" && setError("Your session has expired. Please log in again.");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleLoginSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission

		// where is the user coming from
		const from = searchParams.get("from");

		setError(""); //restart state.
		setSuccess("");

		const loginResult = await loginUser({
			userId: formData.username,
			password: formData.password,
		});

		//console.log("Login result:", loginResult);
		if(loginResult.error) {
			setError(loginResult.error);
			return;
		}

		if(loginResult.success) {
			router.push(from || "/dashboard");
		}		
	};

	const handleRegisterSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(""); //restart state.
		setSuccess("");

		// //// TERMINAR EL CODIGO DEL REGISTER
		// /// DE AQUI PA ABAJO

		try {
			const res = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include", // 🔥 importante para cookies
				body: JSON.stringify({
					userId: formData.username,
					password: formData.password,
					email: formData.email,
					confirmPassword: formData.confirmPassword,					
				}),
			});

			// 	// console.log(
			// 	// 	"Form submitted:",
			// 	// 	formData.username,
			// 	// 	formData.password,
			// 	// );
			// 	// TERMINAR EL CODIGO DEL LOGIN (REVISAR COMO FUNCIONAN LOS OTROS LLAMADOS A LA API)
			// 	// COMO POR EJEMPLO LA PAGINA DE CHARS/[NAME] QUE HACE LLAMADO DESDE EL FRONT.
			const data = await res.json();

			if (!res.ok) {
				setError(
					data.error ||
						"An error ocurred when creating your account. Please try again and if the error continues, please report to admin.",
				);
				return;
			}

			// 	// Si registro es exitoso
			if (data.success) {
				setSuccess(
					"Your account has been created succesfully! You can login now in your dashboard and ingame.",
				);
			}
			// 	//router.push("/login");
		} catch (err) {
			setError(
				String(err) ||
					"An error ocurred when creating your account. Please try again and if the error continues, please report to admin.",
			);
		}
	};

	return (
		<div className="min-h-screen">
			<Navbar />

			<main className="flex flex-1 pt-16">
				{/* Left Side - Background Image */}
				<div className="relative hidden w-1/2 lg:block">
					<div className="absolute inset-0">
						<Image
							src="/images/registerbg.png"
							alt="Lycan Online"
							fill
							className="object-cover"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--lycan-dark)]" />
					</div>

					{/* Logo and text overlay */}
					<div className="relative z-10 flex h-full flex-col items-center justify-center p-12">
						<Image
							src="/images/logo.png"
							alt="Lycan Online"
							width={300}
							height={200}
							className="mb-8 drop-shadow-2xl"
						/>
						<h2 className="font-serif text-3xl font-bold text-[var(--foreground)] text-glow">
							Unleash Your Inner Beast
						</h2>
						<p className="mt-4 max-w-md text-center text-[var(--muted-foreground)]">
							Join thousands of players in the ultimate
							experience. Battle, trade, and conquer!
						</p>
					</div>
				</div>

				{/* Right Side - Form */}
				<div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:px-12">
					{/* Mobile logo */}
					<div className="mb-8 lg:hidden">
						<Image
							src="/images/logo.png"
							alt="Lycan Online"
							width={200}
							height={133}
							className="drop-shadow-xl"
						/>
					</div>

					{/* Form Container */}
					<div className="w-full max-w-md">
						{/* Back to home link */}
						<Link
							href="/"
							className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--lycan-gold)]"
						>
							<ArrowLeft className="h-4 w-4" />
							Back to Home
						</Link>

						{/* Form Header */}
						<div className="mb-8">
							<h1 className="font-serif text-3xl font-bold text-[var(--foreground)]">
								{mode === "login"
									? "Welcome Back"
									: "Create Account"}
							</h1>
							<p className="mt-2 text-[var(--muted-foreground)]">
								{mode === "login"
									? "Sign in to continue your adventure"
									: "Join us and start your journey"}
							</p>
						</div>

						{/* Toggle Tabs */}
						<div className="mb-8 flex overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--lycan-card)]">
							<button
								type="button"
								onClick={() => setMode("login")}
								className={`flex-1 py-3 text-sm font-semibold transition-all ${
									mode === "login"
										? "bg-gradient-to-r from-[var(--lycan-gold)] to-[var(--lycan-orange)] text-[var(--lycan-dark)]"
										: "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
								}`}
							>
								Login
							</button>
							<button
								type="button"
								onClick={() => setMode("register")}
								className={`flex-1 py-3 text-sm font-semibold transition-all ${
									mode === "register"
										? "bg-gradient-to-r from-[var(--lycan-gold)] to-[var(--lycan-orange)] text-[var(--lycan-dark)]"
										: "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
								}`}
							>
								Register
							</button>
						</div>

						{/* Form */}
						<form
							onSubmit={
								mode === "login"
									? handleLoginSubmit
									: handleRegisterSubmit
							}
							className="space-y-5"
						>
							{/* Username */}
							<div>
								{(error || urlerror) && (
									<div className="my-6 rounded-lg border border-[var(--lycan-gold)]/30 bg-[var(--lycan-gold)]/5 p-4">
										<p className="text-sm text-[var(--muted-foreground)]">
											<span className="font-semibold text-[#a80000]">
												Error:
											</span>{" "}
											{error ||
												(urlerror === "not_authorized"
													? "You must be logged in to access that page."
													: urlerror ===
														  "session_expired"
														? "Your session has expired. Please log in again."
														: "")}
										</p>
									</div>
								)}
								{success && (
									<div className="my-6 rounded-lg border border-[var(--lycan-gold)]/30 bg-[var(--lycan-gold)]/5 p-4">
										<p className="text-sm text-[#00a865]">
											<span className="font-bold text-[var(--lycan-gold)]">
												Success:
											</span>{" "}
											{success}
										</p>
									</div>
								)}
								<label
									htmlFor="username"
									className="mb-2 block text-sm font-medium text-[var(--foreground)]"
								>
									UserID
								</label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted-foreground)]" />
									<input
										type="text"
										id="username"
										name="username"
										value={formData.username}
										onChange={handleInputChange}
										placeholder="Enter your username"
										className="w-full rounded-lg border border-[var(--border)] bg-[var(--lycan-card)] py-3 pl-10 pr-4 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--lycan-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--lycan-gold)]"
										required
									/>
								</div>
							</div>

							{/* Email - Only for Register */}
							{mode === "register" && (
								<div>
									<label
										htmlFor="email"
										className="mb-2 block text-sm font-medium text-[var(--foreground)]"
									>
										Email
									</label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted-foreground)]" />
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											placeholder="Enter your email"
											className="w-full rounded-lg border border-[var(--border)] bg-[var(--lycan-card)] py-3 pl-10 pr-4 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--lycan-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--lycan-gold)]"
											required
										/>
									</div>
								</div>
							)}

							{/* Password */}
							<div>
								<label
									htmlFor="password"
									className="mb-2 block text-sm font-medium text-[var(--foreground)]"
								>
									Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted-foreground)]" />
									<input
										type={
											showPassword ? "text" : "password"
										}
										id="password"
										name="password"
										value={formData.password}
										onChange={handleInputChange}
										placeholder="Enter your password"
										className="w-full rounded-lg border border-[var(--border)] bg-[var(--lycan-card)] py-3 pl-10 pr-12 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--lycan-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--lycan-gold)]"
										minLength={6}
										required
									/>
									<button
										type="button"
										onClick={() =>
											setShowPassword(!showPassword)
										}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
										aria-label={
											showPassword
												? "Hide password"
												: "Show password"
										}
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
									</button>
								</div>
							</div>

							{/* Confirm Password - Only for Register */}
							{mode === "register" && (
								<div>
									<label
										htmlFor="confirmPassword"
										className="mb-2 block text-sm font-medium text-[var(--foreground)]"
									>
										Confirm Password
									</label>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted-foreground)]" />
										<input
											type={
												showConfirmPassword
													? "text"
													: "password"
											}
											id="confirmPassword"
											name="confirmPassword"
											value={formData.confirmPassword}
											onChange={handleInputChange}
											placeholder="Confirm your password"
											className="w-full rounded-lg border border-[var(--border)] bg-[var(--lycan-card)] py-3 pl-10 pr-12 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--lycan-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--lycan-gold)]"
											minLength={6}
											required
										/>
										<button
											type="button"
											onClick={() =>
												setShowConfirmPassword(
													!showConfirmPassword,
												)
											}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
											aria-label={
												showConfirmPassword
													? "Hide password"
													: "Show password"
											}
										>
											{showConfirmPassword ? (
												<EyeOff className="h-5 w-5" />
											) : (
												<Eye className="h-5 w-5" />
											)}
										</button>
									</div>
								</div>
							)}

							{/* Remember me / Forgot password - Only for Login */}
							{mode === "login" && (
								<div className="flex items-center justify-between">
									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											className="h-4 w-4 rounded border-[var(--border)] bg-[var(--lycan-card)] text-[var(--lycan-gold)] focus:ring-[var(--lycan-gold)]"
										/>
										<span className="text-sm text-[var(--muted-foreground)]">
											Remember me
										</span>
									</label>
									<Link
										href="/forgot-password"
										className="text-sm text-[var(--lycan-gold)] hover:underline"
									>
										Forgot password?
									</Link>
								</div>
							)}

							{/* Terms - Only for Register */}
							{mode === "register" && (
								<label className="flex items-start gap-2">
									<input
										type="checkbox"
										className="mt-1 h-4 w-4 rounded border-[var(--border)] bg-[var(--lycan-card)] text-[var(--lycan-gold)] focus:ring-[var(--lycan-gold)]"
										required
									/>
									<span className="text-sm text-[var(--muted-foreground)]">
										I agree to the{" "}
										<Link
											href="/terms"
											className="text-[var(--lycan-gold)] hover:underline"
										>
											Terms of Service
										</Link>{" "}
										and{" "}
										<Link
											href="/privacy"
											className="text-[var(--lycan-gold)] hover:underline"
										>
											Privacy Policy
										</Link>
									</span>
								</label>
							)}

							{/* Submit Button */}
							<button
								type="submit"
								className="glow-gold w-full rounded-lg bg-gradient-to-r from-[var(--lycan-gold)] to-[var(--lycan-orange)] py-3 font-serif font-bold text-[var(--lycan-dark)] transition-all hover:scale-[1.02] hover:shadow-lg"
							>
								{mode === "login"
									? "Sign In"
									: "Create Account"}
							</button>
						</form>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
