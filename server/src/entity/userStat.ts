import { Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { User } from './index.js'

@Entity()
export class UserStat {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, { nullable: false })
  user!: Relation<User>
}
