import UserController from "./controller/UserController";
import ProjectController from "./controller/ProjectController";
import BusinessController from "./controller/BusinessController";
import EmployeeController from "./controller/EmployeeController";
import passport = require("passport");

const Routes = [
  // User Routes
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "createUser",
  },

  {
    // Login User/Employee
    method: "post",
    route: "/login",
    controller: UserController,
    action: "loginUser",
    auth: passport.authenticate("local"),
  },
  {
    // Logout User/Employee
    method: "post",
    route: "/logout",
    controller: UserController,
    action: "logoutUser",
  },
  {
    method: "post",
    route: "/users/test",
    controller: UserController,
    action: "test",
  },

  {
    method: "get",
    route: "/users/:user_id",
    controller: UserController,
    action: "getUser",
  },
  {
    method: "post",
    route: "/users/:user_id",
    controller: UserController,
    action: "updateUser",
  },
  {
    method: "delete",
    route: "/users/:user_id",
    controller: UserController,
    action: "deleteUser",
  },

  // Project Routes
  {
    method: "post",
    route: "/projects/accept/:project_id",
    controller: ProjectController,
    action: "acceptUserForProject",
  },
  {
    method: "post",
    route: "/projects",
    controller: ProjectController,
    action: "createProject",
  },
  {
    method: "get",
    route: "/projects/:project_id",
    controller: ProjectController,
    action: "getProject",
  },
  {
    method: "post",
    route: "/projects/:project_id",
    controller: ProjectController,
    action: "updateProject",
  },
  {
    method: "delete",
    route: "/projects/:project_id",
    controller: ProjectController,
    action: "deleteProject",
  },

  // Business Routes
  {
    method: "post",
    route: "/businesses",
    controller: BusinessController,
    action: "createBusiness",
  },
  {
    method: "get",
    route: "/businesses/:business_id",
    controller: BusinessController,
    action: "getBusiness",
  },
  {
    method: "post",
    route: "/businesses/:business_id",
    controller: BusinessController,
    action: "updateBusiness",
  },
  {
    method: "delete",
    route: "/businesses/:business_id",
    controller: BusinessController,
    action: "deleteBusiness",
  },

  // Employee Routes
  {
    method: "post",
    route: "/employees",
    controller: EmployeeController,
    action: "createEmployee",
  },
  {
    method: "get",
    route: "/employees/:employee_id",
    controller: EmployeeController,
    action: "getEmployee",
  },
  {
    method: "post",
    route: "/employees/:employee_id",
    controller: EmployeeController,
    action: "updateEmployee",
  },
  {
    method: "delete",
    route: "/employees/:employee_id",
    controller: EmployeeController,
    action: "deleteEmployee",
  },
];

export default Routes;
