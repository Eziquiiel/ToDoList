const service = require("../../Model/taskModel");

async function getID(req, res) {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ msg: "Tarefa não encontrada!" });
  }

  const taskID = await service.findById(id);

  return res.status(200).json({ taskID });
}

module.exports = getID;
