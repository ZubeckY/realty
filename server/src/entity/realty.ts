import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Address, File, User } from './index.js'
import { Category } from '../types/category.js'
import { OperationType } from '../types/operationType.js'
import { HouseType } from '../types/houseType.js'
import { MarketType } from '../types/marketType.js'
import { StatusType } from '../types/statusType.js'
import { PropertyRights } from '../types/propertyRights.js'
import { Decoration } from '../types/decoration.js'
import { RoomType } from '../types/roomType.js'
import { Renovation } from '../types/renovation.js'
import { AdStatus } from '../types/adStatus.js'
import { DealType } from '../types/dealType.js'
import { ObjectTypeCommerce, ObjectTypeGarage, ObjectTypeHouse, ObjectTypeLand } from '../types/objectType.js'
import { Layout } from '../types/layout.js'
import { Entrance } from '../types/entrance.js'
import { BuildingType } from '../types/buildingType.js'
import { LandStatus } from '../types/landStatus.js'
import { TransactionType } from '../types/transactionType.js'
import { WallsType } from '../types/wallsType.js'
import { BalconyOrLoggiaMulti } from '../types/balconyOrLoggiaMulti.js'
import { ViewFromWindows } from '../types/viewFromWindows.js'
import { Courtyard } from '../types/courtyard.js'
import { BathroomMulti } from '../types/bathroomMulti.js'
import { SaleOptions } from '../types/saleOptions.js'
import { NDAdditionally } from '../types/NDAdditionally.js'
import { InHouse } from '../types/inHouse.js'
import { SSAdditionally } from '../types/SSAdditionally.js'
import { ContactMethod } from '../types/contactMethhod.js'

@Entity()
export class Realty {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Описание' })
  description!: string

  @Column({
    comment: 'Категория',
    type: 'enum',
    enum: Category,
  })
  category!: Category

  @ManyToOne(() => Address, { nullable: true })
  address?: Relation<Address>

  @Column({ comment: 'Цена' })
  price!: number

  @Column({ nullable: true, comment: 'Этаж' })
  floor?: number

  @Column({ nullable: true, comment: 'Этажность' })
  floors?: number

  @Column({ nullable: true, comment: 'Количество комнат' })
  rooms?: number

  @Column('float', { nullable: true, comment: 'Высота потолков' })
  ceilingHeight?: number

  @Column({ nullable: true, comment: 'Площадь' })
  square?: number

  @Column('float', { nullable: true, comment: 'Прощадь кухни' })
  kitchenSpace?: number

  @Column('float', { nullable: true, comment: 'Жилая площадь' })
  livingSpace?: number

  @Column({
    comment: 'Материал стен',
    type: 'enum',
    enum: WallsType,
    nullable: true,
  })
  wallsType?: WallsType

  @Column({
    comment: 'Тип конмат',
    type: 'enum',
    enum: RoomType,
    nullable: true,
  })
  roomType?: RoomType

  @Column({
    comment: 'Тип объявления',
    type: 'enum',
    enum: OperationType,
    default: OperationType['selling'],
  })
  operationType!: OperationType

  @Column({
    comment: 'Тип дома',
    type: 'enum',
    enum: HouseType,
    nullable: true,
  })
  houseType?: HouseType

  @Column('float', { nullable: true, comment: 'Площадь участка' })
  landArea?: number

  @Column({
    comment: 'Статус участка',
    type: 'enum',
    enum: LandStatus,
    nullable: true,
  })
  landStatus?: LandStatus

  @Column({
    comment: 'Принадлежность квартиры к рынку',
    type: 'enum',
    enum: MarketType,
    nullable: true,
  })
  marketType?: MarketType

  @Column({
    comment: 'Статус недвижимости',
    type: 'enum',
    enum: StatusType,
    nullable: true,
  })
  status?: StatusType

  @Column({
    comment: 'Право собственности',
    type: 'enum',
    enum: PropertyRights,
    default: PropertyRights['mediator'],
  })
  propertyRights!: PropertyRights

  @Column({ nullable: true, comment: 'Объект новостройки' })
  newDevelopmentID?: number

  @Column({
    comment: 'Отделка',
    type: 'enum',
    enum: Decoration,
    nullable: true,
  })
  decoration?: Decoration

