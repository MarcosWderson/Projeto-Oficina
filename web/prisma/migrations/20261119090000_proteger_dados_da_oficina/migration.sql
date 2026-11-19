-- The application accesses these tables on the server through Prisma.
-- Without policies, the Data API roles cannot read or modify table rows.
BEGIN;
ALTER TABLE "public"."clientes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."veiculos" ENABLE ROW LEVEL SECURITY;
COMMIT;
