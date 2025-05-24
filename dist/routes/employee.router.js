"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRepository = exports.employeeService = void 0;
const express_1 = __importDefault(require("express"));
const employee_repository_1 = __importDefault(require("../repositories/employee.repository"));
const data_source_1 = __importDefault(require("../db/data-source"));
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const employee_service_1 = __importDefault(require("../service/employee.service"));
const employee_controller_1 = __importDefault(require("../controller/employee.controller"));
const employeeRouter = express_1.default.Router();
const employeeRepository = new employee_repository_1.default(data_source_1.default.getRepository(employee_entity_1.default));
exports.employeeRepository = employeeRepository;
const employeeService = new employee_service_1.default(employeeRepository);
exports.employeeService = employeeService;
const employeeController = new employee_controller_1.default(employeeService, employeeRouter);
exports.default = employeeRouter;
//# sourceMappingURL=employee.router.js.map