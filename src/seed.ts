import { PrismaClient } from '@prisma/client';
import { createAuthors, createBooks, createMembers, createborrowedBooks, createborrowingHistories } from './db/createLibrary';

const prisma = new PrismaClient();

async function main() {
  await createAuthors();
  await createBooks();
  await createMembers();
  await createborrowingHistories(); // สร้าง borrowingHistories ก่อน
  await createborrowedBooks(); // สร้าง borrowedBooks หลังจาก borrowingHistories ถูกสร้างแล้ว
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });