/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import IApplication from "./IApplication";

@Entity()
export default class Application implements IApplication {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  status!: string;

  @Column()
  message!: string;

  @Column()
  date!: string;
}
