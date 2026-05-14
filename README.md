# Trade Academy

Página web para promocionar y vender cursos de trading.  
Proyecto académico desarrollado para el **Parcial 1 de Programación con Tecnologías Web**.

---

## Integrantes

- Carlos Arturo Baron Estrada
- Sebastian Ordoñez Giraldo

---

## Descripción Breve

**Trade Academy** es una aplicación web estática (SPA/Landing) que permite a los usuarios consultar un catálogo dinámico de cursos de trading e inscribirse en el curso de su elección a través de un formulario interactivo. 

El proyecto opera completamente en el frontend y simula de forma robusta la asincronía, latencia de red y posibles fallos de servidor de un backend real utilizando el módulo `js/mockApi.js`.

---

## Cómo correr el proyecto localmente

Para ejecutar el proyecto en tu entorno local sin problemas de restricciones de seguridad (CORS):

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/usuario/trade-academy.git
   cd trade-academy
   ```

2. **Ejecutar la aplicación:**
   - **Opción Recomendada:** Abre el proyecto en Visual Studio Code y utiliza la extensión **Live Server** para iniciar un servidor local de desarrollo.
   - **Opción Alternativa:** Abre directamente el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Firefox, Edge).

---

## 🔌 Documentación de la API Simulada (`mockApi.js`)

El archivo `js/mockApi.js` emula el comportamiento de un servidor backend real con las siguientes características:
- **Latencia de red:** Retraso artificial de **700 ms** antes de responder para evaluar estados de carga en la UI.
- **Tasa de fallos:** Probabilidad del **20% de error** en cada petición, registrando `500 Internal Server Error` en la consola del navegador y devolviendo un mensaje amigable al usuario.

### 1. Consultar Catálogo de Cursos

Este endpoint obtiene la lista de cursos disponibles para ser renderizados en el catálogo y en el formulario de inscripción.

- **Función en JS:** `getCourses()`
- **Equivalente HTTP:** `GET /courses`
- **Parámetros de Entrada:** Ninguno.
- **Respuesta Exitosa (`200 OK`):**
  ```json
  [
    {
      "id": 1,
      "name": "Trading desde cero",
      "level": "Principiante",
      "price": 120000,
      "duration": "4 semanas",
      "description": "Aprende conceptos básicos, tipos de mercados, velas japonesas y gestión inicial del riesgo."
    },
    {
      "id": 2,
      "name": "Análisis técnico aplicado",
      "level": "Intermedio",
      "price": 180000,
      "duration": "6 semanas",
      "description": "Estudia soportes, resistencias, tendencias, indicadores y zonas de entrada."
    }
  ]
  ```
- **Respuesta de Error (`500 Internal Server Error`):**
  - **Log en consola:** `500 Internal Server Error`
  - **Excepción en JS:** `Error("No pudimos cargar los cursos. Intenta nuevamente.")`

---

### 2. Registrar Inscripción a Curso

Este endpoint procesa los datos ingresados por el estudiante en el formulario y simula la persistencia de la inscripción.

- **Función en JS:** `createEnrollment(enrollmentData)`
- **Equivalente HTTP:** `POST /enrollments`
- **Parámetros de Entrada (Body Payload):**
  ```json
  {
    "studentName": "Carlos Mendoza",
    "studentEmail": "carlos.mendoza@example.com",
    "studentPhone": "3001234567",
    "courseId": 2,
    "startDate": "2026-06-15"
  }
  ```
- **Respuesta Exitosa (`201 Created`):**
  ```json
  {
    "id": 1715717649201,
    "status": "created",
    "message": "Tu inscripción fue registrada correctamente.",
    "enrollment": {
      "studentName": "Carlos Mendoza",
      "studentEmail": "carlos.mendoza@example.com",
      "studentPhone": "3001234567",
      "courseId": 2,
      "startDate": "2026-06-15"
    }
  }
  ```
- **Respuesta de Error (`500 Internal Server Error`):**
  - **Log en consola:** `500 Internal Server Error`
  - **Excepción en JS:** `Error("No pudimos registrar tu inscripción. Revisa los datos e intenta nuevamente.")`

---

### 3. Cancelar Inscripción Activa

Este endpoint permite al usuario eliminar una inscripción previamente realizada, ejemplificando el manejo de **acciones irreversibles** con confirmación en la interfaz.

- **Función en JS:** `cancelEnrollment(enrollmentId)`
- **Equivalente HTTP:** `DELETE /enrollments/:id`
- **Parámetros de Entrada:** ID de la inscripción (`number`).
- **Respuesta Exitosa (`200 OK`):**
  ```json
  {
    "id": 1715717649201,
    "status": "cancelled",
    "message": "La inscripción ha sido cancelada exitosamente."
  }
  ```
- **Respuesta de Error (`500 Internal Server Error`):**
  - **Log en consola:** `500 Internal Server Error`
  - **Excepción en JS:** `Error("No pudimos cancelar la inscripción. Intenta nuevamente.")`

---

## Estructura del Proyecto

```text
trade-academy/
├── index.html          # Vista principal, maquetación semántica HTML5
├── css/
│   └── styles.css      # Sistema de estilos, Flexbox/Grid y diseño responsivo
└── js/
    ├── mockApi.js      # Capa de servicios: API simulada de datos y latencia
    └── main.js         # Capa de controlador: Eventos DOM, renderizado y validación
```

---

## Tecnologías y Criterios Cumplidos

| Tecnología | Rol en la Aplicación |
| :--- | :--- |
| **HTML5 Semántico** | Uso riguroso de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, y `<footer>`. Formularios accesibles con etiquetas `<label>` visibles y atributos `type` específicos. |
| **CSS3** | Diseño fluido sin desbordes. Adaptabilidad total a dispositivos móviles y de escritorio mediante Media Queries, Flexbox y Grid Layout. |
| **JavaScript ES6+** | Consumo de API asíncrona mediante `async / await`, manejo de errores (`try / catch / finally`), inyección segura de nodos DOM y gestión de estados de carga. |