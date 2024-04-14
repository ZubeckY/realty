import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User, Agency } from "./index"
import * as typeorm from "typeorm"

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Стадия выполнения', nullable: true })
  stage?: string

  @Column({ comment: 'Комментарий', nullable: true })
  comment?: string

  /* Менеджер */
  @ManyToOne(() => User, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  manager?: typeorm.Relation<User> | null

  /* Исполнительное лицо */
  @ManyToOne(() => User, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user?: typeorm.Relation<User> | null

  @ManyToOne(() => Agency, (agency) => agency.id, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  agency?: typeorm.Relation<Agency> | null

  @Column({ comment: 'Завершён', default: false })
  endStatus?: boolean

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}