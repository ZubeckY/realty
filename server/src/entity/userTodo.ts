import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { User } from './index.js'

@Entity()
export class UserTodo {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Текст поста' })
  text?: string

  @Column({ comment: 'Готовность', default: false })
  complete?: boolean

  @ManyToOne(() => User, { nullable: false })
  user!: Relation<User>
}
