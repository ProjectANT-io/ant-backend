import UserController from "./controller/UserController";
import ProjectController from "./controller/ProjectController";
import BusinessController from "./controller/BusinessController";
import PreviousOutsideProjectController from "./controller/PreviousOutsideProjectController";
import PaymentController from "./controller/PaymentController";
import WorkExperienceController from "./controller/WorkExperienceController";
import EducationController from "./controller/EducationController";
import photoController from "./controller/fileUploader";
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
    action: "getUser"
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
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "post",
    route: "/projects",
    controller: ProjectController,
    action: "createProject",
    auth: passport.authenticate("jwt", { session: false }),
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
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "delete",
    route: "/projects/:project_id",
    controller: ProjectController,
    action: "deleteProject",
    auth: passport.authenticate("jwt", { session: false }),
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
    action: "createPreviousOutsideProject",
    auth: passport.authenticate("jwt", { session: false }),
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
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "delete",
    route: "/previousoutsideproject/:previous_outside_project_id",
    controller: PreviousOutsideProjectController,
    action: "deletePreviousOutsideProject",
    auth: passport.authenticate("jwt", { session: false }),
  },
  // Work Experience routes
  {
    method: "post",
    route: "/workexperience",
    controller: WorkExperienceController,
    action: "createWorkExperience",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "get",
    route: "/workexperience/:work_experience_id",
    controller: WorkExperienceController,
    action: "getWorkExperience",
  },
  {
    method: "post",
    route: "/workexperience/:work_experience_id",
    controller: WorkExperienceController,
    action: "updateWorkExperience",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "delete",
    route: "/workexperience/:work_experience_id",
    controller: WorkExperienceController,
    action: "deleteWorkExperience",
    auth: passport.authenticate("jwt", { session: false }),
  },

  // Education Routes
  {
    method: "post",
    route: "/education",
    controller: EducationController,
    action: "createEducation",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "get",
    route: "/education/:education_id",
    controller: EducationController,
    action: "getEducation",
  },
  {
    method: "post",
    route: "/education/:education_id",
    controller: EducationController,
    action: "updateEducation",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "delete",
    route: "/education/:education_id",
    controller: EducationController,
    action: "deleteEducation",
    auth: passport.authenticate("jwt", { session: false }),
  }

];

export default Routes;
