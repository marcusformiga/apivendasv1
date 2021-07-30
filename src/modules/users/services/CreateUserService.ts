import { AppError } from "../../../shared/errors/AppError"
import { User } from "../typeorm/entities/User"
import { UserRepository } from "../typeorm/repository/Users"
import { getCustomRepository } from "typeorm"
import bcrypt from "bcrypt"

interface IRequest {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<User | undefined> {
    const userRepository = getCustomRepository(UserRepository)
    const emailExists = await userRepository.findByEmail(email)
    if (emailExists) {
      // eslint-disable-next-line prettier/prettier
      throw new AppError(`Usuário com email ${email} informado já está cadastrado`, 409)
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const user = userRepository.create({ name, email, password: hashPassword })
    await userRepository.save(user)
    return user
  }
}
