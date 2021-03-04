/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import isNullGenerator from "../utils/isNullGenerator";
import IPreviousOutsideProject, {
  previousOutsideProjectAutoGeneratedCols,
  previousOutsideProjectRequiredCols,
} from "./IPreviousOutsideProject";
import IUser from "./IUser";

const isNullable = isNullGenerator(
  previousOutsideProjectRequiredCols,
  previousOutsideProjectAutoGeneratedCols
);

@Entity()
export default class PreviousOutsideProject implements IPreviousOutsideProject {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne("User", "previous_outside_projects")
  student!: IUser;

  @Column({ default: "incomplete", nullable: isNullable("status") })
  status!: string;

  @Column({ nullable: isNullable("title") })
  title!: string;

  @Column({ nullable: isNullable("category") })
  category!: string;

  @Column({ nullable: isNullable("start_date") })
  start_date!: string;

  @Column({ nullable: isNullable("end_date") })
  end_date!: string;

  @Column({ nullable: isNullable("role") })
  role!: string;

  @Column({ nullable: isNullable("external_link") })
  external_link!: string;

  @Column({ nullable: isNullable("client") })
  client!: string;

  @Column({ nullable: isNullable("description") })
  description!: string;

  @Column("text", { array: true, default: {} })
  skills!: string[];

  @Column("text", { array: true, default: {} })
  tools!: string[];

  @Column("text", { array: true, default: {} })
  photos_url!: string[];

  @UpdateDateColumn()
  updated!: string;
}
