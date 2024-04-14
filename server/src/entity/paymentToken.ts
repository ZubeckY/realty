import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agency, PaymentTransaction, User } from './index.js'
import * as typeorm from 'typeorm'

@Entity()
export class PaymentToken {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false, unique: true, comment: 'Токен оплаты' })
  token!: string

  @Column({ comment: 'Токен используется у пользователя' })
  usable!: boolean

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user!: typeorm.Relation<User>

  @ManyToOne(() => Agency, (agency) => agency.id, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  agency!: typeorm.Relation<Agency>

  @ManyToOne(() => PaymentTransaction, (payTok) => payTok.id, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  transaction!: typeorm.Relation<PaymentTransaction>

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
