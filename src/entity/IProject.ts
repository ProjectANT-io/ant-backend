/* eslint-disable camelcase */
// import ISkill from "./ISkill";
// import IProjectMilestone from "./IProjectMilestone";

export default interface IProject {
  id: number; // required, auto-generated
  title: string; // required
  description: string; // required
  project_type: string; // required, auto-generated
  status: string; // required, auto-generated
  business: number; // required
  project_manager: number;
  required_skills: string[];
  applicants: number; // auto-generated
  start_date: string; // required
  due_date: string; // required
  hourly_rate: number; // required
  location: string; // required
  payment_method: string; // required
  industry: string;
  image: string;
  cover_image: string;
  client_image: string;
  updated: string; // auto-generated
  timeline: string;
  length: string;
  created_by: string;
  logo: string;
  introduction: string;
  role: string;
  client: string;
  outputs: string[];
  compensation: string;
  timezone: string;
  tasks: string[];
  student: number;

  // Old properties that are not requested by Justin
  // duration: string; // required
  // stipend: number; // required
  // stream: string; // required
  // remote: boolean; // required
  // milestones: IProjectMilestone[];
}
