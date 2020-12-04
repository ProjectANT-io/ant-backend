/* eslint-disable camelcase */
import { Media } from "aws-sdk/clients/transcribeservice";

export default interface IExperience {
    id: number; // required
    image: string;
    company: string; // required
    location: string; // required
    start_date: string;
    end_date: string;
    media: Media; 
    description: string;
    duties: string[];
    skills: string[];
  }
  