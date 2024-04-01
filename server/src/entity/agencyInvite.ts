import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import * as typeorm from 'typeorm'
import { Agency, User } from "./index.js";

@Entity()
export class AgencyInvite {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  user!: typeorm.Relation<User>

  @ManyToOne(() => Agency, (agency) => agency.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  agency!: typeorm.Relation<Agency>

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
