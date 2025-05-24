import Department from "../entities/department.entity";
import Employee from "../entities/employee.entity";
import httpException from "../exception/httpException";
import DepartmentRepository from "../repositories/department.repository";

class DepartmentService{
    constructor(private departmentRepository:DepartmentRepository){}

    async createDepartment(name:string):Promise<Department>{
        const newDepartment=new Department()
        newDepartment.name=name;
        return this.departmentRepository.create(newDepartment);
    }
    
    async getAllEmployees(id:number):Promise<Department>{
        return await this.departmentRepository.findById(id)
    }

    async updateDepartment(id:number,name:string){
         const existingDept= await this.departmentRepository.findById(id)
         if(existingDept){
            const department=new Department();
            department.name=name;
            await this.departmentRepository.update(id,department);
         }
    }

    
    async deleteDepartment(id:number){
        const existingDept= await this.departmentRepository.findById(id);
        if(existingDept){
             await this.departmentRepository.delete(id)
        }
    
    }
    
}
export default DepartmentService