import DepartmentService from "../service/department.service";
import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { EmployeeRole } from "../entities/employee.entity";
import { checkRole } from "../middlewares/authorization.middleware";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import httpException from "../exception/httpException";

class DepartmentContoller {
  private authorisedRoles = [
    EmployeeRole.HR,
    EmployeeRole.DEVELOPER,
    EmployeeRole.UI,
    EmployeeRole.UX,
  ];
  constructor(private departmentService: DepartmentService, router: Router) {
    router.post(
      "/",
      checkRole(this.authorisedRoles),
      this.createDepartment.bind(this)
    );
    router.get("/:id", this.getAllEmployeesByDepartmentId.bind(this));
    router.put(
      "/:id",
      checkRole(this.authorisedRoles),
      this.updateDepartment.bind(this)
    );
    router.delete(
      "/:id",
      checkRole(this.authorisedRoles),
      this.deleteDepartment.bind(this)
    );
  }

  async createDepartment(req: Request, res: Response,next:NextFunction) {
    try {
      const createDepartmentDto = plainToInstance(
        CreateDepartmentDto,
        req.body
      );
      const errors = await validate(createDepartmentDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new httpException(400, JSON.stringify(errors));
      }
        const dept = await this.departmentService.createDepartment(
          createDepartmentDto.name
        );
        res.status(200).send(dept);
    } catch (err) {
        next(err)
    }
  }

  async getAllEmployeesByDepartmentId(req: Request, res: Response,next:NextFunction) {
    try{
       const id = parseInt(req.params.id);
    const dept = await this.departmentService.getAllEmployeesByDepartmentId(id);
    if(!dept){
      throw new httpException(404,"Departent Not Found")
    }
    res.status(200).send(dept.employees);
    }catch(err){
      next(err)
    }
   
  }

  async updateDepartment(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    await this.departmentService.updateDepartment(id, name);
    res.status(200).send();
  }

  async deleteDepartment(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await this.departmentService.deleteDepartment(id);
    res.status(204).send();
  }
}

export default DepartmentContoller;
