/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import IBusiness from "./IBusiness";
import IProject from "./IProject";

@Entity()
export default class Business implements IBusiness {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  logo!: string;

  @Column({ nullable: true })
  headline!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  location!: string;

  @Column({ nullable: true })
  industry!: string;

  @Column({ nullable: true })
  culture!: string;

  @OneToMany("Project", "business")
  projects!: IProject[];
}
