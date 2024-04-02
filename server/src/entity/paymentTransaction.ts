import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import * as typeorm from 'typeorm'
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

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
