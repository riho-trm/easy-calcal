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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
// 環境変数の代わりに .env ファイルを使用するための設定 (dotenv)
// .envファイルを読み込んでいる。これは必ずconfig経由で呼ぶ。
class Environment {
    constructor() {
        dotenv.config();
        this.app_name = Environment.setString("APP_NAME", "sample app");
        this.app_debug = Environment.setBoolean("APP_DEBUG", true);
        this.app_version = Environment.setString("APP_VERSION", "No Version");
        // セッション暗号化時に利用するキーの為、変更必須
        this.app_session_secret = Environment.setString("APP_SESSION_SECRET", "hogepiyo");
    }
    static setString(name, default_env) {
        if (process.env[name] === undefined)
            return default_env;
        return process.env[name];
    }
    static setBoolean(name, default_env) {
        if (process.env[name] === undefined)
            return default_env;
        return process.env[name] === "true";
    }
    static setRequire(name) {
        if (process.env[name] === undefined) {
            throw new Error("Environment Set Error : " + name);
        }
        return process.env[name];
    }
}
exports.default = Environment;
//# sourceMappingURL=environment.js.map