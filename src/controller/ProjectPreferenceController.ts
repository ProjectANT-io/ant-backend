import { getRepository } from "typeorm";
import { Request, Response } from "express";
import ProjectPreference from "../entity/ProjectPreference";

// === GLOBAL VARIABLE ===
const REQUIRED_ATTRIBUTES = ["user_id"];

class ProjectPreferenceController {
  private projectPreferenceRepository = getRepository(ProjectPreference);

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async newProjectPreference(req: Request, res: Response) {
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
    const userId = Number(req.body.user_id);

    let wrongType = "";
    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    if (typeof userId !== "number") {
      wrongType += `${typeof userId}: user_id should be a number\n`;
    }
    if (wrongType) {
      res.status(422);
      return wrongType;
    }

    const project = {
      user_id: userId,
      role_type: "",
      compensation: "",
      role_length: "",
    };

    try {
      const newInfo = this.projectPreferenceRepository.create(project);
      const newProjectPreference = await this.projectPreferenceRepository.save(
        newInfo
      );
      return newProjectPreference;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getProjectPreference(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    // Check for Required Path Parameter
    if (!req.params.project_preference_id) {
      res.status(422);
      return "Missing project_preference_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const projectPreferenceID = Number(req.params.project_preference_id);
    if (Number.isNaN(projectPreferenceID)) {
      res.status(422);
      return "project_preference_id should be a number";
    }

    // Get ProjectPreference in DB
    try {
      const projectPreference = await this.projectPreferenceRepository.findOne(
        projectPreferenceID
      );

      if (!projectPreference) {
        res.status(404);
        return `ProjectPreference with ID ${projectPreferenceID} not found.`;
      }

      // Return Found ProjectPreference
      return projectPreference;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateProjectPreference(req: Request, res: Response) {
    const projectPreference = await this.getProjectPreference(req, res);
    if (res.statusCode !== 200) {
      // calling this.getProjectPreference() returned an error, so return the error
      return projectPreference;
    }

    // Update ProjectPreference in DB
    try {
      // Update & Return Found ProjectPreference
      return await this.projectPreferenceRepository.save({
        ...projectPreference, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteProjectPreference(req: Request, res: Response) {
    const projectPreference = await this.getProjectPreference(req, res);
    if (res.statusCode !== 200) {
      // calling this.getProjectPreference() returned an error, so return the error
      return projectPreference;
    }

    try {
      // Delete the ProjectPreference in DB
      await this.projectPreferenceRepository.delete(projectPreference.id);

      // Return the Deleted ProjectPreference
      return projectPreference;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}

export default ProjectPreferenceController;
