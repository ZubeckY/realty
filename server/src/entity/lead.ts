import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User, Client, Agency } from './index.js'
import * as typeorm from 'typeorm'
import { Category } from "../types/category";

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

  @Column({ comment: 'Район' })
  district?: string

  @Column({ comment: 'Микрорайон' })
  microDistrict?: string

  @Column({ comment: 'Готовность объекта' })
  objectReadiness?: string

  @Column({ comment: 'Цель покупки' })
  purposeOfPurchase?: string

  @Column({ comment: 'Способ оплаты' })
  paymentMethod?: string

  @Column({ comment: 'Стадия в воронке' })
  status?: string

  @Column({ comment: 'Комментарий', nullable: true })
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
