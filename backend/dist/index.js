"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const sequelize_1 = require("./sequelize");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Synchronise la base : crée les tables automatiquement
sequelize_1.sequelize.sync().then(() => {
    console.log('✅ Database synchronized');
    app.use('/api/tasks', task_routes_1.default);
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`✅ Backend running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('❌ Failed to sync database:', error);
});
