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

  @Column() // required
  title!: string;

  @Column({ nullable: true })
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

  @Column("text", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
  required_skills!: string[];

  @Column({ type: "timestamptz", nullable: true })
  start_date!: string;

  @Column({ type: "timestamptz", nullable: true })
  due_date!: string;

  // @Column()
  // stream!: string;

  @Column({ type: "integer", nullable: true })
  hourly_rate!: number;

  @Column({ nullable: true })
  location!: string;

  @Column({ nullable: true })
  payment_method!: string;

  // @Column()
  // remote!: boolean;

  // @Column("json", { default: ()=>'array[]::integer[]' })
  // milestones!: IProjectMilestone[];

  @Column({ type: "integer", default: 0, nullable: true })
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

  @Column("text", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
  outputs!: string[];

  @Column({ nullable: true })
  compensation!: string;

  @Column({ nullable: true })
  timezone!: string;

  @Column("text", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
  tasks!: string[];

  @Column("integer", { nullable: true })
  student!: number;

  @UpdateDateColumn()
  updated!: string;
}
