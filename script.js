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

const DEFAULT_SHORTCUTS = (window.ATUEL_CONFIG && window.ATUEL_CONFIG.shortcuts) || [
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

const DEFAULT_PROVIDERS = (window.ATUEL_CONFIG && window.ATUEL_CONFIG.providers) || [
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

const SECTION_FEATURE_KEY = {
  atajos: 'enableAtajos',
  proveedores: 'enableProveedores',
  tutoriales: 'enableTutorials',
  avisos: 'enableAvisos',
  checklist: 'enableChecklist',
};

function getSectionConfigDefault(key) {
  const def = SECTION_DEFAULTS[key];
  if (def.alwaysOn) return true;
  const featKey = SECTION_FEATURE_KEY[key];
  const features = window.ATUEL_CONFIG && window.ATUEL_CONFIG.features;
  if (features && featKey && typeof features[featKey] === 'boolean') return features[featKey];
  return def.enabled;
}

function getSections() {
  const saved = STORAGE.get('atuel_sections', null) || {};
  const merged = {};
  for (const key in SECTION_DEFAULTS) {
    const def = SECTION_DEFAULTS[key];
    const cfgDefault = getSectionConfigDefault(key);
    merged[key] = {
      ...def,
      enabled: saved[key]?.enabled !== undefined ? saved[key].enabled : cfgDefault,
    };
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
  const cards = Array.from(container.children).filter(c => !c.classList.contains('section-header-actions') && !c.classList.contains('cards-grid') && !c.classList.contains('topic-chips'));
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

const _equalizeObservers = new WeakMap();
function setupEqualizeObserver(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  if (_equalizeObservers.has(container)) return;
  const ro = new ResizeObserver(() => {
    requestAnimationFrame(() => equalizeCardHeights(containerSelector));
  });
  ro.observe(container);
  _equalizeObservers.set(container, ro);
}

function reloadExternalConfig(preserveLocal = false) {
  if (!preserveLocal) {
    localStorage.removeItem('atuel_tutorials');
    localStorage.removeItem('atuel_avisos');
    localStorage.removeItem('atuel_custom_checklist');
    localStorage.removeItem('atuel_shortcuts');
    localStorage.removeItem('atuel_providers');
    localStorage.removeItem('atuel_sections');
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
  const loadedAt = localStorage.getItem('atuel_config_loaded_at') || 'nunca';
  const source = window.ATUEL_CONFIG ? 'config.js ✓' : '❌ NO CARGADO (usando defaults)';

  const data = buildLiveConfigData();
  const fullText = buildConfigFileText();
  const previewText = fullText.length > 700 ? fullText.substring(0, 700) + '\n...' : fullText;

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
          <div style="color: var(--text-muted); font-size: 0.8rem; margin-top: 2px;">Se exportan los datos actuales de la página (incluyendo lo editado desde la web).</div>
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
    <h4 style="margin-bottom: 8px; font-size: 0.9rem; color: var(--text-secondary);">Vista previa (primeros 700 caracteres)</h4>
    <div class="code-block" style="max-height: 240px;">${escapeHtml(previewText)}</div>
    <div class="btn-group">
      <button class="btn btn-accent" onclick="copyConfigJson()">📋 Copiar config.js completo</button>
      <button class="btn btn-secondary" onclick="downloadCurrentConfig()">📥 Descargar archivo</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cerrar</button>
    </div>
  `;
  modal.classList.remove('hidden');
  window.__fullConfigJson = fullText;
}

function downloadCurrentConfig() {
  const code = buildConfigFileText();
  const blob = new Blob([code], { type: 'application/javascript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'config.js';
  a.click();
  URL.revokeObjectURL(url);
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

function getShortcuts() {
  return STORAGE.get('atuel_shortcuts', null) || DEFAULT_SHORTCUTS;
}

function saveShortcuts(shortcuts) {
  STORAGE.set('atuel_shortcuts', shortcuts);
}

function getProviders() {
  return STORAGE.get('atuel_providers', null) || DEFAULT_PROVIDERS;
}

function saveProviders(providers) {
  STORAGE.set('atuel_providers', providers);
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
  const providers = getProviders();
  const readyProviders = providers.filter(p => p.status === 'ready').length;
  const staleProviders = providers.filter(p => p.status !== 'upcoming' && getProviderDaysAgo(p) > STALE_THRESHOLD_DAYS).length;
  const upcomingProviders = providers.filter(p => p.status === 'upcoming').length;
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
    const sortedForSummary = [...providers].sort((a, b) => {
      const oa = PROVIDER_STATUS_MAP[a.status]?.order ?? 99;
      const ob = PROVIDER_STATUS_MAP[b.status]?.order ?? 99;
      if (oa !== ob) return oa - ob;
      if (a.status === 'upcoming') return getProviderPriority(a) - getProviderPriority(b);
      return getProviderDaysAgo(a) - getProviderDaysAgo(b);
    });
    const providerTags = sortedForSummary.map(p => {
      const meta = PROVIDER_STATUS_MAP[p.status] || PROVIDER_STATUS_MAP['ready'];
      const cls = p.status === 'ready' ? 'success'
                : p.status === 'partial' ? 'warning'
                : p.status === 'upcoming' ? 'neutral'
                : 'danger';
      if (p.status === 'upcoming') {
        const pr = getProviderPriority(p);
        const prText = pr === Number.MAX_SAFE_INTEGER ? '—' : `#${pr}`;
        return `<span class="summary-tag ${cls}" title="Próximo a importar · prioridad ${prText}">${meta.icon} ${escapeHtml(p.name)} · ${prText}<span class="age-dot accent"></span></span>`;
      }
      const days = getProviderDaysAgo(p);
      const dateStr = fmtDate(dateFromDaysAgo(days));
      const dotColor = indicatorColor(days);
      const dotTitle = days === 0 ? 'actualizado hoy' : days === 1 ? 'hace 1 día' : `hace ${days} días`;
      return `<span class="summary-tag ${cls}" title="${dotTitle}">${meta.icon} ${escapeHtml(p.name)} · ${dateStr}<span class="age-dot ${dotColor}"></span></span>`;
    }).join('');
    const totalActive = providers.length - upcomingProviders;
    const summaryMsg = staleProviders > 0
      ? `${staleProviders} con listas desactualizadas (+${STALE_THRESHOLD_DAYS} días)`
      : (upcomingProviders > 0 ? `Todas las listas actualizadas · ${upcomingProviders} próximos a importar` : 'Todas las listas actualizadas');
    cards.push(`
      <div class="summary-card-h ${staleProviders > 0 ? 'warning' : 'success'}" onclick="navigate('proveedores')">
        <div class="summary-card-h-icon">📦</div>
        <div class="summary-card-h-body">
          <div class="summary-card-h-title">Proveedores <span class="summary-tag ${staleProviders > 0 ? 'warning' : 'success'}">${readyProviders}/${totalActive} listos</span></div>
          <div class="summary-card-h-value">${summaryMsg}</div>
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
    const shortcuts = getShortcuts();
    const categoryCount = new Set(shortcuts.map(s => s.category)).size;
    cards.push(`
      <div class="summary-card-h" onclick="navigate('atajos')">
        <div class="summary-card-h-icon">⌨️</div>
        <div class="summary-card-h-body">
          <div class="summary-card-h-title">Atajos del sistema <span class="summary-tag neutral">${shortcuts.length} atajos</span></div>
          <div class="summary-card-h-value">Accesos rápidos de teclado agrupados en ${categoryCount} categorías: ventas, stock, clientes y más.</div>
          <div class="summary-card-h-details">${[...new Set(shortcuts.map(s => s.category))].slice(0, 4).map(c => `<span class="summary-tag neutral">${c}</span>`).join('')}</div>
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

  const shortcuts = getShortcuts();
  const categories = [...new Set(shortcuts.map(s => s.category))];
  const edit = editMode;
  const footer = `
    <div class="section-header-actions">
      ${edit ? `<button class="btn btn-accent btn-sm" onclick="openShortcutEditor()">+ Agregar atajo</button>` : ''}
    </div>
  `;
  c.innerHTML = categories.map(cat => {
    return `
      <h3 style="margin: 20px 0 12px; font-size: 1.05rem; color: var(--text-secondary); text-transform: capitalize;">${cat}</h3>
      <div class="cards-grid">
        ${shortcuts.map((s, idx) => s.category === cat ? `
          <div class="shortcut-card ${edit ? 'editable' : ''}">
            ${edit ? `
              <button class="card-edit-btn" onclick="event.stopPropagation(); openShortcutEditor(${idx})" title="Editar">✏️</button>
              <button class="card-delete-btn" onclick="event.stopPropagation(); deleteShortcut(${idx})" title="Eliminar">🗑</button>
            ` : ''}
            <div class="shortcut-key">${escapeHtml(s.key)}</div>
            <div class="shortcut-info">
              <div class="shortcut-title">${escapeHtml(s.title)}</div>
              <div class="shortcut-desc">${escapeHtml(s.desc)}</div>
            </div>
          </div>
        ` : '').join('')}
      </div>
    `;
  }).join('') + footer;
}

const STALE_THRESHOLD_DAYS = 14;

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysAgoToISO(days) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - (parseInt(days) || 0));
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function isoToDaysAgo(iso) {
  if (!iso) return 0;
  const parts = String(iso).split('-').map(Number);
  if (parts.length !== 3 || parts.some(n => !Number.isFinite(n))) return 0;
  const [y, m, d] = parts;
  const date = new Date(y, m - 1, d);
  date.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((today - date) / 86400000));
}

function getProviderDaysAgo(p) {
  if (p && p.lastUpdate) return isoToDaysAgo(p.lastUpdate);
  return Math.max(0, parseInt(p && p.daysAgo) || 0);
}

function getProviderLastUpdate(p) {
  if (p && p.lastUpdate) return p.lastUpdate;
  return daysAgoToISO((p && p.daysAgo) || 0);
}

function fmtDateISO(iso) {
  if (!iso) return '';
  const parts = String(iso).split('-').map(Number);
  if (parts.length !== 3 || parts.some(n => !Number.isFinite(n))) return '';
  const [y, m, d] = parts;
  return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
}

function indicatorColor(days) {
  if (days < 15) return 'green';
  if (days < 30) return 'yellow';
  return 'red';
}

function indicatorLabel(days) {
  if (days >= 30) return '30d+';
  return `${days}d`;
}

function indicatorPercent(days) {
  if (days >= 30) return 1;
  const cycle = 15;
  const within = days < 15 ? days : days - 15;
  return Math.max(0, Math.min(1, 1 - within / cycle));
}

const PROVIDER_STATUS_MAP = {
  'ready':    { label: 'Ready',           cls: 'ready',    icon: '✓', order: 0 },
  'partial':  { label: 'Parcial',         cls: 'partial',  icon: '◐', order: 1 },
  'upcoming': { label: 'Próximos',        cls: 'upcoming', icon: '⏳', order: 2 },
  'not-impl': { label: 'No Implementada', cls: 'not-impl', icon: '✕', order: 3 }
};

const PROVIDER_GROUP_ORDER = ['ready', 'partial', 'upcoming', 'not-impl'];

function getProviderPriority(p) {
  const v = parseInt(p && p.priority);
  return Number.isFinite(v) && v > 0 ? v : Number.MAX_SAFE_INTEGER;
}

function getProviderSortPrefs() {
  return STORAGE.get('atuel_provider_sort', { sort: 'default', group: false });
}

function setProviderSortPrefs(prefs) {
  STORAGE.set('atuel_provider_sort', prefs);
}

function setProviderSort(sort) {
  const prefs = getProviderSortPrefs();
  prefs.sort = sort;
  setProviderSortPrefs(prefs);
  renderProviders();
}

function setProviderGroup(group) {
  const prefs = getProviderSortPrefs();
  prefs.group = !!group;
  setProviderSortPrefs(prefs);
  renderProviders();
}

function sortProviders(list, sortMode) {
  const arr = list.map((p, originalIdx) => ({ p, originalIdx }));
  const cmpName = (a, b) => a.p.name.localeCompare(b.p.name, 'es', { sensitivity: 'base' });
  const cmpStatus = (a, b) => (PROVIDER_STATUS_MAP[a.p.status]?.order ?? 99) - (PROVIDER_STATUS_MAP[b.p.status]?.order ?? 99);
  const cmpDaysAsc  = (a, b) => getProviderDaysAgo(a.p) - getProviderDaysAgo(b.p);
  const cmpDaysDesc = (a, b) => getProviderDaysAgo(b.p) - getProviderDaysAgo(a.p);
  const cmpPriority = (a, b) => getProviderPriority(a.p) - getProviderPriority(b.p);

  const upcomingFirst = (a, b) => {
    const au = a.p.status === 'upcoming' ? 1 : 0;
    const bu = b.p.status === 'upcoming' ? 1 : 0;
    return au - bu;
  };

  switch (sortMode) {
    case 'status':
      arr.sort((a, b) => cmpStatus(a, b) || cmpPriority(a, b) || cmpDaysAsc(a, b) || cmpName(a, b));
      break;
    case 'recent':
      arr.sort((a, b) => upcomingFirst(a, b) || cmpDaysAsc(a, b) || cmpName(a, b));
      break;
    case 'old':
      arr.sort((a, b) => upcomingFirst(a, b) || cmpDaysDesc(a, b) || cmpName(a, b));
      break;
    case 'name':
      arr.sort(cmpName);
      break;
    case 'priority':
      arr.sort((a, b) => {
        const au = a.p.status === 'upcoming' ? 0 : 1;
        const bu = b.p.status === 'upcoming' ? 0 : 1;
        return (au - bu) || cmpPriority(a, b) || cmpName(a, b);
      });
      break;
    default:
      // keep original insertion order
      break;
  }
  return arr;
}

function renderProviderControls() {
  const prefs = getProviderSortPrefs();
  return `
    <div class="providers-controls">
      <div class="pc-field">
        <span class="pc-label">Ordenar:</span>
        <select class="pc-select" onchange="setProviderSort(this.value)">
          <option value="default" ${prefs.sort === 'default' ? 'selected' : ''}>Por defecto</option>
          <option value="status" ${prefs.sort === 'status' ? 'selected' : ''}>Estado (Ready → No impl.)</option>
          <option value="recent" ${prefs.sort === 'recent' ? 'selected' : ''}>Más recientes primero</option>
          <option value="old" ${prefs.sort === 'old' ? 'selected' : ''}>Más antiguos primero</option>
          <option value="priority" ${prefs.sort === 'priority' ? 'selected' : ''}>Prioridad de importación</option>
          <option value="name" ${prefs.sort === 'name' ? 'selected' : ''}>Nombre (A → Z)</option>
        </select>
      </div>
      <label class="pc-check">
        <input type="checkbox" ${prefs.group ? 'checked' : ''} onchange="setProviderGroup(this.checked)">
        <span>Agrupar por estado</span>
      </label>
    </div>
  `;
}

function renderProviderCard(p, originalIdx, edit) {
  const s = PROVIDER_STATUS_MAP[p.status] || PROVIDER_STATUS_MAP['ready'];
  const initial = p.name.charAt(0).toUpperCase();
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const isUpcoming = p.status === 'upcoming';

  let metaHtml = '';
  let ringHtml = '';
  let title = '';

  if (isUpcoming) {
    const priority = getProviderPriority(p);
    const priorityText = priority === Number.MAX_SAFE_INTEGER ? '—' : `#${priority}`;
    metaHtml = `<span class="provider-date">Prioridad ${priorityText}</span>`;
    const offset = 0;
    ringHtml = `
      <div class="indicator-ring" title="Próximo a importar · prioridad ${priorityText}">
        <svg width="48" height="48">
          <circle class="ring-bg accent" cx="24" cy="24" r="${radius}"></circle>
          <circle class="ring-fg accent" cx="24" cy="24" r="${radius}"
                  style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};"></circle>
        </svg>
        <div class="indicator-label">${priorityText}</div>
      </div>
    `;
    title = `Próximo a importar · prioridad ${priorityText}`;
  } else {
    const daysAgo = getProviderDaysAgo(p);
    const lastUpdate = getProviderLastUpdate(p);
    const ringColor = indicatorColor(daysAgo);
    const pct = indicatorPercent(daysAgo);
    const offset = circumference * (1 - pct);
    const relText = daysAgo === 0 ? 'hoy' : daysAgo === 1 ? 'hace 1 día' : `hace ${daysAgo} días`;
    metaHtml = `<span class="provider-date">${fmtDateISO(lastUpdate)} · ${relText}</span>`;
    ringHtml = `
      <div class="indicator-ring" title="${daysAgo} días desde la última actualización (${fmtDateISO(lastUpdate)})">
        <svg width="48" height="48">
          <circle class="ring-bg ${ringColor}" cx="24" cy="24" r="${radius}"></circle>
          <circle class="ring-fg ${ringColor}" cx="24" cy="24" r="${radius}"
                  style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};"></circle>
        </svg>
        <div class="indicator-label">${indicatorLabel(daysAgo)}</div>
      </div>
    `;
    title = `${daysAgo} días desde la última actualización (${fmtDateISO(lastUpdate)})`;
  }

  return `
    <div class="provider-card ${edit ? 'editable' : ''}">
      ${edit ? `
        <button class="card-edit-btn" onclick="event.stopPropagation(); openProviderEditor(${originalIdx})" title="Editar">✏️</button>
        <button class="card-delete-btn" onclick="event.stopPropagation(); deleteProvider(${originalIdx})" title="Eliminar">🗑</button>
      ` : ''}
      <div class="provider-info">
        <div class="provider-avatar">${initial}</div>
        <div style="min-width: 0;">
          <div class="provider-name">${escapeHtml(p.name)}</div>
          <div class="provider-meta">
            <span class="status-badge ${s.cls}">
              <span class="status-dot"></span>
              ${s.label}
            </span>
            ${metaHtml}
          </div>
        </div>
      </div>
      ${ringHtml}
    </div>
  `;
}

function renderProviders() {
  const c = document.getElementById('providersContainer');
  if (!c) return;

  const providers = getProviders();
  const edit = editMode;
  const prefs = getProviderSortPrefs();
  const sorted = sortProviders(providers, prefs.sort);

  const footer = `
    <div class="section-header-actions">
      ${edit ? `<button class="btn btn-accent btn-sm" onclick="openProviderEditor()">+ Agregar proveedor</button>` : ''}
    </div>
  `;

  let body = '';

  if (prefs.group) {
    const groups = {};
    sorted.forEach(item => {
      const key = item.p.status || 'ready';
      (groups[key] = groups[key] || []).push(item);
    });
    PROVIDER_GROUP_ORDER.forEach(key => {
      const items = groups[key];
      if (!items || !items.length) return;
      const meta = PROVIDER_STATUS_MAP[key];
      if (key === 'upcoming') {
        items.sort((a, b) => getProviderPriority(a.p) - getProviderPriority(b.p) || a.p.name.localeCompare(b.p.name, 'es', { sensitivity: 'base' }));
      }
      body += `
        <div class="providers-group">
          <div class="providers-group-title">
            <span>${meta.icon} ${meta.label}</span>
            <span class="count">${items.length} ${items.length === 1 ? 'proveedor' : 'proveedores'}</span>
          </div>
          <div class="cards-grid">
            ${items.map(it => renderProviderCard(it.p, it.originalIdx, edit)).join('')}
          </div>
        </div>
      `;
    });
  } else {
    body = `<div class="cards-grid">${sorted.map(it => renderProviderCard(it.p, it.originalIdx, edit)).join('')}</div>`;
  }

  c.innerHTML = renderProviderControls() + body + footer;

  requestAnimationFrame(() => {
    document.querySelectorAll('#providersContainer .cards-grid').forEach((grid, i) => {
      grid.dataset.equalize = `providers-grid-${i}`;
      equalizeCardHeights(`#providersContainer .cards-grid[data-equalize="providers-grid-${i}"]`);
    });
  });
}

function renderEditBanner() {
  const c = document.getElementById('editBannerContainer');
  if (!c) return;
  if (editMode) {
    c.innerHTML = `
      <div class="edit-banner">
        <span>✏️ <strong>Modo edición activo.</strong> Editá o eliminá items desde sus tarjetas. Usá los botones "+ Agregar" de cada sección.</span>
        <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="openTutorialEditor()">+ Nuevo tutorial</button>
      </div>
    `;
  } else {
    c.innerHTML = '';
  }
}

function renderAllEditableSections() {
  renderShortcuts();
  renderProviders();
  renderTutorials();
  renderEditBanner();
  renderTopicChips();
  renderAvisos();
  renderChecklist();
  renderSummary();
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
  const edit = editMode;
  const footer = `
    <div class="section-header-actions">
      ${edit ? `<button class="btn btn-accent btn-sm" onclick="openTutorialEditor()">+ Agregar tutorial</button>` : ''}
    </div>
  `;

  if (filtered.length === 0) {
    c.innerHTML = `<div class="card" style="text-align: center; padding: 40px; color: var(--text-muted);">No hay tutoriales en este tema todavía.</div>` + footer;
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
  `).join('') + footer;

  requestAnimationFrame(() => equalizeCardHeights('#tutorialsContainer'));
}

function openTutorial(id) {
  const t = getTutorials().find(x => x.id === id);
  if (!t) return;

  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  let currentPart = 0;

  modal.classList.remove('modal-focus');
  modal.classList.add('modal-tutorial');

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
      <div class="tutorial-body">
        <div class="tutorial-content">
          <h3>Parte ${currentPart + 1} de ${t.parts.length}: ${part.title}</h3>
          ${part.content}
        </div>
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
    <div class="focus-content">
      <div class="focus-layout">
        <aside class="focus-toc">
          <h4 class="focus-toc-title">Contenido</h4>
          <nav class="focus-toc-nav">
            ${t.parts.map((p, i) => `
              <a href="#focus-part-${i}" class="focus-toc-link" data-part="${i}">
                <span class="focus-toc-num">${i + 1}</span>
                <span class="focus-toc-text">${escapeHtml(p.title)}</span>
              </a>
            `).join('')}
          </nav>
        </aside>
        <div class="focus-sections">
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
    </div>
  `;

  modal.classList.remove('hidden', 'modal-tutorial');
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
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
  modal.classList.remove('modal-focus', 'modal-tutorial');
  currentEditingTutorial = null;
}

function renderAvisos() {
  const c = document.getElementById('avisosContainer');
  if (!c) return;
  const avisos = getAvisos().sort((a, b) => b.date.localeCompare(a.date));
  const edit = editMode;
  const footer = `
    <div class="section-header-actions">
      ${edit ? `<button class="btn btn-accent btn-sm" onclick="openAvisoEditor()">+ Agregar aviso</button>` : ''}
    </div>
  `;

  if (avisos.length === 0) {
    c.innerHTML = `<div class="card" style="text-align: center; padding: 40px; color: var(--text-muted);">No hay avisos. ¡Todo tranquilo! 🎉</div>` + footer;
    return;
  }

  c.innerHTML = avisos.map(a => {
    const dateObj = new Date(a.date + 'T00:00:00');
    const date = dateObj.toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });
    return `
      <div class="aviso-card priority-${a.priority} ${edit ? 'editable' : ''}">
        ${edit ? `
          <button class="card-edit-btn" onclick="event.stopPropagation(); openAvisoEditor(getAvisos().find(x => x.id === '${a.id}'))" title="Editar">✏️</button>
          <button class="card-delete-btn" onclick="event.stopPropagation(); deleteAviso('${a.id}')" title="Eliminar">🗑</button>
        ` : ''}
        <div class="aviso-header">
          <div class="aviso-title">${escapeHtml(a.title)}</div>
          <div class="aviso-date">${date}</div>
        </div>
        <div class="aviso-body">${escapeHtml(a.body)}</div>
      </div>
    `;
  }).join('') + footer;
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

function openShortcutEditor(idx = null) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  const shortcuts = getShortcuts();
  const data = idx !== null ? shortcuts[idx] : null;
  const current = data || { key: '', title: '', desc: '', category: 'general' };

  const allCategories = [...new Set([...shortcuts.map(s => s.category), 'general', 'productos', 'clientes', 'ventas', 'proveedores'])];

  content.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">${data ? '✏️ Editar' : '+ Nuevo'} atajo</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="form-group">
      <label class="form-label">Tecla / combinación</label>
      <input class="form-input" id="scKey" placeholder="Ej: F1, Ctrl + S, Esc" value="${escapeHtml(current.key)}">
    </div>
    <div class="form-group">
      <label class="form-label">Título</label>
      <input class="form-input" id="scTitle" placeholder="Ej: Nueva venta" value="${escapeHtml(current.title)}">
    </div>
    <div class="form-group">
      <label class="form-label">Descripción</label>
      <textarea class="form-textarea" id="scDesc" placeholder="Qué hace este atajo">${escapeHtml(current.desc)}</textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Categoría</label>
      <input class="form-input" id="scCategory" list="scCatList" placeholder="Ej: ventas" value="${escapeHtml(current.category)}">
      <datalist id="scCatList">
        ${allCategories.map(c => `<option value="${escapeHtml(c)}">`).join('')}
      </datalist>
    </div>
    <div class="btn-group">
      <button class="btn btn-accent" onclick="saveShortcut(${idx !== null ? idx : 'null'})">Guardar atajo</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    </div>
  `;
  modal.classList.remove('hidden');
  setTimeout(() => document.getElementById('scKey')?.focus(), 100);
}

function saveShortcut(idx) {
  const key = document.getElementById('scKey').value.trim();
  const title = document.getElementById('scTitle').value.trim();
  const desc = document.getElementById('scDesc').value.trim();
  const category = document.getElementById('scCategory').value.trim().toLowerCase() || 'general';
  if (!key || !title) {
    alert('Completá al menos la tecla y el título.');
    return;
  }
  const shortcuts = getShortcuts();
  const entry = { key, title, desc, category };
  if (idx !== null && idx >= 0 && idx < shortcuts.length) {
    shortcuts[idx] = entry;
  } else {
    shortcuts.push(entry);
  }
  saveShortcuts(shortcuts);
  closeModal();
  renderShortcuts();
  renderSummary();
}

function deleteShortcut(idx) {
  if (!confirm('¿Eliminar este atajo?')) return;
  const shortcuts = getShortcuts().filter((_, i) => i !== idx);
  saveShortcuts(shortcuts);
  renderShortcuts();
  renderSummary();
}

function openProviderEditor(idx = null) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  const providers = getProviders();
  const data = idx !== null ? providers[idx] : null;
  const initialDays = data ? getProviderDaysAgo(data) : 0;
  const initialISO = data ? getProviderLastUpdate(data) : todayISO();
  const initialPriority = data && data.priority != null ? data.priority : (data ? '' : 1);
  const current = data || { name: '', status: 'ready' };

  content.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">${data ? '✏️ Editar' : '+ Nuevo'} proveedor</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="form-group">
      <label class="form-label">Nombre</label>
      <input class="form-input" id="pvName" placeholder="Ej: Honda" value="${escapeHtml(current.name)}">
    </div>
    <div class="form-group">
      <label class="form-label">Estado de la lista</label>
      <select class="form-select" id="pvStatus" onchange="toggleProviderStatusFields()">
        <option value="ready" ${current.status === 'ready' ? 'selected' : ''}>✓ Ready (lista completa)</option>
        <option value="partial" ${current.status === 'partial' ? 'selected' : ''}>◐ Parcial (faltan items)</option>
        <option value="upcoming" ${current.status === 'upcoming' ? 'selected' : ''}>⏳ Próximos a importar</option>
        <option value="not-impl" ${current.status === 'not-impl' ? 'selected' : ''}>✕ No implementada</option>
      </select>
    </div>
    <div class="form-group" id="pvUpdateGroup">
      <label class="form-label">Última actualización</label>
      <p style="color: var(--text-muted); font-size: 0.78rem; margin: 0 0 8px;">Completá <strong>cualquiera</strong> de los dos campos. El otro se recalcula automáticamente.</p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div>
          <label class="form-label" style="font-size: 0.72rem;">Fecha (dd/mm/aaaa)</label>
          <input class="form-input" id="pvDate" type="date" value="${initialISO}" max="${todayISO()}">
        </div>
        <div>
          <label class="form-label" style="font-size: 0.72rem;">Días atrás</label>
          <input class="form-input" id="pvDays" type="number" min="0" step="1" value="${initialDays}" placeholder="0">
        </div>
      </div>
      <div id="pvDateHint" style="color: var(--text-muted); font-size: 0.78rem; margin-top: 8px;"></div>
    </div>
    <div class="form-group" id="pvPriorityGroup" style="display: none;">
      <label class="form-label">Prioridad de importación (tier)</label>
      <p style="color: var(--text-muted); font-size: 0.78rem; margin: 0 0 8px;">Número entero. <strong>Menor = más prioridad</strong> (1 va primero, 2 después, etc.).</p>
      <input class="form-input" id="pvPriority" type="number" min="1" step="1" value="${initialPriority}" placeholder="1">
    </div>
    <div class="btn-group">
      <button class="btn btn-accent" onclick="saveProvider(${idx !== null ? idx : 'null'})">Guardar proveedor</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    </div>
  `;
  modal.classList.remove('hidden');
  setTimeout(() => document.getElementById('pvName')?.focus(), 100);
  bindProviderDateInputs();
  toggleProviderStatusFields();
}

