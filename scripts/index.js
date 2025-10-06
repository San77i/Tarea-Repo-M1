// Clase Actividad
class Actividad {
  constructor(id, titulo, descripcion, imagenUrl) {
    this.id = id;
    this.titulo = titulo || ""; // Campos opcionales
    this.descripcion = descripcion || "";
    this.imagenUrl = imagenUrl || "";
  }
}

// Clase Repositorio
class Repositorio {
  constructor() {
    this.actividades = [];
    this.contenedor = document.getElementById("contenedor-actividades");
  }

  obtenerTodas() {
    return this.actividades;
  }

  crearActividad(id, titulo, descripcion, imagenUrl) {
    const nueva = new Actividad(id, titulo, descripcion, imagenUrl);
    this.actividades.push(nueva);
    this.mostrarActividades();
    return nueva;
  }

  eliminarActividad(id) {
    this.actividades = this.actividades.filter(a => a.id !== id);
    this.mostrarActividades();
  }

  eliminarCampo(id, campo) {
    const actividad = this.actividades.find(a => a.id === id);
    if (actividad) {
      actividad[campo] = ""; // Vacía el campo
      this.mostrarActividades();
    }
  }

  mostrarActividades() {
    this.contenedor.innerHTML = "";

    this.actividades.forEach(a => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta");

      tarjeta.innerHTML = `
        ${a.imagenUrl ? `<img src="${a.imagenUrl}" alt="${a.titulo}" class="actividad-img">` : ""}
        ${a.titulo ? `<h3>${a.titulo}</h3>` : "<h3>(Sin título)</h3>"}
        ${a.descripcion ? `<p>${a.descripcion}</p>` : "<p>(Sin descripción)</p>"}
        <div class="botones">
          <button class="borrar-titulo" data-id="${a.id}">Eliminar título</button>
          <button class="borrar-descripcion" data-id="${a.id}">Eliminar descripción</button>
          <button class="borrar-imagen" data-id="${a.id}">Eliminar imagen</button>
          <button class="borrar-actividad" data-id="${a.id}">Eliminar actividad</button>
        </div>
      `;

      this.contenedor.appendChild(tarjeta);
    });

    // Eventos de eliminación
    this.contenedor.querySelectorAll(".borrar-actividad").forEach(btn =>
      btn.addEventListener("click", () => this.eliminarActividad(parseInt(btn.dataset.id)))
    );

    this.contenedor.querySelectorAll(".borrar-titulo").forEach(btn =>
      btn.addEventListener("click", () => this.eliminarCampo(parseInt(btn.dataset.id), "titulo"))
    );

    this.contenedor.querySelectorAll(".borrar-descripcion").forEach(btn =>
      btn.addEventListener("click", () => this.eliminarCampo(parseInt(btn.dataset.id), "descripcion"))
    );

    this.contenedor.querySelectorAll(".borrar-imagen").forEach(btn =>
      btn.addEventListener("click", () => this.eliminarCampo(parseInt(btn.dataset.id), "imagenUrl"))
    );
  }
}

// Instancia del repositorio
const repo = new Repositorio();

// Formulario
const formulario = document.getElementById("formulario-actividad");

formulario.addEventListener("submit", e => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagenUrl = document.getElementById("imagenUrl").value;

  const id = repo.actividades.length > 0
    ? repo.actividades[repo.actividades.length - 1].id + 1
    : 1;

  repo.crearActividad(id, titulo, descripcion, imagenUrl);
  formulario.reset();
});
