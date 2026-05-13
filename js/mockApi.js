/**
 * @fileoverview Simulated API for Trade Academy.
 * Emulates course and enrollment endpoints with an artificial delay
 * and a 20% failure probability to simulate real network behavior.
 */

/**
 * @typedef {Object} Course
 * @property {number} id - Unique course identifier.
 * @property {string} name - Course name.
 * @property {string} level - Difficulty level (Principiante, Intermedio, Avanzado).
 * @property {number} price - Price in Colombian pesos.
 * @property {string} duration - Estimated duration (e.g. "4 semanas").
 * @property {string} description - Brief description of the course content.
 */

/**
 * @typedef {Object} EnrollmentData
 * @property {string} studentName - Student's full name.
 * @property {string} studentEmail - Student's email address.
 * @property {string} studentPhone - Student's contact phone number.
 * @property {number} courseId - ID of the selected course.
 * @property {string} startDate - Desired start date (YYYY-MM-DD).
 */

/**
 * @typedef {Object} EnrollmentResponse
 * @property {number} id - Generated ID for the enrollment.
 * @property {string} status - Operation status ("created").
 * @property {string} message - Confirmation message for the user.
 * @property {EnrollmentData} enrollment - Registered enrollment data.
 */

/** @type {Course[]} */
const courses = [
  {
    id: 1,
    name: "Trading desde cero",
    level: "Principiante",
    price: 120000,
    duration: "4 semanas",
    description: "Aprende conceptos básicos, tipos de mercados, velas japonesas y gestión inicial del riesgo."
  },
  {
    id: 2,
    name: "Análisis técnico aplicado",
    level: "Intermedio",
    price: 180000,
    duration: "6 semanas",
    description: "Estudia soportes, resistencias, tendencias, indicadores y zonas de entrada."
  },
  {
    id: 3,
    name: "Gestión de riesgo para traders",
    level: "Intermedio",
    price: 150000,
    duration: "3 semanas",
    description: "Aprende a calcular riesgo por operación, relación riesgo-beneficio y tamaño de posición."
  },
  {
    id: 4,
    name: "Psicología del trading",
    level: "Avanzado",
    price: 200000,
    duration: "5 semanas",
    description: "Trabaja disciplina, control emocional y toma de decisiones bajo presión."
  }
];

/**
 * Returns a promise that resolves after 700 ms, simulating network latency.
 * @returns {Promise<void>}
 */
function simulateDelay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 700);
  });
}

/**
 * Randomly determines whether the request should fail (20% probability).
 * @returns {boolean} `true` if the request should simulate a 500 error.
 */
function shouldFail() {
  return Math.random() < 0.2;
}

/**
 * Fetches the list of available courses.
 * Simulates a GET /courses request with delay and possible server error.
 * @returns {Promise<Course[]>} List of courses.
 * @throws {Error} If the simulated request fails.
 */
async function getCourses() {
  await simulateDelay();

  if (shouldFail()) {
    console.log("500 Internal Server Error");
    throw new Error("No pudimos cargar los cursos. Intenta nuevamente.");
  }

  return courses;
}

/**
 * Registers a new course enrollment.
 * Simulates a POST /enrollments request with delay and possible server error.
 * @param {EnrollmentData} enrollmentData - Data from the enrollment form.
 * @returns {Promise<EnrollmentResponse>} Response with enrollment confirmation.
 * @throws {Error} If the simulated request fails.
 */
async function createEnrollment(enrollmentData) {
  await simulateDelay();

  if (shouldFail()) {
    console.log("500 Internal Server Error");
    throw new Error("No pudimos registrar tu inscripción. Revisa los datos e intenta nuevamente.");
  }

  return {
    id: Date.now(),
    status: "created",
    message: "Tu inscripción fue registrada correctamente.",
    enrollment: enrollmentData
  };
}
