# Etapa 5 — Login e perfis

No Codespace, abra um terminal em web. Mantenha NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY e DATABASE_URL no ambiente local. Use a porta 3000 com visibilidade privada no Codespaces. No modo de desenvolvimento, o Next.js aceita o endereço exato dessa porta e localhost:3000, origem usada pelo túnel do Codespaces.

~~~bash
cd /workspaces/Projeto-Oficina/web
npm ci
npm run dev
~~~

Abra /login com uma conta de teste existente no Supabase Auth. O botão **Sair** encerra a sessão deste navegador. A rota / é o dashboard.

O servidor consulta o Supabase Auth para verificar a identidade e lê app_metadata.toru_role. Um administrador autorizado do Supabase atribui o perfil e preserva os demais metadados. Contas sem um perfil reconhecido ficam sem acesso ao dashboard.

| Perfil | Valor | Permissões além do dashboard |
| --- | --- | --- |
| Administrador | administrador | Todas as áreas listadas abaixo, inclusive usuários |
| Recepcionista | recepcionista | Clientes, veículos e agendamentos |
| Mecânico | mecanico | Ordens de serviço |
| Estoquista | estoquista | Estoque |
| Financeiro | financeiro | Financeiro |

As telas atuais exibem dados de demonstração. Antes de conectar uma tela ao Prisma, chame checkPermission no servidor em cada leitura e escrita, antes de consultar o banco. Use o status retornado para negar acesso e aplique também restrições por registro quando a operação depender da atribuição de uma ordem ou da oficina. Mantenha a Data API sem acesso direto às tabelas privadas da oficina. O gerenciamento de funcionários, as operações persistentes e as regras por registro ficam para as etapas que introduzirem esses recursos.

## Verificação

~~~bash
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/eslint src/proxy.ts src/lib/auth src/app/login src/app/page.tsx
~~~

1. Em uma janela anônima, abra / e confirme o redirecionamento para /login.
2. Envie uma senha inválida e confirme a mensagem genérica.
3. Entre com conta de teste existente com perfil válido. Recarregue o dashboard e confirme que a sessão permanece ativa.
4. Clique em **Sair** e tente abrir / novamente. Confirme o redirecionamento.
5. Com uma conta de teste sem perfil, confirme que o login retorna à tela com a mensagem de perfil pendente.

## Proteção das tabelas no Supabase

A migração ativa RLS em clientes e veículos e foi aplicada no Supabase conectado. A verificação em modo somente leitura confirmou que o papel usado pelo Prisma mantém acesso às duas tabelas e que anon e authenticated não podem visualizar linhas. Em outros ambientes, confira as migrações pendentes com Prisma migrate status antes de aplicar com Prisma migrate deploy.

## Situação dos testes

- TypeScript e ESLint passaram nas verificações da Etapa 5.
- Foram verificados o bloqueio de acesso anônimo e a rejeição de credenciais inválidas.
- Com o Supabase simulado localmente, foram verificados login, cookies de sessão, recarga do dashboard, bloqueio de conta sem perfil e logout.
- A segurança por linha foi validada no banco conectado. Os papéis anon e authenticated ficaram sem leitura direta das linhas de clientes e veículos. A conexão usada pelo Prisma manteve acesso.
- O login e o logout completos com uma conta de teste no Supabase conectado ainda precisam ser confirmados no navegador.

## Acesso pela porta privada do Codespaces

1. Execute npm run dev em web e confirme no painel **Portas** que a porta **3000** está encaminhada com visibilidade **Private**.
2. Abra a porta pelo painel e acesse /login em um navegador autenticado no GitHub com acesso ao Codespace.
3. Se o endereço encaminhado retornar **HTTP 404**, confirme no terminal do Codespace se a rota local está disponível com o comando abaixo. Uma resposta **200** indica que o servidor está respondendo e que o encaminhamento ou a autenticação do navegador precisam ser verificados.
4. Pelo VS Code instalado, reabra o mesmo Codespace, encaminhe a porta **3000** com visibilidade privada e acesse o endereço local mostrado em **Portas**, seguido de /login.

~~~bash
curl -I http://127.0.0.1:3000/login
~~~

Durante o diagnóstico, a rota local e o túnel autenticado pelo terminal responderam **200**. O endereço encaminhado no Chrome e no Brave retornou **404**. A causa exata no acesso pelo navegador segue em aberto. Consulte a [documentação do GitHub sobre encaminhamento de portas](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace?tool=vscode).
