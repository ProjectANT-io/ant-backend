import IUser from "./IUser";

export default interface IEmployee extends IUser {
  business: number; // required
}
