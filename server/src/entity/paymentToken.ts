import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Agency, PaymentTransaction, User } from "./index.js";

@Entity()
export class PaymentToken {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false, unique: true, comment: 'Токен оплаты' })
  token!: string

  @Column({ comment: 'Токен используется у пользователя' })
  usable!: boolean

  @ManyToOne(() => User)
  user!: Relation<User>

  @ManyToOne(() => Agency)
  agency!: Relation<Agency>

  @ManyToOne(() => PaymentTransaction)
  transaction!: Relation<PaymentTransaction>

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
