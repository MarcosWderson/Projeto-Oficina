import { redirect } from "next/navigation";
import { createAuthClient } from "./supabase";

type Permission = "dashboard" | "clientes" | "veiculos" | "agendamentos"
  | "ordens" | "estoque" | "financeiro" | "usuarios";

const permissions: Readonly<Record<string, readonly Permission[]>> = {
  administrador: ["dashboard", "clientes", "veiculos", "agendamentos", "ordens", "estoque", "financeiro", "usuarios"],
  recepcionista: ["dashboard", "clientes", "veiculos", "agendamentos"],
  mecanico: ["dashboard", "ordens"],
  estoquista: ["dashboard", "estoque"],
  financeiro: ["dashboard", "financeiro"],
};

export async function checkPermission(permission: Permission) {
  const supabase = await createAuthClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { allowed: false, status: 401 } as const;

  const role: unknown = user.app_metadata.toru_role;
  if (typeof role !== "string" || !Object.hasOwn(permissions, role) || !permissions[role].includes(permission)) {
    return { allowed: false, status: 403 } as const;
  }

  return { allowed: true, userId: user.id } as const;
}

export async function requireDashboardAccess() {
  const access = await checkPermission("dashboard");
  if (!access.allowed) redirect(access.status === 401 ? "/login" : "/login?erro=perfil");
}
