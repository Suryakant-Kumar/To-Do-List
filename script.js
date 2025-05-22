let task;
let taskArray = [];
let taskStatus = localStorage.getItem("taskStatus")
  ? JSON.parse(localStorage.getItem("taskStatus"))
  : {};

function onSubmit(event) {
  event.preventDefault();
  let addedTask = document.querySelector(".task-field");
  let actualTask = addedTask.value.trim();
  const storedData = localStorage.getItem("task");
  taskArray = storedData ? JSON.parse(storedData) : [];
  taskStatus = localStorage.getItem("taskStatus")
    ? JSON.parse(localStorage.getItem("taskStatus"))
    : {};
  taskStatus[actualTask] = false;
  if (actualTask === "") {
    addedTask.style.border = "3px solid red";
    setTimeout(() => (addedTask.style.border = ""), 1000);
    return;
  }

  if (actualTask !== "") {
    taskStatus[actualTask] = false;
    localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
    taskArray.push(actualTask);
    localStorage.setItem("task", JSON.stringify(taskArray));
    showTask();
  }
  addedTask.value = "";
}
function clearTask() {
  localStorage.removeItem("task");
  taskArray = [];
  localStorage.removeItem("taskStatus");
  taskStatus = {};
  showTask();
}
function showTask() {
  let taskcontainer = document.querySelector(".task-container");
  taskcontainer.innerHTML = "";
  const storedData = localStorage.getItem("task");
  const tasks = storedData ? JSON.parse(storedData) : [];
  tasks.forEach((task, index) => {
    const sectors = document.createElement("div");
    const chck = document.createElement("input");
    // const label = document.createElement("label")
    chck.type = "checkbox";
    chck.id = `task-${index}`;
    chck.value = task;
    chck.checked = taskStatus[task] || false;
    chck.addEventListener("change", () => {
      taskStatus[task] = chck.checked;
      localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
    });
    const taskdisp = document.createElement("label");
    taskdisp.htmlFor = `task-${index}`;
    taskdisp.textContent = task.charAt(0).toUpperCase() + task.slice(1);
    const removeBtn = document.createElement("button");
    const removeImg = document.createElement("img");
    removeImg.src = "resources/cross.svg";
    removeBtn.appendChild(removeImg);
    removeBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(tasks));
      showTask();
    });
    removeBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      delete taskStatus[task];
      localStorage.setItem("task", JSON.stringify(tasks));
      localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
      showTask();
    });

    sectors.appendChild(chck);
    sectors.appendChild(taskdisp);
    sectors.appendChild(removeBtn);
    taskcontainer.appendChild(sectors);
  });
}
window.onload = () => {
  showTask();
};
