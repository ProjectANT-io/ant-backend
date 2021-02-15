/* eslint-disable camelcase, import/no-cycle */
import IUser from "./IUser";

export default interface IWorkExperience {
  id: number;
  student: IUser;
  location: string;
  employer: string;
  skills: string[];
  start_date: string;
  end_date: string;
  description: string;
  current: boolean;
  role: string;
  media: string;

  updated: string; // auto-generated
}

export const workExperienceRequiredCols = [
  "student",
  "employer",
  "start_date",
  "current",
  "role",
];
