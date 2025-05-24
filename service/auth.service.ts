import { JwtPayload } from "../dto/jwt-payloads";
import httpException from "../exception/httpException";
import { JWT_VALIDITY ,JWT_SECRET} from "../utils/constants";
import EmployeeService from "./employee.service";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

class AuthService{
    constructor(private employeeService:EmployeeService){}

    async login(email:string,password:string){

        const employee= await this.employeeService.getEmployeeByEmail(email);
        if(!employee){
            throw new httpException(404,"Employee not found")
        }
        const isPasswordValid= await bcrypt.compare(password,employee.password)
        if(!isPasswordValid){
            throw new httpException(400,"password is incorrect")
        }
        const payload:JwtPayload={
            id:employee.id,
            email:employee.email,
            role:employee.role
        }
        const token=jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_VALIDITY});
        return {
            tokenType:"Bearer",
            accessToken:token
        }
    }
}

export default AuthService
