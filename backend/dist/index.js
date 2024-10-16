"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("./prisma/client");
const db_config_1 = require("./config/db.config");
const errorhandler_1 = require("./middleware/errorhandler");
const farmer_route_1 = __importDefault(require("./routes/farmer.route"));
const Agriexpert_route_1 = __importDefault(require("./routes/Agriexpert.route"));
const likeRoutes_1 = __importDefault(require("./routes/likeRoutes"));
const PostRoutes_1 = __importDefault(require("./routes/PostRoutes"));
const CropcalanderRequest_1 = __importDefault(require("./routes/CropcalanderRequest"));
const authenticationMiddleware_1 = require("./middleware/authenticationMiddleware");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
async function startServer() {
    app.use(express_1.default.json());
    app.use(body_parser_1.default.json());
    app.use(errorhandler_1.errorHandler);
    // ** HTTP routes for access
    app.use("/api", farmer_route_1.default);
    app.use("/api", Agriexpert_route_1.default);
    app.use("/api", likeRoutes_1.default);
    app.use("/api/posts", PostRoutes_1.default);
    app.use("/api/ccr", CropcalanderRequest_1.default);
    app.get("/ping", authenticationMiddleware_1.authMiddleware, async (req, res) => {
        const userId = req.userId;
        const response = await client_1.prisma.farmer.findUnique({
            where: {
                id: userId
            }
        });
        res.json(response);
    });
    await (0, db_config_1.checkDatabaseConnection)(client_1.prisma);
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}
startServer();