  @Column({
    comment: 'Ремонт',
    type: 'enum',
    enum: Renovation,
    nullable: true,
  })
  renovation?: Renovation

  @Column({
    comment: 'Услуга продвижения на Авито',
    type: 'enum',
    enum: AdStatus,
    nullable: true,
  })
  adStatus?: AdStatus

  @Column({ nullable: true, comment: 'Год постройки' })
  builtYear?: number

  @ManyToOne(() => File, { nullable: true })
  images?: Relation<File>[]

  @Column({ nullable: true, comment: 'Ссылка на видео' })
  videoURL?: string

  @Column({
    comment: 'Тип сделки',
    type: 'enum',
    enum: DealType,
    nullable: true,
  })
  dealType?: DealType

  @Column({
    comment: 'Вид объекта',
    type: 'enum',
    enum: ObjectTypeHouse || ObjectTypeLand || ObjectTypeGarage || ObjectTypeCommerce,
    nullable: true,
  })
  objectType?: ObjectTypeHouse | ObjectTypeLand | ObjectTypeGarage | ObjectTypeCommerce

  @Column({ nullable: true, comment: 'Охрана объекта' })
  secured?: boolean

  @Column({
    comment: 'Планировка',
    type: 'enum',
    enum: Layout,
    nullable: true,
  })
  layout?: Layout

  @Column({
    comment: 'Вход',
    type: 'enum',
    enum: Entrance,
    nullable: true,
  })
  entrance?: Entrance

  @Column({
    comment: 'Тип здания',
    type: 'enum',
    enum: BuildingType,
    nullable: true,
  })
  buildingType?: BuildingType

  @Column({
    comment: 'Балконы и лоджия',
    type: 'enum',
    enum: BalconyOrLoggiaMulti,
    array: true,
    nullable: true,
  })
  balconyOrLoggia?: BalconyOrLoggiaMulti[]

  @Column({
    comment: 'Бытовая техника',
    type: 'enum',
    enum: BalconyOrLoggiaMulti,
    array: true,
    nullable: true,
  })
  leaseAppliances?: BalconyOrLoggiaMulti[]

  @Column({
    comment: 'Вид из окна',
    type: 'enum',
    enum: ViewFromWindows,
    array: true,
    nullable: true,
  })
  viewFromWindows?: ViewFromWindows[]

  @Column({ nullable: true, comment: 'Пассажирский лифт' })
  passengerElevator?: number

  @Column({ nullable: true, comment: 'Грузовой лифт' })
  freightElevator?: number

  @Column({
    comment: 'Двор',
    type: 'enum',
    enum: Courtyard,
    array: true,
    nullable: true,
  })
  courtyard?: Courtyard[]

  @Column({
    comment: 'Санузел',
    type: 'enum',
    enum: BathroomMulti,
    array: true,
    nullable: true,
  })
  bathroomMulti?: BathroomMulti[]

  @Column({
    comment: 'Способ продажи дополнительно',
    type: 'enum',
    enum: SaleOptions,
    array: true,
    nullable: true,
  })
  saleOptions?: SaleOptions[]

  @Column({
    comment: 'Дополнительно',
    type: 'enum',
    enum: NDAdditionally,
    array: true,
    nullable: true,
  })
  NDAdditionally?: NDAdditionally[]

  @Column({
    comment: 'Дополнительно',
    type: 'enum',
    enum: SSAdditionally,
    array: true,
    nullable: true,
  })
  SSAdditionally?: SSAdditionally[]

  @Column({
    comment: 'В доме',
    type: 'enum',
    enum: InHouse,
    array: true,
    nullable: true,
  })
  inHouse?: InHouse[]

  @Column({
    comment: 'Тип сделки',
    type: 'enum',
    enum: TransactionType,
    nullable: true,
  })
  transactionType?: TransactionType

  @Column({ nullable: true, comment: 'Интернет звонки' })
  internetCalls?: boolean

  @Column({
    comment: 'Способ связи',
    type: 'enum',
    enum: ContactMethod,
    array: true,
    nullable: true,
  })
  contactMethod?: ContactMethod[]

  @ManyToOne(() => User)
  manager?: Relation<User>

  @CreateDateColumn({ comment: 'Дата создания' })
  created!: Date
}
