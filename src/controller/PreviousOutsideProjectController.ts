import { getRepository } from "typeorm";
import { Request, Response } from "express";
import PreviousOutsideProject from "../entity/PreviousOutsideProject";

// === GLOBAL VARIABLE ===
const REQUIRED_ATTRIBUTES = ["user_id", "title", "company"];

class PreviousOutsideProjectController {
  private previousOutsideProjectRepository = getRepository(
    PreviousOutsideProject
  );

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async newPreviousOutsideProject(req: Request, res: Response) {
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
    const userID = Number(req.body.user_id);
    const { title, company } = req.body;

    let wrongType = "";
    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    if (typeof userID !== "number") {
      wrongType += `${typeof userID}: userID should be a number\n`;
    }
    if (typeof title !== "string") {
      wrongType += `${typeof title}: title should be a string\n`;
    }
    if (typeof company !== "string") {
      wrongType += `${typeof company}: company should be a string\n`;
    }
    if (wrongType) {
      res.status(422);
      return wrongType;
    }

    try {
      const newInfo = this.previousOutsideProjectRepository.create(req.body);
      const newPreviousOutsideProject = await this.previousOutsideProjectRepository.save(
        newInfo
      );
      return newPreviousOutsideProject;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getPreviousOutsideProject(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    // Check for Required Path Parameter
    if (!req.params.previous_outside_project_id) {
      res.status(422);
      return "Missing previous_outside_project_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const previousOutsideProjectID = Number(
      req.params.previous_outside_project_id
    );
    if (Number.isNaN(previousOutsideProjectID)) {
      res.status(422);
      return "previous_outside_project_id should be a number";
    }

    // Get User in DB
    try {
      const previousOutsideProject = await this.previousOutsideProjectRepository.findOne(
        previousOutsideProjectID
      );

      if (!previousOutsideProject) {
        res.status(404);
        return `User with ID ${previousOutsideProjectID} not found.`;
      }

      // Return Found User
      return previousOutsideProject;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updatePreviousOutsideProject(req: Request, res: Response) {
    const previousOutsideProject = await this.getPreviousOutsideProject(
      req,
      res
    );
    if (res.statusCode !== 200) {
      // calling this.getPreviousOutsideProject() returned an error, so return the error
      return previousOutsideProject;
    }

    // Update User in DB
    try {
      // Update & Return Found User
      return await this.previousOutsideProjectRepository.save({
        ...previousOutsideProject, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deletePreviousOutsideProject(req: Request, res: Response) {
    const previousOutsideProject = await this.getPreviousOutsideProject(
      req,
      res
    );
    if (res.statusCode !== 200) {
      // calling this.getPreviousOutsideProject() returned an error, so return the error
      return previousOutsideProject;
    }

    try {
      // Delete the User in DB
      await this.previousOutsideProjectRepository.delete(
        previousOutsideProject.id
      );

      // Return the Deleted User
      return previousOutsideProject;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}

export default PreviousOutsideProjectController;