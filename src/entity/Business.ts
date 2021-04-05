/* eslint-disable camelcase */
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
import IReview from "./IReview";
import IProjectApplication from "./IProjectApplication";
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

  @OneToMany("Review", "business")
  reviews!: IReview[];

  @OneToMany("ProjectApplication", "business")
  applications!: IProjectApplication[];

  @UpdateDateColumn()
  updated!: string;
}
