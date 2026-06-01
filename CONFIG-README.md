# ⚙️ config.js — Configuración externa compartida

Este archivo define los datos que **se cargan automáticamente al abrir la intranet** y que son **compartidos entre todos los usuarios** (siempre que compartan esta carpeta por red, USB, etc.).

## 📝 Cómo editarlo

1. Abrí `config.js` con cualquier editor de texto (Notepad, VS Code, etc.)
2. Modificá los valores que quieras
3. Guardá el archivo
4. En la intranet, andá a **Configuración → Configuración externa** y hacé clic en **🔄 Recargar config.js**
   (o recargá la página con `Ctrl + Shift + R`)

## 📦 Estructura

El archivo define una variable global `window.ATUEL_CONFIG` con estas secciones:

| Sección | Qué contiene | Editable desde la app |
|---|---|---|
| `shortcuts` | Atajos de teclado del sistema | No (solo desde acá) |
| `providers` | Lista de proveedores con estado y fecha | No (solo desde acá) |
| `avisos` | Avisos predeterminados | Sí (crear/editar/borrar) |
| `checklist` | Tareas del checklist diario | Sí (agregar/quitar) |
| `tutorials` | Tutoriales completos con partes | Sí (modo edición) |
| `branding` | Nombre del local y eslogan | No (solo desde acá) |
| `features` | Activar/desactivar funciones globales | No (solo desde acá) |

## 💡 Ejemplo rápido

Para agregar un nuevo proveedor, agregá una línea así en el array `providers`:

```js
{ name: 'Bosch', status: 'ready', daysAgo: 3 },
```

Status válidos: `'ready'`, `'partial'`, `'not-impl'`.

## ⚠️ Precedencia

Cuando abrís la página, los datos se cargan en este orden de prioridad:

1. **localStorage** (cambios que hiciste desde la app)
2. **config.js** (este archivo, datos compartidos)
3. **Defaults internos** (valores por defecto del script.js, solo como fallback)

Si querés "volver a la base" después de modificar cosas desde la app, usá **🔄 Recargar config.js** — eso limpia el localStorage y vuelve a leer este archivo.

## 🛠 Plantilla

Si necesitás regenerar el archivo desde cero, andá a **Configuración → Configuración externa → 📥 Descargar plantilla**. Eso te descarga un `config.js` con los valores actuales.
