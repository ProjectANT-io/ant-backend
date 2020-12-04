import { getRepository } from "typeorm";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import User from "../entity/User";
import Employee from "../entity/Employee";

export default class UserController {
  private userRepository = getRepository(User);

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async createUser(req: Request, res: Response) {
    // ensure not logged in
    if (req.isAuthenticated()) {
      res.status(403);
      return "Already logged in";
    }

    // check for missing required POST body fields
    let missingFields: string = "";
    ["email", "password"].forEach((expectedField) => {
      if (!(expectedField in req.body)) {
        missingFields += `Missing ${expectedField}\n`;
      }
    });
    if (missingFields) {
      res.status(422);
      return missingFields;
    }

    try {
      // check for existing user
      const user = await this.userRepository.find({
        where: {
          email: req.body.email,
        },
      });
      const employee = await getRepository(Employee).find({
        where: {
          email: req.body.email,
        },
      });
      if (user.length > 0 || employee.length > 0) {
        throw "Email is already registered to another user.";
      }

      // create user with encrypted password
      const newUserInfo = this.userRepository.create({
        ...req.body,
        type: "user",
        password: await bcrypt.hash(req.body.password, 5),
      });
      const newUser = await this.userRepository.save(newUserInfo);
      newUser.type = 'user';
      return newUser;
    } catch (e) {
      res.status(500);
      return e;
    }
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
      user.type = 'user';
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

  async loginUser(req: Request, res: Response) {
    try {
      // Create 30 day session cookie\
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
      return req.user;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async logoutUser(req: Request, res: Response) {
    try {
      req.logout();
      return "Successfully logged out";
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}
