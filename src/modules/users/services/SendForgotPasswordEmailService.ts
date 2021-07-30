import { AppError } from "../../../shared/errors/AppError"
import { UserRepository } from "../typeorm/repository/Users"
import { TokensRepository } from "../typeorm/repository/TokensRepository"
import { getCustomRepository } from "typeorm"

interface IRequest {
  email: string
}
export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository)
    const tokenRepository = getCustomRepository(TokensRepository)
    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new AppError(`Usuário com email informado não existe`, 404)
    }
    const token = await tokenRepository.generate(user.id)
    console.log(token)
  }
}
