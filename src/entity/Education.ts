/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import IEducation from "./IEducation";

@Entity()
export default class Education implements IEducation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  image!: string;

  @Column({ nullable: true })
  location!: string;

  @Column()
  institution!: string;

  @Column({ nullable: true })
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
