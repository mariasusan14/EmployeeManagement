import { Request,Response,NextFunction } from "express";
import { EmployeeRole } from "../entities/employee.entity";
import httpException from "../exception/httpException";



export const checkRole=(authorisedRoles:EmployeeRole[])=>{

    return (req:Request,res:Response,next:NextFunction)=>{
    const userRole=req.user?.role
    if(!authorisedRoles.includes(userRole)){
        throw new httpException(403,"user has no privilege to access the resource")
    }
    next();
}
}


export default checkRole