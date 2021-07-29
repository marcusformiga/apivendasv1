export class AppError {
  constructor(public message: string, public statusCode: number = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}
