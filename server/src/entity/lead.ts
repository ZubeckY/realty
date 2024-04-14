import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Client, Agency, User } from './index.js'
import { Category } from '../types/category.js'
import * as typeorm from 'typeorm'

@Entity()
export class Lead {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Client, (client) => client.id, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  client?: typeorm.Relation<Client> | null

  @Column({
    comment: 'Тип недвижимости',
    type: 'enum',
    enum: Category,
    nullable: true,
  })
  realtyType?: Category

  @Column({ comment: 'Район', nullable: true })
  district?: string

  @Column({ comment: 'Микрорайон', nullable: true })
  microDistrict?: string

  @Column({ comment: 'Готовность объекта', nullable: true })
  objectReadiness?: string

  @Column({ comment: 'Цель покупки', nullable: true })
  purposeOfPurchase?: string

  @Column({ comment: 'Способ оплаты', nullable: true })
  paymentMethod?: string

  @Column({ comment: 'Стадия в воронке', nullable: true })
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

  /* Ответственный за сделку (Исполнительное лицо) */
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
