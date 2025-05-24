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
const express_1 = __importDefault(require("express"));
const employee_entity_1 = __importDefault(require("./entities/employee.entity"));
const data_source_1 = __importDefault(require("./db/data-source"));
const employeeRouter = express_1.default.Router();
let count = 2;
employeeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employees = yield employeeRepository.find();
    res.status(200).send(employees);
}));
employeeRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empId = parseInt(req.params.id);
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    // const employee=await employeeRepository.find({where:{id:empId}});
    const employee = yield employeeRepository.findOneBy({ id: empId });
    res.status(200).send(employee);
}));
employeeRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const newEmployee = yield employeeRepository.insert({
        name: req.body.name,
        email: req.body.email
    });
    res.status(201).send(newEmployee);
}));
employeeRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const deletedEmp = yield employeeRepository.delete(parseInt(req.params.id));
    res.status(204).send(deletedEmp);
}));
employeeRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empId = parseInt(req.params.id);
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employee = yield employeeRepository.findOneBy({ id: empId });
    employee.name = req.body.name;
    employee.email = req.body.email;
    const updatedEmployee = yield employeeRepository.save(employee);
    res.status(200).send(updatedEmployee);
}));
employeeRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    if (req.body.name) {
        var patchedEmployee = yield employeeRepository.update(req.params.id, { name: req.body.name });
    }
    if (req.body.email) {
        patchedEmployee = yield employeeRepository.update(req.params.id, { email: req.body.email });
    }
    res.status(200).send(patchedEmployee);
}));
exports.default = employeeRouter;
// employeeRouter.get("/:id", (req, res) => {
//   const empId = Number(req.params["id"]);
//   const employee = employees.find((emp) => emp.id === empId);
//   if (!employee) {
//     res.status(404).send("Employee not found");
//     return;
//   }
//   res.status(200).send(employee);
// });
// employeeRouter.post("/", (req, res) => {
//   console.log(req.body);
//   const newEmployee = new Employee();
//   newEmployee.email = req.body.email;
//   newEmployee.name = req.body.name;
//   newEmployee.createdAt = new Date();
//   newEmployee.updatedAt = new Date();
//   newEmployee.id = ++count;
//   employees.push(newEmployee);
//   res.status(200).send(newEmployee);
// });
// employeeRouter.delete("/:id", (req, res) => {
//   const employeeIdxToDelete = employees.findIndex(
//     (emp) => emp.id === Number(req.params["id"]),
//   );
//   employees.splice(employeeIdxToDelete, 1);
//   res.status(200).send();
// });
// employeeRouter.put("/:id", (req, res) => {
//   const employee = employees.find((emp) => emp.id === Number(req.params["id"]));
//   employee.email = req.body.email;
//   employee.name = req.body.name;
//   employee.updatedAt = new Date();
//   console.log("update employees");
//   res.status(200).send(employee);
// });
//# sourceMappingURL=employee_router.js.map