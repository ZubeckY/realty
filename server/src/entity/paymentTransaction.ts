import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { User, Agency } from './index.js'

@Entity()
export class PaymentTransaction {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'uuid хэш оплаты' })
  uuid!: string

  @Column({ comment: 'Сумма оплаты' })
  price!: number

  @Column({ default: false, comment: 'Статус оплаты' })
  payment!: boolean

  @ManyToOne(() => User)
  user!: Relation<User>

  @ManyToOne(() => Agency)
  agency!: Relation<Agency>

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
