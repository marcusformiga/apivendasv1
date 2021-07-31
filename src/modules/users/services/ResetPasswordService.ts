import { AppError } from "../../../shared/errors/AppError"
import { UserRepository } from "../typeorm/repository/Users"
import { TokensRepository } from "../typeorm/repository/TokensRepository"
import { getCustomRepository } from "typeorm"
import { addHours, isAfter } from "date-fns"
import bcrypt from "bcrypt"

interface IRequest {
  token: string
  password: string
}
// verificar se o token é valido
// verificar se o token está expirado
// verificar se o usuario existe na aplicacao
export class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository)
    const tokenRepository = getCustomRepository(TokensRepository)
    const userToken = await tokenRepository.findByToken(token)
    console.log(userToken)
    if (!userToken) {
      throw new AppError(`Token ${token} informado não encontrado`, 404)
    }
    const user = await userRepository.findById(userToken.user_id)
    console.log(user)
    if (!user) {
      throw new AppError("Usuário não encontrado", 404)
    }
    const tokenCreatedAt = userToken.created_at
    const compareHours = addHours(tokenCreatedAt, 2)
    if (isAfter(Date.now(), compareHours)) {
      throw new AppError(`Token jwt ${token} expirado`)
    }
    user.password = await bcrypt.hash(password, 10)
    await userRepository.save(user)
  }
}
