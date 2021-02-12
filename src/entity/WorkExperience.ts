/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import IWorkExperience from "./IWorkExperience";
import IUser from "./IUser";

@Entity()
export default class WorkExperience implements IWorkExperience {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  location!: string;

  @Column()
  employer!: string;

  @Column("text", { array: true, nullable: true })
  skills!: string[];

  @Column({ type: "timestamptz" })
  start_date!: string;

  @Column({ type: "timestamptz", nullable: true })
  end_date!: string;

  @Column()
  current!: boolean;

  @Column()
  role!: string;

  @ManyToOne("User", "WorkExperience")
  student!: IUser;

  @UpdateDateColumn()
  updated!: string;
}
