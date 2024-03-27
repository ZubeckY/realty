import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as typeorm from 'typeorm'
import { User } from './index.js'

@Entity()
export class UserTodo {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Текст поста' })
  text?: string

  @Column({ comment: 'Готовность', default: false })
  complete?: boolean

  @ManyToOne(() => User, {
    cascade: true,
    nullable: false
  })
  @JoinColumn()
  user!: typeorm.Relation<User>
}
