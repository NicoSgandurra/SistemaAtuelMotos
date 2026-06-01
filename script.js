(function checkCacheBust() {
  const KEY = 'atuel_last_hard_reload';
  const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;
  const enabled = localStorage.getItem('atuel_reload_enabled') !== 'false';
  if (!enabled) return;
  const last = parseInt(localStorage.getItem(KEY) || '0');
  const now = Date.now();
  if (last && (now - last) > FIVE_DAYS) {
    localStorage.setItem(KEY, now.toString());
    const url = window.location.href.split('?')[0].split('#')[0] + '?_=' + now;
    window.location.replace(url);
    return;
  }
  localStorage.setItem(KEY, now.toString());
})();

const SHORTCUTS = (window.ATUEL_CONFIG && window.ATUEL_CONFIG.shortcuts) || [
  { key: 'F1', title: 'Ayuda', desc: 'Abre la ventana de ayuda del sistema', category: 'general' },
  { key: 'F2', title: 'Buscar Producto', desc: 'Abre el buscador de productos', category: 'productos' },
  { key: 'F3', title: 'Nuevo Cliente', desc: 'Abre el formulario de alta de cliente', category: 'clientes' },
  { key: 'F4', title: 'Nueva Venta', desc: 'Inicia una nueva venta', category: 'ventas' },
  { key: 'F5', title: 'Stock', desc: 'Muestra el inventario actual', category: 'productos' },
  { key: 'F6', title: 'Buscar Cliente', desc: 'Abre el buscador de clientes', category: 'clientes' },
  { key: 'F7', title: 'Proveedores', desc: 'Lista de proveedores y listas', category: 'proveedores' },
  { key: 'F8', title: 'Caja', desc: 'Abre el módulo de caja', category: 'ventas' },
  { key: 'F9', title: 'Cierre Z', desc: 'Realiza el cierre diario de caja', category: 'ventas' },
  { key: 'F10', title: 'Reportes', desc: 'Menú de reportes y estadísticas', category: 'general' },
  { key: 'Ctrl + N', title: 'Nueva venta', desc: 'Atajo alternativo para iniciar venta', category: 'ventas' },
  { key: 'Ctrl + S', title: 'Guardar', desc: 'Guarda el formulario actual', category: 'general' },
  { key: 'Ctrl + P', title: 'Imprimir', desc: 'Imprime la pantalla o reporte actual', category: 'general' },
  { key: 'Esc', title: 'Salir / Cancelar', desc: 'Cierra ventanas o cancela la operación', category: 'general' },
];

const PROVIDERS = (window.ATUEL_CONFIG && window.ATUEL_CONFIG.providers) || [
  { name: 'Servicom', status: 'ready', daysAgo: 2 },
  { name: 'Honda', status: 'ready', daysAgo: 5 },
  { name: 'Yamaha', status: 'partial', daysAgo: 12 },
  { name: 'Motul', status: 'ready', daysAgo: 20 },
  { name: 'Castrol', status: 'not-impl', daysAgo: 45 },
  { name: 'Genérico', status: 'partial', daysAgo: 8 },
];

const DEFAULT_AVISOS = (window.ATUEL_CONFIG && window.ATUEL_CONFIG.avisos) || [
  { id: 'aviso-1', title: 'Sistema actualizado', body: 'Se actualizó el módulo de ventas. Reportar cualquier anomalía al administrador.', date: '2026-05-28', priority: 'high' },
  { id: 'aviso-2', title: 'Recordatorio: Backup diario', body: 'No olvidar el backup automático al finalizar la jornada.', date: '2026-05-30', priority: 'med' },
  { id: 'aviso-3', title: 'Nuevo horario de atención', body: 'A partir del lunes, abrimos a las 9:00 hs. Comunicar al público.', date: '2026-05-25', priority: 'low' },
];

const DEFAULT_CHECKLIST = (window.ATUEL_CONFIG && window.ATUEL_CONFIG.checklist) || [
  { id: 'ck-1', text: 'Apertura de caja y conteo inicial de efectivo' },
  { id: 'ck-2', text: 'Revisar correo electrónico y mensajes' },
  { id: 'ck-3', text: 'Verificar conexión con listas de proveedores' },
  { id: 'ck-4', text: 'Revisar agenda de entregas y servicios del día' },
  { id: 'ck-5', text: 'Realizar Cierre Z y backup del sistema' },
  { id: 'ck-6', text: 'Conteo final de caja y cuadre de turnos' },
];

const DEFAULT_TUTORIALS = (window.ATUEL_CONFIG && window.ATUEL_CONFIG.tutorials) || [
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
];

const STORAGE = {
  get(key, def) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : def;
    } catch (e) {
      return def;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }
};

const SECTION_DEFAULTS = {
  inicio: { enabled: true, label: 'Inicio', icon: '🏠', alwaysOn: true },
  atajos: { enabled: true, label: 'Atajos', icon: '⌨️' },
  proveedores: { enabled: true, label: 'Proveedores', icon: '📦' },
  tutoriales: { enabled: true, label: 'Tutoriales', icon: '📚' },
  avisos: { enabled: true, label: 'Avisos', icon: '📢' },
  checklist: { enabled: true, label: 'Checklist', icon: '✅' },
  configuracion: { enabled: true, label: 'Configuración', icon: '⚙️', alwaysOn: true },
};

function getSections() {
  const saved = STORAGE.get('atuel_sections', null) || {};
  const merged = {};
  for (const key in SECTION_DEFAULTS) {
    merged[key] = { ...SECTION_DEFAULTS[key], enabled: saved[key]?.enabled !== undefined ? saved[key].enabled : SECTION_DEFAULTS[key].enabled };
  }
  return merged;
}

function saveSections(sections) {
  const out = {};
  for (const key in sections) {
    if (!sections[key].alwaysOn) {
      out[key] = { enabled: sections[key].enabled };
    }
  }
  STORAGE.set('atuel_sections', out);
}

function isSectionEnabled(id) {
  return getSections()[id]?.enabled !== false;
}

function toggleSection(id, enabled) {
  const sections = getSections();
  if (sections[id]?.alwaysOn) return;
  sections[id].enabled = enabled;
  saveSections(sections);
  applySectionVisibility();
  renderSectionsToggles();
  renderSummary();
  setTimeout(() => equalizeCardHeights('#summaryGrid'), 50);
}

function applySectionVisibility() {
  const sections = getSections();
  document.querySelectorAll('.nav-item').forEach(item => {
    const target = item.dataset.target;
    item.style.display = sections[target]?.enabled === false ? 'none' : '';
  });
  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    const target = item.dataset.target;
    item.style.display = sections[target]?.enabled === false ? 'none' : '';
  });
  const currentSection = document.querySelector('.section:not(.hidden)');
  if (currentSection && sections[currentSection.id]?.enabled === false) {
    navigate('inicio');
  }
}

