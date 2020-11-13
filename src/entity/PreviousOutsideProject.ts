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

  @Column()
  company!: string;

  @Column({ nullable: true })
  description!: string;
}
