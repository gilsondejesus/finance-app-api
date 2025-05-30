import { badRequest, notFound } from "./http.js";

export const invalidPasswordResponse = () =>
  badRequest({
    message: "Password must be at least 6 characteres",
  });

export const emailIsAlreadyInUseResponse = () =>
  badRequest({
    message: "Invalid e-mail. Please provide a valid one.",
  });

export const userNotFoundResponse = () =>
  notFound({
    message: "User not found",
  });
