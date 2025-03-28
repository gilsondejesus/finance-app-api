import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresCreateTransactionRepository {
  async execute(createTransactionsParams) {
    const createdTransaction = await PostgresHelper.query(
      `
      INSERT INTO transactions (id, user_id, name, date, amount, type)
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *
      `,
      [
        createTransactionsParams.id,
        createTransactionsParams.user_id,
        createTransactionsParams.name,
        createTransactionsParams.date,
        createTransactionsParams.amount,
        createTransactionsParams.type,
      ],
    );

    return createdTransaction[0];
  }
}
