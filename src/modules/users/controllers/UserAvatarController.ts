import { Request, Response } from "express"
import { UploadUserAvatarService } from "../services/UploadUserAvatarService"

export class UserAvatarController {
  public async upload(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const avatarFileName = request.file?.filename as string
    const uploadAvatar = new UploadUserAvatarService()
    const user = await uploadAvatar.execute({ user_id, avatarFileName })
    return response.json(user)
  }
}
