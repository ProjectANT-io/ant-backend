/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import IPreviousOutsideProject from "./IPreviousOutsideProject";

@Entity()
export default class PreviousOutsideProject implements IPreviousOutsideProject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  category!: string;

  @Column({ type: "timestamptz", nullable: true })
  start_date!: string;

  @Column({ type: "timestamptz", nullable: true })
  end_date!: string;

  @Column({ nullable: true })
  role!: string;

  @Column({ nullable: true })
  external_link!: string;

  @Column("text", { array: true, default: {} })
  skills!: string[];

  @Column({ nullable: true })
  company!: string;

  @Column({ nullable: true })
  description!: string;

  @Column("text", { array: true, default: {} })
  photos_url!: string[];
}