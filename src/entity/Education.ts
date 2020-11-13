/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import IEducation from "./IEducation";

@Entity()
export default class Education implements IEducation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  institution!: string;

  @Column()
  graduation_date!: string;

  @Column({ nullable: true })
  gpa!: string;

  @Column({ nullable: true })
  degree!: string;

  @Column({ nullable: true })
  major!: string;

  @Column({ nullable: true })
  minor!: string;
}
