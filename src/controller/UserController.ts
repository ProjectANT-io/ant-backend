import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {
  /* private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne(request.params.id);
    // await this.userRepository.remove(userToRemove);
  } */

  async getOneUser(request: Request, response: Response, next: NextFunction) {
    // TODO await authentication, return 401 if unauthorized
    // TODO await permissions check, return 403 if not allowed

    // Telvin: query Users DB with request.params.user_id, return the user whose ID matches request.params.user_id
    // Telvin: return the JSON of the user record
    return {};
  }
}
