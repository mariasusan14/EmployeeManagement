import {NextFunction,Request,Response} from 'express'
import httpException from '../exception/httpException';


const errorMiddleware=(error:Error,req:Request,res:Response,next:NextFunction) => {
try{
    if(error instanceof httpException){
const status:number=error.status||500;
const message: string=error.message||"something went wrong"
let respbody={message:message};
res.status(status).json(respbody);
    }
    else{
        //console.error(error.stack)
    res.status(500).send({error:error.message})
    }
}catch(err){
    next(err)
}
}

export default errorMiddleware
