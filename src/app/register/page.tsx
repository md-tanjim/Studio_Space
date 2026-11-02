
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import {
  MdOutlineMail,
  MdLockOutline,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdArrowForward,
  MdPersonOutline,
  MdOutlineImage,
} from "react-icons/md";

import { authClient, useSession } from "@/lib/auth-client";

const SignUpTemplate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { refetch } = useSession();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
      image: String(formData.get("image") ?? "").trim() || undefined,
    };

    const acceptedTerms = formData.get("terms") === "on";


    if (user.name.length < 3) {
      toast.error("Name must be at least 3 characters.");
      return;
    }


    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(user.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }


    if (user.image) {
      try {
        new URL(user.image);
      } catch {
        toast.error("Please enter a valid photo URL.");
        return;
      }
    }


    if (
      user.password.length < 8 ||
      !/[A-Z]/.test(user.password) ||
      !/[0-9]/.test(user.password)
    ) {
      toast.error(
        "Password must be 8+ characters, with 1 uppercase letter and 1 number."
      );
      return;
    }


    if (!acceptedTerms) {
      toast.error("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email(user);

      if (error || !data) {
        console.error(error);
        toast.error(error?.message || "Unable to create your account.");
        return;
      }

      toast.success("Account created successfully!");

      await refetch();
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    try {
      sessionStorage.setItem("showSocialToast", "1");

      const { error } = await authClient.signIn.social({ provider });

      if (error) {
        sessionStorage.removeItem("showSocialToast");
        toast.error("An error occurred during sign-up.");
      }
    } catch (error) {
      sessionStorage.removeItem("showSocialToast");
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#f4fbf2] px-4 py-8 dark:bg-[#0e1510]">
      <div className="relative w-full max-w-[470px] overflow-hidden rounded-xl border border-[#e8eee6] bg-white px-7 py-10 shadow-sm sm:px-12 sm:py-12 dark:border-[#2f3731] dark:bg-[#161d18]">

     
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#c8f322]/10 blur-3xl dark:bg-[#c8f322]/[0.08]" />

        <div className="relative">


          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#eef6ee] px-3 py-1 dark:bg-[#243027]">
            <span className="size-2 rounded-full bg-[#c8f322]" />
            <span className="font-label text-[9px] font-bold tracking-wider text-[#456344] dark:text-[#c8f322]">
              NEW ARTIST PORTAL · INSTANT ACCESS
            </span>
          </div>


          <h1 className="text-[36px] font-bold leading-[1.12] tracking-tight text-[#161d18] sm:text-[38px] dark:text-[#dde5dc]">
            Create Your
            <br />
            Account
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-[#657168] dark:text-[#a5b0a5]">
            Join StudioSpace and discover creative workspaces.
          </p>

  
          <form onSubmit={onSubmit} className="mt-8 space-y-3.5">

            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-[10px] font-bold tracking-wide text-[#303b32] dark:text-[#dde5dc]"
              >
                FULL NAME
              </label>

              <div className="flex h-10 items-center gap-3 rounded-md border border-[#8c9d91] bg-[#f0f6ee] px-3 transition focus-within:border-[#8cae28] focus-within:ring-2 focus-within:ring-[#c8f322]/20 dark:border-[#3c4a3e] dark:bg-[#202b23]">
                <MdPersonOutline className="size-[17px] shrink-0 text-[#526e42] dark:text-[#a3d75b]" />

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={3}
                  placeholder="e.g., Elena Rossi"
                  autoComplete="name"
                  className="h-full w-full bg-transparent text-xs text-[#161d18] outline-none placeholder:text-[#89948b] dark:text-[#dde5dc]"
                />
              </div>
            </div>

  
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-[10px] font-bold tracking-wide text-[#303b32] dark:text-[#dde5dc]"
              >
                EMAIL ADDRESS
              </label>

              <div className="flex h-10 items-center gap-3 rounded-md border border-[#8c9d91] bg-[#f0f6ee] px-3 transition focus-within:border-[#8cae28] focus-within:ring-2 focus-within:ring-[#c8f322]/20 dark:border-[#3c4a3e] dark:bg-[#202b23]">
                <MdOutlineMail className="size-[17px] shrink-0 text-[#526e42] dark:text-[#a3d75b]" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="elena.rossi@lumina-atelier.com"
                  autoComplete="email"
                  className="h-full w-full bg-transparent text-xs text-[#161d18] outline-none placeholder:text-[#89948b] dark:text-[#dde5dc]"
                />
              </div>
            </div>


            <div>
              <div className="mb-1 flex items-center justify-between gap-2">
                <label
                  htmlFor="image"
                  className="text-[10px] font-bold tracking-wide text-[#303b32] dark:text-[#dde5dc]"
                >
                  PHOTO URL
                </label>

                <span className="text-[9px] font-bold tracking-wide text-[#526055] dark:text-[#a5b0a5]">
                  OPTIONAL PORTFOLIO AVATAR
                </span>
              </div>

              <div className="flex h-10 items-center gap-3 rounded-md border border-[#8c9d91] bg-[#f0f6ee] px-3 transition focus-within:border-[#8cae28] focus-within:ring-2 focus-within:ring-[#c8f322]/20 dark:border-[#3c4a3e] dark:bg-[#202b23]">
                <MdOutlineImage className="size-[17px] shrink-0 text-[#526e42] dark:text-[#a3d75b]" />

                <input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://images.unsplash.com/... (optional avatar URL)"
                  className="h-full w-full min-w-0 bg-transparent text-xs text-[#161d18] outline-none placeholder:text-[#89948b] dark:text-[#dde5dc]"
                />
              </div>
            </div>


            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-[10px] font-bold tracking-wide text-[#303b32] dark:text-[#dde5dc]"
              >
                PASSWORD
              </label>

              <div className="flex h-10 items-center gap-3 rounded-md border border-[#8c9d91] bg-[#f0f6ee] px-3 transition focus-within:border-[#8cae28] focus-within:ring-2 focus-within:ring-[#c8f322]/20 dark:border-[#3c4a3e] dark:bg-[#202b23]">
                <MdLockOutline className="size-[17px] shrink-0 text-[#526e42] dark:text-[#a3d75b]" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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


            <div className="flex items-start gap-2 pt-1">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="mt-0.5 size-[14px] shrink-0 cursor-pointer accent-[#526e42]"
              />

              <label
                htmlFor="terms"
                className="text-[10px] leading-relaxed text-[#526055] dark:text-[#b5c0b5]"
              >
                I agree to the StudioSpace Atelier{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-[#426d43] hover:underline dark:text-[#c8f322]"
                >
                  Terms of Service
                </Link>{" "}
                &amp;{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-[#426d43] hover:underline dark:text-[#c8f322]"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>


            <button
              type="submit"
              disabled={loading}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#c8f322] text-xs font-bold text-[#293500] shadow-md shadow-[#c8f322]/20 transition hover:bg-[#b9e817] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
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
              onClick={() => handleSocialSignIn("google")}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#eef6ee] text-xs font-semibold text-[#161d18] transition hover:bg-[#e3eee2] dark:bg-[#243027] dark:text-[#dde5dc] dark:hover:bg-[#2d3a30]"
            >
              <FcGoogle className="size-[17px]" />
              Continue with Google
            </button>

          </form>

          <p className="mt-6 text-center text-xs text-[#657168] dark:text-[#a5b0a5]">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#426d43] transition hover:text-[#769d12] dark:text-[#c8f322]"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
};

export default SignUpTemplate;
