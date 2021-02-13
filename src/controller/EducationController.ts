import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Education from "../entity/Education";
import * as moment from "moment";

// === GLOBAL VARIABLE ===
const REQUIRED_ATTRIBUTES = ["student", "institution"];

class EducationController {
  private EducationRepository = getRepository(
    Education
  );

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async newEducation(req: Request, res: Response) {
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

    
    const userID = Number(req.body.student);
    const { location, institution, image } = req.body;
    const graduationDateMoment = moment(
      req.body.graduation_date,
      ["MM/DD/YYYY", "MM-DD-YYYY"],
      true
    );

    let wrongType = "";
    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    if (typeof userID !== "number") wrongType += `${typeof userID}: userID should be a number\n`;
    if (typeof institution !== "string") wrongType += `${typeof institution}: institution should be a string\n`;
    // if (graduationDateMoment.isValid() === false) wrongType += `graduation_date should be a date (MM-DD-YYYY)`;
    
    if (wrongType) {
      res.status(422);
      return wrongType;
    }

    try {
      const newInfo = this.EducationRepository.create(req.body);
      const newEducation = await this.EducationRepository.save(
        newInfo
      );
      return newEducation;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getEducation(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    // Check for Required Path Parameter
    if (!req.params.education_id) {
      res.status(422);
      return "Missing education_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const EducationID = Number(
      req.params.education_id
    );
    if (Number.isNaN(EducationID)) {
      res.status(422);
      return "education_id should be a number";
    }

    // Get User in DB
    try {
      const Education = await this.EducationRepository.findOne(
        EducationID
      );

      if (!Education) {
        res.status(404);
        return `Education with ID ${EducationID} not found.`;
      }

      // Return Found User
      return Education;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateEducation(req: Request, res: Response) {
    const Education = await this.getEducation(
      req,
      res
    );
    if (res.statusCode !== 200) {
      // calling this.getEducation() returned an error, so return the error
      return Education;
    }

    // Update User in DB
    try {
      // Update & Return Found User
      return await this.EducationRepository.save({
        ...Education, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteEducation(req: Request, res: Response) {
    const Education = await this.getEducation(
      req,
      res
    );
    if (res.statusCode !== 200) {
      // calling this.getEducation() returned an error, so return the error
      return Education;
    }

    try {
      // Delete the User in DB
      await this.EducationRepository.delete(
        Education.id
      );

      // Return the Deleted User
      return Education;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}

export default EducationController;
