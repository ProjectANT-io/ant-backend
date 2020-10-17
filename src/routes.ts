import { UserController } from "./controller/UserController";

export const Routes = [
  // {
  //   method: "get",
  //   route: "/users",
  //   controller: UserController,
  //   action: "getAllUsers",
  // },
  {
    method: "get",
    route: "/users/:user_id",
    controller: UserController,
    action: "getOneUser",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
];