function toggleProviderStatusFields() {
  const sel = document.getElementById('pvStatus');
  const updateGroup = document.getElementById('pvUpdateGroup');
  const priorityGroup = document.getElementById('pvPriorityGroup');
  if (!sel || !updateGroup || !priorityGroup) return;
  const isUpcoming = sel.value === 'upcoming';
  updateGroup.style.display = isUpcoming ? 'none' : '';
  priorityGroup.style.display = isUpcoming ? '' : 'none';
}

function bindProviderDateInputs() {
  const dateInput = document.getElementById('pvDate');
  const daysInput = document.getElementById('pvDays');
  const hint = document.getElementById('pvDateHint');
  if (!dateInput || !daysInput) return;

  function updateHint() {
    const iso = dateInput.value;
    const days = parseInt(daysInput.value) || 0;
    if (iso) {
      const rel = days === 0 ? 'hoy' : days === 1 ? 'hace 1 día' : `hace ${days} días`;
      hint.textContent = `📅 ${fmtDateISO(iso)} · ${rel}`;
    } else {
      hint.textContent = '';
    }
  }

  dateInput.addEventListener('input', () => {
    if (!dateInput.value) return;
    daysInput.value = isoToDaysAgo(dateInput.value);
    updateHint();
  });

  daysInput.addEventListener('input', () => {
    const d = Math.max(0, parseInt(daysInput.value) || 0);
    dateInput.value = daysAgoToISO(d);
    updateHint();
  });

  updateHint();
}

