import { getRepository } from "typeorm";
import { Request, Response } from "express";
import User from "../entity/User";

const passport = require("passport");
const authUtils = require("../utils/authUtils");

export default class UserController {
  private userRepository = getRepository(User);

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async createUser(req: Request, res: Response) {
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
    ["email", "password", "first_name", "last_name", "resume_url"].forEach(
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

    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    // TODO

    const saltHash = authUtils.genPassword(req.body.password);
    const { salt, hash } = saltHash;
    req.body.hash = hash;
    req.body.salt = salt;

    try {
      const newUserInfo = this.userRepository.create(req.body);
      const newUser = await this.userRepository.save(newUserInfo);
      const jwt = authUtils.issueJWT(newUser, "user");

      return {
        success: true,
        user: newUser,
        token: jwt.token,
        expiresIn: jwt.expires,
      };
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
      // Find User
      const user = await this.userRepository.findOne({ email: req.body.email });

      // If User Does Not Exist
      if (!user) {
        res.status(401);
        return `User with email ${req.body.email} could not be found.`;
      }

      const isValid = authUtils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );

      // Found User
      if (!isValid) {
        res.status(401);
        return "Incorrect Password";
      }

      const tokenObject = authUtils.issueJWT(user, "user");
      return {
        success: true,
        user,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      };
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}
