import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Review from "../entity/Review";
import { reviewRequiredCols } from "../entity/IReview";
import { checkUsersAuthForBusiness } from "../utils/authChecks";

export default class ReviewController {
  private reviewRepository = getRepository(Review);

  async createReview(req: Request, res: Response) {
    // Check for Required POST Body Fields, return 422 if required field is missing
    let missingFields: string = "";
    reviewRequiredCols.forEach((expectedField) => {
      if (!(expectedField in req.body)) {
        missingFields += `Missing ${expectedField}\n`;
      }
    });
    if (missingFields) {
      res.status(422);
      return missingFields;
    }
    if (!checkUsersAuthForBusiness(req.user as any, req.body.business)) {
      res.status(403);
      return "Unauthorized";
    }

    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    // TODO

    // Save New review to DB
    try {
      const newInfo = this.reviewRepository.create(req.body);
      const newReviewInfo = await this.reviewRepository.save(newInfo);
      return newReviewInfo;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getReview(req: Request, res: Response) {
    // Check for Required Path Parameter
    if (!req.params.review_id) {
      res.status(422);
      return "Missing review_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const reviewID = Number(req.params.review_id);
    if (Number.isNaN(Number(reviewID))) {
      res.status(422);
      return "review_id should be a number";
    }

    // Get review in DB
    try {
      // Find review
      const review = await this.reviewRepository.findOne(reviewID, {
        relations: ["employee", "business", "student"], // attach student, business and employees tables to review data object
      });

      // If review Does Not Exist
      if (!review) {
        res.status(404);
        return `Review with ID ${reviewID} not found.`;
      }

      // Return Found review
      return review;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateReview(req: Request, res: Response) {
    const review = await this.getReview(req, res);
    if (res.statusCode !== 200) {
      // calling this.getReview() returned an error, so return the error
      return review;
    }
    if (!checkUsersAuthForBusiness(req.user as any, review.business.id)) {
      res.status(403);
      return "Unauthorized";
    }

    // Update review in DB
    try {
      // Update & Return Found review
      return await this.reviewRepository.save({
        ...review, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteReview(req: Request, res: Response) {
    const review = await this.getReview(req, res);
    if (res.statusCode !== 200) {
      // calling this.getReview() returned an error, so return the error
      return review;
    }
    if (!checkUsersAuthForBusiness(req.user as any, review.business.id)) {
      res.status(403);
      return "Unauthorized";
    }

    try {
      // Delete the review in DB
      await this.reviewRepository.delete(review.id);

      // Return the Deleted review
      return review;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}
