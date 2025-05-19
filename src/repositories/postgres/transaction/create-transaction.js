import { prisma } from "../../../../prisma/prisma.js";
export class PostgresCreateTransactionRepository {
  async execute(createTransactionsParams) {
    return await prisma.transaction.create({
      data: createTransactionsParams,
    });
  }
}
