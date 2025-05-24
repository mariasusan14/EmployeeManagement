import { NextFunction, Router } from "express";
import AuthService from "../service/auth.service";
import { Request,Response } from "express";
import httpException from "../exception/httpException";
class AuthController{

constructor(private authService:AuthService,private router:Router){
    router.post("/login",this.login.bind(this))
}

async login(req:Request,res:Response,next:NextFunction){
    try{
    const {email,password}=req.body;
    if(!email||!password){
        throw new httpException(400,"email and password are required")
    }
    const data=await this.authService.login(email,password)
    res.status(200).send(data)
    }catch(err){
        next(err)
    }
}
}

export default AuthController