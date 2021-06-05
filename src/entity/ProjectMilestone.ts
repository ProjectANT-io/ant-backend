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

  @Column()
  name!: string;

  @Column()
  task!: string;

  @Column({ default: false })
  isCompleted!: boolean;

  @Column()
  hours!: number;

  @Column()
  price!: number;

  @Column()
  instruction!: string;

  @Column()
  start_date!: string;

  @Column()
  end_date!: string;

  @ManyToOne("Project", "milestones")
  project!: IProject;

  @ManyToOne("User", "milestones")
  student!: IUser;

  @UpdateDateColumn()
  upd!: string;

  @UpdateDateColumn()
  updated!: string;
}
