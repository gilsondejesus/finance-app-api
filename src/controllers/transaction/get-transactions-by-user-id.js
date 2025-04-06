import {
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  requiredFieldsIsMissingResponse,
  serverError,
  userNotFoundResponse,
} from "../helpers/index.js";
import { UserNotFoundError } from "../../errors/use.js";

export class GetTransactionsByUserId {
  constructor(getTransactionsByUserIdUseCase) {
    this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.query.userId;

      if (!userId) {
        return requiredFieldsIsMissingResponse("userId");
      }

      const userIdIsValid = checkIfIdIsValid(userId);

      if (!userIdIsValid) {
        return invalidIdResponse();
      }

      const transactions = await this.getTransactionsByUserIdUseCase.execute({
        userId,
      });

      return ok(transactions);
    } catch (error) {
      console.error(error);

      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse(error.userId);
      }

      return serverError();
    }
  }
}
