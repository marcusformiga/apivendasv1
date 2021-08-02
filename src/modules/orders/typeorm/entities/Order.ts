import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Customer } from "../../../customers/typeorm/entities/Customer"
import { OrdersProducts } from "./OrdersProducts"

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string
  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer
  @OneToMany(() => OrdersProducts, orderproducts => orderproducts.order, {
    cascade: true,
  })
  orderproducts: OrdersProducts[]
  @CreateDateColumn()
  created_at: Date
  @UpdateDateColumn()
  updated_at: Date
}
