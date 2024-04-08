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
