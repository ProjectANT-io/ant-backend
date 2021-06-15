/* eslint-disable no-console */
import { String } from "aws-sdk/clients/cloudsearch";

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "", // fill in
  secretAccessKey: "", // fill in
  region: "", // fill in
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

const completeProfileHtml = (data: IEmail["welcome"]) => {
  const email = `<!DOCTYPE html><html lang="en"> <body style=" background-color: #e5e5e5; margin: 0; padding: 0; box-sizing: border-box; " > <div style="height: 100vh"> <div style=" height: 40%; padding-top: 70px; display: flex; justify-content: center; flex-direction: column; align-items: center; background: linear-gradient( 180deg, #9aa0e0 0%, rgba(154, 160, 224, 0) 100% ); " > <div style=" display: flex; justify-content: flex-start; flex-direction: column; align-items: center; " > <img height="130" width="130" style="object-fit: contain" src="https://www.linkpicture.com/q/ANT-Logo.png" alt="ant-logo" /> </div> <div style=" width: 70%; height: 0px; border: 1px solid #4d57d4; margin-top: 30px; " ></div> <h1 style="color: #4d57d4; margin-top: 65px; font-size: 27px"> Welcome to Project ANT! </h1> <div style="color: #4d57d4; font-size: 20px; font-size: 19px"> We are excited to help you Earn, Learn and Grow. </div> <a href='${data.link}' style=" color: #ffffff; text-decoration: none; margin-top: 40px; text-align: center; width: 280px; /* height: 50px; */ padding: 15px 0; background: #404bdb; border-radius: 5px; border: none; " > Complete Your Profile </a> </div> <div style=" height: 30%; display: flex; justify-content: center; flex-direction: column; align-items: center; padding-top: 280px; " > <div> <div style=" width: 424.37px; height: 481.49px; background: url(https://www.linkpicture.com/q/Image_15.png); background-repeat: no-repeat; background-position: center; background-size: contain; " ></div> </div> </div> <div style="height: 10%"> <div style=" display: flex; justify-content: center; align-items: center; margin-top: 170px; " > <div> <a href="#" ><img alt="Facebook-Icon" height="50" width="50" src="https://www.linkpicture.com/q/Facebook-Icon.png" type="icon" /></a> </div> <div style="margin: 0 15px"> <a href="#" ><img alt="Twitter-Icon" height="50" width="50" src="https://www.linkpicture.com/q/Twitter-Icon.png" type="icon" /></a> </div> <div> <a href="#" ><img alt="Instagram-Icon" height="50" width="50" src="https://www.linkpicture.com/q/Instagram-Icon.png" type="icon" /></a> </div> </div> <div style=" color: #b7b5b5; margin-top: 20px; font-size: 20px; text-align: center; " > Sent from the team at Project ANT </div> <div style="display: flex; justify-content: center"> <a href="#" style=" text-decoration: none; margin-top: 20px; font-size: 20px; text-align: center; color: #726f6f; margin-bottom: 30px; " > Edit email preferences </a> </div> </div> </div> </body></html>`;
  return email;
};

const activationHtml = (data: IEmail["activation"]) => {
  const email = `<!DOCTYPE html><html lang="en"> <body style=" background-color: #e5e5e5; margin: 0; padding: 0; box-sizing: border-box; " > <div style="height: 100vh"> <div style=" height: 40%; padding-top: 70px; display: flex; justify-content: center; flex-direction: column; align-items: center; background: linear-gradient( 180deg, #9aa0e0 0%, rgba(154, 160, 224, 0) 100% ); " > <div style=" display: flex; justify-content: flex-start; flex-direction: column; align-items: center; " > <img height="130" width="130" style="object-fit: contain" src="https://www.linkpicture.com/q/ANT-Logo.png" alt="ant-logo" /> </div> <div style=" width: 70%; height: 0px; border: 1px solid #4d57d4; margin-top: 30px; " ></div> <h1 style="color: #4d57d4; margin-top: 65px; font-size: 27px"> You’re One Step Away From New Opportunities! </h1> <div style="color: #4d57d4; font-size: 20px; font-size: 19px"> Activate your ANT account to get started. </div> <a href='${data.link}' style=" color: #ffffff; text-decoration: none; margin-top: 40px; text-align: center; width: 280px; /* height: 50px; */ padding: 15px 0; background: #404bdb; border-radius: 5px; border: none; " > Activate Your Account </a> </div> <div style=" height: 30%; display: flex; justify-content: center; flex-direction: column; align-items: center; padding-top: 200px; " > <div> <div style=" width: 454.37px; height: 501.49px; background: url(https://www.linkpicture.com/q/Image_14.png); background-repeat: no-repeat; background-position: center; background-size: contain; " ></div> </div> </div> <div style="height: 10%"> <div style=" display: flex; justify-content: center; align-items: center; margin-top: 170px; " > <div> <a href="#" ><img alt="Facebook-Icon" height="50" width="50" src="https://www.linkpicture.com/q/Facebook-Icon.png" type="icon" /></a> </div> <div style="margin: 0 15px"> <a href="#" ><img alt="Twitter-Icon" height="50" width="50" src="https://www.linkpicture.com/q/Twitter-Icon.png" type="icon" /></a> </div> <div> <a href="#" ><img alt="Instagram-Icon" height="50" width="50" src="https://www.linkpicture.com/q/Instagram-Icon.png" type="icon" /></a> </div> </div> <div style=" color: #b7b5b5; margin-top: 20px; font-size: 20px; text-align: center; " > Sent from the team at Project ANT </div> <div style="display: flex; justify-content: center"> <a href="#" style=" text-decoration: none; margin-top: 20px; font-size: 20px; text-align: center; color: #726f6f; margin-bottom: 30px; " > Edit email preferences </a> </div> </div> </div> </body></html>`;
  return email;
};

