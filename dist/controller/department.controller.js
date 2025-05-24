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
Object.defineProperty(exports, "__esModule", { value: true });
const employee_entity_1 = require("../entities/employee.entity");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
class DepartmentContoller {
    constructor(departmentService, router) {
        this.departmentService = departmentService;
        this.authorisedRoles = [employee_entity_1.EmployeeRole.HR, employee_entity_1.EmployeeRole.DEVELOPER, employee_entity_1.EmployeeRole.UI, employee_entity_1.EmployeeRole.UX];
        router.post('/', (0, authorization_middleware_1.checkRole)(this.authorisedRoles), this.createDepartment.bind(this));
        router.get('/:id', this.getAllEmployees.bind(this));
        router.put('/:id', (0, authorization_middleware_1.checkRole)(this.authorisedRoles), this.updateDepartment.bind(this));
        router.delete('/:id', (0, authorization_middleware_1.checkRole)(this.authorisedRoles), this.deleteDepartment.bind(this));
    }
    createDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.body.name;
            console.log(name);
            const dept = yield this.departmentService.createDepartment(name);
            res.status(200).send();
        });
    }
    getAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const dept = yield this.departmentService.getAllEmployees(id);
            res.status(200).send(dept.employees);
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