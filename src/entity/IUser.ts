/* eslint-disable camelcase */
export default interface IUser {
  id: number; // Required, auto-generated
  first_name: string; // Required
  last_name: string; // Required
  email: string; // Required
  resume_url: string; // Required

  password: string;
  status: string;
  headline: string[];
  location: string;
  gender: string;
  profile_image: string;
  student_video: string;
  desired_pay: string;
  skills: string[];
  preference: string[];
  about_me: string;
  role: string;
  achievements: string[];

  external_urls: {
    instagram: string;
    facebook: string;
    linkedin: string;
    github: string;
    website: string;
  };

  interests: {
    industries: string[];
    preferred_locations: string[];
    other: string[];
  };

  education_ids: number[];
  experience_ids: number[];
  project_ids: number[];
  certification_ids: number[];
  applications_ids: number[];

  updated: string;
}
