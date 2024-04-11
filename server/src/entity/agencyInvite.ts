import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import * as typeorm from 'typeorm'
import { Agency, User } from "./index.js";

@Entity()
export class AgencyInvite {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ commment: 'hash', unique: true })
  hash!: string

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user!: typeorm.Relation<User>

  @ManyToOne(() => Agency, (agency) => agency.id, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  agency!: typeorm.Relation<Agency>

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
