import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agency, Lead, Realty } from "./index"
import * as typeorm from 'typeorm'

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Стадия в воронке', nullable: true })
  stage?: string

  @Column({ comment: 'Финальная сумма сделки', nullable: true })
  endPrice?: number

  @Column({ comment: 'Завершён', default: false })
  endStatus?: boolean

  @ManyToOne(() => Lead, (lead) => lead.id, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  lead?: typeorm.Relation<Lead>

  @ManyToOne(() => Realty, (realty) => realty.id, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  realty?: typeorm.Relation<Realty>

  @ManyToOne(() => Agency, (agency) => agency.id, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  agency?: typeorm.Relation<Agency>

  @Column({ comment: 'Комментарий', nullable: true })
  comment?: string

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
