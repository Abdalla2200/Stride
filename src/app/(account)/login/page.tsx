"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import loginImage from "@/assets/login-image.png";
import { loginUserAction } from "@/actions/auth";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { useToast } from "@/components/UI/ToastProvider";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormData) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const result = await loginUserAction(values);

      if (result?.status === "error") {
        setServerError(result.message);
      } else if (result?.status === "success") {
        showToast("You're now signed in");
        router.push("/cart");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-dvh bg-[#f8f7f4] md:grid-cols-[45%_55%]">
      <aside className="relative min-h-136 overflow-hidden lg:min-h-dvh hidden md:block">
        <Image
          src={loginImage}
          alt="A man in a dark tailored outfit"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
        <div className="absolute inset-0 bg-black/25" />
        <Link
          href="/"
          className="absolute left-8 top-8 text-sm font-bold tracking-tight text-white sm:left-10 sm:top-10"
        >
          STRIDE
        </Link>
        <p className="absolute bottom-8 left-8 max-w-60 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:bottom-12 sm:left-10 sm:text-5xl">
          The modern
          <br />
          standard.
        </p>
      </aside>

      <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold  text-stone-900 sm:text-3xl">
            Sign in to continue shopping.
          </h1>
          {serverError && (
            <div
              role="alert"
              className="mt-5 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600"
            >
              {serverError}
            </div>
          )}
          <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-[10px] font-medium tracking-wider text-stone-600">
                EMAIL
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your@email.com"
                  // value="testingEmail@abc.com"
                  autoComplete="email"
                  className="mt-1.5 w-full rounded-md border border-stone-200 bg-white px-3 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-700 focus:ring-2 focus:ring-stone-300 placeholder:text-stone-400"
                />
              </label>
              {errors.email?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-[10px] font-medium tracking-wider text-stone-600">
                PASSWORD
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  // value="12345678"
                  autoComplete="current-password"
                  className="mt-1.5 w-full rounded-md border border-stone-200 bg-white px-3 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-700 focus:ring-2 focus:ring-stone-300 placeholder:text-stone-400"
                />
              </label>
              {errors.password?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-stone-950 py-3.5 text-[10px] font-bold tracking-[0.16em] text-white transition hover:bg-stone-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>
          <div className="my-6 flex items-center gap-3 text-[10px] text-stone-400">
            <span className="h-px flex-1 bg-stone-200" />
            OR
            <span className="h-px flex-1 bg-stone-200" />
          </div>
          <GoogleAuthButton />{" "}
          <p className="mt-7 text-center text-xs text-secondary-tx">
            New here?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#b58a3d] hover:text-[#8c672c]"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
