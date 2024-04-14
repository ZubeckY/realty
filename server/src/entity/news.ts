import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable, ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User, Agency, File } from './index.js'
import * as typeorm from 'typeorm'

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Текст поста' })
  text!: string

  @Column({ comment: 'Видео с ютуб', nullable: true })
  youtube?: string

  @Column('varchar', { comment: 'Тэги поста', nullable: true })
  tags?: string

  @ManyToMany(() => File, (file) => file.id, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  images?: typeorm.Relation<File>[]

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
