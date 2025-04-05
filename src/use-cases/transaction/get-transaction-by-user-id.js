import { UserNotFoundError } from "../../errors/use.js";

export class GetTransactionsByUserId {
  constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
    this.getTransactionsByUserIdRepository = getTransactionsByUserIdRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(params) {
    const user = await this.getUserByIdRepository.execute(params.userId);

    if (!user) {
      throw new UserNotFoundError(params.userId);
    }

    const transactions = await this.getTransactionsByUserIdRepository.execute(
      params.userId,
    );

    return transactions;
  }
}
