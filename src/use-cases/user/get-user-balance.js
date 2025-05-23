import { UserNotFoundError } from "../../errors/use.js";

export class GetUserBalanceUseCase {
  constructor(getUserBalanceRepository, getUserByIdRepository) {
    this.getUserBalanceRepository = getUserBalanceRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(params) {
    const user = await this.getUserByIdRepository.execute(params.userId);

    if (!user) {
      throw new UserNotFoundError(params.userId);
    }

    const balance = await this.getUserBalanceRepository.execute(params.userId);

    return balance;
  }
}
