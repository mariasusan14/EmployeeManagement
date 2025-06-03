import httpException from "../exception/httpException";
import EmployeeService from "../service/employee.service";
import { Request, Response, Router, NextFunction } from "express";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { checkRole } from "../middlewares/authorization.middleware";
import { EmployeeRole } from "../entities/employee.entity";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";

class EmployeeController {
  private authorisedRoles = [
    EmployeeRole.HR,
    EmployeeRole.DEVELOPER,
    EmployeeRole.UI,
    EmployeeRole.UX,
  ];
  constructor(private employeeService: EmployeeService, router: Router) {
    router.post(
      "/",
      checkRole(this.authorisedRoles),
      this.createEmployee.bind(this)
    );
    router.get("/", this.getAllEmployees.bind(this));
    router.get("/:id", this.getEmployeeById.bind(this));
    router.put("/:id", checkRole(this.authorisedRoles), this.updateEmployee);
    router.delete("/:id", checkRole(this.authorisedRoles), this.deleteEmployee);
  }

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new httpException(400, JSON.stringify(errors));
      }
      console.log("backend : ",createEmployeeDto)
      const savedEmployee = await this.employeeService.createEmployee(
        createEmployeeDto.email,
        createEmployeeDto.name,
        createEmployeeDto.age,
        createEmployeeDto.address,
        createEmployeeDto.password,
        createEmployeeDto.role,
        createEmployeeDto.department_id,
        createEmployeeDto.emp_id,
        createEmployeeDto.experience,
        createEmployeeDto.joiningDate,
        createEmployeeDto.status
      );
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  }

  async getAllEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await this.employeeService.getAllEmployees();
      if (!employees) {
        throw new httpException(404, "No Employees");
      }
      res.status(200).send(employees);
    } catch (err) {
      next(err);
    }
  }

  async getEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const employee = await this.employeeService.getEmployeeById(id);
      if (!employee) {
        throw new httpException(404, "Employee Not Found");
      }
      res.status(200).send(employee);
    } catch (err) {
      console.log("error: " + err);
      next(err);
    }
  }

  updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatemployeeDto = plainToInstance(UpdateEmployeeDto, req.body);

      const errors = await validate(updatemployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new httpException(400, JSON.stringify(errors));
      }
      const id = parseInt(req.params.id);
      
      await this.employeeService.updateEmployee(
        id,
        updatemployeeDto.email,
        updatemployeeDto.name,
        updatemployeeDto.emp_id,
        updatemployeeDto.age,
        updatemployeeDto.role,
        updatemployeeDto.experience,
        updatemployeeDto.joiningDate,
        updatemployeeDto.status,
        updatemployeeDto.department_id,
        updatemployeeDto.address
      );
      
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  };

  deleteEmployee = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await this.employeeService.deleteEmployee(id);
    res.status(204).send();
  };
}

export default EmployeeController;
