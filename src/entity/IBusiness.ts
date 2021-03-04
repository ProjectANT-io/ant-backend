/* eslint-disable camelcase, import/no-cycle */
import IUser from "./IUser";
import IProject from "./IProject";

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
  external_link_urls: string; // TODO
  saved_candidates: string[];
  culture: string; // TODO
  employees: IUser[];
  projects: IProject[];

  updated: string; // auto-generated
}

export const businessRequiredCols = ["name"];
