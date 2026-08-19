"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/UI/button";

type Status = "idle" | "loading" | "success" | "error";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function JoinTheList() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    // Simulated only — no real email is sent
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEmail("");
    setStatus("success");
  };

  return (
    <section className="bg-inverse py-16 md:py-30 mt-16 md:mt-30">
      <div className="container flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8">
        <div className="text-center lg:text-start">
          <h2 className="font-bold text-2xl mb-4 text-primary-bg">
            JOIN THE LIST
          </h2>
          <p className="text-primary-bg/85 max-w-[460px]">
            Receive early access to new collections and exclusive editorial
            content directly in your inbox.
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Your email address"
              aria-label="Email address"
              disabled={status === "loading"}
              className="bg-primary-bg/5 text-primary-bg/80 text-lg rounded-md p-4 flex-1 outline-none min-w-[300px] sm:min-w-[450px] disabled:opacity-60"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className={`flex items-center justify-center gap-2 rounded-md py-3 px-6 w-full sm:w-auto h-auto ${
                status === "loading"
                  ? "bg-gray-500 text-white"
                  : "bg-accent/60 text-primary-bg hover:bg-accent/80"
              }`}
            >
              {status === "loading" ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "SUBSCRIBE"
              )}
            </Button>
          </form>

          <p
            className={`text-center sm:text-start min-h-[20px] transition-opacity ${
              status === "idle" || status === "loading"
                ? "opacity-0"
                : "opacity-100"
            }`}
          >
            {status === "error" && (
              <span className="text-red-400">
                Please enter a valid email address.
              </span>
            )}
            {status === "success" && (
              <span className="text-accent">
                You&apos;re on the list — thanks for joining!
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
