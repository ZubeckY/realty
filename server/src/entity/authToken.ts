import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn
} from "typeorm";
import { User } from './index.js'

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false, comment: 'IP' })
  ip!: string

  @Column({ nullable: false, comment: 'Устройство входа' })
  device!: string

  @Column({ nullable: false, comment: 'Браузер + ОС' })
  userAgent!: string

  @Column({ nullable: false, unique: true, comment: 'Значение' })
  value!: string

  @ManyToOne(() => User)
  user!: Relation<User>

  @Column({ comment: 'Последний онлайн', default: () => 'NOW()', })
  lastSeen!: Date

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date

}
