const service = require("../../Model/taskModel");

const getTask = {
  get: async (req, res) => {
    const task = await service.find();

    return res.status(200).json(task);
  },
};

module.exports = getTask;
