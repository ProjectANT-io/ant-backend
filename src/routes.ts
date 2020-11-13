import UserController from "./controller/UserController";
import ProjectController from "./controller/ProjectController";
import BusinessController from "./controller/BusinessController";
import ProjectPreferenceController from "./controller/ProjectPreferenceController";

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

  // Project Preference
  {
    method: "post",
    route: "/projectpreference",
    controller: ProjectPreferenceController,
    action: "newProjectPreference",
  },
  {
    method: "get",
    route: "/projectpreference/:project_preference_id",
    controller: ProjectPreferenceController,
    action: "getProjectPreference",
  },
  {
    method: "post",
    route: "/projectpreference/:project_preference_id",
    controller: ProjectPreferenceController,
    action: "updateProjectPreference",
  },
  {
    method: "delete",
    route: "/projectpreference/:project_preference_id",
    controller: ProjectPreferenceController,
    action: "deleteProjectPreference",
  },
];

export default Routes;
