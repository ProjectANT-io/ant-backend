/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import IWorkExperience, { workExperienceRequiredCols } from "./IWorkExperience";
import IUser from "./IUser";
import isNullGenerator from "../utils/isNullGenerator";

const isNullable = isNullGenerator(workExperienceRequiredCols);

@Entity()
export default class WorkExperience implements IWorkExperience {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne("User", "WorkExperience")
  student!: IUser;

  @Column({ nullable: isNullable("location") })
  location!: string;

  @Column({ nullable: isNullable("employer") })
  employer!: string;

  @Column("text", { array: true, default: {} })
  skills!: string[];

  @Column({ nullable: isNullable("start_date") })
  start_date!: string;

  @Column({ nullable: isNullable("end_date") })
  end_date!: string;

  @Column({ nullable: isNullable("description") })
  description!: string;

  @Column({ nullable: isNullable("current") })
  current!: boolean;

  @Column({ nullable: isNullable("role") })
  role!: string;

  @Column({ nullable: isNullable("media") })
  media!: string;

  @UpdateDateColumn()
  updated!: string;
}
