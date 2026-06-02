window.ATUEL_CONFIG = {
  shortcuts: [
    {
      "key": "F2",
      "title": "Buscar Productos",
      "desc": "Abre el panel de búsqueda rápida para consultar el catálogo completo, verificar stock de repuestos o agregar artículos a la venta en curso.",
      "category": "Ventas"
    },
    {
      "key": "F6",
      "title": "Buscar Cliente",
      "desc": "Despliega el padrón de clientes para asignar la venta a un comprador registrado o para consultar su información e historial.",
      "category": "Ventas"
    },
    {
      "key": "F4",
      "title": "Descuento por Artículo",
      "desc": "Aplica un porcentaje o monto de descuento específico únicamente al producto o línea que se encuentra seleccionado en ese momento.",
      "category": "Ventas"
    },
    {
      "key": "F5",
      "title": "Descuento General",
      "desc": "Aplica una bonificación o descuento global sobre el monto total final de la operación actual.",
      "category": "Ventas"
    },
    {
      "key": "F8",
      "title": "Cerrar Venta (Solo Registro)",
      "desc": "Finaliza y guarda la operación en el sistema sin emitir comprobante fiscal ni enviar órdenes a la impresora.",
      "category": "Ventas"
    },
    {
      "key": "F10",
      "title": "Reimprimir Último Comprobante",
      "desc": "Genera una nueva copia impresa de la última transacción registrada, ya sea un documento fiscal o un comprobante interno.",
      "category": "Ventas"
    },
    {
      "key": "F11",
      "title": "Registrar Comprobante Interno",
      "desc": "Guarda la operación como un documento no fiscal (remito, presupuesto o control interno) solo en el sistema, sin imprimir.",
      "category": "Ventas"
    },
    {
      "key": "F12",
      "title": "Imprimir Comprobante Interno",
      "desc": "Finaliza la operación generando y enviando a imprimir un documento no fiscal para el control interno o para entregar al cliente.",
      "category": "Ventas"
    },
  ],

  providers: [
    {
      name: 'SERVICOM',
      status: 'ready',
      lastUpdate: '2026-05-21',
    },
    {
      name: 'SAMURAI WARRIORS',
      status: 'upcoming',
      priority: 10,
    },
    {
      name: 'ROPER',
      status: 'ready',
      lastUpdate: '2026-05-14',
    },
    {
      name: 'OKINOI',
      status: 'partial',
      lastUpdate: '2026-05-08',
    },
    {
      name: 'NEUMAT',
      status: 'ready',
      lastUpdate: '2026-05-26',
    },
    {
      name: 'MT & AXXIS',
      status: 'ready',
      lastUpdate: '2026-05-26',
    },
    {
      name: 'MERCOMAX',
      status: 'partial',
      lastUpdate: '2026-05-07',
    },
    {
      name: 'INTERCAP',
      status: 'upcoming',
      priority: 1,
    },
    {
      name: 'GOES',
      status: 'ready',
      lastUpdate: '2026-05-21',
    },
    {
      name: 'BYCAP',
      status: 'partial',
      lastUpdate: '2026-05-12',
    },
    {
      name: 'ACEITES',
      status: 'partial',
      lastUpdate: '2026-05-13',
    },
  ],

  avisos: [
    { id: 'aviso-1', title: 'Sistema actualizado', body: 'Se actualizó el módulo de ventas. Reportar cualquier anomalía al administrador.', date: '2026-05-28', priority: 'high' },
    { id: 'aviso-2', title: 'Recordatorio: Backup diario', body: 'No olvidar el backup automático al finalizar la jornada.', date: '2026-05-30', priority: 'med' },
    { id: 'aviso-3', title: 'Nuevo horario de atención', body: 'A partir del lunes, abrimos a las 9:00 hs. Comunicar al público.', date: '2026-05-25', priority: 'low' },
  ],

  checklist: [
    { id: 'ck-1', text: 'Apertura de caja y conteo inicial de efectivo' },
    { id: 'ck-2', text: 'Revisar correo electrónico y mensajes' },
    { id: 'ck-3', text: 'Verificar conexión con listas de proveedores' },
    { id: 'ck-4', text: 'Revisar agenda de entregas y servicios del día' },
    { id: 'ck-5', text: 'Realizar Cierre Z y backup del sistema' },
    { id: 'ck-6', text: 'Conteo final de caja y cuadre de turnos' },
  ],

  tutorials: [
    {
      id: 'tut-cargar-inventario',
      title: 'Cargar producto nuevo al inventario',
      description: 'Alta completa de artículos: stock, precios, IVA, categorías y vinculación con proveedores.',
      topic: 'Stock',
      icon: '📦',
      parts: [
        {
          title: 'Paso 1: Abrir el módulo de Stock',
          content: '<p>Dirigirse al menú principal y seleccionar <span class="hl">Stock → Productos</span>. Se abrirá una pantalla con el listado actual de productos.</p><p class="callout">💡 <em>Tip:</em> Si tenés un lector de código de barras, asegurate de que esté conectado antes de continuar.</p>'
        },
        {
          title: 'Paso 2: Iniciar alta de producto',
          content: '<p>Presionar el botón <span class="hl">+ Nuevo producto</span> en la esquina superior derecha, o usar el atajo <code>F2</code>.</p><p>Se abrirá un <strong>formulario de alta</strong> con los siguientes campos:</p><ul class="steps"><li>Código (puede ser autogenerado)</li><li>Descripción del producto</li><li>Categoría</li><li>Precio de costo y precio de venta</li><li>Stock inicial</li><li>Proveedor principal</li></ul>'
        },
        {
          title: 'Paso 3: Completar los datos',
          content: '<p>Completar <em>todos los campos obligatorios</em> marcados con asterisco (*). Los precios deben ingresarse <strong>sin IVA</strong>, el sistema lo calcula automáticamente.</p><p class="callout">⚠️ <strong>Importante:</strong> Verificar el código del proveedor ya que no se puede cambiar después de guardar.</p>'
        },
        {
          title: 'Paso 4: Guardar y verificar',
          content: '<p>Una vez completado el formulario, presionar <span class="hl">Guardar</span> o usar el atajo <code>Ctrl + S</code>.</p><p>El sistema mostrará un mensaje de confirmación y el producto aparecerá en el listado.</p><p class="callout">✅ <em>¡Listo!</em> El producto ya está disponible para la venta.</p>'
        },
        {
          title: 'Errores comunes',
          content: '<p>Si el sistema no te permite guardar, revisá:</p><ol class="steps"><li>Que el código no esté duplicado en la base</li><li>Que hayas seleccionado un proveedor válido</li><li>Que el precio de venta sea mayor al costo</li><li>Que el stock inicial sea un número positivo</li></ol>'
        }
      ]
    },
    {
      id: 'tut-busqueda-cliente',
      title: 'Buscar un cliente existente',
      description: 'Búsqueda rápida por DNI, nombre, teléfono o email, y consulta del historial completo de compras.',
      topic: 'Clientes',
      icon: '👥',
      parts: [
        {
          title: 'Acceso rápido al buscador',
          content: '<p>Para buscar un cliente, podés usar el atajo <span class="hl">F6</span> desde cualquier pantalla, o ir a <strong>Clientes → Buscar</strong> en el menú principal.</p>'
        },
        {
          title: 'Filtros disponibles',
          content: '<p>El buscador permite filtrar por:</p><ul class="steps"><li>DNI o CUIT</li><li>Nombre o apellido</li><li>Teléfono</li><li>Email</li></ul><p class="callout">💡 <em>Tip:</em> Con solo escribir las primeras 3 letras ya aparece la lista de coincidencias.</p>'
        },
        {
          title: 'Ver el historial del cliente',
          content: '<p>Una vez encontrado el cliente, hacé doble clic sobre su nombre para abrir su ficha completa. Ahí vas a poder ver <strong>todas las compras anteriores</strong>, datos de contacto y notas internas.</p>'
        }
      ]
    },
    {
      id: 'tut-cierre-caja',
      title: 'Realizar el cierre diario de caja',
      description: 'Cierre Z, conteo físico de efectivo, cuadre de turnos y emisión del reporte diario.',
      topic: 'Ventas',
      icon: '💰',
      parts: [
        {
          title: 'Antes de cerrar',
          content: '<p>Asegurate de que <strong>todas las ventas del día</strong> estén facturadas y que no haya operaciones pendientes en el sistema.</p><p class="callout">💡 <em>Tip:</em> Aprovechá para verificar que los pagos en cuenta corriente estén bien cargados.</p>'
        },
        {
          title: 'Ejecutar el Cierre Z',
          content: '<p>Presionar <span class="hl">F9</span> o ir a <strong>Caja → Cierre Z</strong>.</p><p>El sistema te pedirá confirmar la operación. Una vez confirmada, <em>no se puede revertir</em>.</p><p class="callout">⚠️ <strong>Importante:</strong> Anotá el número de Cierre Z en la planilla diaria.</p>'
        },
        {
          title: 'Conteo físico y cuadre',
          content: '<p>Comparar el efectivo físico con el reporte del sistema. Si hay diferencia, dejar constancia en la planilla de <em>cuadre de caja</em> con la firma del responsable.</p>'
        }
      ]
    }
  ],

  branding: {
    name: 'Atuel Motos',
    tagline: 'Centro de comandos diario del local',
  },

  features: {
    cacheBustDays: 5,
    enableCacheBust: true,
    enableTutorials: false,
    enableChecklist: false,
    enableAvisos: false,
    enableAtajos: true,
    enableProveedores: true,
  },
};
