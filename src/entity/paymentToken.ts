import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PaymentToken {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false, unique: true, comment: 'Значение' })
  value!: string

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
