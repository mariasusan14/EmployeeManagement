import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee, {
  EmployeeRole,
  EmployeeStatus,
} from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from "bcrypt";
import { LoggerService } from "./logger.service";
import Department from "../entities/department.entity";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import { departmentRepository } from "../routes/department.router";
import httpException from "../exception/httpException";
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

    const dept = await departmentRepository.findById(department_id);
    if(!dept){
        throw new httpException(404,"Department Not Found")
    }
    newEmployee.department = dept;

    newEmployee.password = await bcrypt.hash(password, 10);

    const newAddr = new Address();
    newAddr.line1 = address.line1;
    newAddr.line2=address.line2;
    newAddr.houseNo=address.houseNo;
    newAddr.pincode = address.pincode;
   

    newEmployee.address = newAddr;
    return this.employeeRepository.create(newEmployee);
  }

  async getAllEmployees(): Promise<Employee[]> {
    this.logger.info("employees returned");
    return this.employeeRepository.findAll();
  }

  async getEmployeeById(id: number): Promise<Employee> {
    let employee = await this.employeeRepository.findById(id);
    if (!employee) {
        this.logger.error("employee not found")
      throw new Error("Employee not found"); 
    }
    return employee;
  }

  async getEmployeeByEmail(email: string): Promise<Employee> {
     this.logger.info("employee returned");
    return this.employeeRepository.findByEmail(email);
  }

  async updateEmployee(id: number, email: string, name: string) {
    const existingEmp = await this.employeeRepository.findById(id);
    if (existingEmp) {
      const employee = new Employee();
      employee.name = name;
      employee.email = email;
      this.logger.info("employees updated");
      await this.employeeRepository.update(id, employee);
    }
    else{
        this.logger.error("employee not found")
    }
  }

  async deleteEmployee(id: number) {
    const existingEmp = await this.employeeRepository.findById(id);
    if (existingEmp) {
      // await this.employeeRepository.delete(id);
      this.logger.info("employees deleted");
      await this.employeeRepository.remove(existingEmp);
    }
    else{
        this.logger.error("employee not found")
    }
  }
}

export default EmployeeService;
