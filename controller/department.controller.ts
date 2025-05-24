import DepartmentService from "../service/department.service";
import { Request,Response,NextFunction } from "express";
import { Router } from "express";
import { EmployeeRole } from "../entities/employee.entity";
import authorizationMiddleware, { checkRole } from "../middlewares/authorization.middleware";
class DepartmentContoller{
    private authorisedRoles=[EmployeeRole.HR,EmployeeRole.DEVELOPER,EmployeeRole.UI,EmployeeRole.UX]
    constructor(private departmentService:DepartmentService,router:Router){
    router.post('/',checkRole(this.authorisedRoles),this.createDepartment.bind(this))
    router.get('/:id',this.getAllEmployees.bind(this))
    router.put('/:id',checkRole(this.authorisedRoles),this.updateDepartment.bind(this))
    router.delete('/:id',checkRole(this.authorisedRoles),this.deleteDepartment.bind(this))
    }

async createDepartment(req:Request,res:Response){
const name=req.body.name;
console.log(name);
const dept=await this.departmentService.createDepartment(name);
res.status(200).send()
}

async getAllEmployees(req:Request,res:Response){
    const id=parseInt(req.params.id);
    const dept=await this.departmentService.getAllEmployees(id)
    res.status(200).send(dept.employees)
}


async updateDepartment(req:Request,res:Response){
const id=parseInt(req.params.id)
const name=req.body.name;
await this.departmentService.updateDepartment(id,name)
res.status(200).send()
} 

async deleteDepartment(req:Request,res:Response){
    const id=parseInt(req.params.id)
    await this.departmentService.deleteDepartment(id);
    res.status(204).send();
}
}

export default DepartmentContoller
