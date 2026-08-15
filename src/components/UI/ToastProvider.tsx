"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((toastMessage: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setMessage(toastMessage);
    timeoutRef.current = setTimeout(() => setMessage(null), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 bottom-24 z-100 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl border border-emerald-300/40 bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-950/25"
        >
          <span
            aria-hidden="true"
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs"
          >
            ✓
          </span>
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
