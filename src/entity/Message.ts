/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import IMessage, { messageRequiredCols } from "./IMessage";
import IUser from "./IUser";
import IRoom from "./IRoom";

import isNullGenerator from "../utils/isNullGenerator";

const isNullable = isNullGenerator(messageRequiredCols);

@Entity()
export default class Message implements IMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne("Room", "messages")
  room!: IRoom;

  @ManyToOne("User", "messages")
  author!: IUser;

  @Column({ nullable: isNullable("text") })
  text!: string;

  @Column({ default: false })
  is_file!: boolean;

  @Column({ nullable: isNullable("file_url") })
  file_url!: string;

  @Column({ default: false })
  is_read!: boolean;

  @Column({ default: false })
  is_soft_deleted!: boolean;

  @CreateDateColumn()
  created!: string;

  @UpdateDateColumn()
  updated!: string;
}
