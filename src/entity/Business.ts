/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import IBusiness from "./IBusiness";
import IProject from "./IProject";
import IUser from "./IUser";

@Entity()
export default class Business implements IBusiness {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  logo!: string;

  @Column({ nullable: true })
  photo!: string;

  @Column({ nullable: true })
  tagline!: string;

  @Column({ nullable: true })
  year_founded!: string;

  @Column({ nullable: true })
  location!: string;

  @Column({ nullable: true })
  size!: string;

  @Column({ nullable: true })
  stage!: string;

  @Column({ nullable: true })
  industry!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  external_link_urls!: string;

  @Column({ nullable: true })
  culture!: string;

  // TODO
  // @Column({ nullable: true })
  // employees!: IUser[];

  @OneToMany("Project", "previous_projects")
  previous_projects!: IProject[];

  @OneToMany("Project", "ongoing_projects")
  ongoing_projects!: IProject[];

  @OneToMany("Project", "available_projects")
  available_projects!: IProject[];
}
