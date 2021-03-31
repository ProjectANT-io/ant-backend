/* eslint-disable camelcase */
export default interface IProjectMilestone {
  key: number;
  project_id: number;
  task: string;
  status: string;
  hours: number;
  days: number;
  total_return: number;
  due_date: string;
}
