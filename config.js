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

  ],

  checklist: [

  ],

  tutorials: [

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
