/* eslint-disable camelcase */
import IProject from "./IProject";
import IUser from "./IUser";

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
  culture: string; // TOOD
  // employees: IUser[]; // TODO
  previous_projects: IProject[];
  ongoing_projects: IProject[];
  available_projects: IProject[];
}
