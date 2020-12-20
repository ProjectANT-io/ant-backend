/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from "typeorm";
import IUser from "./IUser";
import ISkill from "./ISkill";

@Entity()
export default class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string; // TODO plaintext password temporary

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ nullable: true })
  status!: string;

  @Column({ nullable: true })
  about_me!: string;

  @Column({ nullable: true })
  profile_picture_url!: string;

  @Column({ nullable: true })
  resume_url!: string;

  @Column({ nullable: true })
  location!: string;

  @Column({ nullable: true })
  gender!: string;

  @Column({ nullable: true })
  role!: string;

  @Column("text", { array: false, nullable: true })
  external_urls!: string;

  @Column("int", { array: true, nullable: true })
  skills!: ISkill["id"][];

  // @ManyToMany("Education")
  // educations!: IEducation[];

  // @ManyToMany("PreviousOutsideProject-array")
  // previous_outside_projects!: IPreviousOutsideProject[];

  // @ManyToMany("WorkExperience")
  // work_experiences!: IWorkExperience;

  // @ManyToMany("Education")
  // project_preference!: IEducation;

  @UpdateDateColumn()
  updated!: string;
}
