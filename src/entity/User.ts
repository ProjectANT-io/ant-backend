/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from "typeorm";
import IUser from "./IUser";

@Entity()
export default class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ type: "text", nullable: true })
  status!: string;

  @Column({ type: "text", nullable: true })
  about_me!: string;

  @Column({ type: "text", nullable: true })
  profile_picture_url!: string;

  @Column({ type: "text", nullable: true })
  resume_url!: string;

  // @ManyToMany("Skill")
  // skills!: ISkill[];

  @Column({ type: "simple-array", nullable: true })
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
