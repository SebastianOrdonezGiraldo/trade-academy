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
  
  function simulateDelay() {
    return new Promise((resolve) => {
      setTimeout(resolve, 700);
    });
  }
  
  function shouldFail() {
    return Math.random() < 0.2;
  }
  
  async function getCourses() {
    await simulateDelay();
  
    if (shouldFail()) {
      console.log("500 Internal Server Error");
      throw new Error("No pudimos cargar los cursos. Intenta nuevamente.");
    }
  
    return courses;
  }
  
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