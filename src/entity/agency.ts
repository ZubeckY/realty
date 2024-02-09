import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { Address, File, User } from './index.js'
import { AgencyLegalForm } from '../types/agencyLegalForm.js'

@Entity()
export class Agency {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar', { comment: 'Название организации' })
  title!: string

  @OneToOne(() => Address)
  address!: Relation<Address>

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

  @ManyToOne(() => User, { nullable: false })
  ownerUser!: Relation<User>

  @OneToOne(() => File, { nullable: true })
  @JoinColumn()
  watermark?: Relation<File> | null

  @Column({ default: true, comment: 'Активное агентство' })
  isActiveAgency!: boolean

  @Column({ default: false, comment: 'Я согласен с условиями использования' })
  IAgreeToTermsOfUse!: boolean

  @Column({ default: false, comment: 'Я согласен с политикой конфиденциальности' })
  IAgreeToPrivacyPolicy!: boolean

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
