/* eslint-disable camelcase */
import IProject from "./IProject";

export default interface IBusiness {
  id: number;
  company_name: string;
  company_logo: string;
  company_photo: string;
  tagline: string;
  year_founded: string;
  location: string;
  company_size: string;
  company_stage: string;
  industry: string;
  description: string;
  external_link_urls: string;
  culture: string;
  employees: string;
  previous_projects: IProject[];
  ongoing_projects: IProject[];
  available_projects: IProject[];
}
