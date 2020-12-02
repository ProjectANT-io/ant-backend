import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Employee from "../entity/Employee";

const authUtils = require("../utils/authUtils");

export default class EmployeeController {
  private employeeRepository = getRepository(Employee);

  async authCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async permissionsCheck(request: Request, response: Response) {
    return true; // TODO
  }

  async createEmployee(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

    // check for missing required POST body fields
    let missingFields: string = "";
    ["email", "password", "first_name", "last_name", "business"].forEach(
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

    // Check for Correct Type of POST Body Fields, return 422 if type is not correct
    // TODO

    const saltHash = authUtils.genPassword(req.body.password);
    const { salt, hash } = saltHash;
    req.body.hash = hash;
    req.body.salt = salt;

    try {
      const newEmployeeInfo = this.employeeRepository.create(req.body);
      const newEmployee = await this.employeeRepository.save(newEmployeeInfo);
      const jwt = authUtils.issueJWT(newEmployee, "employee");
      return {
        success: true,
        user: newEmployee,
        token: jwt.token,
        expiresIn: jwt.expires,
      };
    } catch (e) {
      res.status(500);
      return e;
    }
  }

  async getEmployee(req: Request, res: Response) {
    if (!(await this.authCheck(req, res))) {
      res.status(401);
      return "Unauthorized";
    }
    if (!this.permissionsCheck(req, res)) {
      res.status(403);
      return "Wrong permissions";
    }

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

      const isValid = authUtils.validPassword(
        req.body.password,
        employee.hash,
        employee.salt
      );

      // Found Employee
      if (!isValid) {
        res.status(401);
        return "Incorrect Password";
      }
      const tokenObject = authUtils.issueJWT(employee, "employee");
      return {
        success: true,
        employee,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      };
    } catch (e) {
      res.status(500);
      return e;
    }
  }
}
