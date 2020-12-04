import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Application from "../entity/Application";

export default class ApplicationController {
  private ApplicationRepository = getRepository(Application);

  async authCheck(req: Request, res: Response) {
    return true; // TODO
  }

  async permissionsCheck(req: Request, res: Response) {
    return true; // TODO
  }

  async createApplication(req: Request, res: Response) {
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
    [].forEach((expectedField) => {
      if (!(expectedField in req.body)) {
        missingFields += `Missing ${expectedField}\n`;
      }
    });
    if (missingFields) {
      res.status(422);
      return missingFields;
    }

    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    // TODO

    // Save New Application to DB
    try {
      const newInfo = this.ApplicationRepository.create(req.body);
      const newApplicationInfo = await this.ApplicationRepository.save(newInfo);
      return newApplicationInfo;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getApplication(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    // Check for Required Path Parameter
    if (!req.params.Application_id) {
      res.status(422);
      return "Missing Application_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const ApplicationID = Number(req.params.Application_id);
    if (Number.isNaN(ApplicationID)) {
      res.status(422);
      return "Application_id should be a number";
    }

    // Get Application in DB
    try {
      // Find Application
      const Application = await this.ApplicationRepository.findOne(ApplicationID, {
        relations: ["projects", "employees"],
      });

      // If Application Does Not Exist
      if (!Application) {
        res.status(404);
        return `Application with ID ${ApplicationID} not found.`;
      }

      // Return Found Application
      return Application;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateApplication(req: Request, res: Response) {
    const Application = await this.getApplication(req, res);
    if (res.statusCode !== 200) {
      // calling this.getApplication() returned an error, so return the error
      return Application;
    }

    // Update Application in DB
    try {
      // Update & Return Found Application
      return await this.ApplicationRepository.save({
        ...Application, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteApplication(req: Request, res: Response) {
    const Application = await this.getApplication(req, res);
    if (res.statusCode !== 200) {
      // calling this.getApplication() returned an error, so return the error
      return Application;
    }

    try {
      // Delete the Application in DB
      await this.ApplicationRepository.delete(Application.id);

      // Return the Deleted Application
      return Application;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}
