"use client";

import { createClient } from "@/lib/supabase/client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-1.99 3.02v2.52h3.24c1.9-1.75 2.97-4.34 2.97-7.37Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.63-2.4l-3.24-2.52c-.9.6-2.05.96-3.39.96-2.6 0-4.8-1.75-5.59-4.1H3.07v2.6A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.94A6 6 0 0 1 6.1 12c0-.67.12-1.32.31-1.94v-2.6H3.07A10 10 0 0 0 2 12c0 1.61.39 3.13 1.07 4.54l3.34-2.6Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.96c1.47 0 2.79.5 3.83 1.48l2.88-2.88C16.96 2.92 14.7 2 12 2a10 10 0 0 0-8.93 5.46l3.34 2.6c.79-2.35 2.99-4.1 5.59-4.1Z"
      />
    </svg>
  );
}

export default function GoogleAuthButton({ isDark }: { isDark?: boolean }) {
  async function handleGoogleSignIn() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error(error.message);
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="flex w-full items-center justify-center gap-3 rounded-md border border-white/20 py-3 bg-secondary-bg text-[10px] font-semibold tracking-[0.12em] text-primary-tx duration-200 hover:bg-slate-200"
    >
      <GoogleIcon />
      CONTINUE WITH GOOGLE
    </button>
  );
}
