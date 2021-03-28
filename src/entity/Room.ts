/* eslint-disable camelcase */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    ManyToMany,

  } from "typeorm";
  import IRoom from "./IRoom";
  import IUser from "./IUser";
  
  
  @Entity()
  export default class Room implements IRoom {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToMany("User", "room")
    users!: IUser[];
  
    @Column()
    room_id!: string;
  
    @Column()
    last_message!: string;
  
    @Column({ default: false })
    is_file!: Boolean;
  
    @UpdateDateColumn()
    updated!: string;
  }
  