const firstTimeUsingMatchmakerHtml = (data: IEmail["activation"]) => {
  const email = `<!DOCTYPE html><html lang="en"> <body style=" background-color: #e5e5e5; margin: 0; padding: 0; box-sizing: border-box; " > <div style="height: 100vh"> <div style=" height: 40%; padding-top: 100px; display: flex; justify-content: center; flex-direction: column; align-items: center; background: linear-gradient( 180deg, #9aa0e0 0%, rgba(154, 160, 224, 0) 100% ); " > <div style=" display: flex; justify-content: flex-start; flex-direction: column; align-items: center; " > <img height="130" width="130" style="object-fit: contain" src="https://www.linkpicture.com/q/ANT-Logo.png" alt="ant-logo" /> </div> <div style=" width: 70%; height: 0px; border: 1px solid #4d57d4; margin-top: 30px; " ></div> <h1 style="color: #4d57d4; margin-top: 65px; font-size: 27px"> Congratulations on taking the first step in your journey with </h1> <h1 style="color: #4d57d4; margin-top: 0; font-size: 27px"> Project ANT! </h1> <div style="color: #4d57d4; font-size: 19px"> Let’s start finding project matches. </div> <a href='${data.link}' style=" color: #ffffff; text-decoration: none; margin-top: 40px; text-align: center; width: 280px; /* height: 50px; */ padding: 15px 0; background: #404bdb; border-radius: 5px; border: none; " > Verify Your Work Email </a> </div> <div style=" height: 30%; display: flex; justify-content: center; flex-direction: column; align-items: center; margin-top: 280px; " > <div> <div style=" width: 424.37px; height: 481.49px; background: url(https://www.linkpicture.com/q/Image_13.png); background-repeat: no-repeat; background-position: center; background-size: contain; " ></div> </div> </div> <div style="height: 10%"> <div style=" display: flex; justify-content: center; align-items: center; margin-top: 270px; " > <div> <a href="#" ><img alt="Facebook-Icon" height="50" width="50" src="https://www.linkpicture.com/q/Facebook-Icon.png" type="icon" /></a> </div> <div style="margin: 0 15px"> <a href="#" ><img alt="Twitter-Icon" height="50" width="50" src="https://www.linkpicture.com/q/Twitter-Icon.png" type="icon" /></a> </div> <div> <a href="#" ><img alt="Instagram-Icon" height="50" width="50" src="https://www.linkpicture.com/q/Instagram-Icon.png" type="icon" /></a> </div> </div> <div style=" color: #b7b5b5; margin-top: 20px; font-size: 20px; text-align: center; " > Sent from the team at Project ANT </div> <div style="display: flex; justify-content: center"> <a href="#" style=" text-decoration: none; margin-top: 20px; font-size: 20px; text-align: center; color: #726f6f; margin-bottom: 30px; " > Edit email preferences </a> </div> </div> </div> </body></html>`;
  return email;
};

export const completeProfile = async (data: IEmail["welcome"]) => {
  const html = await completeProfileHtml(data);
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
    Source: "simrah@projectant.io",
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

export const activation = async (data: IEmail["welcome"]) => {
  const html = await activationHtml(data);
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
    Source: "simrah@projectant.io",
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

export const matchmaker = async (data: IEmail["firstTimeUsingMatchmaker"]) => {
  const html = await firstTimeUsingMatchmakerHtml(data);
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
    Source: "simrah@projectant.io",
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
