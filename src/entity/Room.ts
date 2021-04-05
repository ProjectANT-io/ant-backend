/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import IMessage from "./IMessage";
import IRoom, { roomRequiredCols } from "./IRoom";
import IUser from "./IUser";

import isNullGenerator from "../utils/isNullGenerator";

const isNullable = isNullGenerator(roomRequiredCols);

@Entity()
export default class Room implements IRoom {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: isNullable("room_id") })
  room_id!: string;

  @ManyToMany("User", "rooms")
  users!: IUser[];

  @OneToMany("Message", "room")
  messages!: IMessage[];

  @Column({ nullable: isNullable("last_message") })
  last_message!: string;

  @Column({ default: false })
  is_file!: boolean;

  @UpdateDateColumn()
  updated!: string;
}
