import { AppError } from "../../../shared/errors/AppError"
import { User } from "../typeorm/entities/User"
import { UserRepository } from "../typeorm/repository/Users"
import { getCustomRepository } from "typeorm"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { authJwt } from "../../../shared/config/auth"

interface IRequest {
  email: string
  password: string
}
interface IResponse {
  user: User
  token: string
}
export class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new AppError("Combinação de email/password incorretos", 401)
    }
    const passwordConfirmed = await bcrypt.compare(password, user.password)
    if (!passwordConfirmed) {
      throw new AppError("Combinação de email/password incorretos", 401)
    }
    const token = jwt.sign({}, authJwt.jwt.secret, {
      subject: user.id,
      expiresIn: authJwt.jwt.expiresIn,
    })
    await userRepository.save(user)
    return {
      user,
      token,
    }
  }
}
