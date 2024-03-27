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

  @Column('int', { width: 20, comment: 'ИНН организации' })
  inn?: number

  @Column('int', { width: 20, comment: 'Корпоративный телефон' })
  phone?: number

  @Column('varchar', { length: 100, comment: 'Корпоративный email' })
  email?: string

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  ownerUser!: typeorm.Relation<User>

  @OneToOne(() => File, (file) => file.id, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  watermark?: typeorm.Relation<File> | null

  @Column({ default: true, comment: 'Активное агентство' })
  isActiveAgency!: boolean

  @Column({ default: false, comment: 'Я согласен с условиями использования' })
  IAgreeToTermsOfUse!: boolean

  @Column({ default: false, comment: 'Я согласен с политикой конфиденциальности' })
  IAgreeToPrivacyPolicy!: boolean

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
