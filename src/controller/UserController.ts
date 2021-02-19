import { getRepository } from "typeorm";
import { Request, Response } from "express";
import User from "../entity/User";
import Business from "../entity/Business";
import { userRequiredCols } from "../entity/IUser";
import checkUsersAuth from "../utils/authCheck";

const authUtils = require("../utils/authUtils");

export default class UserController {
  private userRepository = getRepository(User);

  private businessRepository = getRepository(Business);

  async createUser(req: Request, res: Response) {
    // check for missing required POST body fields
    let missingFields: string = "";
    // Took off resume_url TEMP. Having trouble signing up employee as user when resume its required
    // but not asked in onboarding
    userRequiredCols.forEach((expectedField) => {
      if (!(expectedField in req.body)) {
        missingFields += `Missing ${expectedField}\n`;
      }
    });
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

    if (
      req.body.type &&
      req.body.type === "employee" &&
      typeof req.body.business !== "number"
    ) {
      res.status(422);
      return "Employee needs to choose a business affiliated to it.";
    }

    try {
      let business;
      if (req.body.type === "employee") {
        business = await this.businessRepository.findOne(req.body.business_id);

        if (!business) {
          res.status(404);
          return `Business with ID ${req.body.business_id} not found.`;
        }

        // await this.businessRepository.save({
        //   ...business, // retrieve existing properties
        //   ...req.body, // override some existing properties
        // });
      }

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
      const user = await this.userRepository.findOne(userID, {
        relations: [
          "business",
          "projects",
          "previous_outside_projects",
          "education",
          "work_experiences",
        ],
      });

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
    if (!await checkUsersAuth(req.user, user.id)) {
      res.status(401);
      return "Unauthorized";
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
    if (!await checkUsersAuth(req.user, user.id)) {
      res.status(401);
      return "Unauthorized";
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

  static async getStripeId(userId: number) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId);
    if (!user || !user.stripeId) {
      throw new Error(`User with id ${userId} not found/stripe ID invalid`);
    }
    return user.stripeId;
  }

  static async assignStripeId(userId: number, stripeId: string) {
    const userRepository = getRepository(User);
    if (!(await userRepository.findOne(userId))) {
      throw new Error(`User with id ${userId} not found`);
    }
    return userRepository.update(userId, { stripeId });
  }
}