function renderSectionsToggles() {
  const c = document.getElementById('sectionsToggles');
  if (!c) return;
  const sections = getSections();
  c.innerHTML = Object.keys(sections).map(key => {
    const s = sections[key];
    if (s.alwaysOn) {
      return `
        <div class="setting-row">
          <div class="setting-info">
            <div class="setting-title">${s.icon} ${s.label}</div>
            <div class="setting-desc">Siempre visible (no se puede desactivar).</div>
          </div>
          <label class="switch">
            <input type="checkbox" checked disabled style="opacity: 0.5;">
            <span class="switch-slider"></span>
          </label>
        </div>
      `;
    }
    return `
      <div class="setting-row">
        <div class="setting-info">
          <div class="setting-title">${s.icon} ${s.label}</div>
          <div class="setting-desc">${s.enabled ? 'Visible en el menú lateral y la barra inferior.' : 'Oculta del menú. Podés volver a activarla desde acá.'}</div>
        </div>
        <label class="switch">
          <input type="checkbox" data-section-toggle="${key}" ${s.enabled ? 'checked' : ''}>
          <span class="switch-slider"></span>
        </label>
      </div>
    `;
  }).join('');
  c.querySelectorAll('[data-section-toggle]').forEach(input => {
    input.onchange = (e) => toggleSection(input.dataset.sectionToggle, e.target.checked);
  });
}

function equalizeCardHeights(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const cards = Array.from(container.children);
  if (cards.length === 0) return;
  for (const card of cards) {
    card.style.minHeight = '';
  }
  let max = 0;
  for (const card of cards) {
    const h = card.getBoundingClientRect().height;
    if (h > max) max = h;
  }
  if (max > 0) {
    for (const card of cards) {
      card.style.minHeight = max + 'px';
    }
  }
}

function reloadExternalConfig(preserveLocal = false) {
  if (!preserveLocal) {
    localStorage.removeItem('atuel_tutorials');
    localStorage.removeItem('atuel_avisos');
    localStorage.removeItem('atuel_custom_checklist');
  }
  const oldScript = document.querySelector('script[data-atuel-config]');
  if (oldScript) oldScript.remove();
  delete window.ATUEL_CONFIG;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'config.js?t=' + Date.now();
    script.dataset.atuelConfig = '1';
    script.onload = () => {
      try { localStorage.setItem('atuel_config_loaded_at', new Date().toISOString()); } catch (e) {}
      resolve();
    };
    script.onerror = () => reject(new Error('No se pudo cargar config.js'));
    document.head.appendChild(script);
  });
}

