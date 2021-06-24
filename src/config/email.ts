/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import { String } from "aws-sdk/clients/cloudsearch";
import completeProfileHtml from "../ant-emails/complete_profile";
import activationEmailHtml from "../ant-emails/activation_email";
import firstTimeUsingMatchmakerHtml from "../ant-emails/first_time_using_matchmaker";
import disputeEmailHtml from "../ant-emails/dispute_email";
import offerReceivedHtml from "../ant-emails/offer_received";
import userSentInterestToCompanyHtml from "../ant-emails/user_sent_interest_to_company";

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_EMAIl_ACCESS_KEY,
  secretAccessKey: process.env.AWS_EMAIL_SECRET_KEY,
  region: process.env.AWS_EMAIL_REGION,
});

export default interface IEmail {
  welcome: {
    link: string;
    toEmail: String;
  };
  activation: {
    link: string;
    toEmail: String;
  };
  firstTimeUsingMatchmaker: {
    link: string;
    toEmail: String;
  };
}
const ses = new AWS.SES();

const emailConfig = (data: any, html: string) => {
  const params = {
    Destination: {
      ToAddresses: [data.toEmail],
    },
    ConfigurationSetName: "", // fill in
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: html,
        },
        Text: {
          Charset: "UTF-8",
          Data: "Text to display if html could not be rendered",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Welcome To Project ANT!",
      },
    },
    Source: "web@projectant.io",
  };

  const sendEmail = ses.sendEmail(params).promise();

  sendEmail
    .then((response: any) => {
      console.log("email submitted to SES", response);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export const completeProfile = async (data: IEmail["welcome"]) => {
  const html = await completeProfileHtml(data);
  await emailConfig(data, html);
};

export const activation = async (data: IEmail["welcome"]) => {
  const html = await activationEmailHtml(data);
  await emailConfig(data, html);
};

export const matchmaker = async (data: IEmail["firstTimeUsingMatchmaker"]) => {
  const html = await firstTimeUsingMatchmakerHtml(data);
  await emailConfig(data, html);
};

export const dispute = async (data: IEmail["firstTimeUsingMatchmaker"]) => {
  const html = await disputeEmailHtml();
  await emailConfig(data, html);
};

export const offerReceived = async (
  data: IEmail["firstTimeUsingMatchmaker"]
) => {
  const html = await offerReceivedHtml();
  await emailConfig(data, html);
};

export const userSentInterestToCompany = async (
  data: IEmail["firstTimeUsingMatchmaker"]
) => {
  const html = await userSentInterestToCompanyHtml();
  await emailConfig(data, html);
};
