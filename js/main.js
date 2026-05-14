/**
 * @fileoverview Main logic for Trade Academy.
 * Handles course loading and rendering, enrollment form submission,
 * level filtering, and active enrollment management (cancellations).
 * Depends on `getCourses`, `createEnrollment`, `getEnrollments`, and `cancelEnrollment` in mockApi.js.
 */

const coursesStatus = document.getElementById("coursesStatus");
const coursesContainer = document.getElementById("coursesContainer");
const courseSelect = document.getElementById("courseSelect");
const enrollmentForm = document.getElementById("enrollmentForm");
const submitButton = document.getElementById("submitButton");
const formStatus = document.getElementById("formStatus");
const filterButtons = document.querySelectorAll(".filter-btn");
const enrollmentsStatus = document.getElementById("enrollmentsStatus");
const enrollmentsContainer = document.getElementById("enrollmentsContainer");

/** @type {import('./mockApi').Course[]} Courses loaded from the simulated API. */
let loadedCourses = [];
let currentLevelFilter = "Todos";

document.addEventListener("DOMContentLoaded", () => {
  loadCourses();
  loadEnrollments();
  initFilterEvents();
});

/**
 * Initializes click events for course filtering buttons.
 */
function initFilterEvents() {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentLevelFilter = btn.dataset.level;
      renderCourses(loadedCourses);
    });
  });
}

/**
 * Loads courses from the simulated API and updates the DOM.
 * Displays status messages during loading and on error.
 * @returns {Promise<void>}
 */
async function loadCourses() {
  coursesStatus.textContent = "Cargando cursos disponibles...";
  coursesContainer.innerHTML = "";
  courseSelect.innerHTML = '<option value="">Selecciona un curso</option>';

  try {
    loadedCourses = await getCourses();

    if (loadedCourses.length === 0) {
      coursesStatus.textContent = "Por ahora no hay cursos disponibles.";
      return;
    }

    coursesStatus.textContent = "";
    renderCourses(loadedCourses);
    renderCourseOptions(loadedCourses);
  } catch (error) {
    coursesStatus.innerHTML = `${error.message} <button type="button" id="retryCoursesBtn" style="margin-left: 10px; padding: 6px 12px; font-size: 14px; background-color: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer;">Reintentar Carga</button>`;
    document.getElementById("retryCoursesBtn").addEventListener("click", () => {
      loadCourses();
    });
  }
}


/**
 * Renders course cards into the main container matching the active level filter.
 * Each card includes a button that pre-selects the course in the form.
 * @param {import('./mockApi').Course[]} courses - List of courses to render.
 */
function renderCourses(courses) {
  coursesContainer.innerHTML = "";

  const filteredCourses = currentLevelFilter === "Todos"
    ? courses
    : courses.filter((c) => c.level === currentLevelFilter);

  if (filteredCourses.length === 0) {
    coursesContainer.innerHTML = `<p style="grid-column: 1/-1;">No se encontraron cursos de nivel ${currentLevelFilter}.</p>`;
    return;
  }

  filteredCourses.forEach((course) => {
    const article = document.createElement("article");

    article.innerHTML = `
      <h3>${course.name}</h3>
      <p><strong>Nivel:</strong> ${course.level}</p>
      <p><strong>Duración:</strong> ${course.duration}</p>
      <p><strong>Precio:</strong> $${course.price.toLocaleString("es-CO")}</p>
      <p>${course.description}</p>
      <button type="button" data-course-id="${course.id}">
        Inscribirme en ${course.name}
      </button>
    `;

    coursesContainer.appendChild(article);
  });

  const courseButtons = coursesContainer.querySelectorAll("button");

  courseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const courseId = Number(button.dataset.courseId);
      courseSelect.value = courseId;
      document.getElementById("inscripcion").scrollIntoView({
        behavior: "smooth"
      });
    });
  });
}

/**
 * Populates the form `<select>` with the available course options.
 * @param {import('./mockApi').Course[]} courses - List of courses to add as options.
 */
function renderCourseOptions(courses) {
  courses.forEach((course) => {
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = course.name;
    courseSelect.appendChild(option);
  });
}

/**
 * Loads active enrollments and renders them.
 */
async function loadEnrollments() {
  enrollmentsStatus.textContent = "Cargando inscripciones activas...";
  enrollmentsContainer.innerHTML = "";

  try {
    const list = await getEnrollments();
    enrollmentsStatus.textContent = "";

    if (list.length === 0) {
      enrollmentsStatus.textContent = "Aún no te has inscrito en ningún curso.";
      return;
    }

    renderEnrollments(list);
  } catch (error) {
    enrollmentsStatus.innerHTML = `No se pudieron cargar tus inscripciones. <button type="button" id="retryEnrollmentsBtn" style="margin-left: 10px; padding: 6px 12px; font-size: 14px; background-color: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer;">Reintentar</button>`;
    document.getElementById("retryEnrollmentsBtn").addEventListener("click", () => {
      loadEnrollments();
    });
  }
}


/**
 * Renders user active enrollments with cancel action.
 * @param {Array<{id: number, enrollment: import('./mockApi').EnrollmentData}>} list
 */
function renderEnrollments(list) {
  enrollmentsContainer.innerHTML = "";

  list.forEach((item) => {
    const courseObj = loadedCourses.find((c) => c.id === item.enrollment.courseId);
    const courseName = courseObj ? courseObj.name : "Curso Seleccionado";

    const div = document.createElement("div");
    div.className = "enrollment-card";

    div.innerHTML = `
      <h3>${courseName}</h3>
      <p><strong>Estudiante:</strong> ${item.enrollment.studentName}</p>
      <p><strong>Email:</strong> ${item.enrollment.studentEmail}</p>
      <p><strong>Fecha Inicio:</strong> ${item.enrollment.startDate}</p>
      <button type="button" class="btn-danger" data-id="${item.id}">
        Cancelar Inscripción
      </button>
    `;

    enrollmentsContainer.appendChild(div);
  });

  const cancelButtons = enrollmentsContainer.querySelectorAll(".btn-danger");
  cancelButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const isConfirmed = confirm("¿Estás seguro de cancelar tu inscripción a este curso? Esta acción es irreversible.");
      if (!isConfirmed) return;

      const id = Number(btn.dataset.id);
      btn.disabled = true;
      btn.textContent = "Cancelando...";

      try {
        const res = await cancelEnrollment(id);
        alert(res.message);
        loadEnrollments();
      } catch (err) {
        alert(err.message);
        btn.disabled = false;
        btn.textContent = "Cancelar Inscripción";
      }
    });
  });
}

/**
 * Handles enrollment form submission.
 * Collects form data, calls `createEnrollment`, and displays the result to the user.
 * Disables the submit button while the request is in progress.
 */
enrollmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const enrollmentData = {
    studentName: document.getElementById("studentName").value.trim(),
    studentEmail: document.getElementById("studentEmail").value.trim(),
    studentPhone: document.getElementById("studentPhone").value.trim(),
    courseId: Number(courseSelect.value),
    startDate: document.getElementById("startDate").value
  };

  formStatus.textContent = "";
  submitButton.disabled = true;
  submitButton.textContent = "Registrando inscripción...";

  try {
    const response = await createEnrollment(enrollmentData);

    formStatus.textContent = response.message;
    enrollmentForm.reset();
    loadEnrollments();
  } catch (error) {
    formStatus.textContent = error.message;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Confirmar inscripción al curso";
  }
});

