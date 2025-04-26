const router = require("express").Router();

const service = require("./service");

router.use("/", service);

module.exports = router;
