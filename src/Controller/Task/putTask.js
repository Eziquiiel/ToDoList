const service = require("../../Model/taskModel");

async function putTask(req, res) {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  const { title, description } = req.body;

  const updateTask = {
    title,
    description,
  };

  const task = await service.findByIdAndUpdate(id, {
    title: updateTask.title,
    description: updateTask.description,
  });

  return res.status(200).json({ msg: "Tarefa Atualizada com sucesso!", task });
}

module.exports = putTask;
