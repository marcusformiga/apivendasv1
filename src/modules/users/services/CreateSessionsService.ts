import { AppError } from "../../../shared/errors/AppError"
import { User } from "../typeorm/entities/User"
import { UserRepository } from "../typeorm/repository/Users"
import { getCustomRepository } from "typeorm"
import bcrypt from "bcrypt"

interface IRequest {
  email: string
  password: string
}
export class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User>{
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new AppError("Combinação de email/password incorretos", 401)
    }
    const passwordConfirmed = await bcrypt.compare(password, user.password)
    if (!passwordConfirmed) {
      throw new AppError("Combinação de email/password incorretos", 401)
    }
    await userRepository.save(user)
    return user
  }
}
