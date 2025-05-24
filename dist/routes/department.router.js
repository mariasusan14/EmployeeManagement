"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentRepository = void 0;
const express_1 = __importDefault(require("express"));
const department_repository_1 = __importDefault(require("../repositories/department.repository"));
const data_source_1 = __importDefault(require("../db/data-source"));
const department_entity_1 = __importDefault(require("../entities/department.entity"));
const department_service_1 = __importDefault(require("../service/department.service"));
const department_controller_1 = __importDefault(require("../controller/department.controller"));
const departmentRouter = express_1.default.Router();
const departmentRepository = new department_repository_1.default(data_source_1.default.getRepository(department_entity_1.default));
exports.departmentRepository = departmentRepository;
const departmentService = new department_service_1.default(departmentRepository);
const departmentController = new department_controller_1.default(departmentService, departmentRouter);
exports.default = departmentRouter;
//# sourceMappingURL=department.router.js.map