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
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
const port = process.env.PORT || 5000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB Atlas using Mongoose
            const uri = `mongodb+srv://${config_1.default.db_user}:${config_1.default.db_pass}@cluster0.rdxg6.mongodb.net/bookBaseDB?retryWrites=true&w=majority&appName=Cluster0`;
            yield mongoose_1.default.connect(uri);
            console.log('Connected to MongoDB Atlas Using Mongoose');
            const server = app_1.default.listen(port, () => {
                console.log(`BookBase Server Running On Port ${port}`);
            });
        }
        catch (error) {
            console.error("Error on Running BookBase Server:", error);
        }
    });
}
main();
