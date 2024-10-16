"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDatabaseConnection = exports.dbConfig = void 0;
exports.dbConfig = {
    log: ["query", "info", "warn", "error"],
    errorFormat: "pretty",
};
const checkDatabaseConnection = async (prisma) => {
    try {
        await prisma.$connect();
        console.log("Database connection established");
    }
    catch (error) {
        console.error("Error establishing database connection", error);
    }
};
exports.checkDatabaseConnection = checkDatabaseConnection;
