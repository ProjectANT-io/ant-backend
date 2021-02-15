/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import isNullGenerator from "../utils/isNullGenerator";
import IEducation, { educationRequiredCols } from "./IEducation";
import IUser from "./IUser";

const isNullable = isNullGenerator(educationRequiredCols);

@Entity()
export default class Education implements IEducation {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne("User", "education")
  student!: IUser;

  @Column({ nullable: isNullable("institution") })
  institution!: string;

  @Column({ nullable: isNullable("graduation_date") })
  graduation_date!: string;

  @Column({ nullable: isNullable("gpa") })
  gpa!: string;

  @Column({ nullable: isNullable("degree") })
  degree!: string;

  @Column({ nullable: isNullable("major") })
  major!: string;

  @Column({ nullable: isNullable("minor") })
  minor!: string;

  @Column({ nullable: true })
  location!: string;

  @Column({ nullable: isNullable("media") })
  media!: string;

  @UpdateDateColumn()
  updated!: string;
}
