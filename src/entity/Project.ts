import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
