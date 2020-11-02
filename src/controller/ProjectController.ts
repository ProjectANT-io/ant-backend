import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Project from "../entity/Project";

export default class ProjectController {
  private projectRepository = getRepository(Project);

  async authCheck(req: Request, res: Response) {
    return true; // TODO
  }

  async permissionsCheck(req: Request, res: Response) {
    return true; // TODO
  }

  async createProject(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    // Check for Required POST Body Fields, return 422 if required field is missing
    let missingFields: string = "";
    ["title", "description", "company_id", "employee_id"].forEach(
      (expectedField) => {
        if (!(expectedField in req.body)) {
          missingFields += `Missing ${expectedField}\n`;
        }
      }
    );
    if (missingFields) {
      res.status(422);
      return missingFields;
    }

    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    if (Number.isNaN(Number(req.body.company_id))) {
      res.status(422);
      return "company_id should be a number";
    }
    if (Number.isNaN(Number(req.body.employee_id))) {
      res.status(422);
      return "employee_id should be a number";
    }

    // Save New Project to DB
    try {
      const newProjectInfo = this.projectRepository.create(req.body);
      const newProject = await this.projectRepository.save(newProjectInfo);
      return newProject;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}
