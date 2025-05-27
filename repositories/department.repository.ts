import { Repository } from "typeorm";
import Department from "../entities/department.entity";

class DepartmentRepository{
    constructor(private repository:Repository<Department>){}

    async create(department:Department):Promise<Department>{
        return this.repository.save(department)
    }

    async findAll():Promise<Department[]>{
        return this.repository.find();
    }

   async findEmployeesByDeptId(id:number):Promise<Department>{
        return this.repository.findOne({
            where:{id},
            relations:{
                employees:true
            }
        });//{id}={id:id}
    }

    async findById(id:number):Promise<Department>{
        return this.repository.findOneBy({id})
    }
     
   
    async update(id:number, department:Department):Promise<Department>{
        return this.repository.save({id, ...department})
    }

     async delete(id:number):Promise<void>{
       
        await this.repository.delete({id})
    }
    
}

export default DepartmentRepository;