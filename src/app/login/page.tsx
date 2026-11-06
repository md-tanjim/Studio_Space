
"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import {
  MdOutlineMail,
  MdLockOutline,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdArrowForward,
  MdOutlineLock,
} from "react-icons/md";

import { authClient, useSession } from "@/lib/auth-client";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { refetch } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const registerUrl = callbackUrl
    ? `/register?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : "/register";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = {
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
    };

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(user.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email(user);

      if (error || !data) {
        toast.error(error?.message || "Invalid email or password.");
        return;
      }

      toast.success("Signed in successfully!");

      const safeCallbackUrl =
        callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")
          ? callbackUrl
          : "/";

      await refetch();

      window.location.href = safeCallbackUrl;
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async () => {
    try {
      sessionStorage.setItem("showSocialToast", "1");

      const { error } = await authClient.signIn.social({
        provider: "google",
      });

      if (error) {
        sessionStorage.removeItem("showSocialToast");
        toast.error("An error occurred during Google sign-in.");
      }
    } catch {
      sessionStorage.removeItem("showSocialToast");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#f4fbf2] px-4 py-10 dark:bg-[#0e1510]">
      <div className="relative w-full max-w-[410px] overflow-hidden rounded-xl border border-[#e8eee6] bg-white px-7 py-10 shadow-sm sm:px-12 sm:py-12 dark:border-[#2f3731] dark:bg-[#161d18]">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#c8f322]/10 blur-3xl dark:bg-[#c8f322]/[0.08]" />

        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#eef6ee] px-3 py-1 dark:bg-[#243027]">
            <span className="size-2 rounded-full bg-[#c8f322]" />
            <span className="font-label text-[9px] font-bold tracking-wider text-[#456344] dark:text-[#c8f322]">
              MEMBER PORTAL · ACCESS SECURE
            </span>
          </div>

          <h1 className="text-[36px] font-bold leading-tight tracking-tight text-[#161d18] sm:text-[38px] dark:text-[#dde5dc]">
            Welcome Back
          </h1>

          <p className="mt-1 text-sm leading-relaxed text-[#657168] dark:text-[#a5b0a5]">
            Log in to access your creative bookings, studio listings, and
            artist community.
          </p>

          <form onSubmit={onSubmit} className="mt-7 space-y-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-[#161d18] dark:text-[#dde5dc]"
                >
                  Email Address
                </label>

                <span className="text-[9px] font-bold tracking-wider text-[#526055] dark:text-[#a5b0a5]">
                  REQUIRED
                </span>
              </div>

              <div className="flex h-10 items-center gap-3 rounded-md border border-[#8c9d91] bg-[#f0f6ee] px-3 transition focus-within:border-[#8cae28] focus-within:ring-2 focus-within:ring-[#c8f322]/20 dark:border-[#3c4a3e] dark:bg-[#202b23]">
                <MdOutlineMail className="size-[17px] shrink-0 text-[#526e42] dark:text-[#a3d75b]" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="h-full w-full min-w-0 bg-transparent text-xs text-[#161d18] outline-none placeholder:text-[#89948b] dark:text-[#dde5dc]"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-[#161d18] dark:text-[#dde5dc]"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-[10px] font-semibold tracking-wide text-[#426d43] transition hover:text-[#769d12] dark:text-[#c8f322]"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="flex h-10 items-center gap-3 rounded-md border border-[#8c9d91] bg-[#f0f6ee] px-3 transition focus-within:border-[#8cae28] focus-within:ring-2 focus-within:ring-[#c8f322]/20 dark:border-[#3c4a3e] dark:bg-[#202b23]">
                <MdLockOutline className="size-[17px] shrink-0 text-[#526e42] dark:text-[#a3d75b]" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-full w-full min-w-0 bg-transparent text-xs text-[#161d18] outline-none placeholder:text-[#89948b] dark:text-[#dde5dc]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-[#526e42] transition hover:text-[#161d18] dark:text-[#a3d75b]"
                >
                  {showPassword ? (
                    <MdOutlineVisibilityOff className="size-[18px]" />
                  ) : (
                    <MdOutlineVisibility className="size-[18px]" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
              <label className="flex cursor-pointer items-center gap-2 text-[10px] text-[#526055] dark:text-[#b5c0b5]">
                <input
                  type="checkbox"
                  name="remember"
                  className="size-[14px] cursor-pointer accent-[#526e42]"
                />
                Keep atelier session active (30 days)
              </label>

              <div className="flex items-center gap-1 text-[9px] font-semibold tracking-wide text-[#526055] dark:text-[#a5b0a5]">
                <MdOutlineLock className="size-3.5 text-[#526e42] dark:text-[#a3d75b]" />
                256-BIT SSL ENCRYPTION
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#c8f322] text-xs font-bold text-[#293500] shadow-md shadow-[#c8f322]/20 transition hover:bg-[#b9e817] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Log In to StudioSpace"}
              {!loading && <MdArrowForward className="size-[17px]" />}
            </button>

            <div className="flex items-center gap-3 py-0.5">
              <div className="h-px flex-1 bg-[#e4ebe3] dark:bg-[#303b32]" />
              <span className="text-[9px] font-bold tracking-widest text-[#526055] dark:text-[#a5b0a5]">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-[#e4ebe3] dark:bg-[#303b32]" />
            </div>

            <button
              type="button"
              onClick={handleSocialSignIn}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#eef6ee] text-xs font-semibold text-[#161d18] transition hover:bg-[#e3eee2] dark:bg-[#243027] dark:text-[#dde5dc] dark:hover:bg-[#2d3a30]"
            >
              <FcGoogle className="size-[17px]" />
              Continue with Google
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#657168] dark:text-[#a5b0a5]">
            Don&apos;t have an account?{" "}
            <Link
              href={registerUrl}
              className="font-semibold text-[#426d43] transition hover:text-[#769d12] dark:text-[#c8f322]"
            >
              Register ↗
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignInForm
