/* eslint-disable import/no-cycle */
import IEmail from "../config/email";

const activationEmail = (data: IEmail["activation"]) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      background-color: #e5e5e5;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    "
  >
    <center
      style="
        width: 100%;
        table-layout: fixed;
        background-color: #e5e5e5;
        padding-bottom: 40px;
      "
    >
      <table
        style="border-spacing: 0; width: 100%; max-width: 600px"
        width="100%"
      >
        <tr>
          <td>
            <table
              width="100%"
              style="
                height: 55vh;
                align-items: center;
                background: linear-gradient(
                  180deg,
                  #9aa0e0 0%,
                  rgba(154, 160, 224, 0) 100%
                );
              "
            >
              <tr>
                <td height="130px">
                  <table width="100%">
                    <tr>
                      <td style="text-align: center">
                        <img
                          height="100"
                          width="100"
                          style="object-fit: contain"
                          src="https://www.linkpicture.com/q/ANT-Logo.png"
                          alt="ant-logo"
                        />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td height="1px">
                  <table width="100%">
                    <tr>
                      <td style="text-align: center">
                        <div
                          style="
                            background-color: #4d57d4;
                            height: 1px;
                            max-width: 80%;
                            margin: 0 auto;
                          "
                        ></div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td height="100px">
                  <table width="100%">
                    <tr>
                      <td height="70px" style="text-align: center">
                        <h1
                          style="
                            color: #4d57d4;
                            margin-top: 65px;
                            font-size: 23px;
                            margin: 0;
                          "
                        >
                          You’re One Step Away From New Opportunities!
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td height="20px">
                        <table width="100%">
                          <tr>
                            <td style="text-align: center">
                              <div style="color: #4d57d4; font-size: 17px">
                                Activate your ANT account to get started.
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr height="50px">
                <td>
                  <table width="100%">
                    <tr>
                      <td style="text-align: center">
                        <a
                          href='${data.link}'
                          style="
                            color: #ffffff;
                            text-decoration: none;
                            text-align: center;
                            width: 300px;
                            height: 60px;
                            padding: 15px 25px;
                            background: #404bdb;
                            border-radius: 5px;
                            border: none;
                            font-size: 14px;
                          "
                        >
                          Activate Your Account
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table width="100%">
              <tr>
                <td>
                  <table width="100%">
                    <tr>
                      <td>
                        <div
                          style="
                            width: 250px;
                            max-width: 300px;
                            height: 320px;
                            margin: 0 auto;
                            background: url(https://www.linkpicture.com/q/Image_14.png);
                            background-repeat: no-repeat;
                            background-position: center;
                            background-size: contain;
                          "
                        ></div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table style="margin-top: 10px" width="100%">
              <tr>
                <td>
                  <table style="margin: 0 auto" width="50%">
                    <tr>
                      <td>
                        <table width="100%">
                          <tr>
                            <td style="text-align: center">
                              <a href="#"
                                ><img
                                  alt="Facebook-Icon"
                                  height="35"
                                  width="35"
                                  src="https://www.linkpicture.com/q/Facebook-Icon.png"
                                  type="icon"
                              /></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <table width="100%">
                          <tr>
                            <td style="text-align: center">
                              <a href="#"
                                ><img
                                  alt="Twitter-Icon"
                                  height="35"
                                  width="35"
                                  src="https://www.linkpicture.com/q/Twitter-Icon.png"
                                  type="icon"
                              /></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <table width="100%">
                          <tr>
                            <td style="text-align: center">
                              <a href="#"
                                ><img
                                  alt="Instagram-Icon"
                                  height="35"
                                  width="35"
                                  src="https://www.linkpicture.com/q/Instagram-Icon.png"
                                  type="icon"
                              /></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table width="100%">
              <tr>
                <td>
                  <table width="100%">
                    <tr>
                      <td style="text-align: center">
                        <div
                          style="
                            color: #b7b5b5;
                            margin-top: 20px;
                            font-size: 18px;
                          "
                        >
                          Sent from the team at Project ANT
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table width="100%">
                    <tr>
                      <td style="text-align: center">
                        <a
                          href="#"
                          style="
                            text-decoration: none;
                            font-size: 18px;
                            color: #726f6f;
                            margin-bottom: 30px;
                          "
                        >
                          Edit email preferences
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`;
};

export default activationEmail;
