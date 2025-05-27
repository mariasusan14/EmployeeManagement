import Department from "../entities/department.entity";
import DepartmentRepository from "../repositories/department.repository";
import { LoggerService } from "./logger.service";
class DepartmentService {
  private logger = LoggerService.getInstance(DepartmentService.name);
  constructor(private departmentRepository: DepartmentRepository) {}

  async createDepartment(name: string): Promise<Department> {
    const newDepartment = new Department();
    newDepartment.name = name;
    const dept = await this.departmentRepository.create(newDepartment);
    if (!dept) {
      this.logger.error("Department Creation Failed");
      throw new Error("Department creation failed");
    } else {
      this.logger.info("Department Created");
    }
    return dept;
  }

  async getAllEmployeesByDepartmentId(id: number): Promise<Department> {
    const dept = await this.departmentRepository.findEmployeesByDeptId(id);
    if (!dept) {
      this.logger.error("Department Not Found");
      throw new Error("Department not found");
    } else {
      this.logger.info("Employees of the Department Returned");
    }
    return dept;
  }

  async getDepartmentById(id: number): Promise<Department> {

    const dept= await this.departmentRepository.findById(id);
 if (!dept) {
      this.logger.error("Department Not Found");
      throw new Error("Department not found");
    } else {
      this.logger.info("Department Returned");
    }
    return dept;
  }

  async updateDepartment(id: number, name: string) {
    const existingDept = await this.departmentRepository.findById(id);
    if (existingDept) {
      const department = new Department();
      department.name = name;
      await this.departmentRepository.update(id, department);
      this.logger.info("Department Updated");
    } else {
      this.logger.error("Department Not Found");
      throw new Error("Department not found");

    }
  }

  async deleteDepartment(id: number) {
    const existingDept = await this.departmentRepository.findById(id);
    if (existingDept) {
      this.logger.info("Department Deleted");
      await this.departmentRepository.delete(id);
    } else {
      this.logger.error("Department Not Found");
      throw new Error("Department not found")
    }
  }
}
export default DepartmentService;
