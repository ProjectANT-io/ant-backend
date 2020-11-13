/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import IBusiness from "./IBusiness";
import IProject from "./IProject";
import IProjectMilestone from "./IProjectMilestone";
import ISkill from "./ISkill";
import IUser from "./IUser";

@Entity()
export default class Project implements IProject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @ManyToOne("Business", "projects")
  business!: IBusiness["id"];

  // TODO to implement later
  @ManyToOne("Business", "user")
  employee!: IUser["id"];

  @ManyToMany("Skill")
  required_skills!: ISkill[];

  @Column()
  duration!: string;

  @Column({ type: "integer" })
  stipend!: number;

  @Column({ type: "timestamptz" })
  start_date!: string;

  @Column()
  stream!: string;

  @Column({ nullable: true })
  industry!: string;

  @Column({ type: "integer" })
  hourly_price!: number;

  @Column()
  location!: string;

  @Column()
  payment_type!: string;

  @Column()
  remote!: boolean;

  @Column("json", { default: [] })
  milestones!: IProjectMilestone[];
}
