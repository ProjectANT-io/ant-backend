import UserController from "./controller/UserController";

const Routes = [
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "newUser",
  },
];

export default Routes;
