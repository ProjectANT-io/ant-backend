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

  @Column()
  role!: string;

  @Column()
  company!: string;

  @Column()
  location!: string;

  @Column()
  start_date!: string;

  @Column()
  end_date!: string;

  @Column()
  media!: Media;

  @Column()
  description!: string;

  @Column({ nullable: true })
  duties!: string[];

  @Column()
  skills!: string[];

}
