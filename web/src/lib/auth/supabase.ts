import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function supabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Configuração do Supabase Auth ausente.");
  return { url, key };
}

export async function createAuthClient(writable = false) {
  const { url, key } = supabaseConfig();
  const store = await cookies();
  return createServerClient(url, key, {
    cookieOptions: { httpOnly: true },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
    cookies: {
      getAll: () => store.getAll(),
      setAll: (updates) => {
        if (writable) {
          for (const { name, value, options } of updates) store.set(name, value, options);
        }
      },
    },
  });
}
