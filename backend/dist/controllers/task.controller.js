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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getAllTasks = exports.createTask = void 0;
const task_model_1 = require("../models/task.model");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const task = yield task_model_1.Task.create({ title });
        res.status(201).json(task);
    }
    //
    catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});
exports.createTask = createTask;
const getAllTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_model_1.Task.findAll();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});
exports.getAllTasks = getAllTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const task = yield task_model_1.Task.findByPk(Number(id));
        if (!task)
            return res.status(404).json({ error: 'Task not found' });
        task.title = title !== null && title !== void 0 ? title : task.title;
        task.completed = completed !== null && completed !== void 0 ? completed : task.completed;
        yield task.save();
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield task_model_1.Task.findByPk(Number(id));
        if (!task)
            return res.status(404).json({ error: 'Task not found' });
        yield task.destroy();
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});
exports.deleteTask = deleteTask;
