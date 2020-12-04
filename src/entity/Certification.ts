/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import ICertification from "./ICertification";

@Entity()
export default class Certification implements ICertification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  title!: string;

  @Column({ nullable: true })
  image!: string;

  @Column({ nullable: true })
  date!: string;

  @Column({ nullable: true })
  level!: string;
}
