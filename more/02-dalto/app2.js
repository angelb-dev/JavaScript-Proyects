// Creación de un array de objetos que representan los días
const days = Array.from({ length: 30 }, (_, i) => ({
    title: `Día ${i + 1}`,
    info: `Información del Día ${i + 1}: Actividades planeadas para este día.`,
    infos: `Información del Día ${i + 1}: Actividades planeadas para este día.`
  }));
  
  // Índice del día actual
  let currentDayIndex = 0;
  
  // Selección de elementos del DOM
  const dayTitle = document.getElementById("day-title");
  const dayInfo = document.getElementById("day-info");
  const arrowLeft = document.getElementById("arrow-left");
  const arrowRight = document.getElementById("arrow-right");
  
  // Función para avanzar al día siguiente
  const nextDay = () => {
    if (currentDayIndex < days.length - 1) {
      currentDayIndex++;
      updateView();
    }
  };
  
  // Función para retroceder al día anterior
  const prevDay = () => {
    if (currentDayIndex > 0) {
      currentDayIndex--;
      updateView();
    }
  };
  
  // Asignación de eventos a los botones de flecha
  arrowRight.addEventListener("click", nextDay);
  arrowLeft.addEventListener("click", prevDay);
  
  // Función para actualizar la vista con la información del día actual
  const updateView = () => {
    const day = days[currentDayIndex];
    dayTitle.textContent = day.title;
    dayInfo.textContent = day.info;
  };

  // Actualizar la vista con la información del día actual al inicio
  updateView();

  // Vamos a crear una función que me permita agregar nombres de los alumnos y los pueda ver en la pagina.
  const addName = () => {
    const name = document.getElementById("name").value;
    const nameElement = document.createElement("p");
    nameElement.textContent = name;
    document.body.appendChild(nameElement);
  }
  
  addName();