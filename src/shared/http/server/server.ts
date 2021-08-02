import "reflect-metadata"
import "express-async-errors"
import express, { NextFunction, Request, Response } from "express"
import { pagination } from "typeorm-pagination"
import { AppError } from "../../errors/AppError"
import { errors } from "celebrate"
import "../../database/connection"
import { routes } from "../routes"
const app = express()
const port = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(pagination)
app.use(routes)
app.use(errors())
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      })
    }
    console.log(error)
    return response.status(500).json({
      status: "error",
      message: "Erro interno do servidor",
    })
  },
)

app.get("/test", (request, response) => {
  response.send("Rota de teste")
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
