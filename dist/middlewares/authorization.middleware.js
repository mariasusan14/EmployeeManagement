"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const httpException_1 = __importDefault(require("../exception/httpException"));
const checkRole = (authorisedRoles) => {
    return (req, res, next) => {
        var _a;
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        if (!authorisedRoles.includes(userRole)) {
            throw new httpException_1.default(403, "user has no privilege to access the resource");
        }
        next();
    };
};
exports.checkRole = checkRole;
exports.default = exports.checkRole;
//# sourceMappingURL=authorization.middleware.js.map