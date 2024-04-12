import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Страна', default: 'Россия' })
  country?: string

  @Column({ comment: 'Регион, область', nullable: true })
  region?: string

  @Column({ comment: 'РегионId', nullable: true })
  regionId?: string

  @Column({ comment: 'Город', nullable: true })
  city?: string

  @Column({ comment: 'ГородId', nullable: true })
  cityId?: string

  @Column({ comment: 'Улица', nullable: true })
  street?: string

  @Column({ comment: 'Номер дома', nullable: true })
  number?: string

  @Column('varchar', { comment: 'Номер квартиры', nullable: true })
  flat?: string | null

  @Column('decimal', { comment: 'Широта', nullable: true })
  lat?: number

  @Column('decimal', { comment: 'Долгота', nullable: true })
  lon?: number
}
