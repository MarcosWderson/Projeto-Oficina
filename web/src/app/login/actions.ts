"use server";

import { redirect } from "next/navigation";
import { createAuthClient } from "../../lib/auth/supabase";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) {
    redirect("/login?erro=credenciais");
  }
  const supabase = await createAuthClient(true);
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) redirect("/login?erro=credenciais");
  redirect("/");
}

export async function logout() {
  const supabase = await createAuthClient(true);
  const { error } = await supabase.auth.signOut({ scope: "local" });
  redirect(error ? "/login?erro=saida" : "/login");
}