function showConfigModal() {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  const cfg = window.ATUEL_CONFIG || {};
  const loadedAt = localStorage.getItem('atuel_config_loaded_at') || 'nunca';
  const source = window.ATUEL_CONFIG ? 'config.js ✓' : '❌ NO CARGADO (usando defaults)';

  const data = {
    shortcuts: cfg.shortcuts || SHORTCUTS,
    providers: cfg.providers || PROVIDERS,
    avisos: cfg.avisos || DEFAULT_AVISOS,
    checklist: cfg.checklist || DEFAULT_CHECKLIST,
    tutorials: cfg.tutorials || DEFAULT_TUTORIALS,
  };

  const summary = {
    'Atajos': (data.shortcuts || []).length,
    'Proveedores': (data.providers || []).length,
    'Avisos': (data.avisos || []).length,
    'Checklist': (data.checklist || []).length,
    'Tutoriales': (data.tutorials || []).length,
  };

  content.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">📋 Configuración externa</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="card" style="margin-bottom: 16px; padding: 14px 18px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <div style="font-weight: 600; font-size: 0.95rem;">Fuente: <span class="summary-tag ${window.ATUEL_CONFIG ? 'success' : 'danger'}">${source}</span></div>
          <div style="color: var(--text-muted); font-size: 0.8rem; margin-top: 4px;">Última recarga: ${loadedAt}</div>
        </div>
      </div>
    </div>
    <div class="cards-grid" style="margin-bottom: 16px;">
      ${Object.entries(summary).map(([k, v]) => `
        <div class="card" style="padding: 14px;">
          <div style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700;">${k}</div>
          <div style="font-family: 'Quicksand', sans-serif; font-size: 1.6rem; font-weight: 700; margin-top: 4px;">${v}</div>
        </div>
      `).join('')}
    </div>
    <h4 style="margin-bottom: 8px; font-size: 0.9rem; color: var(--text-secondary);">Vista JSON (primeros 500 chars)</h4>
    <div class="code-block" style="max-height: 200px;">${escapeHtml(JSON.stringify(data, null, 2).substring(0, 500))}${JSON.stringify(data, null, 2).length > 500 ? '\n...' : ''}</div>
    <div class="btn-group">
      <button class="btn btn-accent" onclick="copyConfigJson()">📋 Copiar JSON completo</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cerrar</button>
    </div>
  `;
  modal.classList.remove('hidden');
  window.__fullConfigJson = JSON.stringify(data, null, 2);
}

function copyConfigJson() {
  const text = window.__fullConfigJson || '';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = event.target;
      const orig = btn.textContent;
      btn.textContent = '✓ ¡Copiado!';
      setTimeout(() => btn.textContent = orig, 2000);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
    });
  }
}

let currentTheme = localStorage.getItem('atuel_theme') || 'dark';
let currentStyle = localStorage.getItem('atuel_style') || 'cozy';
let currentTopicFilter = 'all';
let editMode = false;
let currentEditingTutorial = null;

function applyTheme(theme) {
  currentTheme = theme;
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('atuel_theme', theme);
  const btn = document.getElementById('btnToggleTheme');
  if (btn) btn.textContent = theme === 'light' ? '☀️' : '🌙';
  const sw = document.getElementById('themeSwitch');
  if (sw) sw.checked = theme === 'dark';
}

function applyStyle(style) {
  currentStyle = style;
  if (style === 'vercel') {
    document.documentElement.setAttribute('data-style', 'vercel');
  } else {
    document.documentElement.removeAttribute('data-style');
  }
  localStorage.setItem('atuel_style', style);
  const sw = document.getElementById('styleSwitch');
  if (sw) sw.checked = style === 'vercel';
}

function applyAppearance() {
  applyTheme(currentTheme);
  applyStyle(currentStyle);
}

function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function toggleStyle() {
  applyStyle(currentStyle === 'vercel' ? 'cozy' : 'vercel');
}

function navigate(target) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(target)?.classList.remove('hidden');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.target === target));
  document.querySelectorAll('.bottom-nav-item').forEach(n => n.classList.toggle('active', n.dataset.target === target));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeQuickAdd();
}

function getTutorials() {
  return STORAGE.get('atuel_tutorials', null) || DEFAULT_TUTORIALS;
}

function saveTutorials(tutorials) {
  STORAGE.set('atuel_tutorials', tutorials);
}

function getAvisos() {
  return STORAGE.get('atuel_avisos', DEFAULT_AVISOS);
}

function saveAvisos(avisos) {
  STORAGE.set('atuel_avisos', avisos);
}

function getChecklistState() {
  return STORAGE.get('atuel_checklist_state', {});
}

function setChecklistState(state) {
  STORAGE.set('atuel_checklist_state', state);
}

function getCustomChecklist() {
  return STORAGE.get('atuel_custom_checklist', null);
}

function saveCustomChecklist(list) {
  if (list) STORAGE.set('atuel_custom_checklist', list);
  else localStorage.removeItem('atuel_custom_checklist');
}

function getCurrentChecklist() {
  return getCustomChecklist() || DEFAULT_CHECKLIST;
}

function renderSummary() {
  const grid = document.getElementById('summaryGrid');
  if (!grid) return;
  const tutorials = getTutorials();
  const avisos = getAvisos().sort((a, b) => b.date.localeCompare(a.date));
  const checklist = getCurrentChecklist();
  const state = getChecklistState();
  const doneCheck = checklist.filter(c => state[c.id]).length;
  const readyProviders = PROVIDERS.filter(p => p.status === 'ready').length;
  const staleProviders = PROVIDERS.filter(p => p.daysAgo > 15).length;
  const today = new Date();

  function fmtDate(d) {
    return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function dateFromDaysAgo(days) {
    const d = new Date(today);
    d.setDate(d.getDate() - days);
    return d;
  }

  const cards = [];

  if (isSectionEnabled('proveedores')) {
    const providerTags = PROVIDERS.map(p => {
      const cls = p.status === 'ready' ? 'success' : p.status === 'partial' ? 'warning' : 'danger';
      const statusText = p.status === 'ready' ? '✓' : p.status === 'partial' ? '◐' : '✕';
      const dateStr = fmtDate(dateFromDaysAgo(p.daysAgo));
      return `<span class="summary-tag ${cls}">${statusText} ${escapeHtml(p.name)} · ${dateStr}</span>`;
    }).join('');
    cards.push(`
      <div class="summary-card-h ${staleProviders > 0 ? 'warning' : 'success'}" onclick="navigate('proveedores')">
        <div class="summary-card-h-icon">📦</div>
        <div class="summary-card-h-body">
          <div class="summary-card-h-title">Proveedores <span class="summary-tag ${staleProviders > 0 ? 'warning' : 'success'}">${readyProviders}/${PROVIDERS.length} listos</span></div>
          <div class="summary-card-h-value">${staleProviders > 0 ? `${staleProviders} con listas desactualizadas (+15 días)` : 'Todas las listas actualizadas'}</div>
          <div class="summary-card-h-details">${providerTags}</div>
        </div>
        <div class="summary-card-h-arrow">→</div>
      </div>
    `);
  }

  if (isSectionEnabled('tutoriales')) {
    const tutorialTags = tutorials.slice(0, 4).map(t =>
      `<span class="summary-tag neutral">${t.icon || '📚'} ${escapeHtml(t.title)}</span>`
    ).join('');
    const moreCount = tutorials.length - 4;
    const moreTag = moreCount > 0 ? `<span class="summary-tag neutral">+${moreCount} más</span>` : '';
    cards.push(`
      <div class="summary-card-h" onclick="navigate('tutoriales')">
        <div class="summary-card-h-icon">📚</div>
        <div class="summary-card-h-body">
          <div class="summary-card-h-title">Tutoriales <span class="summary-tag neutral">${tutorials.length} disponibles</span></div>
          <div class="summary-card-h-value">Guías paso a paso para usar el sistema: carga de stock, búsqueda de clientes, cierres, etc.</div>
          <div class="summary-card-h-details">${tutorialTags}${moreTag}</div>
        </div>
        <div class="summary-card-h-arrow">→</div>
      </div>
    `);
  }

  if (isSectionEnabled('avisos')) {
    const latestAvisos = avisos.slice(0, 3);
    const avisoTags = latestAvisos.map(a => {
      const cls = a.priority === 'high' ? 'danger' : a.priority === 'med' ? 'warning' : 'neutral';
      const dateStr = fmtDate(new Date(a.date + 'T00:00:00'));
      return `<span class="summary-tag ${cls}">📢 ${escapeHtml(a.title)} · ${dateStr}</span>`;
    }).join('');
    const moreCount = avisos.length - 3;
    const moreTag = moreCount > 0 ? `<span class="summary-tag neutral">+${moreCount} más</span>` : '';
    cards.push(`
      <div class="summary-card-h ${avisos.length > 0 ? '' : ''}" onclick="navigate('avisos')">
        <div class="summary-card-h-icon">📢</div>
        <div class="summary-card-h-body">
          <div class="summary-card-h-title">Avisos <span class="summary-tag neutral">${avisos.length} ${avisos.length === 1 ? 'activo' : 'activos'}</span></div>
          <div class="summary-card-h-value">Comunicados importantes del equipo: mantenimiento, cambios de horario, recordatorios.</div>
          <div class="summary-card-h-details">${avisoTags || '<span class="summary-tag neutral">No hay avisos pendientes</span>'}${moreTag}</div>
        </div>
        <div class="summary-card-h-arrow">→</div>
      </div>
    `);
  }

  if (isSectionEnabled('checklist')) {
    cards.push(`
      <div class="summary-card-h ${doneCheck === checklist.length && checklist.length > 0 ? 'success' : doneCheck > 0 ? 'warning' : ''}" onclick="navigate('checklist')">
        <div class="summary-card-h-icon">✅</div>
        <div class="summary-card-h-body">
          <div class="summary-card-h-title">Checklist diario <span class="summary-tag ${doneCheck === checklist.length && checklist.length > 0 ? 'success' : 'warning'}">${doneCheck}/${checklist.length} completas</span></div>
          <div class="summary-card-h-value">${doneCheck === checklist.length && checklist.length > 0 ? '¡Todas las tareas completadas! 🎉' : doneCheck === 0 ? 'Aún no empezaste las tareas del día' : `Te quedan ${checklist.length - doneCheck} tareas pendientes`}</div>
          <div class="summary-card-h-details">${checklist.slice(0, 3).map(c => `<span class="summary-tag ${state[c.id] ? 'success' : 'neutral'}">${state[c.id] ? '✓' : '○'} ${escapeHtml(c.text.substring(0, 30))}${c.text.length > 30 ? '...' : ''}</span>`).join('')}</div>
        </div>
        <div class="summary-card-h-arrow">→</div>
      </div>
    `);
  }

  if (isSectionEnabled('atajos')) {
    const categoryCount = new Set(SHORTCUTS.map(s => s.category)).size;
    cards.push(`
      <div class="summary-card-h" onclick="navigate('atajos')">
        <div class="summary-card-h-icon">⌨️</div>
        <div class="summary-card-h-body">
          <div class="summary-card-h-title">Atajos del sistema <span class="summary-tag neutral">${SHORTCUTS.length} atajos</span></div>
          <div class="summary-card-h-value">Accesos rápidos de teclado agrupados en ${categoryCount} categorías: ventas, stock, clientes y más.</div>
          <div class="summary-card-h-details">${[...new Set(SHORTCUTS.map(s => s.category))].slice(0, 4).map(c => `<span class="summary-tag neutral">${c}</span>`).join('')}</div>
        </div>
        <div class="summary-card-h-arrow">→</div>
      </div>
    `);
  }

  grid.innerHTML = cards.join('');
}

function renderShortcuts() {
  const c = document.getElementById('shortcutsContainer');
  if (!c) return;

  const categories = [...new Set(SHORTCUTS.map(s => s.category))];
  c.innerHTML = categories.map(cat => {
    const items = SHORTCUTS.filter(s => s.category === cat);
    return `
      <h3 style="margin: 20px 0 12px; font-size: 1.05rem; color: var(--text-secondary); text-transform: capitalize;">${cat}</h3>
      <div class="cards-grid">
        ${items.map(s => `
          <div class="shortcut-card">
            <div class="shortcut-key">${s.key}</div>
            <div class="shortcut-info">
              <div class="shortcut-title">${s.title}</div>
              <div class="shortcut-desc">${s.desc}</div>
            </div>
            <span class="shortcut-category">${s.category}</span>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
}

function indicatorColor(days) {
  if (days < 7) return 'green';
  if (days < 15) return 'yellow';
  if (days < 30) return 'orange';
  return 'red';
}

function indicatorLabel(days) {
  if (days < 7) return 'OK';
  if (days < 15) return '7d';
  if (days < 30) return '15d';
  return '30d+';
}

function indicatorPercent(days) {
  return Math.min(days / 30, 1);
}

function renderProviders() {
  const c = document.getElementById('providersContainer');
  if (!c) return;

  c.innerHTML = PROVIDERS.map(p => {
    const statusMap = {
      'ready': { label: 'Ready', cls: 'ready' },
      'partial': { label: 'Parcial', cls: 'partial' },
      'not-impl': { label: 'No Implementada', cls: 'not-impl' }
    };
    const s = statusMap[p.status];
    const initial = p.name.charAt(0).toUpperCase();
    const ringColor = indicatorColor(p.daysAgo);
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const pct = indicatorPercent(p.daysAgo);
    const offset = circumference * (1 - pct);
    const dateText = p.daysAgo === 0 ? 'hoy' :
                     p.daysAgo === 1 ? 'hace 1 día' :
                     `hace ${p.daysAgo} días`;

    return `
      <div class="provider-card">
        <div class="provider-info">
          <div class="provider-avatar">${initial}</div>
          <div style="min-width: 0;">
            <div class="provider-name">${p.name}</div>
            <div class="provider-meta">
              <span class="status-badge ${s.cls}">
                <span class="status-dot"></span>
                ${s.label}
              </span>
              <span class="provider-date">${dateText}</span>
            </div>
          </div>
        </div>
        <div class="indicator-ring" title="${p.daysAgo} días desde la última actualización">
          <svg width="48" height="48">
            <circle class="ring-bg" cx="24" cy="24" r="${radius}"></circle>
            <circle class="ring-fg ${ringColor}" cx="24" cy="24" r="${radius}"
                    style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};"></circle>
          </svg>
          <div class="indicator-label">${indicatorLabel(p.daysAgo)}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderEditBanner() {
  const c = document.getElementById('editBannerContainer');
  if (!c) return;
  if (editMode) {
    c.innerHTML = `
      <div class="edit-banner">
        <span>✏️ Modo edición activo. Modificá o eliminá tutoriales desde sus tarjetas.</span>
        <button class="btn btn-accent" style="padding: 6px 12px; font-size: 0.8rem;" onclick="openTutorialEditor()">+ Nuevo tutorial</button>
      </div>
    `;
  } else {
    c.innerHTML = '';
  }
}

function renderTopicChips() {
  const c = document.getElementById('topicChips');
  if (!c) return;
  const tutorials = getTutorials();
  const topics = ['all', ...new Set(tutorials.map(t => t.topic))];
  c.innerHTML = topics.map(t =>
    `<button class="chip ${currentTopicFilter === t ? 'active' : ''}" data-topic="${t}">${t === 'all' ? 'Todos' : t}</button>`
  ).join('');
  c.querySelectorAll('.chip').forEach(ch => {
    ch.onclick = () => {
      currentTopicFilter = ch.dataset.topic;
      renderTopicChips();
      renderTutorials();
    };
  });
}

function renderTutorials() {
  renderEditBanner();
  const c = document.getElementById('tutorialsContainer');
  if (!c) return;
  const tutorials = getTutorials();
  const filtered = currentTopicFilter === 'all' ? tutorials : tutorials.filter(t => t.topic === currentTopicFilter);

  if (filtered.length === 0) {
    c.innerHTML = `<div class="card" style="text-align: center; padding: 40px; color: var(--text-muted);">No hay tutoriales en este tema todavía.</div>`;
    return;
  }

  c.innerHTML = filtered.map(t => `
    <div class="tutorial-card" data-id="${t.id}">
      <button class="card-edit-btn" onclick="event.stopPropagation(); openTutorialEditor('${t.id}')" title="Editar">✏️</button>
      <button class="card-delete-btn" onclick="event.stopPropagation(); deleteTutorial('${t.id}')" title="Eliminar">🗑</button>
      <div class="tutorial-thumb">${t.icon || '📚'}</div>
      <div class="tutorial-topic">${t.topic}</div>
      <div class="tutorial-title">${t.title}</div>
      <div class="tutorial-meta">📑 ${t.parts.length} ${t.parts.length === 1 ? 'parte' : 'partes'}</div>
      <div class="tutorial-actions">
        <button class="tutorial-btn primary" onclick="openTutorial('${t.id}')">Ver tutorial</button>
        <button class="tutorial-btn" onclick="openTutorialFocus('${t.id}')">Modo enfoque</button>
      </div>
    </div>
  `).join('');
}

function openTutorial(id) {
  const t = getTutorials().find(x => x.id === id);
  if (!t) return;

  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  let currentPart = 0;

  function render() {
    const part = t.parts[currentPart];
    content.innerHTML = `
      <div class="modal-header">
        <div>
          <div class="tutorial-topic" style="margin-bottom: 4px;">${t.topic} · ${t.icon || '📚'}</div>
          <div class="modal-title">${t.title}</div>
        </div>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div class="tutorial-content">
        <h3>Parte ${currentPart + 1} de ${t.parts.length}: ${part.title}</h3>
        ${part.content}
      </div>
      <div class="tutorial-nav">
        <button class="btn btn-secondary" onclick="window.__navPart(${currentPart - 1})" ${currentPart === 0 ? 'disabled' : ''}>← Anterior</button>
        <span style="color: var(--text-muted); font-size: 0.85rem;">${currentPart + 1} / ${t.parts.length}</span>
        <button class="btn btn-accent" onclick="window.__navPart(${currentPart + 1})" ${currentPart === t.parts.length - 1 ? 'disabled' : ''}>Siguiente →</button>
      </div>
    `;
  }

  window.__navPart = (idx) => {
    if (idx >= 0 && idx < t.parts.length) {
      currentPart = idx;
      render();
    }
  };

  render();
  modal.classList.remove('hidden');
}

function openTutorialFocus(id) {
  const t = getTutorials().find(x => x.id === id);
  if (!t) return;

  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <div class="modal-header" style="border-bottom: 1px solid var(--border); padding-bottom: 16px; margin-bottom: 0;">
      <div>
        <div class="tutorial-topic" style="margin-bottom: 4px;">📖 ${t.topic} · ${t.icon || '📚'}</div>
        <div class="modal-title">${t.title}</div>
        ${t.description ? `<div style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 6px; line-height: 1.5;">${escapeHtml(t.description)}</div>` : ''}
      </div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="focus-layout">
      <aside class="focus-toc">
        <div class="focus-toc-sticky">
          <h4 class="focus-toc-title">Contenido</h4>
          <nav class="focus-toc-nav">
            ${t.parts.map((p, i) => `
              <a href="#focus-part-${i}" class="focus-toc-link" data-part="${i}">
                <span class="focus-toc-num">${i + 1}</span>
                <span class="focus-toc-text">${escapeHtml(p.title)}</span>
              </a>
            `).join('')}
          </nav>
        </div>
      </aside>
      <div class="focus-content">
        ${t.parts.map((p, i) => `
          <article id="focus-part-${i}" class="focus-section">
            <div class="focus-section-header">
              <span class="focus-section-num">${i + 1}</span>
              <h3 class="focus-section-title">${escapeHtml(p.title)}</h3>
            </div>
            <div class="tutorial-content">${p.content}</div>
          </article>
        `).join('')}
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('modal-focus');

  const tocLinks = content.querySelectorAll('.focus-toc-link');
  const sections = content.querySelectorAll('.focus-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = entry.target.id.replace('focus-part-', '');
        tocLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.part === idx);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));

  const origClose = window.closeModal;
  window.closeModal = function() {
    observer.disconnect();
    modal.classList.remove('modal-focus');
    window.closeModal = origClose;
    document.getElementById('modal').classList.add('hidden');
  };
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  currentEditingTutorial = null;
}

