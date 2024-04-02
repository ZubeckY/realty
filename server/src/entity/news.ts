import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import * as typeorm from 'typeorm'
import { User, Agency } from './index.js'

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Текст поста' })
  text?: string

  @Column({ comment: 'Видео с ютуб', nullable: true })
  youtube?: string

  @Column('varchar', { array: true, comment: 'Тэги поста', nullable: true })
  tags?: string[]

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
