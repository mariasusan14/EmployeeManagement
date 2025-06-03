"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_entity_1 = __importDefault(require("../entities/address.entity"));
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_service_1 = require("./logger.service");
const httpException_1 = __importDefault(require("../exception/httpException"));
const department_router_1 = require("../routes/department.router");
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
        this.logger = logger_service_1.LoggerService.getInstance(EmployeeService.name);
    }
    createEmployee(email, name, age, address, password, role, department_id, emp_id, experience, joiningDate, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = new employee_entity_1.default();
            newEmployee.name = name;
            newEmployee.email = email;
            newEmployee.age = age;
            newEmployee.role = role;
            newEmployee.emp_id = emp_id;
            newEmployee.experience = experience;
            newEmployee.joiningDate = joiningDate;
            newEmployee.status = status;
            const dept = yield department_router_1.departmentService.getDepartmentById(department_id);
            if (!dept) {
                this.logger.info("Department Not Found");
            }
            newEmployee.department = dept;
            newEmployee.password = yield bcrypt_1.default.hash(password, 10);
            const newAddr = new address_entity_1.default();
            newAddr.line1 = address.line1;
            newAddr.line2 = address.line2;
            newAddr.houseNo = address.houseNo;
            newAddr.pincode = address.pincode;
            newEmployee.address = newAddr;
            this.logger.info("Employee Created");
            const employee = yield this.employeeRepository.create(newEmployee);
            return employee;
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("employees returned");
            const employees = yield this.employeeRepository.findAll();
            if (!employees)
                this.logger.info("No employees found");
            else
                this.logger.info("Employees returned");
            return employees;
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield this.employeeRepository.findById(id);
            if (!employee) {
                this.logger.error("employee not found");
                throw new Error("Employee not found");
            }
            else {
                this.logger.info("employee returned");
            }
            return employee;
        });
    }
    getEmployeeByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findByEmail(email);
            if (!employee) {
                this.logger.error("Employee Not Found");
                throw new Error("Employee not found");
            }
            else {
                this.logger.info("employee returned");
            }
            return employee;
        });
    }
    updateEmployee(id, email, name, emp_id, age, role, experience, joiningDate, status, department_id, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmp = yield this.employeeRepository.findById(id);
            if (existingEmp) {
                //const employee = new Employee();
                existingEmp.name = name;
                existingEmp.email = email;
                existingEmp.emp_id = emp_id;
                existingEmp.age = age;
                existingEmp.role = role;
                existingEmp.experience = experience;
                existingEmp.joiningDate = joiningDate;
                existingEmp.status = status;
                const dept = yield department_router_1.departmentService.getDepartmentById(department_id);
                if (!dept) {
                    throw new httpException_1.default(404, "Department Not Found");
                }
                existingEmp.department = dept;
                const updatedAddress = new address_entity_1.default();
                existingEmp.address.line1 = address.line1;
                existingEmp.address.line2 = address.line2;
                existingEmp.address.houseNo = address.houseNo;
                existingEmp.address.pincode = address.pincode;
                this.logger.info("employees updated");
                yield this.employeeRepository.update(id, existingEmp);
            }
            else {
                this.logger.error("employee not found");
            }
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmp = yield this.employeeRepository.findById(id);
            if (existingEmp) {
                // await this.employeeRepository.delete(id);
                this.logger.info("employees deleted");
                yield this.employeeRepository.remove(existingEmp);
            }
            else {
                this.logger.error("employee not found");
            }
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map