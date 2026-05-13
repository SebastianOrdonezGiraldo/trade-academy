# Trade Academy

Página web estática para promocionar y vender cursos de trading.  
Proyecto académico desarrollado para el Parcial 1 de Programación con Tecnologías Web.

## Integrantes

- Tu nombre
- Nombre de tu compañero

## Descripción

Trade Academy permite consultar cursos de trading disponibles e inscribirse a uno de ellos mediante un formulario. No requiere backend ni base de datos; la lógica de datos está simulada en `js/mockApi.js`.

## Estructura del proyecto

```
trade-academy/
├── index.html          # Estructura y contenido de la página
├── css/
│   └── styles.css      # Estilos visuales
└── js/
    ├── mockApi.js      # API simulada: cursos e inscripciones
    └── main.js         # Lógica DOM: carga de cursos y formulario
```

## Flujo de la aplicación

1. Al cargar la página, `main.js` llama a `getCourses()` (definida en `mockApi.js`).
2. Los cursos se renderizan como tarjetas y se agregan como opciones al formulario.
3. Al hacer clic en "Inscribirme", el formulario se pre-selecciona con ese curso.
4. Al enviar el formulario, se llama a `createEnrollment()` con los datos del estudiante.
5. Se muestra un mensaje de éxito o error según la respuesta simulada.

> **Nota:** `mockApi.js` introduce un retraso de 700 ms y un 20% de probabilidad de error para simular comportamiento real de red.

## Cómo correr el proyecto

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd trade-academy
```

2. Abrir `index.html` en el navegador, o usar una extensión como **Live Server** en VS Code para evitar restricciones de CORS.

## Tecnologías usadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica de la página |
| CSS3 | Estilos y diseño responsivo |
| JavaScript (ES2017+) | Lógica de UI, `async/await`, manipulación del DOM |
