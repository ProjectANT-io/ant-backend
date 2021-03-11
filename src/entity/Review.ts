/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";

import IBusiness from "./IBusiness";
import IReview from "./IReview";
import IUser from "./IUser";

@Entity()
export default class Review implements IReview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  review!: string;

  @Column({ default: "business" })
  type!: string;

  @ManyToOne("Business", "projects")
  business!: IBusiness;

  @ManyToOne("User", "projects")
  employee!: IUser;

  @ManyToOne("User", "projects")
  student!: IUser;

  @UpdateDateColumn()
  updated!: string;
}
