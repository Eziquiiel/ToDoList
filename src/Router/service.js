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
router.post("/login", (req, res) => loginController(req, res));

//Task
router.post("/task", token, (req, res) => createTask.create(req, res));
router.get("/tasks", token, (req, res) => getTask.get(req, res));
router.get("/task/filter", token, (req, res) => filterTask(req, res));
router.get("/task/:id", token, (req, res) => getIDTask(req, res));
router.put("/task/:id", token, (req, res) => putTask(req, res));
router.delete("/task/:id", token, (req, res) => deleteTask(req, res));

module.exports = router;
