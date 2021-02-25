import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Education from "../entity/Education";
import { educationRequiredCols } from "../entity/IEducation";

import { checkUsersAuth } from "../utils/authChecks";

class EducationController {
  private educationRepository = getRepository(Education);

  async createEducation(req: Request, res: Response) {
    let missingFields: string = "";
    educationRequiredCols.forEach((expectedField) => {
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
    if (Number.isNaN(Number(req.body.student)))
      wrongType += "student should be a number\n";

    if (wrongType) {
      res.status(422);
      return wrongType;
    }
    if (!checkUsersAuth(req.user as any, req.body.student)) {
      res.status(403);
      return "Unauthorized";
    }
    try {
      const newEducationInfo = this.educationRepository.create(req.body);
      const newEducation = await this.educationRepository.save(
        newEducationInfo
      );
      return newEducation;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getEducation(req: Request, res: Response) {
    // Check for Required Path Parameter
    if (!req.params.education_id) {
      res.status(422);
      return "Missing education_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const educationID = Number(req.params.education_id);
    if (Number.isNaN(Number(educationID))) {
      res.status(422);
      return "education_id should be a number";
    }

    // Get User in DB
    try {
      const education = await this.educationRepository.findOne(educationID);

      if (!education) {
        res.status(404);
        return `Education with ID ${educationID} not found.`;
      }

      // Return Found User
      return education;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateEducation(req: Request, res: Response) {
    const education = await this.getEducation(req, res);
    if (res.statusCode !== 200) {
      // calling this.getEducation() returned an error, so return the error
      return education;
    }
    if (!checkUsersAuth(req.user as any, education.student)) {
      res.status(403);
      return "Unauthorized";
    }

    // Update User in DB
    try {
      // Update & Return Found User
      return await this.educationRepository.save({
        ...education, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteEducation(req: Request, res: Response) {
    const education = await this.getEducation(req, res);
    if (res.statusCode !== 200) {
      // calling this.getEducation() returned an error, so return the error
      return education;
    }
    if (!checkUsersAuth(req.user as any, education.student)) {
      res.status(403);
      return "Unauthorized";
    }

    try {
      // Delete the User in DB
      await this.educationRepository.delete(education.id);

      // Return the Deleted User
      return education;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}

export default EducationController;
