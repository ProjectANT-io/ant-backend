/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import IBusiness from "./IBusiness";
import IProject from "./IProject";

@Entity()
export default class Project implements IProject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @ManyToOne("Business", "projects")
  business_id!: IBusiness;

  // TODO to implement later
  // @ManyToOne("Business", "user")
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