function renderAvisos() {
  const c = document.getElementById('avisosContainer');
  if (!c) return;
  const avisos = getAvisos().sort((a, b) => b.date.localeCompare(a.date));

  if (avisos.length === 0) {
    c.innerHTML = `<div class="card" style="text-align: center; padding: 40px; color: var(--text-muted);">No hay avisos. ¡Todo tranquilo! 🎉</div>`;
    return;
  }

  c.innerHTML = avisos.map(a => {
    const dateObj = new Date(a.date + 'T00:00:00');
    const date = dateObj.toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });
    return `
      <div class="aviso-card priority-${a.priority}">
        <div class="aviso-header">
          <div class="aviso-title">${escapeHtml(a.title)}</div>
          <div class="aviso-date">${date}</div>
        </div>
        <div class="aviso-body">${escapeHtml(a.body)}</div>
      </div>
    `;
  }).join('');
}

function openAvisoEditor(existing = null) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  const data = existing || { title: '', body: '', priority: 'med' };

  content.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">${existing ? '✏️ Editar' : '+ Nuevo'} aviso</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="form-group">
      <label class="form-label">Título</label>
      <input class="form-input" id="avisoTitle" placeholder="Ej: Sistema en mantenimiento" value="${escapeHtml(data.title)}">
    </div>
    <div class="form-group">
      <label class="form-label">Cuerpo del aviso</label>
      <textarea class="form-textarea" id="avisoBody" placeholder="Detalles...">${escapeHtml(data.body)}</textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Prioridad</label>
      <select class="form-select" id="avisoPriority">
        <option value="low" ${data.priority === 'low' ? 'selected' : ''}>Baja (informativo)</option>
        <option value="med" ${data.priority === 'med' ? 'selected' : ''}>Media (recordatorio)</option>
        <option value="high" ${data.priority === 'high' ? 'selected' : ''}>Alta (urgente)</option>
      </select>
    </div>
    <div class="btn-group">
      <button class="btn btn-accent" onclick="saveAviso(${existing ? "'" + existing.id + "'" : 'null'})">Guardar aviso</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    </div>
  `;
  modal.classList.remove('hidden');
  setTimeout(() => document.getElementById('avisoTitle')?.focus(), 100);
}

function saveAviso(id) {
  const title = document.getElementById('avisoTitle').value.trim();
  const body = document.getElementById('avisoBody').value.trim();
  const priority = document.getElementById('avisoPriority').value;
  if (!title || !body) {
    alert('Completá título y cuerpo del aviso.');
    return;
  }
  const avisos = getAvisos();
  if (id) {
    const idx = avisos.findIndex(a => a.id === id);
    if (idx >= 0) {
      avisos[idx] = { ...avisos[idx], title, body, priority };
    }
  } else {
    const today = new Date().toISOString().split('T')[0];
    avisos.push({ id: 'aviso-' + Date.now(), title, body, priority, date: today });
  }
  saveAvisos(avisos);
  closeModal();
  renderAvisos();
  renderSummary();
}

function deleteAviso(id) {
  if (!confirm('¿Eliminar este aviso?')) return;
  const avisos = getAvisos().filter(a => a.id !== id);
  saveAvisos(avisos);
  renderAvisos();
  renderSummary();
}

function renderChecklist() {
  const c = document.getElementById('checklistContainer');
  if (!c) return;
  const items = getCurrentChecklist();
  const state = getChecklistState();
  c.innerHTML = items.map(item => `
    <div class="checklist-item ${state[item.id] ? 'checked' : ''}" data-id="${item.id}">
      <div class="checklist-check">${state[item.id] ? '✓' : ''}</div>
      <div class="checklist-text">${escapeHtml(item.text)}</div>
    </div>
  `).join('');
  c.querySelectorAll('.checklist-item').forEach(item => {
    item.onclick = () => {
      const id = item.dataset.id;
      const s = getChecklistState();
      s[id] = !s[id];
      setChecklistState(s);
      renderChecklist();
      renderSummary();
    };
  });
}

function openTutorialEditor(existingId = null) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');

  let initial;
  if (existingId) {
    const t = getTutorials().find(x => x.id === existingId);
    if (!t) return;
    initial = JSON.parse(JSON.stringify(t));
  } else {
    initial = {
      id: 'tut-' + Date.now(),
      title: '',
      description: '',
      topic: 'General',
      icon: '📘',
      parts: [{ title: 'Introducción', content: '<p>Acá va el contenido de la primera parte.</p>' }]
    };
  }

  currentEditingTutorial = initial;

  function render() {
    const t = currentEditingTutorial;
    content.innerHTML = `
      <div class="modal-header">
        <div class="modal-title">${existingId ? '✏️ Editar' : '+ Nuevo'} tutorial</div>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr 80px; gap: 12px;">
        <div class="form-group">
          <label class="form-label">Título</label>
          <input class="form-input" id="editTitle" value="${escapeHtml(t.title)}" placeholder="Ej: Cargar producto al inventario">
        </div>
        <div class="form-group">
          <label class="form-label">Tema</label>
          <input class="form-input" id="editTopic" value="${escapeHtml(t.topic)}" placeholder="Stock, Ventas, Clientes...">
        </div>
        <div class="form-group">
          <label class="form-label">Ícono</label>
          <input class="form-input" id="editIcon" value="${escapeHtml(t.icon || '')}" maxlength="3" placeholder="📦">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Descripción corta (opcional)</label>
        <input class="form-input" id="editDescription" value="${escapeHtml(t.description || '')}" placeholder="Resumen breve que aparece en la tarjeta del resumen y en el modo enfoque">
      </div>

      <h4 style="margin: 20px 0 12px; font-size: 1rem;">Partes del tutorial</h4>
      <div id="partsList">
        ${t.parts.map((p, i) => `
          <div class="card" style="margin-bottom: 12px; padding: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <strong style="font-size: 0.9rem;">Parte ${i + 1}</strong>
              ${t.parts.length > 1 ? `<button class="btn btn-danger" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.__removePart(${i})">Eliminar</button>` : ''}
            </div>
            <div class="form-group" style="margin-bottom: 10px;">
              <label class="form-label">Título de la parte</label>
              <input class="form-input" data-part-title="${i}" value="${escapeHtml(p.title)}" placeholder="Ej: Paso 1: Abrir módulo">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Contenido (HTML enriquecido)</label>
              <div class="editor-toolbar">
                <button class="toolbar-btn" onclick="window.__wrapText(${i}, 'strong')" title="Negrita"><strong>B</strong></button>
                <button class="toolbar-btn" onclick="window.__wrapText(${i}, 'em')" title="Cursiva"><em>I</em></button>
                <button class="toolbar-btn" onclick="window.__wrapText(${i}, 'hl')" title="Resaltar">Resaltar</button>
                <button class="toolbar-btn" onclick="window.__insertCallout(${i})" title="Tip destacado">💡 Callout</button>
                <button class="toolbar-btn" onclick="window.__insertSteps(${i})" title="Lista numerada">📋 Lista</button>
                <button class="toolbar-btn" onclick="window.__insertCode(${i})" title="Código">&lt;/&gt;</button>
                <button class="toolbar-btn" onclick="window.__insertImage(${i})" title="Insertar imagen desde /material">🖼 Imagen</button>
              </div>
              <textarea class="form-textarea" data-part-content="${i}" rows="6" placeholder="Escribí el contenido en HTML. Usá las clases .hl para resaltar, <strong> para negrita, <em> para cursiva, .callout para tips, ol.steps para pasos numerados.">${escapeHtml(p.content)}</textarea>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="btn-group">
        <button class="btn btn-secondary" onclick="window.__addPart()">+ Agregar parte</button>
      </div>

      <div class="btn-group">
        <button class="btn btn-accent" onclick="window.__saveTutorial()">Guardar tutorial</button>
        <button class="btn btn-secondary" onclick="window.__exportCurrent()">📋 Exportar código</button>
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
      </div>
    `;

    content.querySelectorAll('[data-part-title]').forEach(input => {
      input.oninput = () => {
        const idx = parseInt(input.dataset.partTitle);
        currentEditingTutorial.parts[idx].title = input.value;
      };
    });
    content.querySelectorAll('[data-part-content]').forEach(input => {
      input.oninput = () => {
        const idx = parseInt(input.dataset.partContent);
        currentEditingTutorial.parts[idx].content = input.value;
      };
    });
    document.getElementById('editTitle').oninput = (e) => currentEditingTutorial.title = e.target.value;
    document.getElementById('editTopic').oninput = (e) => currentEditingTutorial.topic = e.target.value;
    document.getElementById('editIcon').oninput = (e) => currentEditingTutorial.icon = e.target.value;
    const descInput = document.getElementById('editDescription');
    if (descInput) descInput.oninput = (e) => currentEditingTutorial.description = e.target.value;
  }

  window.__addPart = () => {
    currentEditingTutorial.parts.push({ title: 'Nueva parte', content: '<p>Contenido...</p>' });
    render();
  };

  window.__removePart = (idx) => {
    if (currentEditingTutorial.parts.length <= 1) return;
    currentEditingTutorial.parts.splice(idx, 1);
    render();
  };

  window.__wrapText = (idx, tag) => {
    const textarea = document.querySelector(`[data-part-content="${idx}"]`);
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    if (!selected) {
      alert('Seleccioná primero el texto que querés formatear.');
      return;
    }
    const openTag = tag === 'hl' ? '<span class="hl">' : `<${tag}>`;
    const closeTag = tag === 'hl' ? '</span>' : `</${tag}>`;
    textarea.value = text.substring(0, start) + openTag + selected + closeTag + text.substring(end);
    currentEditingTutorial.parts[idx].content = textarea.value;
    textarea.focus();
  };

  window.__insertCallout = (idx) => {
    const textarea = document.querySelector(`[data-part-content="${idx}"]`);
    if (!textarea) return;
    const callout = `\n<p class="callout">💡 <em>Tip:</em> Tu consejo importante acá.</p>\n`;
    textarea.value = textarea.value + callout;
    currentEditingTutorial.parts[idx].content = textarea.value;
  };

  window.__insertSteps = (idx) => {
    const textarea = document.querySelector(`[data-part-content="${idx}"]`);
    if (!textarea) return;
    const steps = `\n<ol class="steps">\n  <li>Primer paso</li>\n  <li>Segundo paso</li>\n  <li>Tercer paso</li>\n</ol>\n`;
    textarea.value = textarea.value + steps;
    currentEditingTutorial.parts[idx].content = textarea.value;
  };

  window.__insertCode = (idx) => {
    const textarea = document.querySelector(`[data-part-content="${idx}"]`);
    if (!textarea) return;
    const code = `\n<p>Usá el atajo <code>F2</code> para buscar productos.</p>\n`;
    textarea.value = textarea.value + code;
    currentEditingTutorial.parts[idx].content = textarea.value;
  };

  window.__insertImage = (idx) => {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modalContent');
    content.innerHTML = `
      <div class="modal-header">
        <div class="modal-title">🖼 Insertar imagen</div>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 16px;">
        Las imágenes deben estar guardadas en la carpeta <code>material/</code> del proyecto.
        Escribí solo el nombre del archivo (ej: <code>cargar-producto-paso1.png</code>).
      </p>
      <div class="form-group">
        <label class="form-label">Ruta del archivo</label>
        <input class="form-input" id="imgPath" placeholder="material/cargar-producto-paso1.png" value="material/">
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 6px;">
          💡 También podés organizar en subcarpetas: <code>material/stock/paso1.png</code>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Descripción (alt) - opcional pero recomendado</label>
        <input class="form-input" id="imgAlt" placeholder="Ej: Pantalla de Stock con el botón Nuevo">
      </div>
      <div class="form-group">
        <label class="form-label">Pie de imagen (caption) - opcional</label>
        <input class="form-input" id="imgCaption" placeholder="Ej: Click en el botón + Nuevo producto">
      </div>
      <div id="imgPreviewWrap" style="margin: 12px 0;"></div>
      <div class="btn-group">
        <button class="btn btn-accent" onclick="window.__confirmInsertImage(${idx})">Insertar</button>
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
      </div>
    `;
    modal.classList.remove('hidden');

    const pathInput = document.getElementById('imgPath');
    const previewWrap = document.getElementById('imgPreviewWrap');
    function updatePreview() {
      const src = pathInput.value.trim();
      if (!src) { previewWrap.innerHTML = ''; return; }
      previewWrap.innerHTML = `
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 6px;">Vista previa:</div>
        <img src="${escapeHtml(src)}" alt="preview" style="max-width: 100%; max-height: 200px; border-radius: 10px; border: 1px solid var(--border);" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div style="display: none; padding: 16px; background: var(--bg-secondary); border: 1px dashed var(--border-strong); border-radius: 8px; font-size: 0.82rem; color: var(--text-muted); text-align: center;">
          ⚠️ No se pudo cargar la imagen. Verificá que el archivo exista en <code>material/</code>.
        </div>
      `;
    }
    pathInput.oninput = updatePreview;
    setTimeout(updatePreview, 50);
  };

  window.__confirmInsertImage = (idx) => {
    const src = document.getElementById('imgPath').value.trim();
    const alt = document.getElementById('imgAlt').value.trim();
    const caption = document.getElementById('imgCaption').value.trim();
    if (!src) { alert('Ingresá la ruta de la imagen.'); return; }

    let tag;
    if (caption) {
      tag = `\n<figure>\n  <img src="${src}" alt="${escapeHtml(alt)}" class="tutorial-img">\n  <figcaption>${escapeHtml(caption)}</figcaption>\n</figure>\n`;
    } else {
      tag = `\n<img src="${src}" alt="${escapeHtml(alt)}" class="tutorial-img">\n`;
    }

    const textarea = document.querySelector(`[data-part-content="${idx}"]`);
    if (textarea) {
      textarea.value = textarea.value + tag;
      currentEditingTutorial.parts[idx].content = textarea.value;
    }
    openTutorialEditor(currentEditingTutorial.id);
  };

  window.__saveTutorial = () => {
    if (!currentEditingTutorial.title.trim()) {
      alert('Poné un título al tutorial.');
      return;
    }
    const tutorials = getTutorials();
    const idx = tutorials.findIndex(t => t.id === currentEditingTutorial.id);
    if (idx >= 0) {
      tutorials[idx] = currentEditingTutorial;
    } else {
      tutorials.push(currentEditingTutorial);
    }
    saveTutorials(tutorials);
    closeModal();
    renderTutorials();
    renderTopicChips();
    renderSummary();
  };

  window.__exportCurrent = () => {
    showExportModal([currentEditingTutorial]);
  };

  render();
  modal.classList.remove('hidden');
}

function deleteTutorial(id) {
  if (!confirm('¿Eliminar este tutorial? Esta acción no se puede deshacer.')) return;
  const tutorials = getTutorials().filter(t => t.id !== id);
  saveTutorials(tutorials);
  renderTutorials();
  renderTopicChips();
  renderSummary();
}

function showExportModal(tutorials) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');

  const code = tutorials.map(t => JSON.stringify(t, null, 2)).join(',\n');
  const fullCode = `[\n${code}\n]`;

  content.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">📋 Exportar tutoriales</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <p style="color: var(--text-secondary); margin-bottom: 12px; font-size: 0.9rem; line-height: 1.5;">
      Copiá este JSON y pegalo en el array <code>DEFAULT_TUTORIALS</code> del archivo <code>script.js</code> para que estos tutoriales queden fijos en la intranet.
    </p>
    <div class="code-block" id="exportCode">${escapeHtml(fullCode)}</div>
    <div class="btn-group">
      <button class="btn btn-accent" onclick="copyExport()">📋 Copiar al portapapeles</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cerrar</button>
    </div>
  `;
  modal.classList.remove('hidden');
}

function copyExport() {
  const code = document.getElementById('exportCode').textContent;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => {
      const btn = event.target;
      const orig = btn.textContent;
      btn.textContent = '✓ ¡Copiado!';
      setTimeout(() => btn.textContent = orig, 2000);
    }).catch(() => fallbackCopy(code));
  } else {
    fallbackCopy(code);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(ta);
}

