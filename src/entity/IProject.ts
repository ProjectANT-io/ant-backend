/* eslint-disable camelcase */
import ISkill from "./ISkill";
import IProjectMilestone from "./IProjectMilestone";

export default interface IProject {
  id: number; // required, auto-generated
  title: string; // required
  description: string; // required
  project_type: string; // required, auto-generated
  status: string; // required, auto-generated
  // business: number; // required
  // employee: number;
  required_skills: ISkill[];
  duration: number; // required, auto-generated
  stipend: number; // required
  start_date: string; // required
  due_date: string; // required
  stream: string; // required
  project_detail: string[]; // required
  hourly_price: number; // required
  location: string; // required
  payment_type: string; // required
  remote: boolean; // required
  milestones: IProjectMilestone[];
  applicants: number; // auto-generated
  image: string;
  introduction: string;
  industry: string;
  role: string;

  updated: string; // auto-generated
}
