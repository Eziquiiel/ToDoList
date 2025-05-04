const service = require("../../Model/taskModel");

async function filterTask(req, res) {
  const { done, date } = req.query;
  const filter = {};

  if (done != undefined) {
    filter.done = done === "true";
  }

  if (date != undefined) {
    const parsedDate = new Date(date);

    if (!isNaN(parsedDate)) {
      // Define o intervalo de data (mesmo dia, das 00:00 até 23:59:59)
      const nextDay = new Date(parsedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      filter.createdAt = {
        $gte: parsedDate,
        $lt: nextDay,
      };
    }
  }

  try {
    const tasks = await service.find(filter);

    return res.json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao filtrar tarefas", details: error.message });
  }
}

module.exports = filterTask;
