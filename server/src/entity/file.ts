import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { User } from './index.js'

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Размер файла' })
  size!: number

  @Column({ nullable: true, comment: 'Индекс сортировки' })
  sort?: number

  @Column({ comment: 'Путь/ссылка на фото' })
  path!: string

  @Column({ default: true, comment: 'Опубликованный файл' })
  isPublished?: boolean

  @Column({ default: false, comment: 'Удалённый файл' })
  isDeleted?: boolean

  @ManyToOne(() => User)
  user?: Relation<User>

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
