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
const department_entity_1 = __importDefault(require("../entities/department.entity"));
const logger_service_1 = require("./logger.service");
class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
        this.logger = logger_service_1.LoggerService.getInstance(DepartmentService.name);
    }
    createDepartment(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDepartment = new department_entity_1.default();
            newDepartment.name = name;
            const dept = yield this.departmentRepository.create(newDepartment);
            if (!dept) {
                this.logger.error("Department Creation Failed");
                throw new Error("Department creation failed");
            }
            else {
                this.logger.info("Department Created");
            }
            return dept;
        });
    }
    getAllEmployeesByDepartmentId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dept = yield this.departmentRepository.findEmployeesByDeptId(id);
            if (!dept) {
                this.logger.error("Department Not Found");
                throw new Error("Department not found");
            }
            else {
                this.logger.info("Employees of the Department Returned");
            }
            return dept;
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dept = yield this.departmentRepository.findById(id);
            if (!dept) {
                this.logger.error("Department Not Found");
                throw new Error("Department not found");
            }
            else {
                this.logger.info("Department Returned");
            }
            return dept;
        });
    }
    updateDepartment(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDept = yield this.departmentRepository.findById(id);
            if (existingDept) {
                const department = new department_entity_1.default();
                department.name = name;
                yield this.departmentRepository.update(id, department);
                this.logger.info("Department Updated");
            }
            else {
                this.logger.error("Department Not Found");
                throw new Error("Department not found");
            }
        });
    }
    deleteDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDept = yield this.departmentRepository.findById(id);
            if (existingDept) {
                this.logger.info("Department Deleted");
                yield this.departmentRepository.delete(id);
            }
            else {
                this.logger.error("Department Not Found");
                throw new Error("Department not found");
            }
        });
    }
}
exports.default = DepartmentService;
//# sourceMappingURL=department.service.js.map