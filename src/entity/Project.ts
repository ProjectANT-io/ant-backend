/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import isNullGenerator from "../utils/isNullGenerator";
import IApplication from "./IProjectApplication";
import IBusiness from "./IBusiness";
import IProject, {
  projectAutoGeneratedCols,
  projectRequiredCols,
} from "./IProject";
import IProjectMilestone from "./IProjectMilestone";
import IUser from "./IUser";

const isNullable = isNullGenerator(
  projectRequiredCols,
  projectAutoGeneratedCols
);

@Entity()
export default class Project implements IProject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: isNullable("title") })
  title!: string;

  @Column({ nullable: isNullable("description") })
  description!: string;

  @Column({ default: "available", nullable: isNullable("project_type") })
  project_type!: string;

  @Column({ default: "Unassigned", nullable: isNullable("status") })
  status!: string;

  @ManyToOne("Business", "projects")
  business!: IBusiness;

  @ManyToOne("User", "projects")
  employee!: IUser;

  @ManyToOne("User", "projects")
  student!: IUser;

  @Column("text", { array: true, default: {} })
  required_skills!: string[];

  @Column("text", { array: true, default: [] })
  external_links!: string[];

  @Column({ nullable: isNullable("duration") })
  duration!: number;

  @Column({ type: "integer", nullable: isNullable("stipend") })
  stipend!: number;

  @Column({ type: "timestamptz", nullable: isNullable("start_date") })
  start_date!: string;

  @Column({ type: "timestamptz", nullable: isNullable("due_date") })
  due_date!: string;

  @Column({ nullable: isNullable("stream") })
  stream!: string;

  @Column("text", { array: true, default: {} })
  project_detail!: string[];

  @Column("text", { nullable: isNullable("project_length") })
  project_length!: string;

  @Column({ type: "integer", nullable: isNullable("hourly_price") })
  hourly_price!: number;

  @Column({ nullable: isNullable("location") })
  location!: string;

  @Column({ nullable: isNullable("payment_type") })
  payment_type!: string;

  @Column({ nullable: isNullable("remote") })
  remote!: boolean;

  @Column("json", { default: [] })
  milestones!: IProjectMilestone[];

  @OneToMany("ProjectApplication", "project")
  applications!: IApplication[];

  @Column({ nullable: isNullable("image") })
  image!: string;

  @Column({ nullable: isNullable("introduction") })
  introduction!: string;

  @Column({ nullable: isNullable("industry") })
  industry!: string;

  @Column({ nullable: isNullable("role") })
  role!: string;

  @Column({ nullable: isNullable("created_by") })
  created_by!: string;

  @UpdateDateColumn()
  updated!: string;
}
