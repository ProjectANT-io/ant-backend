import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Room from "../entity/Room";
import { roomRequiredCols } from "../entity/IRoom";
import { checkUsersAuth } from "../utils/authChecks";

const tokenGenerator = require("../utils/twilioTokenGenerator");

class RoomController {
  private roomRepository = getRepository(Room);

  async createRoom(req: Request, res: Response) {
    let missingFields: string = "";
    roomRequiredCols.forEach((expectedField) => {
      if (!(expectedField in req.body)) {
        missingFields += `Missing ${expectedField}\n`;
      }
    });
    if (missingFields) {
      res.status(422);
      return missingFields;
    }

    let wrongType = "";
    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    if (typeof req.body.is_file !== "boolean")
      wrongType += "is_file should be a boolean\n";

    if (wrongType) {
      res.status(422);
      return wrongType;
    }
    if (!checkUsersAuth(req.user as any, req.body.user_id)) {
      res.status(403);
      return "Unauthorized";
    }
    try {
      const newRoomInfo = this.roomRepository.create(req.body);
      const newRoom = await this.roomRepository.save(newRoomInfo);
      return newRoom;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getRooms(req: Request, res: Response) {
    const { userEmail, userID } = req.query;

    // Check for Required Query Parameter
    if (!userEmail) {
      res.status(422);
      return "Missing userEmail as query parameter";
    }

    if (!checkUsersAuth(req.user as any, Number(userID))) {
      res.status(403);
      return "Unauthorized";
    }

    // Get Rooms in DB
    try {
      const rooms = await this.roomRepository.find({
        relations: ["users", "messages"], // attach users and messages
      });

      const roomsWithUser = await rooms.filter((room) =>
        room.room_id.includes(userEmail.toString())
      );

      // Return Found Rooms
      return roomsWithUser;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getRoom(req: Request, res: Response) {
    const roomID = Number(req.params.room_id);
    // Check for Required Path Parameter
    if (!roomID) {
      res.status(422);
      return "Missing room_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    if (Number.isNaN(Number(roomID))) {
      res.status(422);
      return "room_id should be a number";
    }

    // Get Room in DB
    try {
      const room = await this.roomRepository.findOne(roomID, {
        relations: ["users", "messages"], // attach users and messages
      });

      if (!room) {
        res.status(404);
        return `Room with ID ${roomID} not found.`;
      }

      // Return Found Room
      return room;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateRoom(req: Request, res: Response) {
    const room = await this.getRoom(req, res);
    if (res.statusCode !== 200) {
      // calling this.getRoom() returned an error, so return the error
      return room;
    }
    if (!checkUsersAuth(req.user as any, Number(req.params.room_id))) {
      res.status(403);
      return "Unauthorized";
    }

    // Update Room in DB
    try {
      // Update & Return Found Room
      return await this.roomRepository.save({
        ...room, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteRoom(req: Request, res: Response) {
    const room = await this.getRoom(req, res);
    if (res.statusCode !== 200) {
      // calling this.getRoom() returned an error, so return the error
      return room;
    }
    if (!checkUsersAuth(req.user as any, Number(req.params.room_id))) {
      res.status(403);
      return "Unauthorized";
    }

    try {
      // Delete the Room in DB
      await this.roomRepository.delete(Number(req.params.room_id));

      // Return the Deleted Room
      return room;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async generateToken(req: Request, res: Response) {
    const { userID, identity } = req.body;

    if (!identity) {
      res.status(422);
      return "Missing identity in request body";
    }
    if (!checkUsersAuth(req.user as any, Number(userID))) {
      res.status(403);
      return "Unauthorized";
    }
    // call generate token function
    const tokenResponse = tokenGenerator(identity);
    return tokenResponse;
  }
}

export default RoomController;
