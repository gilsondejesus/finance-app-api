import { EmailAlreadyInUseError } from "../../errors/use.js";
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  emailIsAlreadyInUseResponse,
  invalidPasswordResponse,
  badRequest,
  created,
  serverError,
  validateRequiredFields,
  requiredFieldsIsMissingResponse,
} from "../helpers/index.js";

export class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = ["first_name", "last_name", "email", "password"];

      const { ok: requiredFieldsWhereProvided, missingField } =
        validateRequiredFields(params, requiredFields);

      if (!requiredFieldsWhereProvided) {
        return requiredFieldsIsMissingResponse(missingField);
      }

      const passwordIsValid = checkIfPasswordIsValid(params.password);

      if (!passwordIsValid) {
        return invalidPasswordResponse();
      }

      const emailIsValid = checkIfEmailIsValid(params.email);

      if (!emailIsValid) {
        return emailIsAlreadyInUseResponse();
      }

      const createdUser = await this.createUserUseCase.execute(params);

      return created(createdUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }
      console.error(error);
      return serverError();
    }
  }
}
