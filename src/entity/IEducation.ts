/* eslint-disable camelcase, import/no-cycle */
import IUser from "./IUser";

export default interface IEducation {
  id: number;
  student: IUser;
  institution: string;
  graduation_date: string;
  gpa: string;
  degree: string;
  major: string;
  minor: string;
  media: string;

  updated: string; // auto-generated
}

export const educationRequiredCols = ["student", "institution"];
