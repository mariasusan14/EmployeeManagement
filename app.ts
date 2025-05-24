import express, { Request, Response } from "express";
import employeeRouter from "./routes/employee.router";
import loggerMiddleware from "./loggerMiddleware";
import { processTimeMiddleware } from "./processTimeMiddleware";
// import { Client } from "pg";
import  datasource from './db/data-source'
import errorMiddleware from "./middlewares/errorMiddleware";
import authRouter from "./routes/auth.routes";
import authMiddleware from "./middlewares/auth.middleware";
import { LoggerService } from "./service/logger.service";
import departmentRouter from "./routes/department.router";

// const {Client}=require('pg');

const server = express();
const logger=LoggerService.getInstance('app()')

server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);

server.use("/employee",authMiddleware, employeeRouter);
server.use('/auth',authRouter)

server.use("/department",authMiddleware,departmentRouter)
server.use(errorMiddleware)

server.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

(async ()=>{
  try{
    await datasource.initialize();
    logger.info('connected')

server.listen(3000, () => {
  logger.info("server listening to 3000");
});

  }
  catch{
    logger.error('failed to connect to db')
    process.exit(1);
  }


})();


