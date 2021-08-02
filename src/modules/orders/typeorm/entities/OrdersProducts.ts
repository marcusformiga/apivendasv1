import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Product } from "../../../products/typeorm/entities/Product"
import { Order } from "./Order"

// tabela pivot
@Entity("ordersproducts")
export class OrdersProducts {
  @PrimaryGeneratedColumn("uuid")
  id: string
  @Column("decimal")
  price: number
  @Column("int")
  quantity: number
  @Column()
  order_id: string
  @Column()
  product_id: string
  @ManyToOne(() => Order, order => order.orderproducts)
  @JoinColumn({ name: "order_id" })
  order: Order
  @ManyToOne(() => Product, product => product.orderproducts)
  @JoinColumn({ name: "product_id" })
  product: Product
  @CreateDateColumn()
  created_at: Date
  @UpdateDateColumn()
  updated_at: Date
}
