// Clase Activity
class Activity {
  constructor(id, title, description, imgUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

// Clase Repository
class Repository {
  constructor() {
    this.activities = [];
    this.container = document.getElementById("activities-container");
  }

  // Retorna todas las actividades
  getAllActivities() {
    return this.activities;
  }

  // Crea y guarda una actividad
  createActivity(id, title, description, imgUrl) {
    const newActivity = new Activity(id, title, description, imgUrl);
    this.activities.push(newActivity);
    this.renderActivities();
    return newActivity;
  }

  // Eliminar actividad por id
  deleteActivity(id) {
    this.activities = this.activities.filter(activity => activity.id !== id);
    this.renderActivities();
  }

  // Renderiza todas las actividades en el DOM
  renderActivities() {
    this.container.innerHTML = ""; 
    this.activities.forEach(activity => {
      const card = document.createElement("div");
      card.classList.add("activity-card");
      card.innerHTML = `
        <img src="${activity.imgUrl}" alt="${activity.title}" class="activity-img">
        <h3>${activity.title}</h3>
        <p>${activity.description}</p>
        <button class="delete-btn" data-id="${activity.id}">Eliminar</button>
      `;
      this.container.appendChild(card);
    });

    // Añadir evento a botones de eliminar
    const deleteButtons = this.container.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
      button.addEventListener("click", () => {
        const id = parseInt(button.dataset.id);
        this.deleteActivity(id);
      });
    });
  }
}

const repo = new Repository();

// formulario
const activityForm = document.getElementById("activity-form");

activityForm.addEventListener("submit", function(e) {
  e.preventDefault(); // evitar recarga

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const imgUrl = document.getElementById("imgUrl").value;

  // Crear nueva actividad con id automático
  const id = repo.activities.length > 0 
             ? repo.activities[repo.activities.length - 1].id + 1 
             : 1;
  
  repo.createActivity(id, title, description, imgUrl);

  activityForm.reset(); // limpiar formulario
});

