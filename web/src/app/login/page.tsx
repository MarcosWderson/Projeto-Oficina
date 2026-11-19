
import { Suspense } from "react";
import { login, logout } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{ erro?: string | string[] }>;
};

async function LoginContent({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const erro = typeof params.erro === "string" ? params.erro : undefined;

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 text-slate-950">
      <section className="w-full max-w-sm rounded-xl bg-white p-8 shadow-xl">
        <p className="text-sm font-semibold text-slate-600">
          Toru Auto Center
        </p>

        <h1 className="mb-6 mt-2 text-2xl font-bold">
          Entrar no TORU SYSTEM
        </h1>

        {erro === "credenciais" && (
          <p role="alert" className="mb-4 text-sm text-red-700">
            Não foi possível entrar. Confira o e-mail e a senha.
          </p>
        )}

        {erro === "perfil" && (
          <p role="alert" className="mb-4 text-sm text-red-700">
            Esta conta precisa de um perfil de funcionário para acessar o sistema.
          </p>
        )}

        {erro === "saida" && (
          <p role="alert" className="mb-4 text-sm text-red-700">
            Não foi possível encerrar a sessão. Tente novamente.
          </p>
        )}

        <form action={login} className="grid gap-4">
          <label className="grid gap-1 text-sm font-medium">
            E-mail
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              className="rounded-md border border-slate-400 px-3 py-2"
            />
          </label>

          <label className="grid gap-1 text-sm font-medium">
            Senha
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="rounded-md border border-slate-400 px-3 py-2"
            />
          </label>

          <button
            type="submit"
            className="rounded-md bg-slate-900 px-4 py-2 font-semibold text-white"
          >
            Entrar
          </button>
        </form>

        {(erro === "perfil" || erro === "saida") && (
          <form action={logout} className="mt-4">
            <button className="text-sm font-semibold underline">
              Encerrar sessão
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-slate-950 px-4 text-white">
          Carregando login...
        </main>
      }
    >
      <LoginContent searchParams={searchParams} />
    </Suspense>
  );
}
