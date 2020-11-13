/* eslint-disable camelcase */
import IProject from "./IProject";

export default interface IBusiness {
  id: number;
  business_name: string;
  business_logo: string;
  business_photo: string;
  tagline: string;
  year_founded: string;
  location: string;
  business_size: string;
  business_stage: string;
  industry: string;
  description: string;
  external_link_urls: string;
  culture: string;
  employees: string;
  previous_projects: IProject[];
  ongoing_projects: IProject[];
  available_projects: IProject[];
}
