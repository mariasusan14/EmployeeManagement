"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const auth_service_1 = __importDefault(require("../service/auth.service"));
const employee_router_1 = require("./employee.router");
const authRouter = (0, express_1.Router)();
const authService = new auth_service_1.default(employee_router_1.employeeService);
new auth_controller_1.default(authService, authRouter);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map