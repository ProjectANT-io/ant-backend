/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import ICompany from "./ICompany";
import IProject from "./IProject";

@Entity()
export default class Project implements IProject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @ManyToOne("Company", "projects")
  company_id!: ICompany;

  // TODO to implement later
  // @ManyToOne("Company", "user")
  // employee_id: IUser;

  // @ManyToMany("Skill")
  // skills!: ISkill[];

  @Column({ nullable: true })
  duration!: string;

  @Column({ type: "integer", nullable: true })
  stipend!: number;

  @Column({ type: "timestamptz", nullable: true })
  start_date!: string;
}
