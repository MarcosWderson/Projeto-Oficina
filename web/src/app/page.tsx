
"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CarFront,
  ClipboardList,
  CalendarDays,
  Package,
  Wallet,
  MessageCircle,
  ChartNoAxesCombined,
  Settings,
  Wrench,
  Search,
  Menu,
  X,
} from "lucide-react";

const navegacao = [
  { nome: "Dashboard", icone: LayoutDashboard },
  { nome: "Clientes", icone: Users },
  { nome: "Veículos", icone: CarFront },
  { nome: "Ordens de Serviço", icone: ClipboardList },
  { nome: "Agendamentos", icone: CalendarDays },
  { nome: "Estoque e Peças", icone: Package },
  { nome: "Financeiro", icone: Wallet },
  { nome: "WhatsApp", icone: MessageCircle },
  { nome: "Relatórios", icone: ChartNoAxesCombined },
  { nome: "Configurações", icone: Settings },
];

const ordens = [
  {
    id: "OS-0001",
    cliente: "João Silva",
    veiculo: "Toyota Corolla",
    placa: "ABC1D23",
    servico: "Troca de óleo",
    status: "Em andamento",
  },
  {
    id: "OS-0002",
    cliente: "Maria Souza",
    veiculo: "Honda Civic",
    placa: "DEF4G56",
    servico: "Revisão de freios",
    status: "Aguardando peças",
  },
  {
    id: "OS-0003",
    cliente: "Carlos Lima",
    veiculo: "Fiat Strada",
    placa: "GHI7J89",
    servico: "Alinhamento",
    status: "Finalizado",
  },
];

const indicadores = [
  { titulo: "Veículos na oficina", valor: "12", icone: CarFront },
  { titulo: "Serviços em andamento", valor: "08", icone: Wrench },
  { titulo: "Agendamentos", valor: "05", icone: CalendarDays },
  { titulo: "Faturamento do dia", valor: "R$ 4.850", icone: Wallet },
];

export default function Home() {
  const [pagina, setPagina] = useState("Dashboard");
  const [busca, setBusca] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);

  const ordensFiltradas = ordens.filter((ordem) =>
    Object.values(ordem)
      .join(" ")
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  function navegar(nome: string) {
    setPagina(nome);
    setMenuAberto(false);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 md:flex">
      {menuAberto && (
        <button
          aria-label="Fechar menu"
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMenuAberto(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 overflow-y-auto
        bg-slate-950 p-6 text-white transition-transform
        md:static md:min-h-screen md:w-64 md:translate-x-0
        ${menuAberto ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-600 p-3">
              <Wrench size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black">
                TORU <span className="text-red-500">SYSTEM</span>
              </h1>
              <p className="text-xs text-slate-400">
                Auto Center
              </p>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuAberto(false)}
            aria-label="Fechar navegação"
          >
            <X />
          </button>
        </div>

        <nav className="space-y-2">
          {navegacao.map(({ nome, icone: Icone }) => (
            <button
              key={nome}
              onClick={() => navegar(nome)}
              className={`flex w-full items-center gap-3 rounded-xl
                px-4 py-3 text-left text-sm transition
                ${
                  pagina === nome
                    ? "bg-red-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
            >
              <Icone size={19} />
              {nome}
            </button>
          ))}
        </nav>

        <div className="mt-10 border-t border-slate-800 pt-5">
          <p className="text-xs text-slate-400">
            TORU SYSTEM — Versão 0.1
          </p>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-5 md:p-8">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg bg-white p-2 shadow-sm md:hidden"
              onClick={() => setMenuAberto(true)}
              aria-label="Abrir menu"
            >
              <Menu />
            </button>

            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                {pagina}
              </h2>
              <p className="text-sm text-slate-500">
                Gestão da Toru Auto Center
              </p>
            </div>
          </div>

          <div className="rounded-full bg-white px-4 py-2 text-sm shadow-sm">
            Demonstração
          </div>
        </header>

        {pagina === "Dashboard" ? (
          <>
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Ambiente demonstrativo: os dados abaixo são fictícios.
            </div>

            <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {indicadores.map(({ titulo, valor, icone: Icone }) => (
                <div
                  key={titulo}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-slate-500">{titulo}</p>
                    <Icone className="text-red-600" size={23} />
                  </div>
                  <h3 className="text-3xl font-bold">{valor}</h3>
                </div>
              ))}
            </section>

            <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-6">
                <h3 className="text-xl font-bold">
                  Ordens de serviço recentes
                </h3>

                <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3">
                  <Search size={18} className="text-slate-400" />
                  <input
                    aria-label="Pesquisar ordens de serviço"
                    placeholder="Buscar OS, cliente ou placa"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-52 py-3 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      {["OS", "Cliente", "Veículo", "Placa", "Serviço", "Status"].map(
                        (titulo) => (
                          <th key={titulo} className="whitespace-nowrap p-4">
                            {titulo}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {ordensFiltradas.map((ordem) => (
                      <tr
                        key={ordem.id}
                        className="border-t border-slate-100"
                      >
                        <td className="p-4 font-semibold">{ordem.id}</td>
                        <td className="p-4">{ordem.cliente}</td>
                        <td className="p-4">{ordem.veiculo}</td>
                        <td className="p-4">{ordem.placa}</td>
                        <td className="p-4">{ordem.servico}</td>
                        <td className="p-4">
                          <span className="whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">
                            {ordem.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {ordensFiltradas.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="p-8 text-center text-slate-500"
                        >
                          Nenhuma ordem encontrada.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <section className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">Módulo {pagina}</h3>
            <p className="mt-3 text-slate-500">
              Este módulo será implementado nas próximas etapas.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
