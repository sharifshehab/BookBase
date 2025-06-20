"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./modules/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// All the API-endpoints 
app.use(routes_1.default);
// base route
app.get('/', (req, res) => {
    res.send('Welcome to BookBase server!');
});
// error-handler for if no route is found 
app.use((req, res, next) => {
    res.status(400).send({ message: "Rout not found" });
});
// global error-handler                    
app.use((error, req, res, next) => {
    if (error) {
        console.log("Global error", error);
    }
});
exports.default = app;
