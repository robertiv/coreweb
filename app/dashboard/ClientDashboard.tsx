"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { LycanBox } from "@/components/ui/lycan-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import deleteSession from "@/lib/deleteSession";
import { notifyAuthStateChanged } from "@/lib/auth-events";
import {
	sendVerificationEmailAction,
	updateEmailAction,
	updatePasswordAction,
} from "./actions";
import {
	User,
	Mail,
	Calendar,
	Clock,
	Settings,
	Shield,
	Gift,
	Star,
	LogOut,
	Key,
	Send,
	CheckCircle,
	AlertCircle,
	AlertTriangle,
} from "lucide-react";

type DashboardActionState = {
	error: string;
	success: string;
	updatedEmail?: string;
};

const initialActionState: DashboardActionState = {
	error: "",
	success: "",
};

export default function ClientDashboard({
	user,
}: {
	user: {
		StrUserID: string;
		Email: string;
		CertificateNum: number;
		RegDate: string;
		Role: number;
		Silk: number;
		SilkGift: number;
		JobPoints: number;
		LastLogin: string;
	};
}) {
	const router = useRouter();
	const [activeSection, setActiveSection] = useState("info");
	const [email, setEmail] = useState(user.Email);
	const [logoutError, setLogoutError] = useState("");
	const [isLogoutPending, setIsLogoutPending] = useState(false);
	const [isEmailVerified] = useState(user.CertificateNum > 0);
	const [emailState, emailFormAction, isEmailPending] = useActionState(
		updateEmailAction,
		initialActionState,
	);
	const [passwordState, passwordFormAction, isPasswordPending] = useActionState(
		updatePasswordAction,
		initialActionState,
	);
	const [verificationState, verificationFormAction, isVerificationPending] =
		useActionState(sendVerificationEmailAction, initialActionState);

	useEffect(() => {
		if (emailState.updatedEmail) {
			setEmail(emailState.updatedEmail);
		}
	}, [emailState.updatedEmail]);

	const handleLogoutNow = async () => {
		setLogoutError("");
		setIsLogoutPending(true);

		const result = await deleteSession();

		if (result?.success) {
			notifyAuthStateChanged(false);
			router.refresh();
			router.push("/");
			return;
		}

		setLogoutError(
			result?.message || "Unable to logout right now. Please try again.",
		);
		setIsLogoutPending(false);
	};

	const menuItems = [
		{
			id: "info",
			label: "Account Info",
			icon: <User className="h-4 w-4" />,
		},
		{
			id: "settings",
			label: "Settings",
			icon: <Settings className="h-4 w-4" />,
		},
		{
			id: "donation",
			label: "Donation History",
			icon: <Gift className="h-4 w-4" />,
		},
		{
			id: "password",
			label: "Change Password",
			icon: <Key className="h-4 w-4" />,
		},
		{ id: "logout", label: "Logout", icon: <LogOut className="h-4 w-4" /> },
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
				<main className="flex-1 py-16">
					<div className="container mx-auto px-4">
						<div className="flex flex-col items-center text-center py-10">
							<h1 className="font-serif text-2xl font-bold text-[var(--foreground)] md:text-3xl">
								Welcome{" "}
								<span className="text-4xl text-[var(--lycan-gold)]">
									{user.StrUserID}!
								</span>
							</h1>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
							{/* Sidebar */}
							<div className="lg:col-span-4 space-y-6">
								{/* Account Values */}
								<LycanBox
									title="ACCOUNT VALUES"
									icon={<User className="h-4 w-4" />}
								>
									<div className="space-y-3 font-serif">
										<div className="flex items-center justify-between p-3 rounded-lg bg-[var(--lycan-card)]/50">
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
												{user.Silk}
											</span>
										</div>

										<div className="flex items-center justify-between p-3 rounded-lg bg-[var(--lycan-card)]/50">
											<div className="flex items-center gap-2">
												<div className="w-8 h-8 rounded-full bg-[var(--lycan-orange)]/20 flex items-center justify-center">
													<Gift className="h-4 w-4 text-[var(--lycan-orange)]" />
												</div>
												<span className="text-sm font-medium">
													Gift Silk
												</span>
											</div>
											<span className="font-bold text-[var(--lycan-orange)]">
												{user.SilkGift}
											</span>
										</div>

										<div className="flex items-center justify-between p-3 rounded-lg bg-[var(--lycan-card)]/50">
											<div className="flex items-center gap-2">
												<div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
													<Star className="h-4 w-4 text-purple-400" />
												</div>
												<span className="text-sm font-medium">
													Job Points
												</span>
											</div>
											<span className="font-bold text-purple-400">
												{user.JobPoints}
											</span>
										</div>
									</div>
								</LycanBox>

								{/* Navigation Menu */}
								<LycanBox
									title="ACCOUNT MENU"
									icon={<User className="h-4 w-4" />}
								>
									<nav className="space-y-1">
										{menuItems.map((item) => (
											<button
												key={item.id}
												onClick={() =>
													setActiveSection(item.id)
												}
												className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
													activeSection === item.id
														? "bg-[var(--lycan-gold)]/20 text-[var(--lycan-gold)] border border-[var(--lycan-gold)]/30"
														: "text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-[var(--lycan-card)]/50"
												}`}
											>
												{item.icon}
												<span className="text-sm font-medium font-serif">
													{item.label}
												</span>
											</button>
										))}
									</nav>
								</LycanBox>
							</div>

							{/* Main Content */}
							<div className="lg:col-span-8">
								{activeSection === "info" && (
									<LycanBox
										title="ACCOUNT INFORMATION"
										icon={<User className="h-4 w-4" />}
									>
										<div className="space-y-6">
											<div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
												<div className="flex items-start gap-3">
													<AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
													<div>
														<h4 className="font-semibold text-yellow-500">
															Security Notice
														</h4>
														<p className="text-sm text-[var(--muted-foreground)] mt-1">
															Your account
															information is
															secure. Always keep
															your password
															private and never
															share it with
															anyone.
														</p>
													</div>
												</div>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												<div className="space-y-2">
													<Label className="text-sm font-medium text-[var(--muted-foreground)]">
														Username
													</Label>
													<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--lycan-card)]/50">
														<User className="h-4 w-4 text-[var(--lycan-gold)]" />
														<span className="font-medium">
															{user.StrUserID}
														</span>
													</div>
												</div>

												<div className="space-y-2">
													<Label className="text-sm font-medium text-[var(--muted-foreground)]">
														Email Address
													</Label>
													<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--lycan-card)]/50">
														<Mail className="h-4 w-4 text-[var(--lycan-gold)]" />
														<span className="font-medium">
															{user.Email}
														</span>
														{isEmailVerified && (
															<CheckCircle className="h-4 w-4 text-green-500" />
														)}
													</div>
												</div>

												<div className="space-y-2">
													<Label className="text-sm font-medium text-[var(--muted-foreground)]">
														Date Joined
													</Label>
													<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--lycan-card)]/50">
														<Calendar className="h-4 w-4 text-[var(--lycan-gold)]" />
														<span className="font-medium">
															{user.RegDate}
														</span>
													</div>
												</div>

												<div className="space-y-2">
													<Label className="text-sm font-medium text-[var(--muted-foreground)]">
														Last Login
													</Label>
													<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--lycan-card)]/50">
														<Clock className="h-4 w-4 text-[var(--lycan-gold)]" />
														<span className="font-medium">
															{user.LastLogin}
														</span>
													</div>
												</div>
											</div>
										</div>
									</LycanBox>
								)}

								{activeSection === "settings" && (
									<LycanBox
										title="ACCOUNT SETTINGS"
										icon={<User className="h-4 w-4" />}
									>
										<div className="space-y-6">
											{/* Email Settings */}
											<div className="space-y-4">
												<h3 className="text-lg font-semibold text-[var(--lycan-gold)]">
													Email Settings
												</h3>

												<div>
													{emailState.error && (
														<>
															<h4 className="font-semibold text-red-500">
																Error:
															</h4>
															<p className="text-sm text-[var(--muted-foreground)] mt-1">
																{emailState.error}
															</p>
														</>
													)}
													{emailState.success && (
														<>
															<h4 className="font-semibold text-green-500">
																Success:
															</h4>
															<p className="text-sm text-[var(--muted-foreground)] mt-1">
																{emailState.success}
															</p>
														</>
													)}
													{verificationState.error && (
														<p className="text-sm text-red-400 mt-2">{verificationState.error}</p>
													)}
													{verificationState.success && (
														<p className="text-sm text-green-400 mt-2">{verificationState.success}</p>
													)}
												</div>

												<form action={emailFormAction} className="space-y-2">
													<Label htmlFor="email">
														Email Address
													</Label>
													<div className="flex gap-2">
														<Input
															id="email"
															name="newEmail"
															type="email"
															value={email}
															onChange={(e) =>
																setEmail(
																	e.target
																		.value,
																)
															}
															className="flex-1"
														/>
														<Button
															type="submit"
															disabled={isEmailPending}
															className="bg-[var(--lycan-gold)] hover:bg-[var(--lycan-gold-light)] text-black"
														>
															{isEmailPending ? "Updating..." : "Update"}
														</Button>
													</div>
												</form>

												<div className="flex items-center justify-between p-4 rounded-lg bg-[var(--lycan-card)]/50">
													<div className="flex items-center gap-3">
														<Mail className="h-5 w-5 text-[var(--lycan-gold)]" />
														<div>
															<p className="font-medium">
																Email
																Verification
															</p>
															<p className="text-sm text-[var(--muted-foreground)]">
																{isEmailVerified
																	? "Your email is verified"
																	: "Verify your email for security"}
															</p>
														</div>
													</div>
												<form action={verificationFormAction}>
													<input type="hidden" name="email" value={email} />
													<input
														type="hidden"
														name="username"
														value={user.StrUserID}
													/>
													<Button
														type="submit"
														variant={isEmailVerified ? "secondary" : "default"}
														className={
															isEmailVerified
																? ""
																: "bg-[var(--lycan-gold)] hover:bg-[var(--lycan-gold-light)] text-black"
														}
														disabled={isVerificationPending || isEmailVerified}
													>
														{isVerificationPending ? (
															<>
																<Send className="h-4 w-4 mr-2 animate-spin" />
																Sending...
															</>
														) : isEmailVerified ? (
															<>
																<CheckCircle className="h-4 w-4 mr-2" />
																Verified
															</>
														) : (
															<>
																<Send className="h-4 w-4 mr-2" />
																Send Verification
															</>
														)}
													</Button>
												</form>
												</div>
											</div>
										</div>
									</LycanBox>
								)}

								{activeSection === "password" && (
									<LycanBox
										title="CHANGE PASSWORD"
										icon={<User className="h-4 w-4" />}
									>
										<div className="space-y-6">
											<div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
												<div className="flex items-start gap-3">
													<Shield className="h-5 w-5 text-blue-500 mt-0.5" />
													<div>
														<h4 className="font-semibold text-blue-500">
															Password Security
														</h4>
														<p className="text-sm text-[var(--muted-foreground)] mt-1">
															Use a strong
															password with at
															least 8 characters,
															including uppercase,
															lowercase, numbers,
															and symbols.
														</p>
													</div>
												</div>
											</div>
											{passwordState.error && (
												<div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
													<div className="flex items-start gap-3">
														<AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
														<div>
															<h4 className="font-semibold text-red-500">
																Error:
															</h4>
															<p className="text-sm text-[var(--muted-foreground)] mt-1">
																{passwordState.error}
															</p>
														</div>
													</div>
												</div>
											)}
											{passwordState.success && (
												<div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
													<div className="flex items-start gap-3">
														<CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
														<div>
															<h4 className="font-semibold text-green-500">
																Success:
															</h4>
															<p className="text-sm text-[var(--muted-foreground)] mt-1">
																{passwordState.success}
															</p>
														</div>
													</div>
												</div>
											)}
											<form action={passwordFormAction} className="space-y-4">
												<div className="space-y-2">
													<Label htmlFor="current-pass">
														Current Password
													</Label>
													<Input
														id="current-pass"
														name="currentPassword"
														type="password"
														placeholder="Enter your current password"
													/>
												</div>

												<div className="space-y-2">
													<Label htmlFor="new-pass">
														New Password
													</Label>
													<Input
														id="new-pass"
														name="newPassword"
														type="password"
														placeholder="Enter your new password"
													/>
												</div>

												<div className="space-y-2">
													<Label htmlFor="confirm-new-pass">
														Confirm New Password
													</Label>
													<Input
														id="confirm-new-pass"
														name="confirmNewPassword"
														type="password"
														placeholder="Confirm your new password"
													/>
												</div>

												<div className="flex gap-3">
													<Button
														type="submit"
														disabled={isPasswordPending}
														className="bg-[var(--lycan-gold)] hover:bg-[var(--lycan-gold-light)] text-black"
													>
														{isPasswordPending ? "Changing..." : "Change Password"}
													</Button>
													<Button type="button" variant="secondary">
														Cancel
													</Button>
												</div>
											</form>
										</div>
									</LycanBox>
								)}

								{activeSection === "logout" && (
									<LycanBox
										title="LOGOUT"
										icon={<User className="h-4 w-4" />}
									>
										<div className="space-y-6">
											<div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
												<div className="flex items-start gap-3">
													<AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
													<div>
														<h4 className="font-semibold text-red-500">
															Confirm Logout
														</h4>
														<p className="text-sm text-[var(--muted-foreground)] mt-1">
															Are you sure you
															want to logout? You
															will need to enter
															your credentials
															again to access your
															account.
														</p>
													</div>
												</div>
											</div>

											<div className="space-y-4">
												<p className="text-[var(--foreground)]">
													Logging out will securely
													end your current session and
													clear any stored
													authentication data.
												</p>

												{logoutError && (
													<div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
														<p className="text-sm text-red-300">{logoutError}</p>
													</div>
												)}

												<div className="flex gap-3">
													<Button
														variant="destructive"
														onClick={handleLogoutNow}
														disabled={isLogoutPending}
													>
														<LogOut className="h-4 w-4 mr-2" />
														{isLogoutPending ? "Logging out..." : "Logout Now"}
													</Button>
													<Button
														variant="secondary"
														type="button"
														onClick={() => setActiveSection("info")}
													>
														Cancel
													</Button>
												</div>
											</div>
										</div>
									</LycanBox>
								)}

								{activeSection === "vip" && (
									<LycanBox
										title="VIP MEMBERSHIP"
										icon={<User className="h-4 w-4" />}
									>
										<div className="space-y-6">
											<div className="text-center py-8">
												<div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 mb-4">
													<div className="w-full h-full rounded-full bg-[var(--lycan-dark)] flex items-center justify-center">
														<Star className="h-12 w-12 text-purple-400" />
													</div>
												</div>
												<h3 className="text-2xl font-bold text-[var(--lycan-gold)] mb-2">
													VIP Member
												</h3>
												<p className="text-[var(--muted-foreground)]">
													Enjoy exclusive benefits and
													rewards
												</p>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="p-4 rounded-lg bg-[var(--lycan-card)]/50">
													<h4 className="font-semibold text-purple-400 mb-2">
														Current Tier
													</h4>
													<p className="text-2xl font-bold text-[var(--foreground)]">
														Gold VIP
													</p>
												</div>
												<div className="p-4 rounded-lg bg-[var(--lycan-card)]/50">
													<h4 className="font-semibold text-purple-400 mb-2">
														Points Balance
													</h4>
													<p className="text-2xl font-bold text-purple-400">
														2,750
													</p>
												</div>
											</div>
										</div>
									</LycanBox>
								)}

								{activeSection === "donation" && (
									<LycanBox
										title="DONATION HISTORY"
										icon={<User className="h-4 w-4" />}
									>
										<div className="space-y-6">
											<div className="text-center py-8">
												<Gift className="h-16 w-16 text-[var(--lycan-orange)] mx-auto mb-4" />
												<h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
													Your Donation History
												</h3>
												<p className="text-[var(--muted-foreground)]">
													View and manage your past
													donations
												</p>
											</div>

											<div className="space-y-3">
												<div className="p-4 rounded-lg bg-[var(--lycan-card)]/50">
													<div className="flex items-center justify-between">
														<div>
															<p className="font-medium">
																Silk Purchase
															</p>
															<p className="text-sm text-[var(--muted-foreground)]">
																January 20, 2024
															</p>
														</div>
														<Badge className="bg-[var(--lycan-gold)] text-black">
															+500 Silk
														</Badge>
													</div>
												</div>

												<div className="p-4 rounded-lg bg-[var(--lycan-card)]/50">
													<div className="flex items-center justify-between">
														<div>
															<p className="font-medium">
																VIP Membership
															</p>
															<p className="text-sm text-[var(--muted-foreground)]">
																January 15, 2024
															</p>
														</div>
														<Badge className="bg-purple-500 text-white">
															VIP Access
														</Badge>
													</div>
												</div>
											</div>
										</div>
									</LycanBox>
								)}
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