function saveProvider(idx) {
  const name = document.getElementById('pvName').value.trim();
  const status = document.getElementById('pvStatus').value;
  if (!name) {
    alert('Completá el nombre del proveedor.');
    return;
  }
  const providers = getProviders();
  const entry = { name, status };
  if (status === 'upcoming') {
    const priorityInput = document.getElementById('pvPriority');
    const priority = Math.max(1, parseInt(priorityInput && priorityInput.value) || 1);
    entry.priority = priority;
  } else {
    const dateInput = document.getElementById('pvDate');
    const daysInput = document.getElementById('pvDays');
    let lastUpdate = dateInput && dateInput.value ? dateInput.value : null;
    if (!lastUpdate) {
      const d = Math.max(0, parseInt(daysInput && daysInput.value) || 0);
      lastUpdate = daysAgoToISO(d);
    }
    entry.lastUpdate = lastUpdate;
  }
  if (idx !== null && idx >= 0 && idx < providers.length) {
    providers[idx] = entry;
  } else {
    providers.push(entry);
  }
  saveProviders(providers);
  closeModal();
  renderProviders();
  renderSummary();
}

function deleteProvider(idx) {
  if (!confirm('¿Eliminar este proveedor?')) return;
  const providers = getProviders().filter((_, i) => i !== idx);
  saveProviders(providers);
  renderProviders();
  renderSummary();
}

