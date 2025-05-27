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
const employee_entity_1 = require("../entities/employee.entity");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const create_department_dto_1 = require("../dto/create-department.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const httpException_1 = __importDefault(require("../exception/httpException"));
class DepartmentContoller {
    constructor(departmentService, router) {
        this.departmentService = departmentService;
        this.authorisedRoles = [
            employee_entity_1.EmployeeRole.HR,
            employee_entity_1.EmployeeRole.DEVELOPER,
            employee_entity_1.EmployeeRole.UI,
            employee_entity_1.EmployeeRole.UX,
        ];
        router.post("/", (0, authorization_middleware_1.checkRole)(this.authorisedRoles), this.createDepartment.bind(this));
        router.get("/:id", this.getAllEmployeesByDepartmentId.bind(this));
        router.put("/:id", (0, authorization_middleware_1.checkRole)(this.authorisedRoles), this.updateDepartment.bind(this));
        router.delete("/:id", (0, authorization_middleware_1.checkRole)(this.authorisedRoles), this.deleteDepartment.bind(this));
    }
    createDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createDepartmentDto = (0, class_transformer_1.plainToInstance)(create_department_dto_1.CreateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createDepartmentDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                const dept = yield this.departmentService.createDepartment(createDepartmentDto.name);
                res.status(200).send(dept);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAllEmployeesByDepartmentId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const dept = yield this.departmentService.getAllEmployeesByDepartmentId(id);
                if (!dept) {
                    throw new httpException_1.default(404, "Departent Not Found");
                }
                res.status(200).send(dept.employees);
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const name = req.body.name;
            yield this.departmentService.updateDepartment(id, name);
            res.status(200).send();
        });
    }
    deleteDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield this.departmentService.deleteDepartment(id);
            res.status(204).send();
        });
    }
}
exports.default = DepartmentContoller;
//# sourceMappingURL=department.controller.js.map