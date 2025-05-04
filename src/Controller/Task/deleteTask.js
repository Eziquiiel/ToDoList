const service = require("../../Model/taskModel");

async function deleteTask(req, res) {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  const task = await service.findByIdAndDelete(id);

  return res.status(200).json({ msg: "Tarefa apagada com sucesso!", task });
}

module.exports = deleteTask;
