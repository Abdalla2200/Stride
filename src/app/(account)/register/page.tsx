"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import registerImage from "@/assets/register-Image.png";
import { registerUserAction } from "@/actions/auth";
import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { Button } from "@/components/UI/button";

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const result = await registerUserAction(values);

      if (result.status === "error") {
        setServerError(result.message);
      } else if (result.status === "success") {
        toast.success("Account created successfully. Welcome to STRIDE!");
        router.push("/cart");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-dvh bg-black md:grid-cols-[45%_55%]">
      <aside className="relative min-h-136 overflow-hidden lg:min-h-dvh hidden md:block">
        <Image
          src={registerImage}
          alt="A man wearing a tailored suit"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <Link
          href="/"
          className="absolute left-8 top-8 text-sm font-bold tracking-tight text-white sm:left-10 sm:top-10"
        >
          STRIDE
        </Link>
        <p className="absolute bottom-8 left-8 max-w-48 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:bottom-12 sm:left-10 sm:text-5xl">
          Style,
          <br />
          delivered.
        </p>
      </aside>

      <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold tracking-tight text-stone-100 sm:text-4xl">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-stone-400">
            Join STRIDE for faster checkout and order tracking.
          </p>
          {serverError && (
            <div
              role="alert"
              className="mt-5 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {serverError}
            </div>
          )}
          <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-[10px] font-medium tracking-wider text-stone-400">
                FULL NAME
                <input
                  {...register("fullName")}
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="mt-1.5 w-full rounded-md border border-white/10 bg-white px-3 py-3 text-sm text-stone-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 placeholder:text-stone-400"
                />
              </label>
              {errors.fullName?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-medium tracking-wider text-stone-400">
                EMAIL
                <input
                  {...register("email")}
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  autoComplete="email"
                  className="mt-1.5 w-full rounded-md border border-white/10 bg-white px-3 py-3 text-sm text-stone-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 placeholder:text-stone-400"
                />
              </label>
              {errors.email?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-medium tracking-wider text-stone-400">
                  PASSWORD
                  <input
                    {...register("password")}
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="mt-1.5 w-full rounded-md border border-white/10 bg-white px-3 py-3 text-sm text-stone-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 placeholder:text-stone-400"
                  />
                </label>
                {errors.password?.message && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-medium tracking-wider text-stone-400">
                  CONFIRM PASSWORD
                  <input
                    {...register("confirmPassword")}
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="mt-1.5 w-full rounded-md border border-white/10 bg-white px-3 py-3 text-sm text-stone-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 placeholder:text-stone-400"
                  />
                </label>
                {errors.confirmPassword?.message && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-stone-100 py-3.5 h-auto text-[10px] font-bold tracking-[0.16em] text-stone-950 hover:bg-stone-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </Button>
          </form>
          <div className="my-6 flex items-center gap-3 text-[10px] text-stone-500">
            <span className="h-px flex-1 bg-white/15" />
            OR
            <span className="h-px flex-1 bg-white/15" />
          </div>
          <GoogleAuthButton isDark />{" "}
          <p className="mt-7 text-center text-xs text-stone-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-accent hover:text-[#ecd49e]"
            >
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
