import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Business from "../entity/Business";

// === GLOBAL VARIABLE ===
const REQUIRED_ATTRIBUTES = ["company_name"];

class BusinessController {
  private businessRepository = getRepository(Business);

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async newBusiness(req: Request, res: Response) {
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
    const companyName = req.body.company_name;

    let wrongType = "";
    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    if (typeof companyName !== "string") {
      wrongType += `${typeof companyName}: company_name should be a string\n`;
    }
    if (wrongType) {
      res.status(422);
      return wrongType;
    }

    try {
      const newInfo = this.businessRepository.create(req.body);
      const newBusinessInfo = await this.businessRepository.save(newInfo);
      return newBusinessInfo;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getBusiness(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    // Check for Required Path Parameter
    if (!req.params.business_id) {
      res.status(422);
      return "Missing business_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const businessID = Number(req.params.business_id);
    if (Number.isNaN(businessID)) {
      res.status(422);
      return "business_id should be a number";
    }

    // Get Business in DB
    try {
      const business = await this.businessRepository.findOne(businessID);

      if (!business) {
        res.status(404);
        return `Business with ID ${businessID} not found.`;
      }

      // Return Found Business
      return business;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateBusiness(req: Request, res: Response) {
    const business = await this.getBusiness(req, res);
    if (res.statusCode !== 200) {
      // calling this.getBusiness() returned an error, so return the error
      return business;
    }

    // Update Business in DB
    try {
      // Update & Return Found Business
      return await this.businessRepository.save({
        ...business, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteBusiness(req: Request, res: Response) {
    const business = await this.getBusiness(req, res);
    if (res.statusCode !== 200) {
      // calling this.getBusiness() returned an error, so return the error
      return business;
    }

    try {
      // Delete the Business in DB
      await this.businessRepository.delete(business.id);

      // Return the Deleted Business
      return business;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}

export default BusinessController;
