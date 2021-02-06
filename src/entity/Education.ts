/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import IEducation from "./IEducation";
import IUser from "./IUser";

@Entity()
export default class Education implements IEducation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  image!: string;

  @Column()
  location!: string;

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

  @ManyToOne("User", "education")
  student!: IUser;

  @UpdateDateColumn()
  updated!: string;
}
