import { prisma } from "../src/lib/prisma";

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();
  if (!email) throw new Error("Usage: npm run admin:promote -- admin@example.com\nFirst register that email in Invite Studio using verified mobile OTP.");
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, name: true, email: true, role: true, phoneVerified: true } });
  if (!user) throw new Error(`No account found for ${email}. Register first with verified mobile OTP, then run this command again.`);
  if (!user.phoneVerified) throw new Error("This account has not verified its phone with OTP. Complete phone verification before promoting it.");

  // Demote any existing super admins so only ONE single super admin exists in the system
  await prisma.user.updateMany({
    where: { role: "SUPER_ADMIN", id: { not: user.id } },
    data: { role: "USER" },
  });

  await prisma.user.update({ where: { id: user.id }, data: { role: "SUPER_ADMIN" } });
  console.log(`Promoted ${user.name} (${user.email}) as the SOLE SUPER_ADMIN. All other accounts are standard users.`);
}

main().catch(error => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; }).finally(async () => prisma.$disconnect());
