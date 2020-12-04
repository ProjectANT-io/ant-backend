import UserController from "./controller/UserController";
import ProjectController from "./controller/ProjectController";
import BusinessController from "./controller/BusinessController";
import EmployeeController from "./controller/EmployeeController";
import PaymentController from "./controller/PaymentController";

const Routes = [
  // User Routes
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "createUser",
  },

  {
    // Login User
    method: "post",
    route: "/users/login",
    controller: UserController,
    action: "loginUser",
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
    // Login Employee
    method: "post",
    route: "/employees/login",
    controller: EmployeeController,
    action: "loginEmployee",
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

  // Payment Routes
  {
    method: "post",
    route: "/create-session",
    controller: PaymentController,
    action: "createSession",
  },
  {
    method: "post",
    route: "/payment/create-account",
    controller: PaymentController,
    action: "createStripeAccount",
  },
  {
    method: "post",
    route: "/payment/send-payment",
    controller: PaymentController,
    action: "createPaymentIntent",
  },
];

export default Routes;
