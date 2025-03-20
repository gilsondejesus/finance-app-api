import validator from "validator";
import { badRequest, ok, serverError } from "./helpers.js";
import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { EmailAlreadyInUseError } from "../errors/use.js";

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const isIdValid = validator.isUUID(userId);

      if (!isIdValid) {
        return badRequest({
          message: "The provided id is not valid",
        });
      }

      const updateUserParams = httpRequest.body;

      const allowedFields = ["first_name", "last_name", "email", "password"];

      const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsNotAllowed) {
        return badRequest({
          message: "Some provided field is not allowed",
        });
      }

      const someFieldIsBlank = Object.keys(updateUserParams).some(
        (field) => updateUserParams[field].trim().length === 0,
      );

      if (someFieldIsBlank) {
        return badRequest({ message: "Some provided field is blank" });
      }

      if (updateUserParams.password) {
        const passwordIsValid = updateUserParams.password.length < 6;

        if (passwordIsValid) {
          return badRequest({
            message: "Password must be at least 6 characteres",
          });
        }
      }

      if (updateUserParams.email) {
        const emailIsValid = validator.isEmail(updateUserParams.email);

        if (!emailIsValid) {
          return badRequest({
            message: "Invalid e-mail. Please provide a valid one.",
          });
        }
      }

      const updateUserUseCase = new UpdateUserUseCase();
      const updatedUser = await updateUserUseCase.execute(
        userId,
        updateUserParams,
      );

      return ok(updatedUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({
          message: error.message,
        });
      }
      console.error(error);
      return serverError();
    }
  }
}
