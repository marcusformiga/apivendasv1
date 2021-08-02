import { Router } from "express"
import { OrderController } from "../controllers/OrderController"

export const orderRoutes = Router()
const orderController = new OrderController()

orderRoutes.get("/:id", orderController.listOne)
orderRoutes.post("/", orderController.create)
