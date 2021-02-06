/* eslint-disable camelcase */
export default interface IUser {
  id: number; // Required, auto-generated
  email: string; // Required
  hash: string;
  salt: string;
  first_name: string; // Required
  last_name: string; // Required
  status: string;

  about_me: string;
  profile_picture_url: string;
  resume_url: string; // Required
  location: string;
  gender: string;
  role: string;
  external_urls: string;

  type: string; // Required
  // business: number;

  // skills: ISkill[];
  // educations: IEducation[];
  // previous_outside_projects: IPreviousOutsideProject[];
  // work_experiences: IWorkExperience;
  // project_preference: IEducation;

  updated: string;
}
