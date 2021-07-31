import { User } from "../typeorm/entities/User"
import { UserRepository } from "../typeorm/repository/Users"
import { getCustomRepository } from "typeorm"
import { AppError } from "../../../shared/errors/AppError"
import { id } from "date-fns/locale"
import { compare, hash } from "bcrypt"

interface IRequest {
  user_id: string
  name: string
  email: string
  password?: string
  old_password?: string
}
export class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User | undefined> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findById(user_id)
    if (!user) {
      throw new AppError(
        `Usuário com id ${user_id} informado não foi encontrado`,
        404,
      )
    }
    const userUpdateEmail = await userRepository.findByEmail(email)
    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError("Já existe um usuário com este email")
    }
    if (password && old_password) {
      throw new AppError("Senha antiga é obrigatória")
    }
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)
      if (!checkOldPassword) {
        throw new AppError("Combinação de senhas erradas")
      }
      user.password = await hash(password, 10)
    }

    user.name = name
    user.email = email
    await userRepository.save(user)
    return user
  }
}
