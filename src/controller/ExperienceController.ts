import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Experience from "../entity/Experience";

export default class ExperienceController {
  private ExperienceRepository = getRepository(Experience);

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async createExperience(req: Request, res: Response) {
    // ensure not logged in
    if (req.isAuthenticated()) {
      res.status(403);
      return "Already logged in";
    }

    // check for missing required POST body fields
    let missingFields: string = "";
    ["role", "company", "location", "start_date", "description"].forEach((expectedField) => {
      if (!(expectedField in req.body)) {
        missingFields += `Missing ${expectedField}\n`;
      }
    });
    if (missingFields) {
      res.status(422);
      return missingFields;
    }

    try {
      // create Experience with encrypted password
      const newExperienceInfo = this.ExperienceRepository.create(req.body);
      const newExperience = await this.ExperienceRepository.save(
        newExperienceInfo
      );
      return newExperience;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getExperience(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    // Check for Required Path Parameter
    if (!req.params.Experience_id) {
      res.status(422);
      return "Missing Experience_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const ExperienceID = Number(req.params.Experience_id);
    if (Number.isNaN(ExperienceID)) {
      res.status(422);
      return "Experience_id should be a number";
    }

    // Get Experience in DB
    try {
      // Find Experience
      const Experience = await this.ExperienceRepository.findOne(ExperienceID);

      // If Experience Does Not Exist
      if (!Experience) {
        res.status(404);
        return `Experience with ID ${ExperienceID} not found.`;
      }

      // Return Found Experience
      return Experience;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateExperience(req: Request, res: Response) {
    const Experience = await this.getExperience(req, res);
    if (res.statusCode !== 200) {
      // calling this.getExperience() returned an error, so return the error
      return Experience;
    }

    // Update Experience in DB
    try {
      // Update & Return Found Experience
      return await this.ExperienceRepository.save({
        ...Experience, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteExperience(req: Request, res: Response) {
    const Experience = await this.getExperience(req, res);
    if (res.statusCode !== 200) {
      // calling this.getExperience() returned an error, so return the error
      return Experience;
    }

    try {
      // Delete the Experience in DB
      await this.ExperienceRepository.delete(Experience.id);

      // Return the Deleted Experience
      return Experience;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}