import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Agency, Lead, Realty } from "./index"
import * as typeorm from 'typeorm'

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Стадия в воронке', nullable: true })
  status?: string

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
}
