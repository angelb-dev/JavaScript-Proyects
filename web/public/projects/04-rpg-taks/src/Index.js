var skillInput = document.getElementById("skillInput");
var elementList = document.getElementById("elementList");

// Función para agregar habilidades al selector en el hacedor de tareas
function updateSkillSelector() {
    skillInput.innerHTML = "";
    var elements = elementList.querySelectorAll("li");
    elements.forEach(function(element) {
        var skillName = element.dataset.skill;
        var option = document.createElement("option");
        option.value = skillName;
        option.textContent = skillName;
        skillInput.appendChild(option);
    });
}

function addSkill() {
    var addSkillInput = document.getElementById("addSkillInput");
    var skillName = addSkillInput.value.trim();

    if (skillName === "") {
        alert("Por favor, introduce un nombre de habilidad.");
        return;
    }

    var elementList = document.getElementById("elementList");
    var newElementItem = document.createElement("li");
    newElementItem.dataset.skill = skillName;
    newElementItem.innerHTML = `<div class="element-info"><span>${skillName}</span><span class="element-exp">0 XP</span></div><span class="delete-button" onclick="deleteSkill(this)">X</span>`;
    elementList.appendChild(newElementItem);
    addSkillInput.value = "";

    // Actualizar el selector en el hacedor de tareas
    updateSkillSelector();
}

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var expInput = document.getElementById("expInput");
    var skillInput = document.getElementById("skillInput");

    var taskDescription = taskInput.value.trim();
    var exp = expInput.value;
    var skill = skillInput.value;

    if (taskDescription === "" || exp === "" || skill === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    var taskList = document.getElementById("taskList");
    var newTaskItem = document.createElement("li");
    newTaskItem.innerHTML = `<div class="task-info"><span>${taskDescription}</span><span class="task-exp">${exp} XP - ${skill}</span></div><span class="delete-button" onclick="deleteTask(this)">X</span>`;
    taskList.appendChild(newTaskItem);

    // Agregar experiencia a la habilidad correspondiente
    var existingSkill = elementList.querySelector(`li[data-skill="${skill}"]`);
    if (existingSkill) {
        var currentExp = parseInt(existingSkill.querySelector(".element-exp").textContent);
        var newExp = currentExp + parseInt(exp);
        existingSkill.querySelector(".element-exp").textContent = newExp + " XP";
    }

    taskInput.value = "";
    expInput.value = "";
    skillInput.value = "";
}

function deleteTask(task) {
    var taskItem = task.parentNode;
    var taskInfo = taskItem.querySelector(".task-info");
    var expInfo = taskInfo.querySelector(".task-exp").textContent;
    var skillName = expInfo.substring(expInfo.lastIndexOf("-") + 1).trim();
    var expToRemove = parseInt(expInfo.substring(0, expInfo.indexOf(" ")));

    taskItem.parentNode.removeChild(taskItem);

    // Restar la experiencia de la habilidad correspondiente
    var existingSkill = elementList.querySelector(`li[data-skill="${skillName}"]`);
    if (existingSkill) {
        var currentExp = parseInt(existingSkill.querySelector(".element-exp").textContent);
        var newExp = currentExp - expToRemove;
        if (newExp <= 0) {
            existingSkill.querySelector(".element-exp").textContent = "0 XP";
        } else {
            existingSkill.querySelector(".element-exp").textContent = newExp + " XP";
        }
    }
}

function deleteSkill(skill) {
    var skillItem = skill.parentNode;
    var skillName = skillItem.querySelector(".element-info span").textContent;
    skillItem.parentNode.removeChild(skillItem);

    // Eliminar tareas asociadas a la habilidad borrada
    var taskList = document.getElementById("taskList");
    var tasks = taskList.querySelectorAll(".task-info");
    tasks.forEach(function(task) {
        if (task.querySelector(".task-exp").textContent.includes(skillName)) {
            var expInfo = task.querySelector(".task-exp").textContent;
            var expToRemove = parseInt(expInfo.substring(0, expInfo.indexOf(" ")));

            task.parentNode.removeChild(task);

            // Restar la experiencia de la habilidad correspondiente
            var existingSkill = elementList.querySelector(`li[data-skill="${skillName}"]`);
            if (existingSkill) {
                var currentExp = parseInt(existingSkill.querySelector(".element-exp").textContent);
                var newExp = currentExp - expToRemove;
                if (newExp <= 0) {
                    existingSkill.querySelector(".element-exp").textContent = "0 XP";
                } else {
                    existingSkill.querySelector(".element-exp").textContent = newExp + " XP";
                }
            }
        }
    });

    // Actualizar el selector en el hacedor de tareas
    updateSkillSelector();
}