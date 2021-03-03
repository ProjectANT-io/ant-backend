/* eslint-disable camelcase */
import { stringify } from "querystring";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import IBusiness, { businessRequiredCols } from "./IBusiness";
import IProject from "./IProject";
import IUser from "./IUser";
import isNullGenerator from "../utils/isNullGenerator";

const isNullable = isNullGenerator(businessRequiredCols);

@Entity()
export default class Business implements IBusiness {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: isNullable("logo") })
  logo!: string;

  @Column({ nullable: isNullable("photo") })
  photo!: string;

  @Column({ nullable: isNullable("tagline") })
  tagline!: string;

  @Column({ nullable: isNullable("year_founded") })
  year_founded!: string;

  @Column({ nullable: isNullable("location") })
  location!: string;

  @Column({ nullable: isNullable("size") })
  size!: string;

  @Column({ nullable: isNullable("stage") })
  stage!: string;

  @Column({ nullable: isNullable("industry") })
  industry!: string;

  @Column({ nullable: isNullable("description") })
  description!: string;

  @Column({ nullable: isNullable("external_link_urls") })
  external_link_urls!: string;

  @Column("text", { array: true, default: {} })
  saved_candidates!: string[];

  @Column({ nullable: isNullable("culture") })
  culture!: string;

  @OneToMany("User", "business")
  employees!: IUser[];

  @OneToMany("Project", "business")
  projects!: IProject[];

  @UpdateDateColumn()
  updated!: string;
}
