/**
 * @fileoverview Main logic for Trade Academy.
 * Handles course loading and rendering, and enrollment form submission.
 * Depends on `getCourses` and `createEnrollment` defined in mockApi.js.
 */

const coursesStatus = document.getElementById("coursesStatus");
const coursesContainer = document.getElementById("coursesContainer");
const courseSelect = document.getElementById("courseSelect");
const enrollmentForm = document.getElementById("enrollmentForm");
const submitButton = document.getElementById("submitButton");
const formStatus = document.getElementById("formStatus");

/** @type {import('./mockApi').Course[]} Courses loaded from the simulated API. */
let loadedCourses = [];

document.addEventListener("DOMContentLoaded", () => {
  loadCourses();
});

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
    coursesStatus.textContent = error.message;
  }
}

/**
 * Renders course cards into the main container.
 * Each card includes a button that pre-selects the course in the form
 * and smoothly scrolls to the enrollment section.
 * @param {import('./mockApi').Course[]} courses - List of courses to render.
 */
function renderCourses(courses) {
  coursesContainer.innerHTML = "";

  courses.forEach((course) => {
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
  } catch (error) {
    formStatus.textContent = error.message;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Confirmar inscripción al curso";
  }
});
