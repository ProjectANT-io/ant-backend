/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import ITask from "./ITask";

@Entity()
export default class Task implements ITask {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "timestamptz" })
  due_date!: string;

  @Column({ type: "timestamptz" })
  last_updated!: string;

  @Column()
  compensation!: string;

  @Column({ type: "timestamptz" })
  payment_date!: string;
}
