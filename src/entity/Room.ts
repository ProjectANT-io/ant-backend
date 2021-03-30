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
  import IRoom from "./IRoom";
  import IUser from "./IUser";
  
  
  @Entity()
  export default class Room implements IRoom {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToMany("User", "rooms")
    users!: IUser[];

    @OneToMany("Message", "room")
    messages!: IMessage[];
  
    @Column()
    room_id!: string;
  
    @Column()
    last_message!: string;
  
    @Column({ default: false })
    is_file!: Boolean;
  
    @UpdateDateColumn()
    updated!: string;
  }
  