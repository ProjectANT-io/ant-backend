import { getRepository } from "typeorm";
import { Request, Response } from "express";
import WorkExperience from "../entity/WorkExperience";
import * as moment from "moment";

// === GLOBAL VARIABLE ===
const REQUIRED_ATTRIBUTES = ["student", "employer", "start_date", "current", "role"];

class WorkExperienceController {
  private WorkExperienceRepository = getRepository(
    WorkExperience
  );

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async newWorkExperience(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    let missingFields: string = "";
    REQUIRED_ATTRIBUTES.forEach((expectedField) => {
      if (!(expectedField in req.body)) {
        missingFields += `Missing ${expectedField}\n`;
      }
    });
    if (missingFields) {
      res.status(422);
      return missingFields;
    }

    // const firstName, lastName, resumeURL, skills
    const userID = Number(req.body.student);
    const { employer, role, current } = req.body;
    const startDateMoment = moment(
      req.body.start_date,
      ["MM/DD/YYYY", "MM-DD-YYYY"],
      true
    );
    const endDateMoment = moment(
      req.body.end_date,
      ["MM/DD/YYYY", "MM-DD-YYYY"],
      true
    );

    let wrongType = "";
    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    if (typeof userID !== "number") wrongType += `${typeof userID}: userID should be a number\n`;
    if (typeof employer !== "string") wrongType += `${typeof employer}: employer should be a string\n`;
    if (typeof role !== "string") wrongType += `${typeof role}: role should be a string\n`;
    if (startDateMoment.isValid() === false) wrongType += `start_date should be a date (MM-DD-YYYY)`;
    if (current !== true && current !== false) wrongType += `${current} current should be a boolean (true/false)`;
    if (current === false && endDateMoment.isValid() === false) wrongType += `If not current end_date should be a date (MM-DD-YYYY)`;
    if (wrongType) {
      res.status(422);
      return wrongType;
    }

    if (current) req.body.end_date = null;

    try {
      const newInfo = this.WorkExperienceRepository.create(req.body);
      const newWorkExperience = await this.WorkExperienceRepository.save(
        newInfo
      );
      return newWorkExperience;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getWorkExperience(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    // Check for Required Path Parameter
    if (!req.params.work_experience_id) {
      res.status(422);
      return "Missing work_experience_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const WorkExperienceID = Number(
      req.params.work_experience_id
    );
    if (Number.isNaN(WorkExperienceID)) {
      res.status(422);
      return "work_experience_id should be a number";
    }

    // Get User in DB
    try {
      const WorkExperience = await this.WorkExperienceRepository.findOne(
        WorkExperienceID
      );

      if (!WorkExperience) {
        res.status(404);
        return `WorkExperience with ID ${WorkExperienceID} not found.`;
      }

      // Return Found User
      return WorkExperience;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateWorkExperience(req: Request, res: Response) {
    const WorkExperience = await this.getWorkExperience(
      req,
      res
    );
    if (res.statusCode !== 200) {
      // calling this.getWorkExperience() returned an error, so return the error
      return WorkExperience;
    }

    // Update User in DB
    try {
      // Update & Return Found User
      return await this.WorkExperienceRepository.save({
        ...WorkExperience, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteWorkExperience(req: Request, res: Response) {
    const WorkExperience = await this.getWorkExperience(
      req,
      res
    );
    if (res.statusCode !== 200) {
      // calling this.getWorkExperience() returned an error, so return the error
      return WorkExperience;
    }

    try {
      // Delete the User in DB
      await this.WorkExperienceRepository.delete(
        WorkExperience.id
      );

      // Return the Deleted User
      return WorkExperience;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}

export default WorkExperienceController;
