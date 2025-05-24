import express from 'express'
import DepartmentRepository from '../repositories/department.repository'
import datasource from '../db/data-source'
import Department from '../entities/department.entity'
import DepartmentService from '../service/department.service'
import DepartmentContoller from '../controller/department.controller'


const departmentRouter=express.Router()
const departmentRepository=new DepartmentRepository(datasource.getRepository(Department))
const departmentService=new DepartmentService(departmentRepository)
const departmentController=new DepartmentContoller(departmentService,departmentRouter)
export{departmentRepository}
export default departmentRouter