/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import IProjectPreference from "./IProjectPreference";

@Entity()
export default class ProjectPreference implements IProjectPreference {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column({ type: "text", nullable: true })
  role_type!: string;

  @Column({ type: "text", nullable: true })
  compensation!: string;

  @Column({ type: "text", nullable: true })
  role_length!: string;
}
