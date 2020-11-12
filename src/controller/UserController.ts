import { getRepository } from "typeorm";
import { Request, Response } from "express";
import User from "../entity/User";

class UserController {
  private userRepository = getRepository(User);

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async newUser(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    // check for missing required POST body fields
    let missingFields: string = "";
    ["first_name", "last_name", "resume_url", "skills"].forEach(
      (expectedField) => {
        if (!(expectedField in req.body)) {
          missingFields += `Missing ${expectedField}\n`;
        }
      }
    );
    if (missingFields) {
      res.status(422);
      return missingFields;
    }

    // const firstName, lastName, resumeURL, skills
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const resumeURL = req.body.resume_url;
    const { skills } = req.body;

    let wrongType = "";
    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    if (typeof firstName !== "string") {
      wrongType += `${typeof firstName}: first_name should be a string\n`;
    }
    if (typeof lastName !== "string") {
      wrongType += `${typeof lastName}: last_name should be a string\n`;
    }
    if (typeof resumeURL !== "string") {
      wrongType += `${typeof resumeURL}: resume_url should be a string\n`;
    }
    if (typeof skills !== "string") {
      wrongType += `${typeof skills}: skills should be a string\n`;
    }
    if (wrongType) {
      res.status(422);
      return wrongType;
    }

    // TODO Telvin remove ESLint disable-line once DB code is in place
    // eslint-disable-next-line no-unused-vars
    // const user = {
    //   first_name: req.body.first_name,
    //   last_name: req.body.last_name,
    //   status: "unverified", // TODO
    //   about_me: "",
    //   profile_picture_url: "",
    //   resume_url: req.body.resume_url,
    //   skills:
    //     typeof req.body.skills === "string"
    //       ? req.body.skills.split(",")
    //       : req.body.skills,
    //   external_urls: [],
    //   educations: [],
    //   previous_projects: [],
    //   work_experiences: [],
    //   project_preference: [],
    // };

    try {
      const newUserInfo = this.userRepository.create(req.body);
      const newUser = await this.userRepository.save(newUserInfo);
      return newUser;
    } catch (e) {
      res.status(500);
      return e;
    }
    // return user
  }

  async getUser(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    // Check for Required Path Parameter
    if (!req.params.user_id) {
      res.status(422);
      return "Missing user_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const userID = Number(req.params.user_id);
    if (Number.isNaN(userID)) {
      res.status(422);
      return "user_id should be a number";
    }

    // Get User in DB
    try {
      // Find User
      const user = await this.userRepository.findOne(userID);

      // If User Does Not Exist
      if (!user) {
        res.status(404);
        return `User with ID ${userID} not found.`;
      }

      // Return Found User
      return user;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateUser(req: Request, res: Response) {
    const user = await this.getUser(req, res);
    if (res.statusCode !== 200) {
      // calling this.getUser() returned an error, so return the error
      return user;
    }

    // Update User in DB
    try {
      // Update & Return Found User
      return await this.userRepository.save({
        ...user, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteUser(req: Request, res: Response) {
    const user = await this.getUser(req, res);
    if (res.statusCode !== 200) {
      // calling this.getUser() returned an error, so return the error
      return user;
    }

    try {
      // Delete the User in DB
      await this.userRepository.delete(user.id);

      // Return the Deleted User
      return user;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}

export default UserController;
