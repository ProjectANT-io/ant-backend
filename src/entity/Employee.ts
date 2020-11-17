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
import User from "./User";

@Entity()
export default class Employee extends User implements IEmployee {
  @ManyToOne("Business", "employees")
  business!: IBusiness["id"];
}
