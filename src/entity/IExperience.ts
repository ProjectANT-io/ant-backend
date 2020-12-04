/* eslint-disable camelcase */
import { Media } from "aws-sdk/clients/transcribeservice";

export default interface IExperience {
    id: number; // required
    image: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string;
    media: Media; 
    description: string;
    duties: string[];
    skills: string[];
  }
  