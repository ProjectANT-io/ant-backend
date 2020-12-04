/* eslint-disable camelcase */

export default interface IExperience {
    id: number; // required
    image: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string;
    media: string; 
    description: string;
    duties: string[];
    skills: string[];
  }
  