import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as typeorm from 'typeorm'
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

  @Column('varchar', { length: 100, comment: 'Отчество', nullable: true })
  patronymic?: string

  @Column({ comment: 'Дата рождения', nullable: true })
  dateBirthday?: Date

  @Column({
    comment: 'Гражданство',
    type: 'enum',
    enum: Nationality,
    default: Nationality['RUSSIA'],
    nullable: true,
  })
  nationality?: Nationality

  @ManyToOne(() => File, (file) => file.path, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  photo?: typeorm.Relation<File>

  @Column('varchar', { length: 20, comment: 'Телефон', nullable: true })
  phone?: string

  @Column('varchar', { length: 100, comment: 'Email' })
  email!: string

  @Column('varchar', { comment: 'Пароль' })
  password!: string

  @ManyToOne(() => Address, (address) => address.id, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  address?: typeorm.Relation<Address>

  @Column({
    comment: 'Роль',
    type: 'enum',
    enum: Role,
    default: Role['UNKNOWN'],
    nullable: false,
  })
  role!: Role

  @ManyToOne(() => Agency, (agency) => agency.id, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  agency?: typeorm.Relation<Agency>

  @Column({ nullable: true, comment: 'Нужно обновить пароль' })
  needRefreshPass?: boolean

  @Column({ nullable: true, comment: 'Код активации' })
  activationCode?: string

  @Column({ unique: true, nullable: true, comment: 'Ссылка для активации' })
  activationLink?: string

  @Column({ default: false, comment: 'Активированный аккаунт' })
  IsActivatedAccount!: boolean

  @Column({ default: false, comment: 'Я согласен с условиями использования' })
  IAgreeToTermsOfUse!: boolean

  @Column({ default: false, comment: 'Я согласен с политикой конфиденциальности' })
  IAgreeToPrivacyPolicy!: boolean

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
