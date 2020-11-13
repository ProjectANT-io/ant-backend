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

  // @Column("json", { nullable: true })
  // skills!: ISkill[];

  @Column("text", { array: true, nullable: true })
  external_urls!: string[];

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
