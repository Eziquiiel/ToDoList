const service = require("../../Model/taskModel");

const createTask = {
  create: async (req, res) => {
    const { id, title, description, done } = req.body;

    const task = new service({
      id,
      title,
      description,
      done,
    });

    try {
      service.create({
        id: task._id,
        title: task.title,
        description: task.description,
        done: task.done,
        date: task.date,
      });

      return res.status(201).json({ msg: "Tarefa criada com sucesso!" });
    } catch (error) {
      return res.json({ msg: error });
    }
  },
};

module.exports = createTask;
