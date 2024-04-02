import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import * as typeorm from 'typeorm'
import { Address, File, User } from './index.js'
import { AgencyLegalForm } from '../types/agencyLegalForm.js'

@Entity()
export class Agency {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar', { comment: 'Название организации' })
  title!: string

  @OneToOne(() => Address, (address) => address.id, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  address?: typeorm.Relation<Address>

  @Column({
    comment: 'Правовая форма',
    type: 'enum',
    enum: AgencyLegalForm,
    default: AgencyLegalForm['fiz'],
  })
  legalForm?: AgencyLegalForm

  @Column('int', { width: 40, comment: 'ИНН организации', unique: true })
  inn?: number

  @Column('varchar', { length: 20, comment: 'Корпоративный телефон', nullable: true })
  phone?: string

  @Column('varchar', { length: 100, comment: 'Корпоративный email', unique: true })
  email?: string

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  ownerUser!: typeorm.Relation<User>

  @OneToOne(() => File, (file) => file.id, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  watermark?: typeorm.Relation<File> | null

  @Column({ default: true, comment: 'Активное агентство' })
  isActiveAgency!: boolean

  @Column({ comment: 'Код приглашения' })
  inviteCode!: string

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
