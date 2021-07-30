// para um usuario fazer upload no seu avatar precisa está autenticado na aplicação
// não devemos deixar arquivos acumular no nosso hd (por isso a verificação se ja existe arquivos)
import path from "path"
import fs from "fs"
import { AppError } from "../../../shared/errors/AppError"
import { User } from "../typeorm/entities/User"
import { UserRepository } from "../typeorm/repository/Users"
import { getCustomRepository } from "typeorm"
import uploadConfig from "../../../shared/config/upload"

interface IRequest {
  user_id: string
  avatarFileName: string
}

export class UploadUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User| undefined> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findById(user_id)
    if (!user) {
      throw new AppError(`Usuário com id ${user_id} não foi encontrado`, 404)
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath)
      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }

    }
    user.avatar = avatarFileName
    await userRepository.save(user)
    return user
  }
}
