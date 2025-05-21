// Função para adicionar tarefa
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskTitle = taskInput.value.trim();

  if (!taskTitle) {
    alert("Por favor, insira uma tarefa.");
    return;
  }

  // Adiciona a tarefa ao banco de dados via API (requisito de back-end)
  fetch("http://localhost:3000/task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: taskTitle, done: false }),
  })
    .then((response) => response.json())
    .then((task) => {
      renderTask(task);
      taskInput.value = ""; // Limpa o campo
    })
    .catch((error) => console.error("Erro ao adicionar tarefa:", error));
}

// Função para renderizar a tarefa na lista
function renderTask(task) {
  const taskList = document.getElementById("task-list");
  const li = document.createElement("li");
  li.id = task._id;

  li.innerHTML = `
      <span onclick="toggleTaskStatus('${task._id}')">${task.title}</span>
      <button onclick="deleteTask('${task._id}')">Excluir</button>
    `;

  if (task.done) {
    li.classList.add("completed");
  }

  taskList.appendChild(li);
}

// Função para alternar o status da tarefa (marcar como concluída ou não)
function toggleTaskStatus(id) {
  fetch(`http://localhost:3000/tasks/${id}/done`, { method: "PATCH" })
    .then((response) => response.json())
    .then((updatedTask) => {
      const taskElement = document.getElementById(updatedTask._id);
      taskElement.classList.toggle("completed");
    })
    .catch((error) => console.error("Erro ao atualizar status:", error));
}

// Função para excluir a tarefa
function deleteTask(id) {
  fetch(`http://localhost:3000/task/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then(() => {
      const taskElement = document.getElementById(id);
      taskElement.remove();
    })
    .catch((error) => console.error("Erro ao excluir tarefa:", error));
}

// Função para carregar todas as tarefas
function loadTasks() {
  fetch("http://localhost:3000/tasks")
    .then((response) => response.json())
    .then((task) => {
      task.forEach((task) => renderTask(task));
    })
    .catch((error) => console.error("Erro ao carregar tarefas:", error));
}

// Carrega as tarefas ao inicializar
window.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});
