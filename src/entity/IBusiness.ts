/* eslint-disable camelcase, import/no-cycle */
import IUser from "./IUser";
import IProject from "./IProject";
import IProjectApplication from "./IProjectApplication";

export default interface IBusiness {
  id: number;
  name: string;
  logo: string;
  photo: string;
  tagline: string;
  year_founded: string;
  location: string;
  size: string;
  stage: string;
  industry: string;
  description: string;
  external_link_urls: string;
  saved_candidates: string[];
  culture: string;
  employees: IUser[];
  projects: IProject[];
  applications: IProjectApplication[];

  updated: string; // auto-generated
}

export const businessRequiredCols = ["name"];
