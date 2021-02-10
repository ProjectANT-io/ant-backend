/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import IUser from "./IUser";
import IBusiness from "./IBusiness";
import IProject from "./IProject";
import IPreviousOutsideProject from "./IPreviousOutsideProject";
import IEducation from "./IEducation";
import IWorkExperience from "./IWorkExperience";

@Entity()
export default class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  hash!: string;

  @Column()
  salt!: string;

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

  @Column("text", { default: "student" })
  type!: string;

  @Column("text", { array: true, nullable: true })
  skills!: string[];

  @ManyToOne("Business", "employees")
  business!: IBusiness;
  
  @Column()
  business_id!: number;

  @OneToMany("Project", "student")
  projects!: IProject[];

  @OneToMany("Education", "student")
  education!: IEducation[];

  @OneToMany("WorkExperience", "student")
  work_experiences!: IWorkExperience[];

  @OneToMany("PreviousOutsideProject", "student")
  previous_outside_projects!: IPreviousOutsideProject[];

  // @ManyToMany("WorkExperience")
  // work_experiences!: IWorkExperience;

  // @ManyToMany("Education")
  // project_preference!: IEducation;

  @Column({ nullable: true })
  stripeId!: string;

  @UpdateDateColumn()
  updated!: string;
}
