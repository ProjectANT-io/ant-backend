import * as Twilio from "twilio";

require("dotenv").config();

// Access Token used for Video, IP Messaging, and Sync
const { AccessToken } = Twilio.jwt;
const { ChatGrant } = AccessToken;
const { VideoGrant } = AccessToken;
const { SyncGrant } = AccessToken;

// Get twilio tokens from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const apiKey = process.env.TWILIO_API_KEY!;
const apiSecret = process.env.TWILIO_API_SECRET!;
const chatServiceSid = process.env.TWILIO_CHAT_SERVICE_SID!;
const syncServiceSid = process.env.TWILIO_SYNC_SERVICE_SID!;

/**
 * Generate an Access Token for an application user - it generates a token with an
 * identity which in this case, will be the user's email.
 *
 * @param {*} identity - The user's email address
 * @return {Object}
 *         {Object.identity} String indentity
 *         {Object.token} String generated token
 */
function tokenGenerator(identity: string) {
  // Create an access token which we will sign and return to the client
  const token = new AccessToken(accountSid, apiKey, apiSecret);

  // Assign the provided identity
  token.identity = identity;

  // Grant the access token Twilio Video capabilities for future references
  const videoGrant = new VideoGrant();
  token.addGrant(videoGrant);

  if (chatServiceSid) {
    // Create a "grant" which enables a client to use IPM as a given user,
    // on a given device
    const chatGrant = new ChatGrant({
      serviceSid: chatServiceSid,
    });
    token.addGrant(chatGrant);
  }

  if (syncServiceSid) {
    // Point to a particular Sync service, or use the account default to
    // interact directly with Functions.
    const syncGrant = new SyncGrant({
      serviceSid: syncServiceSid || "default",
    });
    token.addGrant(syncGrant);
  }

  // Serialize the token to a JWT string and include it in a JSON response
  return {
    identity: token.identity,
    token: token.toJwt(),
  };
}

module.exports = tokenGenerator;
