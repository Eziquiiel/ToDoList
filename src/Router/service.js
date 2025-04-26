const router = require("express").Router();
const token = require("../Controller/User/middlewareController");

const loginController = require("../Controller/User/loginController");
const registerController = require("../Controller/User/registerController");
const createTask = require("../Controller/Task/createTask");
const getTask = require("../Controller/Task/getTask");
const getIDTask = require("../Controller/Task/getIdTask");

router.post("/", (req, res) => registerController.register(req, res));

router.post("/login", token, (req, res) => loginController(req, res));

//Task

router.post("/task", (req, res) => createTask.create(req, res));
router.get("/task", (req, res) => getTask.get(req, res));
router.get("/task/:id", (req, res) => getIDTask(req, res));

module.exports = router;
