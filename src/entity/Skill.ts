/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import ISkill from "./ISkill";

@Entity()
export default class Skill implements ISkill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  skill!: string;
}
