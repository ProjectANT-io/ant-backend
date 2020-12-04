import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Certification from "../entity/Certification";

export default class CertificationController {
  private CertificationRepository = getRepository(Certification);

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async createCertification(req: Request, res: Response) {
    // ensure not logged in
    if (req.isAuthenticated()) {
      res.status(403);
      return "Already logged in";
    }

    // check for missing required POST body fields
    let missingFields: string = "";
    ["title", "date"].forEach((expectedField) => {
      if (!(expectedField in req.body)) {
        missingFields += `Missing ${expectedField}\n`;
      }
    });
    if (missingFields) {
      res.status(422);
      return missingFields;
    }

    try {
      // create Certification with encrypted password
      const newCertificationInfo = this.CertificationRepository.create(req.body);
      const newCertification = await this.CertificationRepository.save(
        newCertificationInfo
      );
      return newCertification;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getCertification(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    // Check for Required Path Parameter
    if (!req.params.Certification_id) {
      res.status(422);
      return "Missing Certification_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const CertificationID = Number(req.params.Certification_id);
    if (Number.isNaN(CertificationID)) {
      res.status(422);
      return "Certification_id should be a number";
    }

    // Get Certification in DB
    try {
      // Find Certification
      const Certification = await this.CertificationRepository.findOne(CertificationID);

      // If Certification Does Not Exist
      if (!Certification) {
        res.status(404);
        return `Certification with ID ${CertificationID} not found.`;
      }

      // Return Found Certification
      return Certification;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateCertification(req: Request, res: Response) {
    const Certification = await this.getCertification(req, res);
    if (res.statusCode !== 200) {
      // calling this.getCertification() returned an error, so return the error
      return Certification;
    }

    // Update Certification in DB
    try {
      // Update & Return Found Certification
      return await this.CertificationRepository.save({
        ...Certification, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteCertification(req: Request, res: Response) {
    const Certification = await this.getCertification(req, res);
    if (res.statusCode !== 200) {
      // calling this.getCertification() returned an error, so return the error
      return Certification;
    }

    try {
      // Delete the Certification in DB
      await this.CertificationRepository.delete(Certification.id);

      // Return the Deleted Certification
      return Certification;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}