/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import * as bcrypt from "bcrypt";

import IUser from "./IUser";
// import IEducation from "./IEducation";
import IProject from "./IProject";
// import ICertification from "./ICertification";
// import IApplication from "./IApplication";

@Entity()
export default class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  first_name!: string;

  @Column({ nullable: true })
  last_name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  resume_url!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ nullable: true })
  status!: string;

  @Column({ nullable: true, array: true })
  headline!: string[];

  @Column({ nullable: true })
  location!: string;

  @Column({ nullable: true })
  gender!: string;

  @Column({ nullable: true })
  profile_image!: string;

  @Column({ nullable: true })
  student_video!: string;

  @Column({ nullable: true })
  desired_pay!: string;

  @Column("string", { nullable: true, array: true })
  skills!: string[];

  @Column("string", { nullable: true, array: true })
  preference!: string[];

  @Column({ nullable: true })
  about_me!: string;

  @Column({ nullable: true })
  role!: string;

  @Column({ nullable: true })
  achievements!: string[];

  @Column("simple-json", { nullable: true, default: {} })
  external_urls!: {
    instagram: string;
    facebook: string;
    linkedin: string;
    github: string;
    website: string;
  };

  @Column("simple-json", { nullable: true, default: {} })
  interests!: {
    industries: string[];
    preferred_locations: string[];
    other: string[];
  };

  @Column("number", { nullable: true, array: true, default: [] })
  education_ids!: number[];

  @Column("number", { nullable: true, array: true, default: [] })
  experience_ids!: number[];

  @Column("number", { nullable: true, array: true, default: [] })
  project_ids!: number[];

  @Column("number", { nullable: true, array: true, default: [] })
  certification_ids!: number[];

  @Column("number", { nullable: true, array: true, default: [] })
  applications_ids!: number[];

  @UpdateDateColumn()
  updated!: string;
}
