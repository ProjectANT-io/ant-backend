import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Education from "../entity/Education";

// === GLOBAL VARIABLE ===
const REQUIRED_ATTRIBUTES = ["user_id", "institution", "graduation_date"];

class EducationController {
  private educationRepository = getRepository(Education);

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

    // const "id", "user_id", "institution", "graduation_date"
    const { institution } = req.body;
    const userID = Number(req.body.user_id);
    const graduationDate = req.body.graduation_date;

    let wrongType = "";
    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    if (typeof userID !== "number") {
      wrongType += `${typeof userID}: userID should be a string\n`;
    }
    if (typeof institution !== "string") {
      wrongType += `${typeof institution}: institution should be a string\n`;
    }
    if (typeof graduationDate !== "string") {
      wrongType += `${typeof graduationDate}: graduationDate should be a string\n`;
    }
    if (wrongType) {
      res.status(422);
      return wrongType;
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
    const educationID = Number(req.params.education_id);
    if (Number.isNaN(educationID)) {
      res.status(422);
      return "education_id should be a number";
    }

    // Get Education in DB
    try {
      const education = await this.educationRepository.findOne(educationID);

      if (!education) {
        res.status(404);
        return `Education with ID ${educationID} not found.`;
      }

      // Return Found Education
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

    // Update Education in DB
    try {
      // Update & Return Found Education
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

    try {
      // Delete the Education in DB
      await this.educationRepository.delete(education.id);

      // Return the Deleted Education
      return education;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}

export default EducationController;
