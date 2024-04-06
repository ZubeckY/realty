import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agency } from "./agency";
import * as typeorm from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Agency, (agency) => agency.id, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  agency?: typeorm.Relation<Agency>
}
