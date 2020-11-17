/* eslint-disable camelcase */
import IEmployee from "./IEmployee";
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
  culture: string; // TODO
  employees: IEmployee[];
  projects: IProject[];

  updated: string; // auto-generated
}
