import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User, Client } from './index.js'
import * as typeorm from 'typeorm'

@Entity()
export class Lead {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Комментарий', nullable: true })
  comment?: string

  @Column({ comment: 'Стадия в воронке' })
  stage!: string

  @ManyToOne(() => Client, (client) => client.id, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  client?: typeorm.Relation<Client> | null

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  manager?: typeorm.Relation<User> | null

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
