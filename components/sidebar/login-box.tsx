"use client";

import type React from "react";
import { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff, LogIn, UserPlus, User, Gift, Star } from "lucide-react";
import { LycanBox } from "@/components/ui/lycan-box";
import { loginAction, type AccountActionState } from "@/app/account/actions";
import { AUTH_STATE_CHANGED_EVENT } from "@/lib/auth-events";
import { getClientSession } from "@/lib/checkSession";

export function LoginBox() {
	const initialActionState: AccountActionState = {
		error: "",
		success: "",
	};

	const [hasToken, setHasToken] = useState(false);
	const [accountName, setAccountName] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginState, loginFormAction] = useActionState(
		loginAction,
		initialActionState,
	);

	// TODO: Replace hardcoded account summary with real user data when authenticated.

	useEffect(() => {
		const syncSessionStatus = () => {
			const session = getClientSession();
			setHasToken(session.authenticated);
			setAccountName(session.userId);
		};

		const handleAuthStateChanged = (event: Event) => {
			const authEvent = event as CustomEvent<{ authenticated?: boolean }>;
			const authenticated = Boolean(authEvent.detail?.authenticated);
			setHasToken(authenticated);

			if (!authenticated) {
				setAccountName("");
				return;
			}

			syncSessionStatus();
		};

		syncSessionStatus();
		window.addEventListener(
			AUTH_STATE_CHANGED_EVENT,
			handleAuthStateChanged,
		);

		return () => {
			window.removeEventListener(
				AUTH_STATE_CHANGED_EVENT,
				handleAuthStateChanged,
			);
		};
	}, []);

	return (
		<LycanBox
			title="Account"
			icon={<User className="h-4 w-4" />}
			contentClassName="p-0"
		>
			{hasToken ? (
				<>
					<h1 className="p-4 font-serif text-sm font-bold text-[var(--foreground)] md:text-sm">
						Welcome back{" "}
						<span className="text-lg text-[var(--lycan-gold)]">
							{accountName || "player"}!
						</span>
					</h1>
					<div className="space-y-1 font-serif">
						<div className="flex items-center justify-between px-3 rounded-lg bg-[var(--lycan-card)]/50">
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 rounded-full bg-[var(--lycan-gold)]/20 flex items-center justify-center">
									<span className="text-xs font-bold text-[var(--lycan-gold)]">
										S
									</span>
								</div>
								<span className="text-sm font-medium">
									Silk
								</span>
							</div>
							<span className="font-bold text-[var(--lycan-gold)]">
								1250
							</span>
						</div>

						<div className="flex items-center justify-between px-3 rounded-lg bg-[var(--lycan-card)]/50">
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 rounded-full bg-[var(--lycan-orange)]/20 flex items-center justify-center">
									<Gift className="h-4 w-4 text-[var(--lycan-orange)]" />
								</div>
								<span className="text-sm font-medium">
									Gift Silk
								</span>
							</div>
							<span className="font-bold text-[var(--lycan-orange)]">
								500
							</span>
						</div>

						<div className="flex items-center justify-between px-3 pb-3 rounded-lg bg-[var(--lycan-card)]/50">
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
									<Star className="h-4 w-4 text-purple-400" />
								</div>
								<span className="text-sm font-medium">
									Job Points
								</span>
							</div>
							<span className="font-bold text-purple-400">
								2750
							</span>
						</div>

						<a
							href="/account?mod=register"
							type="button"
							className="flex w-full/20 mx-3 my-2 items-center justify-center gap-2 rounded-md border border-[var(--lycan-gold)] bg-transparent py-2 text-sm font-medium text-[var(--lycan-gold)] transition-all hover:bg-[var(--lycan-gold)]/10"
						>
							<UserPlus size={16} />
							Dashboard
						</a>
					</div>
				</>
			) : (
				<>
					{loginState.error && (
						<div className="m-4 rounded-lg border border-[var(--lycan-gold)]/30 bg-[var(--lycan-gold)]/5 p-3">
							<p className="text-sm text-[var(--muted-foreground)]">
								<span className="font-semibold text-[#a80000]">
									Error:
								</span>{" "}
								{loginState.error}
							</p>
						</div>
					)}

					<form action={loginFormAction} className="space-y-3 p-4">
						<input type="hidden" name="from" value="/dashboard" />
						{/* Username */}
						<div>
							<input
								type="text"
								name="username"
								placeholder="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="w-full rounded-md border border-[var(--border)] bg-[var(--input)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--lycan-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--lycan-gold)]"
							/>
						</div>

						{/* Password */}
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full rounded-md border border-[var(--border)] bg-[var(--input)] px-3 py-2 pr-10 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--lycan-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--lycan-gold)]"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
								aria-label={
									showPassword
										? "Hide password"
										: "Show password"
								}
							>
								{showPassword ? (
									<EyeOff size={16} />
								) : (
									<Eye size={16} />
								)}
							</button>
						</div>

						{/* Login Button */}
						<button
							type="submit"
							className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[var(--lycan-gold)] to-[var(--lycan-orange)] py-2 text-sm font-semibold text-[var(--lycan-dark)] transition-all hover:scale-[1.02] hover:shadow-md"
						>
							<LogIn size={16} />
							Login
						</button>

						{/* Register Link */}
						<a
							href="/account?mod=register"
							type="button"
							className="flex w-full items-center justify-center gap-2 rounded-md border border-[var(--lycan-gold)] bg-transparent py-2 text-sm font-medium text-[var(--lycan-gold)] transition-all hover:bg-[var(--lycan-gold)]/10"
						>
							<UserPlus size={16} />
							Create Account
						</a>

						{/* Forgot Password */}
						<p className="text-center text-xs text-[var(--muted-foreground)]">
							<a
								href="#forgot"
								className="hover:text-[var(--lycan-gold)] hover:underline"
							>
								Forgot your password?
							</a>
						</p>
					</form>
				</>
			)}
		</LycanBox>
	);
}
