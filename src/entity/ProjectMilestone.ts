/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import IProject from "./IProject";
import IProjectMilestone from "./IProjectMilestone";
import IUser from "./IUser";

@Entity()
export default class ProjectMilestone implements IProjectMilestone {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  task!: string;

  @Column({ default: false })
  isCompleted!: boolean;

  @Column({ nullable: true })
  hours!: number;

  @Column({ nullable: true })
  startDate!: string;

  @Column({ nullable: true })
  endDate!: string;

  @ManyToOne("Project", "milestones")
  project!: IProject;

  @ManyToOne("User", "milestones")
  student!: IUser;

  @UpdateDateColumn()
  updated!: string;
}
