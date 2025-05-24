import httpException from "../exception/httpException";
import EmployeeService from "../service/employee.service";
import {Request, Response, Router,NextFunction} from 'express';
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import authorizationMiddleware, { checkRole } from "../middlewares/authorization.middleware";
import { EmployeeRole } from "../entities/employee.entity";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";


class EmployeeController{
    private authorisedRoles=[EmployeeRole.HR,EmployeeRole.DEVELOPER,EmployeeRole.UI,EmployeeRole.UX]
    constructor(private employeeService:EmployeeService, router:Router){
       router.post("/",checkRole(this.authorisedRoles),this.createEmployee.bind(this));
       router.get("/",this.getAllEmployees.bind(this));
       router.get("/:id",this.getEmployeeById.bind(this));
       router.put("/:id",checkRole(this.authorisedRoles),this.updateEmployee);
       router.delete("/:id",checkRole(this.authorisedRoles),this.deleteEmployee);
    }

        async createEmployee(req:Request,res:Response,next:NextFunction){
              try {
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new httpException(400, JSON.stringify(errors));
      }
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


        async getAllEmployees(req:Request,res:Response){
            const employees=await this.employeeService.getAllEmployees();
            res.status(200).send(employees)
        }


        async getEmployeeById(req:Request,res:Response, next:NextFunction){
            try{
             const id=parseInt(req.params.id)
            const employee= await this.employeeService.getEmployeeById(id);
            if(!employee){
              throw new httpException(404,"")
            }
            res.status(200).send(employee)
            }
            catch(err){
              
                console.log("error: "+err)
                next(err);
            }
        }


        updateEmployee=async(req:Request,res:Response)=>{
          const updatemployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
            const id=parseInt(req.params.id)
            const email=req.body.email;
            const name=req.body.name;
            await this.employeeService.updateEmployee(id,email,name)
            res.status(200).send();
        }

        deleteEmployee=async (req:Request,res:Response)=>{
            const id=parseInt(req.params.id)
            await this.employeeService.deleteEmployee(id);
            res.status(204).send();
        }
    
}

export default EmployeeController;