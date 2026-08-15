"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema } from "@/utils/zodSchema";
import { revalidatePath } from "next/cache";
import z from "zod";

type AuthActionError = { status: "error"; message: string };
type AuthActionSuccess = { status: "success" };

export async function registerUserAction(
  values: z.infer<typeof registerSchema>,
): Promise<AuthActionError | AuthActionSuccess> {
  const result = registerSchema.safeParse(values);

  if (!result.success) {
    return {
      status: "error",
      message: result.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        display_name: result.data.fullName,
      },
    },
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  revalidatePath("/", "layout");
  return { status: "success" };
}

export async function loginUserAction(
  values: z.infer<typeof loginSchema>,
): Promise<AuthActionError | AuthActionSuccess> {
  const result = loginSchema.safeParse(values);

  if (!result.success) {
    return {
      status: "error",
      message: result.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  revalidatePath("/", "layout");
  return { status: "success" };
}

export async function logoutUserAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/", "layout");
  return { status: "success" };
}