function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function toggleQuickAdd() {
  const menu = document.getElementById('quickAddMenu');
  menu.classList.toggle('hidden');
}

function closeQuickAdd() {
  const menu = document.getElementById('quickAddMenu');
  if (menu) menu.classList.add('hidden');
}

function init() {
  applyAppearance();
  updateClock();
  setInterval(updateClock, 30000);

  document.querySelectorAll('[data-target]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.target));
  });

  document.getElementById('btnToggleTheme').onclick = toggleTheme;

  const themeSwitch = document.getElementById('themeSwitch');
  themeSwitch.checked = currentTheme === 'dark';
  themeSwitch.onchange = (e) => applyTheme(e.target.checked ? 'dark' : 'light');

  const styleSwitch = document.getElementById('styleSwitch');
  if (styleSwitch) {
    styleSwitch.checked = currentStyle === 'vercel';
    styleSwitch.onchange = (e) => applyStyle(e.target.checked ? 'vercel' : 'cozy');
  }

  const reloadSwitch = document.getElementById('reloadSwitch');
  reloadSwitch.checked = localStorage.getItem('atuel_reload_enabled') !== 'false';
  reloadSwitch.onchange = (e) => {
    localStorage.setItem('atuel_reload_enabled', e.target.checked);
    if (e.target.checked) {
      localStorage.setItem('atuel_last_hard_reload', Date.now().toString());
    }
  };

  const editSwitch = document.getElementById('editSwitch');
  editSwitch.onchange = (e) => {
    editMode = e.target.checked;
    document.body.classList.toggle('edit-mode', editMode);
    renderTutorials();
  };

  document.getElementById('btnQuickAdd').onclick = (e) => {
    e.stopPropagation();
    toggleQuickAdd();
  };

  document.querySelectorAll('.quick-add-item').forEach(item => {
    item.onclick = () => {
      const action = item.dataset.action;
      closeQuickAdd();
      if (action === 'aviso') {
        openAvisoEditor();
      } else if (action === 'tutorial') {
        if (document.getElementById('tutoriales').classList.contains('hidden')) {
          navigate('tutoriales');
        }
        editMode = true;
        document.body.classList.add('edit-mode');
        editSwitch.checked = true;
        openTutorialEditor();
      } else if (action === 'check') {
        navigate('checklist');
        const text = prompt('Texto de la nueva tarea:');
        if (text && text.trim()) {
          const list = getCurrentChecklist();
          list.push({ id: 'ck-' + Date.now(), text: text.trim() });
          saveCustomChecklist(list);
          renderChecklist();
          renderSummary();
        }
      }
    };
  });

  document.addEventListener('click', (e) => {
    const menu = document.getElementById('quickAddMenu');
    if (menu && !menu.classList.contains('hidden') && !menu.contains(e.target) && e.target.id !== 'btnQuickAdd') {
      closeQuickAdd();
    }
  });

  document.getElementById('btnAddAviso').onclick = () => openAvisoEditor();

  document.getElementById('btnAddCheck').onclick = () => {
    const text = prompt('Texto de la nueva tarea:');
    if (text && text.trim()) {
      const list = getCurrentChecklist();
      list.push({ id: 'ck-' + Date.now(), text: text.trim() });
      saveCustomChecklist(list);
      renderChecklist();
      renderSummary();
    }
  };

  document.getElementById('btnResetCheck').onclick = () => {
    if (confirm('¿Reiniciar el checklist del día? Se marcan todas como pendientes.')) {
      setChecklistState({});
      saveCustomChecklist(null);
      renderChecklist();
      renderSummary();
    }
  };

  document.getElementById('btnNewTutorial').onclick = () => openTutorialEditor();

  document.getElementById('btnExportAll').onclick = () => showExportModal(getTutorials());

  document.getElementById('btnResetTutorials').onclick = () => {
    if (confirm('¿Restablecer todos los tutoriales a los de fábrica? Se perderán los cambios personalizados.')) {
      saveTutorials(null);
      localStorage.removeItem('atuel_tutorials');
      renderTutorials();
      renderTopicChips();
      renderSummary();
    }
  };

  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });

  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG' && e.target.classList.contains('tutorial-img')) {
      const src = e.target.getAttribute('src') || '';
      const placeholder = document.createElement('div');
      placeholder.className = 'img-placeholder';
      placeholder.innerHTML = `
        <div class="img-placeholder-icon">🖼</div>
        <div><strong>Imagen no encontrada</strong></div>
        <div style="font-family: 'Courier New', monospace; font-size: 0.8rem;">${escapeHtml(src)}</div>
        <div style="margin-top: 4px;">Guardá el archivo en la carpeta <code>material/</code></div>
      `;
      e.target.parentNode?.insertBefore(placeholder, e.target);
      e.target.style.display = 'none';
    }
  }, true);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeQuickAdd();
    }
  });

  const btnReloadConfig = document.getElementById('btnReloadConfig');
  if (btnReloadConfig) {
    btnReloadConfig.onclick = async () => {
      btnReloadConfig.disabled = true;
      const orig = btnReloadConfig.textContent;
      btnReloadConfig.textContent = '⏳ Recargando...';
      try {
        await reloadExternalConfig(false);
        reRenderAll();
        btnReloadConfig.textContent = '✓ Recargado';
        setTimeout(() => { btnReloadConfig.textContent = orig; btnReloadConfig.disabled = false; }, 2000);
      } catch (e) {
        btnReloadConfig.textContent = '✕ Error';
        setTimeout(() => { btnReloadConfig.textContent = orig; btnReloadConfig.disabled = false; }, 2000);
      }
    };
  }

  const btnViewConfig = document.getElementById('btnViewConfig');
  if (btnViewConfig) btnViewConfig.onclick = showConfigModal;

  const btnDownloadConfig = document.getElementById('btnDownloadConfig');
  if (btnDownloadConfig) {
    btnDownloadConfig.onclick = () => {
      const data = {
        shortcuts: SHORTCUTS,
        providers: PROVIDERS,
        avisos: DEFAULT_AVISOS,
        checklist: DEFAULT_CHECKLIST,
        tutorials: DEFAULT_TUTORIALS,
        branding: { name: 'Atuel Motos', tagline: 'Centro de comandos diario del local' },
        features: { cacheBustDays: 5, enableCacheBust: true, enableTutorials: true, enableChecklist: true, enableAvisos: true, enableAtajos: true, enableProveedores: true },
      };
      const code = 'window.ATUEL_CONFIG = ' + JSON.stringify(data, null, 2) + ';\n';
      const blob = new Blob([code], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'config.js';
      a.click();
      URL.revokeObjectURL(url);
    };
  }

  applySectionVisibility();
  renderSectionsToggles();
  reRenderAll();
}

function reRenderAll() {
  renderSummary();
  setTimeout(() => equalizeCardHeights('#summaryGrid'), 50);
  renderShortcuts();
  renderProviders();
  setTimeout(() => equalizeCardHeights('#providersContainer'), 50);
  renderTopicChips();
  renderTutorials();
  setTimeout(() => equalizeCardHeights('#tutorialsContainer'), 50);
  renderAvisos();
  renderChecklist();
}

function updateClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  const dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeOpts = { hour: '2-digit', minute: '2-digit' };
  el.textContent = '🕐 ' + now.toLocaleDateString('es-AR', dateOpts) + ' · ' + now.toLocaleTimeString('es-AR', timeOpts);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
