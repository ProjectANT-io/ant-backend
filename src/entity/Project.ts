/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  UpdateDateColumn,
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

  @Column({ default: "available" })
  project_type!: string;

  @Column({ default: "NEW" })
  status!: string;

  @ManyToOne("Business", "projects")
  business!: IBusiness["id"];

  // TODO to implement later
  // @ManyToOne("Business", "user")
  // employee!: IUser["id"];

  // @ManyToMany("Skill")
  // required_skills!: ISkill[];

  @Column()
  required_skills!: string[];

  @Column({ type: "timestamptz" })
  start_date!: string;

  @Column({ type: "timestamptz" })
  due_date!: string;

  // @Column()
  // stream!: string;

  @Column({ type: "integer" })
  hourly_rate!: number;

  @Column()
  location!: string;

  @Column()
  payment_method!: string;

  // @Column()
  // remote!: boolean;

  // @Column("json", { default: [] })
  // milestones!: IProjectMilestone[];

  @Column({ type: "integer", default: 0 })
  applicants!: number;

  @Column({ nullable: true })
  image!: string;

  @Column({ nullable: true })
  introduction!: string;

  @Column({ nullable: true })
  industry!: string;

  @Column({ nullable: true })
  role!: string;

  @Column({ nullable: true })
  project_manager!: number;

  @Column({ nullable: true })
  cover_image!: string;

  @Column({ nullable: true })
  client_image!: string;

  @Column({ nullable: true })
  timeline!: string;

  @Column({ nullable: true })
  length!: string;

  @Column({ nullable: true })
  created_by!: string;

  @Column({ nullable: true })
  logo!: string;

  @Column({ nullable: true })
  client!: string;

  @Column({ nullable: true, default: [] })
  outputs!: string[];

  @Column({ nullable: true })
  compensation!: string;

  @Column({ nullable: true })
  timezone!: string;

  @Column({ nullable: true, default: [] })
  tasks!: string[];

  @Column({ nullable: true })
  student!: number;

  @UpdateDateColumn()
  updated!: string;
}
