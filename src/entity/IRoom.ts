/* eslint-disable camelcase, import/no-cycle */
import IMessage from "./IMessage";
import IUser from "./IUser";

export default interface IRoom {
  id: number; // auto-generated
  room_id: String,
  users: IUser[];
  last_message: string;
  is_file: Boolean;
  messages: IMessage[];
  updated: string; // auto-generated
}

export const roomRequiredCols = [
  "room_id",
];