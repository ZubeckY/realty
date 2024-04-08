import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ comment: 'Страна' })
  country?: string

  @Column({ comment: 'Регион, область' })
  region?: string

  @Column({ comment: 'РегионId' })
  regionId?: string

  @Column({ comment: 'Город' })
  city?: string

  @Column({ comment: 'ГородId' })
  cityId?: string

  @Column({ comment: 'Улица' })
  street?: string

  @Column({ comment: 'Номер дома' })
  number?: string

  @Column('varchar', { comment: 'Номер квартиры' })
  flat?: string | null

  @Column('decimal', { comment: 'Широта' })
  lat?: number

  @Column('decimal', { comment: 'Долгота' })
  lon?: number
}
