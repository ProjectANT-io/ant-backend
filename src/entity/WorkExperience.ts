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

  @Column()
  location!: string;

  @Column()
  company!: string;

  @Column()
  start_date!: string;

  @Column({ nullable: true })
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
