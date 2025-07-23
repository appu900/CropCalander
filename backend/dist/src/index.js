"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const client_1 = require("./prisma/client");
const db_config_1 = require("./config/db.config");
const errorhandler_1 = require("./middleware/errorhandler");
const farmer_route_1 = __importDefault(require("./routes/farmer.route"));
const Agriexpert_route_1 = __importDefault(require("./routes/Agriexpert.route"));
const likeRoutes_1 = __importDefault(require("./routes/likeRoutes"));
const PostRoutes_1 = __importDefault(require("./routes/PostRoutes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const CropcalanderRequest_1 = __importDefault(require("./routes/CropcalanderRequest"));
const authenticationMiddleware_1 = require("./middleware/authenticationMiddleware");
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("../src/v2/v2-routes/index"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
async function startServer() {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use(errorhandler_1.errorHandler);
    // ** HTTP routes for access
    app.use("/api/auth", auth_routes_1.default);
    app.use("/api", farmer_route_1.default);
    app.use("/api", Agriexpert_route_1.default);
    app.use("/api", likeRoutes_1.default);
    app.use("/api/posts", PostRoutes_1.default);
    app.use("/api/ccr", CropcalanderRequest_1.default);
    app.use("/api/v2", index_1.default);
    app.get("/test", (req, res) => {
        res.send("Hello World");
    });
    app.get("/ping", authenticationMiddleware_1.authMiddleware, async (req, res) => {
        const userId = req.userId;
        const response = await client_1.prisma.farmer.findUnique({
            where: {
                id: userId,
            },
        });
        res.json(response);
    });
    app.post("/test-sms", async (req, res) => {
        const templateid = "1007161519960183117";
        const mobno = "+917978029866";
        const otp = 12202;
        let message = "Dear User,Your OTP for login is:" + otp + " With Regards,GTIDS IT Team";
        const smsurl = `https://smslogin.co/v3/api.php?username=gramtarang&apikey=2279de0891389c8d3a33&senderid=GTIDSP&templateid=${templateid}&mobile=${mobno}&message=${encodeURIComponent(message)}`;
        try {
            const response = await axios_1.default.post(smsurl);
            res.json({
                status: "sms request sent",
                smsResponse: response.data,
            });
            console.log(response);
        }
        catch (error) {
            console.log("something went wrong in sending sms", error);
        }
    });
    await (0, db_config_1.checkDatabaseConnection)(client_1.prisma);
    app.listen(3001, () => {
        console.log("Server is running on http://localhost:3000");
    });
}
startServer();
