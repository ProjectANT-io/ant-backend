/* eslint-disable camelcase, import/no-cycle */
import IUser from "./IUser";

export default interface IRoom {
  id: number; // auto-generated
  room_id: String,
  users: IUser[];
  last_message: string;
  is_file: Boolean;

  updated: string; // auto-generated
}

export const roomRequiredCols = [
  "room_id",
];