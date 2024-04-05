import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agency } from './index.js'
import * as typeorm from "typeorm"

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

  @ManyToOne(() => Agency, (agency) => agency.id, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  agency?: typeorm.Relation<Agency> | null

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
