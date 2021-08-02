import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { OrdersProducts } from "../../../orders/typeorm/entities/OrdersProducts"

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string
  @Column()
  name: string
  @Column("decimal")
  price: number
  @Column("int")
  quantity: number
  @OneToMany(() => OrdersProducts, orderproducts => orderproducts.product)
  orderproducts: OrdersProducts[]
  @CreateDateColumn()
  created_at: Date
  @UpdateDateColumn()
  updated_at: Date
}
