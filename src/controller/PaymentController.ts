require("dotenv").config();
// import { Request, Response } from "express";

const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

export default class PaymentController {
  private SITE_DOMAIN = "http://localhost:8000/stripe-test";

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
      success_url: `${this.SITE_DOMAIN}?success=true`,
      cancel_url: `${this.SITE_DOMAIN}?canceled=true`,
    });

    return { id: session.id };
  }
}
