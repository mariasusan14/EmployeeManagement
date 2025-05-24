"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
require("dotenv/config");
// import Employee from "../entities/employee.entity";
// import Address from "../entities/address.entity";
const datasource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5438,
    database: 'training',
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    extra: { max: 5, min: 2 }, //connection pool
    synchronize: false,
    logging: true,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    entities: ["dist/entities/*.js"],
    migrations: ["dist/db/migrations/*.js"]
});
exports.default = datasource;
//# sourceMappingURL=data-source.js.map