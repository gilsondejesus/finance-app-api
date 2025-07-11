import { CreateUserController } from "./create-user.js";

describe("Create User Controller", () => {
  class CreateUserUseCaseStub {
    execute(user) {
      return user;
    }
  }

  it("should return 201 when creating a user successfully", async () => {
    // arrange
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(createUserUseCase);

    const httpRequest = {
      body: {
        first_name: "Gilson",
        last_name: "De Jesus",
        email: "gilson@gmjcode.com",
        password: "123456",
      },
    };

    // act

    const result = await createUserController.execute(httpRequest);

    // assert

    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(httpRequest.body);
  });

  it("should return 400 if first name is not provided", async () => {
    // arrange
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(createUserUseCase);

    const httpRequest = {
      body: {
        last_name: "De Jesus",
        email: "gilson@gmjcode.com",
        password: "123456",
      },
    };

    // act
    const result = await createUserController.execute(httpRequest);

    // assert

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if last name is not provided", async () => {
    // arrange
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(createUserUseCase);

    const httpRequest = {
      body: {
        first_name: "Gilson",
        email: "gilson@gmjcode.com",
        password: "123456",
      },
    };

    // act
    const result = await createUserController.execute(httpRequest);

    // assert

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if email is not provided", async () => {
    // arrange
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(createUserUseCase);

    const httpRequest = {
      body: {
        first_name: "Gilson",
        last_name: "De Jesus",
        password: "123456",
      },
    };

    // act
    const result = await createUserController.execute(httpRequest);

    // assert

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if email is not valid", async () => {
    // arrange
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(createUserUseCase);

    const httpRequest = {
      body: {
        first_name: "Gilson",
        last_name: "De Jesus",
        email: "gilson",
        password: "123456",
      },
    };

    // act
    const result = await createUserController.execute(httpRequest);

    // assert

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if password is not provided", async () => {
    // arrange
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(createUserUseCase);

    const httpRequest = {
      body: {
        first_name: "Gilson",
        last_name: "De Jesus",
        email: "gilson@gmjcode.com",
      },
    };

    // act
    const result = await createUserController.execute(httpRequest);

    // assert

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if password is less than 6 characters", async () => {
    // arrange
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(createUserUseCase);

    const httpRequest = {
      body: {
        first_name: "Gilson",
        last_name: "De Jesus",
        email: "gilson@gmjcode.com",
        password: "123",
      },
    };

    // act
    const result = await createUserController.execute(httpRequest);

    // assert

    expect(result.statusCode).toBe(400);
  });

  it("shoud call CreateUserUseCase with correct params", async () => {
    // arrange
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(createUserUseCase);

    const httpRequest = {
      body: {
        first_name: "Gilson",
        last_name: "De Jesus",
        email: "gilson@gmjcode.com",
        password: "123456",
      },
    };

    const executeSpy = jest.spyOn(createUserUseCase, "execute");

    // act
    await createUserController.execute(httpRequest);

    // assert
    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
