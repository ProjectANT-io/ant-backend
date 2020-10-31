import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

class UserController {
  private userRepository = getRepository(User);

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  // async all(request: Request, response: Response, next: NextFunction) {
  //   return this.userRepository.find();
  // }

  // async one(request: Request, response: Response, next: NextFunction) {
  //   return this.userRepository.findOne(request.params.id);
  // }

  // async save(request: Request, response: Response, next: NextFunction) {
  //   return this.userRepository.save(request.body);
  // }

  // async remove(request: Request, response: Response, next: NextFunction) {
  //   let userToRemove = await this.userRepository.findOne(request.params.id);
  //   // await this.userRepository.remove(userToRemove);
  // }

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
    let send422: string = "";
    if (!req.body.first_name) send422 = "Missing first name as first_name";
    if (!req.body.last_name) send422 = "Missing last name as last_name";
    if (!req.body.resume_url) send422 = "Missing resume URL as resume_url";
    if (!req.body.skills) send422 = "Missing skills as skills"; // TODO specify how to send SQL indices in POST body
    if (send422) {
      res.status(422);
      return send422;
    }

    // TODO Telvin remove ESLint disable-line once DB code is in place
    // eslint-disable-next-line no-unused-vars
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      status: "unverified", // TODO
      about_me: "",
      profile_picture_url: "",
      resume_url: req.body.resume_url,
      skills:
        typeof req.body.skills === "string"
          ? req.body.skills.split(",")
          : req.body.skills,
      external_urls: [],
      educations: [],
      previous_projects: [],
      work_experiences: [],
      project_preference: [],
    };

    // TODO Telvin: add user object to DB

    return user;
  }
}

export default UserController;
