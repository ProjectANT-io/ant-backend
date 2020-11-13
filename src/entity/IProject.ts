/* eslint-disable camelcase */
import ISkill from "./ISkill";
import IProjectMilestone from "./IProjectMilestone";

export default interface IProject {
  id: number; // required
  title: string; // required
  description: string; // required
  business: number; // required
  employee: number;
  required_skills: ISkill[];
  duration: string; // required
  stipend: number; // required
  start_date: string; // required
  stream: string; // required
  industry: string;
  hourly_price: number; // required
  location: string; // required
  payment_type: string; // required
  remote: boolean; // required
  milestones: IProjectMilestone[];
}
