/* eslint-disable camelcase */
import IEducation from "./IEducation";

export default interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  status: string;
  about_me: string;
  profile_picture_url: string;
  resume_url: string;
  // skills: ISkill[];
  external_urls: string[];
  // educations: IEducation[];
  // previous_outside_projects: IPreviousOutsideProject[];
  // work_experiences: IWorkExperience[];
  // project_preference: IEducation;
}
