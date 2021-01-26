import UserController from "./controller/UserController";
import ProjectController from "./controller/ProjectController";
import BusinessController from "./controller/BusinessController";
import PreviousOutsideProjectController from "./controller/PreviousOutsideProjectController";
import PaymentController from "./controller/PaymentController";
// eslint-disable-next-line import/order
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
    // Should this be here? If a user tries to access another users Profile,
    // It will crash because the current users JWT token does not match another users JWT
    // auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "post",
    route: "/users/:user_id",
    controller: UserController,
    action: "updateUser",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "delete",
    route: "/users/:user_id",
    controller: UserController,
    action: "deleteUser",
    auth: passport.authenticate("jwt", { session: false }),
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
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "delete",
    route: "/businesses/:business_id",
    controller: BusinessController,
    action: "deleteBusiness",
    auth: passport.authenticate("jwt", { session: false }),
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

  // Previous Outside Project
  {
    method: "post",
    route: "/previousoutsideproject",
    controller: PreviousOutsideProjectController,
    action: "newPreviousOutsideProject",
  },
  {
    method: "get",
    route: "/previousoutsideproject/:previous_outside_project_id",
    controller: PreviousOutsideProjectController,
    action: "getPreviousOutsideProject",
  },
  {
    method: "post",
    route: "/previousoutsideproject/:previous_outside_project_id",
    controller: PreviousOutsideProjectController,
    action: "updatePreviousOutsideProject",
  },
  {
    method: "delete",
    route: "/previousoutsideproject/:previous_outside_project_id",
    controller: PreviousOutsideProjectController,
    action: "deletePreviousOutsideProject",
  },
];

export default Routes;
