/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from "typeorm";
import ISkill from "./ISkill";

@Entity()
export default class Skill implements ISkill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  skill!: string;

  @UpdateDateColumn()
  updated!: string;
}
