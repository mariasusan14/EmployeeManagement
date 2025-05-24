import { NextFunction,Request,Response } from "express";
import httpException from "../exception/httpException";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { JwtPayload } from "../dto/jwt-payloads";

const getToken=(req:Request)=>{
    const token=req.headers.authorization;
    if(!token) throw new httpException(401,"Not auhtorized")
    const tokenSplits=token.split(' ')
if(tokenSplits.length!=2)throw new httpException(401,"invalid token")
    return tokenSplits[1];
}

const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    
    const token=getToken(req);
    if(!token)throw new httpException(401,"not authorized")
        try{
        const payload=jwt.verify(token,JWT_SECRET) as JwtPayload
        req.user=payload;
        }catch{
            throw new httpException(401,"invalid or expired token")
    }
        next();
}

export default authMiddleware