import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/AppError"
import jwt from "jsonwebtoken"
import { authJwt } from "../config/auth"

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new AppError("Não existe token jwt", 401)
  }
  const [bearer, token] = authHeader.split(" ")

  try {
    const decodedToken = jwt.verify(token, authJwt.jwt.secret)
    const { sub } = decodedToken as ITokenPayload
    request.user = {
      id: sub,
    }
    return next()
  } catch {
    throw new AppError(`Token jwt inválido`, 401)
  }
}
