/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import ICertification from "./ICertification";

@Entity()
export default class Certification implements ICertification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  Certification!: string;

  @Column({ nullable: true })
  about_me!: string;

  @Column({ nullable: true })
  profile_picture_url!: string;

  @Column({ nullable: true })
  resume_url!: string;

  @Column({ nullable: true })
  location!: string;
}
