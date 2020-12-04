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

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: true })
  resume_url!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  type!: string;

  @Column({ nullable: true })
  status!: string;

  @Column("text", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
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

  @Column("text", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
  skills!: string[];

  @Column("text", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
  preference!: string[];

  @Column({ nullable: true })
  about_me!: string;

  @Column({ nullable: true })
  role!: string;

  @Column("text", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
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

  @Column("integer", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
  education_ids!: number[];

  @Column("integer", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
  experience_ids!: number[];

  @Column("integer", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
  project_ids!: number[];

  @Column("integer", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
  certification_ids!: number[];

  @Column("integer", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
  applications_ids!: number[];

  @UpdateDateColumn()
  updated!: string;
}
