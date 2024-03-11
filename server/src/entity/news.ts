import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { User, Agency } from './index.js'

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Текст поста' })
  text?: string

  @Column("varchar", { array: true, comment: 'Тэги поста' })
  tags?: string[]

  @ManyToOne(() => User, { nullable: false })
  user!: Relation<User>

  @ManyToOne(() => Agency, { nullable: false })
  agency!: Relation<Agency>

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
