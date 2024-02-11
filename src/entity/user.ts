import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Agency, Address, File } from './index.js'
import { Nationality } from '../types/nationality.js'
import { Role } from '../types/role.js'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar', { length: 100, comment: 'Имя' })
  firstName!: string

  @Column('varchar', { length: 100, comment: 'Фамилия' })
  lastName!: string

  @Column('varchar', { length: 100, comment: 'Отчество' })
  patronymic?: string

  @Column({ comment: 'Дата рождения' })
  dateBirthday?: Date

  @Column({
    comment: 'Гражданство',
    type: 'enum',
    enum: Nationality,
    default: Nationality['RUSSIA'],
  })
  nationality!: Nationality

  @ManyToOne(() => File, (file) => file.path)
  photo?: Relation<File>

  @Column('int', { width: 20, comment: 'Телефон' })
  phone?: number

  @Column('varchar', { length: 100, comment: 'Email' })
  email?: string

  @Column('varchar', { comment: 'Пароль' })
  password!: string

  @ManyToOne(() => Address, (address) => address)
  address?: Relation<Address>

  @Column({
    comment: 'Роль',
    type: 'enum',
    enum: Role,
    default: Role['UNKNOWN'],
  })
  role!: Role

  @ManyToOne(() => Agency, (agency) => agency.id)
  agency?: Relation<Agency>

  @Column({ nullable: true, comment: 'Код активации' })
  activationCode?: number

  @Column({ nullable: true, comment: 'Ссылка для активации' })
  activationLink?: string

  @Column({ default: false, comment: 'Активированный аккаунт' })
  IsActivatedAccount!: boolean

  @Column({ default: false, comment: 'Я согласен с условиями использования' })
  IAgreeToTermsOfUse!: boolean

  @Column({ default: false, comment: 'Я согласен с политикой конфиденциальности' })
  IAgreeToPrivacyPolicy!: boolean
}
