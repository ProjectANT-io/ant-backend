/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import ITask from "./ITask";

@Entity()
export default class Task implements ITask {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "timestamptz", nullable: true })
  due_date!: string;

  @Column({ type: "timestamptz", nullable: true })
  last_updated!: string;

  @Column({ nullable: true })
  compensation!: string;

  @Column({ type: "timestamptz", nullable: true })
  payment_date!: string;
}