function openChecklistEditor(idx = null) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  const items = getCurrentChecklist();
  const data = idx !== null ? items[idx] : null;
  const current = data || { id: 'ck-' + Date.now(), text: '' };

  content.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">${data ? '✏️ Editar' : '+ Nueva'} tarea del checklist</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="form-group">
      <label class="form-label">Texto de la tarea</label>
      <textarea class="form-textarea" id="ckText" placeholder="Ej: Revisar correo electrónico">${escapeHtml(current.text)}</textarea>
    </div>
    <div class="btn-group">
      <button class="btn btn-accent" onclick="saveChecklistItem('${current.id}', ${idx !== null ? idx : 'null'})">Guardar tarea</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
    </div>
  `;
  modal.classList.remove('hidden');
  setTimeout(() => document.getElementById('ckText')?.focus(), 100);
}

function saveChecklistItem(id, idx) {
  const text = document.getElementById('ckText').value.trim();
  if (!text) {
    alert('Completá el texto de la tarea.');
    return;
  }
  const list = getCurrentChecklist();
  const entry = { id, text };
  if (idx !== null && idx >= 0 && idx < list.length && list[idx].id === id) {
    list[idx] = entry;
  } else {
    list.push(entry);
  }
  saveCustomChecklist(list);
  closeModal();
  renderChecklist();
  renderSummary();
}

function deleteChecklistItem(idx) {
  if (!confirm('¿Eliminar esta tarea del checklist?')) return;
  const list = getCurrentChecklist().filter((_, i) => i !== idx);
  saveCustomChecklist(list);
  renderChecklist();
  renderSummary();
}

function renderChecklist() {
  const c = document.getElementById('checklistContainer');
  if (!c) return;
  const items = getCurrentChecklist();
  const state = getChecklistState();
  const edit = editMode;
  const footer = `
    <div class="section-header-actions">
      ${edit ? `<button class="btn btn-accent btn-sm" onclick="openChecklistEditor()">+ Agregar tarea</button>` : ''}
    </div>
  `;
  c.innerHTML = items.map((item, idx) => `
    <div class="checklist-item ${state[item.id] ? 'checked' : ''} ${edit ? 'editable' : ''}" data-id="${item.id}">
      <div class="checklist-check">${state[item.id] ? '✓' : ''}</div>
      <div class="checklist-text">${escapeHtml(item.text)}</div>
      ${edit ? `
        <div class="checklist-item-actions">
          <button class="card-edit-btn" onclick="event.stopPropagation(); openChecklistEditor(${idx})" title="Editar">✏️</button>
          <button class="card-delete-btn" onclick="event.stopPropagation(); deleteChecklistItem(${idx})" title="Eliminar">🗑</button>
        </div>
      ` : ''}
    </div>
  `).join('') + footer;
  c.querySelectorAll('.checklist-item').forEach(item => {
    item.onclick = (e) => {
      if (e.target.closest('.card-edit-btn, .card-delete-btn')) return;
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

function jsString(s) {
  const str = String(s);
  const hasSingle = str.indexOf("'") !== -1;
  const hasDouble = str.indexOf('"') !== -1;
  const escapeCommon = (t) => t
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
  if (hasSingle && !hasDouble) {
    return '"' + escapeCommon(str).replace(/"/g, '\\"') + '"';
  }
  return "'" + escapeCommon(str).replace(/'/g, "\\'") + "'";
}

function jsSerialize(value, indent = 2, currentIndent = 0) {
  const inner = ' '.repeat(currentIndent + indent);
  const outer = ' '.repeat(currentIndent);
  if (value === null) return 'null';
  if (typeof value === 'undefined') return 'undefined';
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : 'null';
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'string') return jsString(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map(v => inner + jsSerialize(v, indent, currentIndent + indent));
    return '[\n' + items.join(',\n') + ',\n' + outer + ']';
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) return '{}';
    const items = keys.map(k => {
      const keyStr = /^[A-Za-z_$][\w$]*$/.test(k) ? k : jsString(k);
      return inner + keyStr + ': ' + jsSerialize(value[k], indent, currentIndent + indent);
    });
    return '{\n' + items.join(',\n') + ',\n' + outer + '}';
  }
  return 'null';
}

function buildLiveConfigData() {
  const cfg = window.ATUEL_CONFIG || {};
  const baseFeatures = cfg.features || {};
  const sections = getSections();
  const features = {
    cacheBustDays: typeof baseFeatures.cacheBustDays === 'number' ? baseFeatures.cacheBustDays : 5,
    enableCacheBust: typeof baseFeatures.enableCacheBust === 'boolean' ? baseFeatures.enableCacheBust : true,
    enableAtajos: !!sections.atajos.enabled,
    enableProveedores: !!sections.proveedores.enabled,
    enableTutorials: !!sections.tutoriales.enabled,
    enableAvisos: !!sections.avisos.enabled,
    enableChecklist: !!sections.checklist.enabled,
  };
  return {
    shortcuts: getShortcuts(),
    providers: getProviders(),
    avisos: getAvisos(),
    checklist: getCurrentChecklist(),
    tutorials: getTutorials(),
    branding: cfg.branding || { name: 'Atuel Motos', tagline: 'Centro de comandos diario del local' },
    features,
  };
}

function buildConfigFileText() {
  const data = buildLiveConfigData();
  const header = '// config.js · generado desde la intranet el ' + new Date().toLocaleString('es-AR') + '\n' +
                 '// Pegá este contenido completo en config.js del repositorio para compartirlo.\n\n';
  return header + 'window.ATUEL_CONFIG = ' + jsSerialize(data, 2, 0) + ';\n';
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

  const btnHeaderSettings = document.getElementById('btnHeaderSettings');
  if (btnHeaderSettings) btnHeaderSettings.onclick = () => navigate('configuracion');

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
    renderAllEditableSections();
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
        renderAllEditableSections();
        openTutorialEditor();
      } else if (action === 'check') {
        if (!editMode) {
          editMode = true;
          document.body.classList.add('edit-mode');
          editSwitch.checked = true;
        }
        navigate('checklist');
        renderAllEditableSections();
        openChecklistEditor();
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
    if (!editMode) {
      editMode = true;
      document.body.classList.add('edit-mode');
      document.getElementById('editSwitch').checked = true;
      renderAllEditableSections();
    }
    openChecklistEditor();
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
      const code = buildConfigFileText();
      const blob = new Blob([code], { type: 'application/javascript;charset=utf-8' });
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
  renderShortcuts();
  renderProviders();
  renderTopicChips();
  renderTutorials();
  renderAvisos();
  renderChecklist();
  requestAnimationFrame(() => {
    equalizeCardHeights('#summaryGrid');
    document.querySelectorAll('#providersContainer .cards-grid').forEach((grid, i) => {
      grid.dataset.equalize = `providers-grid-${i}`;
      const sel = `#providersContainer .cards-grid[data-equalize="providers-grid-${i}"]`;
      equalizeCardHeights(sel);
      setupEqualizeObserver(sel);
    });
    equalizeCardHeights('#tutorialsContainer');
    setupEqualizeObserver('#summaryGrid');
    setupEqualizeObserver('#tutorialsContainer');
  });
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
