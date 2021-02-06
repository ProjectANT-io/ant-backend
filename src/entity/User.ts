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
import ISkill from "./ISkill";
import IBusiness from "./IBusiness";
import IProject from "./IProject";
import IPreviousOutsideProject from "./IPreviousOutsideProject";

@Entity()
export default class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
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

  @ManyToOne("Business", "employees")
  business!: IBusiness;

  @OneToMany("Project", "student")
  projects!: IProject[];

  // @Column("json", { nullable: true })
  // skills!: ISkill[];

  // @ManyToMany("Education")
  // educations!: IEducation[];

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
