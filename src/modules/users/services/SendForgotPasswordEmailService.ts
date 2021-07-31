import { AppError } from "../../../shared/errors/AppError"
import { UserRepository } from "../typeorm/repository/Users"
import { TokensRepository } from "../typeorm/repository/TokensRepository"
import { getCustomRepository } from "typeorm"
import { EtherealMail } from "../../../shared/config/mail/EtherealMail"

interface IRequest {
  email: string
}
export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository)
    const tokenRepository = getCustomRepository(TokensRepository)
    const user = await userRepository.findByEmail(email)
    console.log(user)
    if (!user) {
      throw new AppError(`Usuário com email informado não existe`, 404)
    }
    const token = await tokenRepository.generate(user.id)
    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefiniçao de senha: ${token.token}`,
    })
  }
}
