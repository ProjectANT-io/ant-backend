import { Request, Response } from "express";
import UserController from "./UserController";

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

export default class PaymentController {
  private SITE_DOMAIN = "http://localhost:8000";

  // Basic Stripe-Sponsored Checkout Screen
  async createSession() {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Stubborn Attachments",
              images: ["https://i.imgur.com/EHyR2nP.png"],
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${this.SITE_DOMAIN}/stripe-test?success=true`,
      cancel_url: `${this.SITE_DOMAIN}/stripe-test?canceled=true`,
    });

    return { id: session.id };
  }

  async createStripeAccount(req: Request, res: Response) {
    // Expected POST Body: id <int> id of user
    // Create Stripe Account
    const account = await stripe.accounts.create({
      type: "express",
      business_type: "individual",
      //   TODO: pass in email, etc.
    });

    // Assign Stripe Account ID to Platform (ANT) DB
    try {
      await UserController.assignStripeId(Number(req.body.id), account.id);
    } catch (e) {
      res.status(500);
      return String(e);
    }

    // Create Stripe Account Link
    const accountLinks = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${this.SITE_DOMAIN}/reauth`, // TODO
      return_url: `${this.SITE_DOMAIN}/return`, // TODO
      type: "account_onboarding",
    });

    return accountLinks.url;
  }

  async createPaymentIntent(req: Request, res: Response) {
    // Expected POST Body: id <int> id of user

    try {
      const studentStripeId = await UserController.getStripeId(
        Number(req.body.id)
      );

      const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ["card"],
        amount: 100,
        currency: "usd",
        application_fee_amount: 5,
        transfer_data: {
          destination: studentStripeId,
        },
      });

      return paymentIntent.client_secret;
    } catch (e) {
      res.status(500);
      return String(e);
    }
  }
}
