"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_pino_logger_1 = __importDefault(require("express-pino-logger"));
const { config } = require('./config/index');
const loguer_1 = require("./util/loguer");
const ruta_usuario_1 = __importDefault(require("./router/usuarios/ruta-usuario"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", config.port);
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default());
        this.app.use(express_pino_logger_1.default({ logger: loguer_1.logger }));
        this.app.use(body_parser_1.default.json());
        this.app.use("/static", express_1.default.static("public"));
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    routes() {
        // peticiones de datos con api rest
        this.app.use("/api", ruta_usuario_1.default);
        /*this.app.use("/api/usuario", Usuarios);
        this.app.use("/api/email", Email);
        this.app.use("/api/login", Login);
        this.app.use("/api/producto", Producto);
        this.app.use("/api/cliente", Cliente);
        this.app.use("/api/factura", Factura);
        this.app.use("/api/venta", Ventas);
        this.app.use("/api/proveedor", Proveedores);
        this.app.use("/api/prestamo", Prestamo);*/
    }
    start() {
        this.app.listen(this.app.get("port"), () => console.log(`RUN SERVER NODE, IN PORT: ${config.port}`));
    }
}
const server = new Server();
server.start();
