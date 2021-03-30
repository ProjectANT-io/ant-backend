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
  
    @ManyToOne("Room", "messages")
    room!: IRoom;

    @ManyToOne("User", "messages")
    author!: IUser;
  
    @Column()
    text!: string;
  
    @Column({ default: false })
    is_file!: boolean;

    @Column()
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
  