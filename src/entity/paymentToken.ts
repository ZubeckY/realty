import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Agency } from './index.js'

@Entity()
export class PaymentToken {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false, unique: true, comment: 'Значение' })
  value!: string

  @ManyToOne(() => Agency)
  user!: Relation<Agency>

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
