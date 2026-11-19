
import { Suspense } from "react";
import { connection } from "next/server";
import Dashboard from "./dashboard";
import { logout } from "./login/actions";
import { requireDashboardAccess } from "../lib/auth/access";

async function ConteudoProtegido() {
  await connection();
  await requireDashboardAccess();

  return (
    <>
      <form
        action={logout}
        className="flex justify-end border-b border-slate-200 bg-white px-4 py-2"
      >
        <button
          type="submit"
          className="rounded-md px-3 py-1 text-sm font-semibold text-slate-900 hover:bg-slate-100"
        >
          Sair
        </button>
      </form>

      <Dashboard />
    </>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
          Carregando TORU SYSTEM...
        </div>
      }
    >
      <ConteudoProtegido />
    </Suspense>
  );
}
