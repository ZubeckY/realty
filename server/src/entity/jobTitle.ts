import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Agency } from './index.js'
import * as typeorm from 'typeorm'

@Entity()
export class JobTitle {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Название должности' })
  title!: string

  @ManyToOne(() => Agency, (agency) => agency.id, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  agency?: typeorm.Relation<Agency>
}
