const router = require("express").Router();
const token = require("../Controller/User/middlewareController");

const loginController = require("../Controller/User/loginController");
const registerController = require("../Controller/User/registerController");
const createTask = require("../Controller/Task/createTask");
const getTask = require("../Controller/Task/getTask");
const getIDTask = require("../Controller/Task/getIdTask");
const putTask = require("../Controller/Task/putTask");
const deleteTask = require("../Controller/Task/deleteTask");
const filterTask = require("../Controller/Task/filterTask");

//User
router.post("/", (req, res) => registerController.register(req, res));
router.post("/login", token, (req, res) => loginController(req, res));

//Task
router.post("/task", (req, res) => createTask.create(req, res));
router.get("/tasks", (req, res) => getTask.get(req, res));
router.get("/task/filter", (req, res) => filterTask(req, res));
router.get("/task/:id", (req, res) => getIDTask(req, res));
router.put("/task/:id", (req, res) => putTask(req, res));
router.delete("/task/:id", (req, res) => deleteTask(req, res));

module.exports = router;
