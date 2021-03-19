import * as passport from "passport";
import UserController from "./controller/UserController";
import ProjectController from "./controller/ProjectController";
import BusinessController from "./controller/BusinessController";
import PreviousOutsideProjectController from "./controller/PreviousOutsideProjectController";
import PaymentController from "./controller/PaymentController";
import WorkExperienceController from "./controller/WorkExperienceController";
import EducationController from "./controller/EducationController";
import ProjectApplicationController from "./controller/ProjectApplicationController";
import ReviewController from "./controller/ReviewController";

const Routes = [
  // User Routes
  {
    method: "post",
    route: "/user",
    controller: UserController,
    action: "createUser",
  },

  {
    // Login User
    method: "post",
    route: "/user/login",
    controller: UserController,
    action: "loginUser",
  },

  {
    method: "get",
    route: "/user/:user_id",
    controller: UserController,
    action: "getUser",
  },
  {
    method: "post",
    route: "/user/:user_id",
    controller: UserController,
    action: "updateUser",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "delete",
    route: "/user/:user_id",
    controller: UserController,
    action: "deleteUser",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "post",
    route: "/user/:user_id/picture",
    controller: UserController,
    action: "uploadProfilePic",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "post",
    route: "/user/:user_id/video",
    controller: UserController,
    action: "uploadProfileVideo",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "post",
    route: "/user/:user_id/resume",
    controller: UserController,
    action: "uploadResume",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "get",
    route: "/user/:user_id/application",
    controller: ProjectApplicationController,
    action: "getProjectApplicationsByUser",
  },

  // Project Routes
  {
    method: "post",
    route: "/project",
    controller: ProjectController,
    action: "createProject",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "get",
    route: "/project/:project_id",
    controller: ProjectController,
    action: "getProject",
  },
  {
    method: "post",
    route: "/project/:project_id",
    controller: ProjectController,
    action: "updateProject",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "delete",
    route: "/project/:project_id",
    controller: ProjectController,
    action: "deleteProject",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "post",
    route: "/project/:project_id/accept",
    controller: ProjectController,
    action: "acceptUserForProject",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "post",
    route: "/project/:project_id/picture",
    controller: ProjectController,
    action: "uploadProjectPic",
    auth: passport.authenticate("jwt", { session: false }),
  },

  // Business Routes
  {
    method: "post",
    route: "/business",
    controller: BusinessController,
    action: "createBusiness",
  },
  {
    method: "get",
    route: "/business/:business_id",
    controller: BusinessController,
    action: "getBusiness",
  },
  {
    method: "post",
    route: "/business/:business_id",
    controller: BusinessController,
    action: "updateBusiness",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "delete",
    route: "/business/:business_id",
    controller: BusinessController,
    action: "deleteBusiness",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "post",
    route: "/business/:business_id/picture",
    controller: BusinessController,
    action: "uploadBusinessPicture",
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
  {
    method: "post",
    route: "/previousoutsideproject/:previous_outside_project_id/picture",
    controller: PreviousOutsideProjectController,
    action: "uploadOutsideProjectPic",
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
  {
    method: "post",
    route: "/workexperience/:work_experience_id/media",
    controller: WorkExperienceController,
    action: "uploadWorkExperienceMedia",
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
  },
  {
    method: "post",
    route: "/education/:education_id/media",
    controller: EducationController,
    action: "uploadEducationMedia",
    auth: passport.authenticate("jwt", { session: false }),
  },

  // Project Application Routes
  {
    method: "post",
    route: "/project/:project_id/application",
    controller: ProjectApplicationController,
    action: "createProjectApplication",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "get",
    route: "/project/:project_id/application/:application_id",
    controller: ProjectApplicationController,
    action: "getProjectApplication",
  },
  {
    method: "post",
    route: "/project/:project_id/application/:application_id",
    controller: ProjectApplicationController,
    action: "updateProjectApplication",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "delete",
    route: "/project/:project_id/application/:application_id",
    controller: ProjectApplicationController,
    action: "deleteProjectApplication",
    auth: passport.authenticate("jwt", { session: false }),
  },

  // Review Routes
  {
    method: "post",
    route: "/review",
    controller: ReviewController,
    action: "createReview",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "get",
    route: "/review/:review_id",
    controller: ReviewController,
    action: "getReview",
  },
  {
    method: "post",
    route: "/review/:review_id",
    controller: ReviewController,
    action: "updateReview",
    auth: passport.authenticate("jwt", { session: false }),
  },
  {
    method: "delete",
    route: "/review/:review_id",
    controller: ReviewController,
    action: "deleteReview",
    auth: passport.authenticate("jwt", { session: false }),
  },
];

export default Routes;
