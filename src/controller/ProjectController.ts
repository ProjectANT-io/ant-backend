import { getRepository } from "typeorm";
import * as moment from "moment";
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
    [
      "title",
      "description",
      "business",
      "duration",
      "stipend",
      "start_date",
      "stream",
      "hourly_price",
      "location",
      "payment_type",
      "remote",
    ].forEach((expectedField) => {
      if (!(expectedField in req.body)) {
        missingFields += `Missing ${expectedField} in POST body\n`;
      }
    });
    if (missingFields) {
      res.status(422);
      return missingFields;
    }

    let wrongFields: string = "";
    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    ["business", "stipend", "hourly_price"].forEach((expectedField) => {
      if (Number.isNaN(Number(req.body[expectedField]))) {
        res.status(422);
        wrongFields += `${expectedField} should be a number\n`;
      }
    });
    if (wrongFields) {
      res.status(422);
      return wrongFields;
    }

    // Check start_date for date format
    if (
      !moment(req.body.start_date, ["MM/DD/YYYY", "MM-DD-YYYY"], true).isValid()
    ) {
      res.status(422);
      return "start_date should be a date";
    }

    // Check remote for boolean format
    if (req.body.remote !== "true" && req.body.remote !== "false") {
      res.status(422);
      return "remote should be a boolean";
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

  async getProject(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    // Check for Required Path Parameter
    if (!req.params.project_id) {
      res.status(422);
      return "Missing project_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const projectID = Number(req.params.project_id);
    if (Number.isNaN(Number(projectID))) {
      res.status(422);
      return "project_id should be a number";
    }

    // Get Project in DB
    try {
      // Find Project
      const project = await this.projectRepository.findOne(projectID, {
        relations: ["business"], // return business relation
      });

      // If Project Does Not Exist
      if (!project) {
        res.status(404);
        return `Project with ID ${projectID} not found.`;
      }

      // Return Found Project
      return project;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateProject(req: Request, res: Response) {
    const project = await this.getProject(req, res);
    if (res.statusCode !== 200) {
      // calling this.getProject() returned an error, so return the error
      return project;
    }

    // let newFields = JSON.parse(JSON.stringify(req.body));

    // TODO validate all POST Body fields

    // Convert Milestones Field to Postgres Array
    if (req.body.milestones) {
      try {
        req.body.milestones = JSON.parse(req.body.milestones);

        // TODO check for required IProjectMilestone fields
      } catch (e) {
        res.status(415);
        return "milestones improperly formatted";
      }
    }

    // Update Project in DB
    try {
      // Update & Return Found Project
      return await this.projectRepository.save({
        ...project, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteProject(req: Request, res: Response) {
    const project = await this.getProject(req, res);
    if (res.statusCode !== 200) {
      // calling this.getProject() returned an error, so return the error
      return project;
    }

    try {
      // Delete the Project in DB
      await this.projectRepository.delete(project.id);

      // Return the Deleted Project
      return project;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async acceptUserForProject(req: Request, res: Response) {
    const project = await this.getProject(req, res);
    if (res.statusCode !== 200) {
      // calling this.getProject() returned an error, so return the error
      return project;
    }

    // Update & Return Found Project
    // TODO update status field of project -- but status field has not been created yet

    return project;
  }
}
