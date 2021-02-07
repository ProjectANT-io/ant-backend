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
  business!: IBusiness;

  @ManyToOne("Business", "user")
  employee!: IUser;

  @ManyToOne("User", "projects")
  student!: IUser;

  @Column("text", { array: true })
  required_skills!: string[];

  @Column()
  duration!: number;

  @Column({ type: "integer", nullable: true })
  stipend!: number;

  @Column({ type: "timestamptz" })
  start_date!: string;

  @Column({ type: "timestamptz" })
  due_date!: string;

  @Column()
  stream!: string;

  @Column("text", { array: true })
  project_detail!: string[];

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

  @UpdateDateColumn()
  updated!: string;
}
