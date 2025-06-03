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
const httpException_1 = __importDefault(require("../exception/httpException"));
const create_employee_dto_1 = require("../dto/create-employee.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const employee_entity_1 = require("../entities/employee.entity");
const update_employee_dto_1 = require("../dto/update-employee.dto");
class EmployeeController {
    constructor(employeeService, router) {
        this.employeeService = employeeService;
        this.authorisedRoles = [
            employee_entity_1.EmployeeRole.HR,
            employee_entity_1.EmployeeRole.DEVELOPER,
            employee_entity_1.EmployeeRole.UI,
            employee_entity_1.EmployeeRole.UX,
        ];
        this.updateEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatemployeeDto = (0, class_transformer_1.plainToInstance)(update_employee_dto_1.UpdateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updatemployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                const id = parseInt(req.params.id);
                yield this.employeeService.updateEmployee(id, updatemployeeDto.email, updatemployeeDto.name, updatemployeeDto.emp_id, updatemployeeDto.age, updatemployeeDto.role, updatemployeeDto.experience, updatemployeeDto.joiningDate, updatemployeeDto.status, updatemployeeDto.department_id, updatemployeeDto.address);
                res.status(200).send();
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield this.employeeService.deleteEmployee(id);
            res.status(204).send();
        });
        router.post("/", (0, authorization_middleware_1.checkRole)(this.authorisedRoles), this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        router.put("/:id", (0, authorization_middleware_1.checkRole)(this.authorisedRoles), this.updateEmployee);
        router.delete("/:id", (0, authorization_middleware_1.checkRole)(this.authorisedRoles), this.deleteEmployee);
    }
    createEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createEmployeeDto = (0, class_transformer_1.plainToInstance)(create_employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                console.log("backend : ", createEmployeeDto);
                const savedEmployee = yield this.employeeService.createEmployee(createEmployeeDto.email, createEmployeeDto.name, createEmployeeDto.age, createEmployeeDto.address, createEmployeeDto.password, createEmployeeDto.role, createEmployeeDto.department_id, createEmployeeDto.emp_id, createEmployeeDto.experience, createEmployeeDto.joiningDate, createEmployeeDto.status);
                res.status(201).send(savedEmployee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllEmployees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.employeeService.getAllEmployees();
                if (!employees) {
                    throw new httpException_1.default(404, "No Employees");
                }
                res.status(200).send(employees);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getEmployeeById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const employee = yield this.employeeService.getEmployeeById(id);
                if (!employee) {
                    throw new httpException_1.default(404, "Employee Not Found");
                }
                res.status(200).send(employee);
            }
            catch (err) {
                console.log("error: " + err);
                next(err);
            }
        });
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map