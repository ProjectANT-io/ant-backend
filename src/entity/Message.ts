/* eslint-disable camelcase */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,

  } from "typeorm";
  import IMessage from "./IMessage";
  import IUser from "./IUser";
  import IRoom from "./IRoom";

  
  @Entity()
  export default class Message implements IMessage {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne("Room", "message")
    room!: IRoom;

    @ManyToOne("User", "message")
    author!: IUser;

    @ManyToOne("User", "message")
    recepient!: IUser;
  
    @Column()
    text!: string;
  
    @Column({ default: false })
    is_file!: Boolean;

    @Column()
    file_url!: string;

    @Column({ default: false })
    is_read!: Boolean;

    @Column({ default: false })
    is_soft_deleted!: Boolean;

    @CreateDateColumn()
    created!: string;
  
    @UpdateDateColumn()
    updated!: string;
  }
  