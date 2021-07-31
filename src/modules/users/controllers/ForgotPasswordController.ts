import { Request, Response } from "express"
import { SendForgotPasswordEmailService } from "../services/SendForgotPasswordEmailService"

export class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body
    const sendForgotEmail = new SendForgotPasswordEmailService()
    await sendForgotEmail.execute({ email })
    return response.status(204).json()
  }
}
