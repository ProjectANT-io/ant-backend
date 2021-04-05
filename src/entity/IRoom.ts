/* eslint-disable camelcase, import/no-cycle */
import IMessage from "./IMessage";
import IUser from "./IUser";

export default interface IRoom {
  id: number; // auto-generated
  room_id: string;
  users: IUser[];
  messages: IMessage[];
  last_message: string;
  is_file: boolean;
  updated: string; // auto-generated
}

export const roomRequiredCols = ["room_id"];
