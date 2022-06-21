"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const express_session_1 = __importDefault(require("express-session"));
const bodyParser = __importStar(require("body-parser"));
const lusca = __importStar(require("lusca"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("./router/router"));
const environment_1 = __importDefault(require("./config/environment"));
const env = new environment_1.default();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        // this.passport();
        this.router();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use((0, compression_1.default)());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use((0, express_session_1.default)({
            resave: true,
            saveUninitialized: true,
            secret: env.app_session_secret,
        }));
        this.app.use(lusca.xframe("SAMEORIGIN"));
        this.app.use(lusca.xssProtection(true));
        console.log(path_1.default.join(__dirname, "public"));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
    }
    router() {
        const route = new router_1.default();
        this.app.use("/", route.router);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map