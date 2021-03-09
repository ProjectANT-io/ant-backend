/* eslint-disable camelcase, import/no-cycle */
import IBusiness from "./IBusiness";
import IUser from "./IUser";

export default interface IReview {
  id: number; // auto-generated
  review: string;
  type: string;

  business: IBusiness;
  employee: IUser;
  student: IUser;

  updated: string; // auto-generated
}

export const reviewRequiredCols = ["review", "business", "employee", "student"];
