const skillInput = document.getElementById('skillInput')
const elementList = document.getElementById('elementList')

// Función para agregar habilidades al selector en el hacedor de tareas
function updateSkillSelector () {
  skillInput.innerHTML = ''
  const elements = elementList.querySelectorAll('li')
  elements.forEach(function (element) {
    const skillName = element.dataset.skill
    const option = document.createElement('option')
    option.value = skillName
    option.textContent = skillName
    skillInput.appendChild(option)
  })
}

function addSkill () {
  const addSkillInput = document.getElementById('addSkillInput')
  const skillName = addSkillInput.value.trim()

  if (skillName === '') {
    alert('Por favor, introduce un nombre de habilidad.')
    return
  }

  const elementList = document.getElementById('elementList')
  const newElementItem = document.createElement('li')
  newElementItem.dataset.skill = skillName
  newElementItem.innerHTML = `<div class="element-info"><span>${skillName}</span><span class="element-exp">0 XP</span></div><span class="delete-button" onclick="deleteSkill(this)">X</span>`
  elementList.appendChild(newElementItem)
  addSkillInput.value = ''

  // Actualizar el selector en el hacedor de tareas
  updateSkillSelector()
}

function addTask () {
  const taskInput = document.getElementById('taskInput')
  const expInput = document.getElementById('expInput')
  const skillInput = document.getElementById('skillInput')

  const taskDescription = taskInput.value.trim()
  const exp = expInput.value
  const skill = skillInput.value

  if (taskDescription === '' || exp === '' || skill === '') {
    alert('Por favor, completa todos los campos.')
    return
  }

  const taskList = document.getElementById('taskList')
  const newTaskItem = document.createElement('li')
  newTaskItem.innerHTML = `<div class="task-info"><span>${taskDescription}</span><span class="task-exp">${exp} XP - ${skill}</span></div><span class="delete-button" onclick="deleteTask(this)">X</span>`
  taskList.appendChild(newTaskItem)

  // Agregar experiencia a la habilidad correspondiente
  const existingSkill = elementList.querySelector(`li[data-skill="${skill}"]`)
  if (existingSkill) {
    const currentExp = parseInt(existingSkill.querySelector('.element-exp').textContent)
    const newExp = currentExp + parseInt(exp)
    existingSkill.querySelector('.element-exp').textContent = newExp + ' XP'
  }

  taskInput.value = ''
  expInput.value = ''
  skillInput.value = ''
}

function deleteTask (task) {
  const taskItem = task.parentNode
  const taskInfo = taskItem.querySelector('.task-info')
  const expInfo = taskInfo.querySelector('.task-exp').textContent
  const skillName = expInfo.substring(expInfo.lastIndexOf('-') + 1).trim()
  const expToRemove = parseInt(expInfo.substring(0, expInfo.indexOf(' ')))

  taskItem.parentNode.removeChild(taskItem)

  // Restar la experiencia de la habilidad correspondiente
  const existingSkill = elementList.querySelector(`li[data-skill="${skillName}"]`)
  if (existingSkill) {
    const currentExp = parseInt(existingSkill.querySelector('.element-exp').textContent)
    const newExp = currentExp - expToRemove
    if (newExp <= 0) {
      existingSkill.querySelector('.element-exp').textContent = '0 XP'
    } else {
      existingSkill.querySelector('.element-exp').textContent = newExp + ' XP'
    }
  }
}

function deleteSkill (skill) {
  const skillItem = skill.parentNode
  const skillName = skillItem.querySelector('.element-info span').textContent
  skillItem.parentNode.removeChild(skillItem)

  // Eliminar tareas asociadas a la habilidad borrada
  const taskList = document.getElementById('taskList')
  const tasks = taskList.querySelectorAll('.task-info')
  tasks.forEach(function (task) {
    if (task.querySelector('.task-exp').textContent.includes(skillName)) {
      const expInfo = task.querySelector('.task-exp').textContent
      const expToRemove = parseInt(expInfo.substring(0, expInfo.indexOf(' ')))

      task.parentNode.removeChild(task)

      // Restar la experiencia de la habilidad correspondiente
      const existingSkill = elementList.querySelector(`li[data-skill="${skillName}"]`)
      if (existingSkill) {
        const currentExp = parseInt(existingSkill.querySelector('.element-exp').textContent)
        const newExp = currentExp - expToRemove
        if (newExp <= 0) {
          existingSkill.querySelector('.element-exp').textContent = '0 XP'
        } else {
          existingSkill.querySelector('.element-exp').textContent = newExp + ' XP'
        }
      }
    }
  })

  // Actualizar el selector en el hacedor de tareas
  updateSkillSelector()
}
