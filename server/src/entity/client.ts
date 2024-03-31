import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Имя фамилия' })
  fullName?: string

  @Column({ comment: 'Телефон' })
  phone?: string

  @Column({ comment: 'Компания' })
  company?: string

  @Column({ comment: 'Комментарий' })
  comment?: string

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
