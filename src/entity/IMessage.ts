/* eslint-disable camelcase, import/no-cycle */
import IUser from "./IUser";
import IRoom from "./IRoom";

export default interface IMessage {
  id: number; // auto-generated
  room: IRoom;
  author: IUser;
  text: string;
  is_file: boolean;
  file_url: string;
  is_read: boolean;
  is_soft_deleted: boolean;

  created: string; // auto-generated
  updated: string; // auto-generated
}

export const messageRequiredCols = [
  "text",
];