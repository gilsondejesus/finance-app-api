import validator from "validator";
import {
  badRequest,
  checkIfIdIsValid,
  created,
  invalidIdResponse,
  serverError,
  validateRequiredFields,
} from "../helpers/index.js";

export class CreateTransactionController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = ["user_id", "name", "date", "amount", "type"];

      const { ok: requiredFieldsWhereProvided, missingField } =
        validateRequiredFields(params, requiredFields);

      if (!requiredFieldsWhereProvided) {
        return badRequest({
          message: `The field ${missingField} is required.`,
        });
      }

      const userIsValid = checkIfIdIsValid(params.user_id);

      if (!userIsValid) {
        return invalidIdResponse();
      }

      if (params.amount <= 0) {
        return badRequest({
          message: "The amount must be greater than 0",
        });
      }

      const amountIsValid = validator.isCurrency(params.amount.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: ".",
      });

      if (!amountIsValid) {
        return badRequest({
          message: "The amount must be a valid currency",
        });
      }

      const type = params.type.trim().toUpperCase();

      const typeIsValid = ["EARNING", "EXPENSE", "INVESTMENT"].includes(type);

      if (!typeIsValid) {
        return badRequest({
          message: "The type must be EARNING, EXPENSE or INVESTMENT",
        });
      }

      const transaction = await this.createTransactionUseCase.execute({
        ...params,
        type,
      });

      return created(transaction);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
