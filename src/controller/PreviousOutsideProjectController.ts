import { getRepository } from "typeorm";
import { Request, Response } from "express";
import PreviousOutsideProject from "../entity/PreviousOutsideProject";
import { previousOutsideProjectRequiredCols } from "../entity/IPreviousOutsideProject";
import { checkUsersAuth } from "../utils/authChecks";
import uploadToS3 from "../utils/uploadFileToS3";

class PreviousOutsideProjectController {
  private previousOutsideProjectRepository = getRepository(
    PreviousOutsideProject
  );

  async createPreviousOutsideProject(req: Request, res: Response) {
    let missingFields: string = "";
    previousOutsideProjectRequiredCols.forEach((expectedField) => {
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
    if (Number.isNaN(Number(req.body.student))) {
      wrongType += "student should be a number\n";
    }
    if (wrongType) {
      res.status(422);
      return wrongType;
    }
    if (!checkUsersAuth(req.user as any, req.body.student)) {
      res.status(403);
      return "Unauthorized";
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
    // Check for Required Path Parameter
    if (!req.params.previous_outside_project_id) {
      res.status(422);
      return "Missing previous_outside_project_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const previousOutsideProjectID = Number(
      req.params.previous_outside_project_id
    );
    if (Number.isNaN(Number(previousOutsideProjectID))) {
      res.status(422);
      return "previous_outside_project_id should be a number";
    }

    // Get User in DB
    try {
      const previousOutsideProject = await this.previousOutsideProjectRepository.findOne(
        previousOutsideProjectID,
        { relations: ["student"] }
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
    if (!checkUsersAuth(req.user as any, previousOutsideProject.student.id)) {
      res.status(403);
      return "Unauthorized";
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
    if (!checkUsersAuth(req.user as any, previousOutsideProject.student.id)) {
      res.status(403);
      return "Unauthorized";
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

  async uploadOutsideProjectPic(req: Request, res: Response) {
    const previousOutsideProject = await this.getPreviousOutsideProject(
      req,
      res
    );
    if (res.statusCode !== 200) {
      // calling this.getPreviousOutsideProject() returned an error, so return the error
      return previousOutsideProject;
    }
    if (!checkUsersAuth(req.user as any, previousOutsideProject.student.id)) {
      res.status(403);
      return "Unauthorized";
    }
    try {
      // get file extension
      const fileExt = req.file.originalname.split(".").pop();
      if (fileExt === req.file.originalname) {
        res.status(422);
        return "No file extension";
      }
      // set url ending
      const name = `${previousOutsideProject.id}outside-project-picture${
        previousOutsideProject.photos_url.length + 1
      }.${fileExt}`;
      const { file } = req;
      // upload picture to s3
      const data = await uploadToS3(file, name);
      if (!data.Location) {
        res.status(500);
        return "Error uploading picture";
      }
      // add picture url to end of array from previous outside project
      req.body.photos_url = [
        ...previousOutsideProject.photos_url,
        data.Location,
      ];
      // update previous outside project with updated array of photo urls and return previous outside project
      return await this.updatePreviousOutsideProject(req, res);
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}

export default PreviousOutsideProjectController;
