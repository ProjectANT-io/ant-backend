import { getRepository } from "typeorm";
import { Request, Response } from "express";
import ProjectApplication from "../entity/ProjectApplication";
import { projectApplicationRequiredCols } from "../entity/IProjectApplication";
import { checkUsersAuth, checkUsersAuthForBusiness } from "../utils/authChecks";

class ProjectApplicationController {
  private projectApplicationRepository = getRepository(ProjectApplication);

  async createProjectApplication(req: Request, res: Response) {
    let missingFields: string = "";
    projectApplicationRequiredCols.forEach((expectedField) => {
      if (!(expectedField in req.body)) {
        missingFields += `Missing ${expectedField}\n`;
      }
    });
    if (missingFields) {
      res.status(422);
      return missingFields;
    }

    let wrongType = "";
    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    if (Number.isNaN(Number(req.body.project)))
      wrongType += `project should be a number\n`;
    if (Number.isNaN(Number(req.body.student)))
      wrongType += `student should be a number\n`;
    if (wrongType) {
      res.status(422);
      return wrongType;
    }
    if (!checkUsersAuth(req.user as any, req.body.student)) {
      res.status(403);
      return "Unauthorized";
    }

    try {
      const newInfo = this.projectApplicationRepository.create({
        ...req.body,
        project: req.params.project_id,
      });
      const newProjectApplication = await this.projectApplicationRepository.save(
        newInfo
      );
      return newProjectApplication;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getProjectApplication(req: Request, res: Response) {
    if (!req.params.application_id) {
      res.status(422);
      return "Missing application_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const projectApplicationID = Number(req.params.application_id);
    if (Number.isNaN(Number(projectApplicationID))) {
      res.status(422);
      return "application_id should be a number";
    }

    // Get Project Application in DB
    try {
      const projectApplication = await this.projectApplicationRepository.findOne(
        projectApplicationID,
        { relations: ["project", "student"] }
      );

      if (!projectApplication) {
        res.status(404);
        return `Project Application with ID ${projectApplicationID} not found.`;
      }

      // Return Found Project Application
      return projectApplication;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getProjectApplicationsByUser(req: Request, res: Response) {
    if (!req.params.user_id) {
      res.status(422);
      return "Missing user_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const userId = Number(req.params.user_id);
    if (Number.isNaN(Number(userId))) {
      res.status(422);
      return "user_id should be a number";
    }

    // Get Project Application in DB by user ID
    try {
      const projectApplication = await this.projectApplicationRepository.find({
        where: { student: userId },
        relations: ["project", "student"],
      });

      if (!projectApplication) {
        res.status(404);
        return `Project Application by user ID with user ID ${userId} not found.`;
      }

      // Return Found Project Application
      return projectApplication;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getProjectApplicationsByBusiness(req: Request, res: Response) {
    if (!req.params.business_id) {
      res.status(422);
      return "Missing business_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const businessId = Number(req.params.business_id);
    if (Number.isNaN(Number(businessId))) {
      res.status(422);
      return "business_id should be a number";
    }

    // Get Project Application in DB by business ID
    try {
      const projectApplication = await this.projectApplicationRepository.find({
        where: { business: businessId },
        relations: ["project", "student"],
      });

      if (!projectApplication) {
        res.status(404);
        return `Project Application by business ID with business ID ${businessId} not found.`;
      }

      // Return Found Project Application
      return projectApplication;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateProjectApplication(req: Request, res: Response) {
    const projectApplication = await this.getProjectApplication(req, res);
    if (res.statusCode !== 200) {
      // calling this.getProjectApplication() returned an error, so return the error
      return projectApplication;
    }

    if (
      !checkUsersAuth(req.user as any, projectApplication.student.id) &&
      !checkUsersAuthForBusiness(
        req.user as any,
        projectApplication.business.id
      )
    ) {
      res.status(403);
      return "Unauthorized";
    }

    // Update Project Application in DB
    try {
      // Update & Return Found Project Application
      return await this.projectApplicationRepository.save({
        ...projectApplication, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteProjectApplication(req: Request, res: Response) {
    const projectApplication = await this.getProjectApplication(req, res);
    if (res.statusCode !== 200) {
      // calling this.getProjectApplication() returned an error, so return the error
      return ProjectApplication;
    }

    if (
      !checkUsersAuth(req.user as any, projectApplication.student.id) &&
      !checkUsersAuthForBusiness(
        req.user as any,
        projectApplication.business.id
      )
    ) {
      res.status(403);
      return "Unauthorized";
    }

    try {
      // Delete the Project Application in DB
      await this.projectApplicationRepository.delete(projectApplication.id);

      // Return the Deleted Project Application
      return projectApplication;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}

export default ProjectApplicationController;
