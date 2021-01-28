/* eslint-disable camelcase */
export default interface IPreviousOutsideProject {
  id: number; // primary key
  user_id: number; // required
  title: string; // required
  category: string;
  start_date: string;
  end_date: string;
  role: string;
  external_link: string;
  skills: string[];
  company: string; // required
  description: string;
  photos_url: string[];
}