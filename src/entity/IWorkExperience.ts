/* eslint-disable camelcase */
export default interface IWorkExperience {
  id: number;
  location: string;
  employer: string;
  skills: string[];
  start_date: string;
  end_date: string;
  current: boolean;
  role: string;
  description: string;
  media: string;
}