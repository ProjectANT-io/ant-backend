/* eslint-disable camelcase, import/no-cycle */
import IUser from "./IUser";
import IRoom from "./IRoom";

export default interface IMessage {
  id: number; // auto-generated
  room: IRoom,
  author: IUser;
  recepient: IUser;
  text: String;
  is_file: Boolean;
  file_url: String;
  is_read: Boolean;
  is_soft_deleted: Boolean;

  created: string; // auto-generated
  updated: string; // auto-generated
}

export const messageRequiredCols = [
  "text",
];