/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { Media } from "aws-sdk/clients/transcribeservice";
import IExperience from "./IExperience";

@Entity()
export default class Experience implements IExperience {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  image!: string;

  @Column({ nullable: true })
  role!: string;

  @Column({ nullable: true })
  company!: string;

  @Column({ nullable: true })
  location!: string;

  @Column({ nullable: true })
  start_date!: string;

  @Column({ nullable: true })
  end_date!: string;

  @Column({ nullable: true })
  media!: string;

  @Column({ nullable: true })
  description!: string;

  @Column("text", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
  duties!: string[];

  @Column("text", {
    nullable: true,
    array: true,
    default: () => "array[]::integer[]",
  })
  skills!: string[];

}
