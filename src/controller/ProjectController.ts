import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import Project from "../entity/Project";

class ProjectController {
  // private userRepository = getRepository(User);

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }
}

export default ProjectController;
