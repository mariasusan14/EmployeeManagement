import express from "express";
import Employee from "./entities/employee.entity";
import datasource from "./db/data-source";
import { Entity } from "typeorm";


const employeeRouter = express.Router();
let count = 2;


employeeRouter.get("/", async(req, res) => {
  const employeeRepository=datasource.getRepository(Employee);
  const employees=await employeeRepository.find();
  res.status(200).send(employees)
});


employeeRouter.get("/:id", async(req, res) => {
  const empId=parseInt(req.params.id);
  const employeeRepository=datasource.getRepository(Employee);
  // const employee=await employeeRepository.find({where:{id:empId}});
  const employee=await employeeRepository.findOneBy({id:empId});
  res.status(200).send(employee)
});


employeeRouter.post("/", async(req, res) => {
  console.log(req.body);

  const employeeRepository=datasource.getRepository(Employee);
  const newEmployee=await employeeRepository.insert({
    name:req.body.name,
    email:req.body.email
  })
  res.status(201).send(newEmployee);
});


employeeRouter.delete("/:id", async(req, res) => {
 const employeeRepository=datasource.getRepository(Employee);
 const deletedEmp=await employeeRepository.delete(parseInt(req.params.id))
  res.status(204).send(deletedEmp);
});


employeeRouter.put("/:id", async(req, res) => {
 const empId=parseInt(req.params.id);
  const employeeRepository=datasource.getRepository(Employee);
  const employee=await employeeRepository.findOneBy({id:empId});
  employee.name=req.body.name;
  employee.email=req.body.email;
  const updatedEmployee=await employeeRepository.save(employee)
  res.status(200).send(updatedEmployee);
});



employeeRouter.patch("/:id", async(req,res)=>{
const employeeRepository=datasource.getRepository(Employee);
if(req.body.name){
var patchedEmployee=await employeeRepository.update(req.params.id,{name:req.body.name})
}
if(req.body.email){
 patchedEmployee=await employeeRepository.update(req.params.id,{email:req.body.email})
}
 res.status(200).send(patchedEmployee);
})

export default employeeRouter;

// employeeRouter.get("/:id", (req, res) => {
//   const empId = Number(req.params["id"]);
//   const employee = employees.find((emp) => emp.id === empId);
//   if (!employee) {
//     res.status(404).send("Employee not found");
//     return;
//   }
//   res.status(200).send(employee);
// });

// employeeRouter.post("/", (req, res) => {
//   console.log(req.body);
//   const newEmployee = new Employee();
//   newEmployee.email = req.body.email;
//   newEmployee.name = req.body.name;
//   newEmployee.createdAt = new Date();
//   newEmployee.updatedAt = new Date();
//   newEmployee.id = ++count;
//   employees.push(newEmployee);
//   res.status(200).send(newEmployee);
// });

// employeeRouter.delete("/:id", (req, res) => {
//   const employeeIdxToDelete = employees.findIndex(
//     (emp) => emp.id === Number(req.params["id"]),
//   );
//   employees.splice(employeeIdxToDelete, 1);
//   res.status(200).send();
// });

// employeeRouter.put("/:id", (req, res) => {
//   const employee = employees.find((emp) => emp.id === Number(req.params["id"]));
//   employee.email = req.body.email;
//   employee.name = req.body.name;
//   employee.updatedAt = new Date();
//   console.log("update employees");
//   res.status(200).send(employee);
// });


