import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { PostgresCreateUserRepository } from "../repositories/postgres/create.user.js";

export class CreateUserUseCase {
  async execute(createUserParams) {
    // TODO: verificar se o e-mail já está em uso

    // gerar ID do usuário
    const userID = uuidv4();

    // criptografar a senha
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    // inserir o usuário no banco de dados
    const user = {
      ...createUserParams,
      id: userID,
      password: hashedPassword,
    };

    // chamar o repositório
    const postgresCreateUserRepository = new PostgresCreateUserRepository();

    const creatUser = await postgresCreateUserRepository.execute(user);

    return creatUser;
  }
}
