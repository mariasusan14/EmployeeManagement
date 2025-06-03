import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee, {
  EmployeeRole,
  EmployeeStatus,
} from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from "bcrypt";
import { LoggerService } from "./logger.service";
import httpException from "../exception/httpException";
import { departmentService } from "../routes/department.router";
class EmployeeService {
  private logger = LoggerService.getInstance(EmployeeService.name);
  constructor(private employeeRepository: EmployeeRepository) {}

  async createEmployee(
    email: string,
    name: string,
    age: number,
    address: CreateAddressDto,
    password: string,
    role: EmployeeRole,
    department_id: number,
    emp_id: string,
    experience: number,
    joiningDate: Date,
    status: EmployeeStatus
  ): Promise<Employee> {
    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.age = age;
    newEmployee.role = role;
    newEmployee.emp_id = emp_id;
    newEmployee.experience = experience;
    newEmployee.joiningDate = joiningDate;
    newEmployee.status = status;

    const dept = await departmentService.getDepartmentById(department_id);
    if (!dept) {
      this.logger.info("Department Not Found")
    }
    newEmployee.department = dept;

    newEmployee.password = await bcrypt.hash(password, 10);

    const newAddr = new Address();
    newAddr.line1 = address.line1;
    newAddr.line2 = address.line2;
    newAddr.houseNo = address.houseNo;
    newAddr.pincode = address.pincode;

    newEmployee.address = newAddr;
    this.logger.info("Employee Created")
    const employee=await this.employeeRepository.create(newEmployee);
    return employee;
  }

  async getAllEmployees(): Promise<Employee[]> {
    this.logger.info("employees returned");
    const employees=await this.employeeRepository.findAll();
    if(!employees)this.logger.info("No employees found");
    else this.logger.info("Employees returned");
    return employees;
  }

  async getEmployeeById(id: number): Promise<Employee> {
    let employee = await this.employeeRepository.findById(id);
    if (!employee) {
      this.logger.error("employee not found");
      throw new Error("Employee not found")
    }
    else{
    this.logger.info("employee returned");
    }
    return employee;
  }

  async getEmployeeByEmail(email: string): Promise<Employee> {
    const employee=await this.employeeRepository.findByEmail(email);
    if(!employee){
      this.logger.error("Employee Not Found")
    throw new Error("Employee not found")}
      else{
    this.logger.info("employee returned");
    
    }
    return employee;
  }

  async updateEmployee(
    id: number,
    email: string,
    name: string,
    emp_id: string,
    age: number,
    role: EmployeeRole,
    experience:number,
    joiningDate:Date,
    status:EmployeeStatus,
    department_id:number,
    address:CreateAddressDto
  ) {
    const existingEmp = await this.employeeRepository.findById(id);
    if (existingEmp) {
    
     
      //const employee = new Employee();
      existingEmp.name = name;
      existingEmp.email = email;
      existingEmp.emp_id=emp_id;
      existingEmp.age=age;
      existingEmp.role=role;
      existingEmp.experience=experience;
      existingEmp.joiningDate=joiningDate;
      existingEmp.status=status;
      const dept=await departmentService.getDepartmentById(department_id)
       if (!dept) {
      throw new httpException(404, "Department Not Found");
    }
    existingEmp.department = dept;
     
    const updatedAddress=new Address();
    existingEmp.address.line1=address.line1
    existingEmp.address.line2=address.line2
    existingEmp.address.houseNo=address.houseNo
    existingEmp.address.pincode=address.pincode
    
      
      this.logger.info("employees updated");
       
      await this.employeeRepository.update(id, existingEmp);
    } else {
      this.logger.error("employee not found");
    }
  }

  async deleteEmployee(id: number) {
    const existingEmp = await this.employeeRepository.findById(id);
    if (existingEmp) {
      // await this.employeeRepository.delete(id);
      this.logger.info("employees deleted");
      await this.employeeRepository.remove(existingEmp);
    } else {
      this.logger.error("employee not found");
    }
  }
}

export default EmployeeService;  