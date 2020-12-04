import { getRepository } from "typeorm";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import Employee from "../entity/Employee";
import User from "../entity/User";


export default class EmployeeController {
  private employeeRepository = getRepository(Employee);

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async createEmployee(req: Request, res: Response) {
    // ensure not logged in
    if (req.isAuthenticated()) {
      res.status(403);
      return "Already logged in";
    }
    
    // check for missing required POST body fields
    let missingFields: string = "";
    ["email", "password"].forEach(
      (expectedField) => {
        if (!(expectedField in req.body)) {
          missingFields += `Missing ${expectedField}\n`;
        }
      }
    );
    if (missingFields) {
      res.status(422);
      return missingFields;
    }

    try {
      // check for existing user
      const employee = await this.employeeRepository.find({
        where: {
          email: req.body.email,
        },
      });
      const user = await getRepository(User).find({
        where: {
          email: req.body.email,
        },
      });
      if (employee.length > 0 || user.length > 0) {
        throw("Email is already registered to another user.");
      }

      // create user with encrypted password
      const newEmployeeInfo = this.employeeRepository.create({
        ...req.body,
        type: "employee",
        password: await bcrypt.hash(req.body.password, 5),
      });
      const newEmployee = await this.employeeRepository.save(newEmployeeInfo);
      return newEmployee;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getEmployee(req: Request, res: Response) {
    // Check for Required Path Parameter
    if (!req.params.employee_id) {
      res.status(422);
      return "Missing employee_id as path parameter";
    }

    // Check for Correct Type of Required Path Parameter
    const employeeID = Number(req.params.employee_id);
    if (Number.isNaN(employeeID)) {
      res.status(422);
      return "employee_id should be a number";
    }

    // Get Employee in DB
    try {
      // Find Employee
      const employee = await this.employeeRepository.findOne(employeeID, {
        relations: ["business"],
      });

      // If Employee Does Not Exist
      if (!employee) {
        res.status(404);
        return `Employee with ID ${employeeID} not found.`;
      }

      // Return Found Employee
      return employee;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async updateEmployee(req: Request, res: Response) {
    const employee = await this.getEmployee(req, res);
    if (res.statusCode !== 200) {
      // calling this.getEmployee() returned an error, so return the error
      return employee;
    }

    // Update Employee in DB
    try {
      // Update & Return Found Employee
      return await this.employeeRepository.save({
        ...employee, // retrieve existing properties
        ...req.body, // override some existing properties
      });
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async deleteEmployee(req: Request, res: Response) {
    const employee = await this.getEmployee(req, res);
    if (res.statusCode !== 200) {
      // calling this.getEmployee() returned an error, so return the error
      return employee;
    }

    try {
      // Delete the Employee in DB
      await this.employeeRepository.delete(employee.id);

      // Return the Deleted Employee
      return employee;
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async loginEmployee(req: Request, res: Response) {
    try {
      // Find Employee
      const employee = await this.employeeRepository.findOne({
        email: req.body.email,
      });

      // If Employee Does Not Exist
      if (!employee) {
        res.status(404);
        return `Employee with email ${req.body.email} not found.`;
      }

      // Found Employee
      if (employee.password !== req.body.password) {
        res.status(401);
        return "Incorrect Password";
      }
      return employee;
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}
