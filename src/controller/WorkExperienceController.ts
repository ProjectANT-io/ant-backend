import { getRepository } from "typeorm";
import { Request, Response } from "express";
import * as moment from "moment";
import WorkExperience from "../entity/WorkExperience";
import { workExperienceRequiredCols } from "../entity/IWorkExperience";

const authChecks = require("../utils/authChecks");

class WorkExperienceController {
  private workExperienceRepository = getRepository(WorkExperience);

  async createWorkExperience(req: Request, res: Response) {
    let missingFields: string = "";
    workExperienceRequiredCols.forEach((expectedField) => {
      if (!(expectedField in req.body)) {
        missingFields += `Missing ${expectedField}\n`;
      }
    });
    if (missingFields) {
      res.status(422);
      return missingFields;
    }

    const { current } = req.body;
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
    if (Number.isNaN(Number(req.body.student)))
      wrongType += `student should be a number\n`;
    if (startDateMoment.isValid() === false)
      wrongType += `start_date should be a date (MM-DD-YYYY)\n`;
    if (JSON.parse(current) !== true && JSON.parse(current) !== false)
      wrongType += `current should be a boolean (true/false)\n`;
    if (JSON.parse(current) === false && endDateMoment.isValid() === false)
      wrongType += `If not current end_date should be a date (MM-DD-YYYY)\n`;
    if (wrongType) {
      res.status(422);
      return wrongType;
    }
    if (!authChecks.checkUsersAuth(req.user, req.body.student)) {
      res.status(401);
      return "Unauthorized";
    }

    if (current) req.body.end_date = null;

    try {
      const newInfo = this.workExperienceRepository.create(req.body);
      const newWorkExperience = await this.workExperienceRepository.save(
        newInfo
      );
      return newWorkExperience;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getWorkExperience(req: Request, res: Response) {
    // Check for Required Path Parameter
    if (!req.params.work_experience_id) {
      res.status(422);
      return "Missing work_experience_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const workExperienceID = Number(req.params.work_experience_id);
    if (Number.isNaN(Number(workExperienceID))) {
      res.status(422);
      return "work_experience_id should be a number";
    }

    // Get User in DB
    try {
      const workExperience = await this.workExperienceRepository.findOne(
        workExperienceID
      );

      if (!workExperience) {
        res.status(404);
        return `workExperience with ID ${workExperienceID} not found.`;
      }

      // Return Found User
      return workExperience;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateWorkExperience(req: Request, res: Response) {
    const workExperience = await this.getWorkExperience(req, res);
    if (res.statusCode !== 200) {
      // calling this.getWorkExperience() returned an error, so return the error
      return workExperience;
    }

    if (!authChecks.checkUsersAuth(req.user, workExperience.student)) {
      res.status(401);
      return "Unauthorized";
    }

    // Update User in DB
    try {
      // Update & Return Found User
      return await this.workExperienceRepository.save({
        ...workExperience, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteWorkExperience(req: Request, res: Response) {
    const workExperience = await this.getWorkExperience(req, res);
    if (res.statusCode !== 200) {
      // calling this.getWorkExperience() returned an error, so return the error
      return WorkExperience;
    }

    if (!authChecks.checkUsersAuth(req.user, workExperience.student)) {
      res.status(401);
      return "Unauthorized";
    }

    try {
      // Delete the User in DB
      await this.workExperienceRepository.delete(workExperience.id);

      // Return the Deleted User
      return workExperience;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}

export default WorkExperienceController;
