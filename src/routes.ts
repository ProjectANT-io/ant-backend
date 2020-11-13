import UserController from "./controller/UserController";
import ProjectController from "./controller/ProjectController";
import BusinessController from "./controller/BusinessController";
import PreviousOutsideProjectController from "./controller/PreviousOutsideProjectController";

const Routes = [
  // User Routes
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "newUser",
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
    action: "newBusiness",
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
