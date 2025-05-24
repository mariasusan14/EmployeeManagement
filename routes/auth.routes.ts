import { Router } from "express";
import AuthController from "../controller/auth.controller";
import AuthService from "../service/auth.service";
import { employeeService } from "./employee.router";


const authRouter= Router();


const authService=new AuthService(employeeService);
new AuthController(authService,authRouter)

export default authRouter