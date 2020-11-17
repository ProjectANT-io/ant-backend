/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import IBusiness from "./IBusiness";
import IEmployee from "./IEmployee";

@Entity()
export default class Employee implements IEmployee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  status!: string;

  @Column({ nullable: true })
  about_me!: string;

  @Column({ nullable: true })
  profile_picture_url!: string;

  @Column({ nullable: true })
  resume_url!: string;

  @Column({ nullable: true })
  location!: string;

  @Column({ nullable: true })
  gender!: string;

  @Column({ nullable: true })
  role!: string;

  @Column("text", { array: true, nullable: true })
  external_urls!: string[];

  @ManyToOne("Business", "employees")
  business!: IBusiness["id"];

  @UpdateDateColumn()
  updated!: string;
}
