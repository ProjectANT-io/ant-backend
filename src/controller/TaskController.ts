import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Task from "../entity/task";
import User from "../entity/User";

export default class TaskController {
  private taskRepository = getRepository(Task);

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async createTask(req: Request, res: Response) {
    // ensure not logged in
    if (req.isAuthenticated()) {
      res.status(403);
      return "Already logged in";
    }

    // check for missing required POST body fields
    let missingFields: string = "";
    ["title"].forEach((expectedField) => {
      if (!(expectedField in req.body)) {
        missingFields += `Missing ${expectedField}\n`;
      }
    });
    if (missingFields) {
      res.status(422);
      return missingFields;
    }

    try {
      // create user with encrypted password
      const newTaskInfo = this.taskRepository.create(req.body);
      const newTask = await this.taskRepository.save(newTaskInfo);
      return newTask;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getTask(req: Request, res: Response) {
    // Check for Required Path Parameter
    if (!req.params.task_id) {
      res.status(422);
      return "Missing task_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const taskID = Number(req.params.task_id);
    if (Number.isNaN(taskID)) {
      res.status(422);
      return "task_id should be a number";
    }

    // Get Task in DB
    try {
      // Find Task
      const task = await this.taskRepository.findOne(taskID);

      // If Task Does Not Exist
      if (!task) {
        res.status(404);
        return `Task with ID ${taskID} not found.`;
      }

      // Return Found Task
      return task;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateTask(req: Request, res: Response) {
    const task = await this.getTask(req, res);
    if (res.statusCode !== 200) {
      // calling this.getTask() returned an error, so return the error
      return task;
    }

    // Update Task in DB
    try {
      // Update & Return Found Task
      return await this.taskRepository.save({
        ...task, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteTask(req: Request, res: Response) {
    const task = await this.getTask(req, res);
    if (res.statusCode !== 200) {
      // calling this.getTask() returned an error, so return the error
      return task;
    }

    try {
      // Delete the Task in DB
      await this.taskRepository.delete(task.id);

      // Return the Deleted Task
      return task;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}
