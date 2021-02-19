/* eslint-disable camelcase, import/no-cycle */
import IBusiness from "./IBusiness";
import IEducation from "./IEducation";
import IPreviousOutsideProject from "./IPreviousOutsideProject";
import IProject from "./IProject";
import IWorkExperience from "./IWorkExperience";

export default interface IUser {
  id: number; // auto-generated
  email: string;
  hash: string;
  salt: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
  status: string;

  about_me: string;
  headline: string;
  profile_picture_url: string;
  resume_url: string;
  location: string;
  role: string;
  external_urls: string;

  type: string;
  skills: string[];
  preferences: string[];
  certifications: string[];
  others: string[];

  business: IBusiness;
  projects: IProject[];
  education: IEducation[];
  work_experiences: IWorkExperience[];
  previous_outside_projects: IPreviousOutsideProject[];

  stripeId: string;

  updated: string;
}

export const userRequiredCols = [
  "email",
  "password",
  "first_name",
  "last_name",
];
export const userAutoGeneratedCols = ["hash", "salt", "type"];
