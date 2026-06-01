# 📁 Carpeta `material/`

Acá van las imágenes que se usan en los tutoriales.

## Cómo usar

1. **Guardá la imagen** en esta carpeta con un nombre descriptivo, por ejemplo:
   - `material/cargar-producto-paso1.png`
   - `material/caja-boton-cierre.jpg`
   - `material/buscar-cliente-menu.webp`

2. **Insertá la imagen** en el editor de tutoriales con el botón 🖼 Imagen de la barra de herramientas, o escribí directamente en el HTML:

   ```html
   <img src="material/cargar-producto-paso1.png" alt="Pantalla de Stock" class="tutorial-img">
   ```

3. **Formatos soportados**: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.svg`

## Tamaños recomendados

- Ancho: 800–1200px
- Las imágenes se redimensionan automáticamente para entrar en la pantalla del tutorial
- Capturas de pantalla: usá PNG sin compresión para nitidez

## Template

`material/_template.svg` es una plantilla SVG que podés renombrar y modificar para crear imágenes de placeholder mientras armás los tutoriales.

## Estructura sugerida

Podés organizar las imágenes en subcarpetas si tenés muchos tutoriales:

```
material/
├── stock/
│   ├── cargar-producto-paso1.png
│   └── cargar-producto-paso2.png
├── ventas/
│   └── cierre-z.png
└── clientes/
    └── buscar-cliente.png
```

Y referenciarlas como: `<img src="material/stock/cargar-producto-paso1.png" ...>`
