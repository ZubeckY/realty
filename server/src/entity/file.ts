import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './index.js'
import * as typeorm from 'typeorm'

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Размер файла', nullable: true })
  size?: number

  @Column({ comment: 'Индекс сортировки', nullable: true })
  sort?: number

  @Column({ comment: 'Путь/ссылка на фото', nullable: true, })
  path?: string

  @Column({ comment: 'Использующийся файл', default: false })
  usage?: boolean

  @Column({ default: true, comment: 'Опубликованный файл' })
  isPublished?: boolean

  @Column({ default: false, comment: 'Удалённый файл' })
  isDeleted?: boolean

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user!: typeorm.Relation<User>

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
