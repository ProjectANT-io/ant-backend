/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import ICompany from "./ICompany";
import IProject from "./IProject";

@Entity()
export default class Company implements ICompany {
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
  company_culture!: string;

  @OneToMany("Project", "company")
  projects!: IProject[];
}
