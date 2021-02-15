import { getRepository } from "typeorm";
import * as moment from "moment";
import { Request, Response } from "express";
import Project from "../entity/Project";
import { projectRequiredCols } from "../entity/IProject";

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
    projectRequiredCols.forEach((expectedField) => {
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

    // Check start_date, end_date for date format
    const startDateMoment = moment(
      req.body.start_date,
      ["MM/DD/YYYY", "MM-DD-YYYY"],
      true
    );
    const dueDateMoment = moment(
      req.body.due_date,
      ["MM/DD/YYYY", "MM-DD-YYYY"],
      true
    );
    if (!startDateMoment.isValid() || !dueDateMoment.isValid()) {
      res.status(422);
      return "start_date should be a date (MM-DD-YYYY)";
    }

    // Check remote for boolean format
    if (req.body.remote !== true && req.body.remote !== false) {
      res.status(422);
      return "remote should be a boolean (true/false)";
    }

    // Convert Milestones Field to Postgres Array
    if (req.body.milestones) {
      try {
        req.body.milestones = JSON.parse(req.body.milestones);

        // TODO check for required IProjectMilestone fields
      } catch (e) {
        res.status(415);
        return `milestones improperly formatted\n${e}`;
      }
    }

    // Calculate duration in days by end_date - start_date
    // TODO do this in updateProject as well
    req.body.duration = dueDateMoment.diff(startDateMoment, "days");

    // Parse project detail array
    // TODO do this in updateProject as well
    req.body.project_detail = req.body.project_detail.split(",");

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

    // TODO validate all POST Body fields

    // Convert Milestones Field to Postgres Array
    if (req.body.milestones) {
      try {
        // TODO TEMP - this was throwing errors - SyntaxError: Unexpected token o in JSON at position 1
        // req.body.milestones = JSON.parse(req.body.milestones);
        // TODO check for required IProjectMilestone fields
      } catch (e) {
        res.status(415);
        return `milestones improperly formatted\n${e}`;
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

    // TODO validation

    // Update & Return Found Project
    try {
      return await this.projectRepository.save({
        ...project,
        ...req.body,
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}
