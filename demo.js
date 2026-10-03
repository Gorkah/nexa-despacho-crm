/* Presentation-only interactions. No requests, credentials or persistent data. */
(() => {
  const dialog = document.querySelector('#demo-dialog');
  const view = document.querySelector('#view');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => document.querySelector(`[data-i="${name}"]`)?.innerHTML || '';
  const field = (label, value = '', type = 'text') => `<label class="f"><span>${label}</span><input type="${type}" value="${escape(value)}" /></label>`;
  const select = (label, options) => `<label class="f"><span>${label}</span><select>${options.map(x => `<option>${escape(x)}</option>`).join('')}</select></label>`;
  const note = '<span class="dialog-note">Vista de demostración · cambios temporales</span>';
  let opener;
  function show(title, sub, body, action = 'Guardar en la demo') {
    opener = document.activeElement;
    dialog.innerHTML = `<form method="dialog"><header class="dialog-head"><div><span class="tag t-ai">NEXA DESPACHO · DEMO</span><h2 id="dialog-title">${escape(title)}</h2><p>${escape(sub)}</p></div><button class="icon-btn" value="cancel" aria-label="Cerrar">${icon('x') || '×'}</button></header><div class="dialog-body">${body}</div><footer class="dialog-foot">${note}<button class="btn btn--ghost" value="cancel">Cerrar</button>${action ? `<button class="btn btn--primary" value="save">${escape(action)}</button>` : ''}</footer></form>`;
    if (!dialog.open) dialog.showModal();
  }
  function status(message) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    document.querySelector('#toasts').append(el);
    setTimeout(() => el.remove(), 3200);
  }
  dialog.addEventListener('close', () => { if (dialog.returnValue === 'save') status('Listo en la demo · no se ha enviado ni guardado ningún dato real'); opener?.focus(); });
  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close('cancel');
    if (e.target.closest('[data-tour-link]')) dialog.close('cancel');
    const state = e.target.closest('[data-state]');
    if (state) drawState(state.dataset.state);
  });
  const tour = [
    ['panel','Panel de pendientes','PAN-02 · control del trimestre'],
    ['clientes','Cartera de clientes','Lista, VeriFactu y responsables'],
    ['cliente/1','Ficha de cliente','PAN-03 · checklist y pre-cierre'],
    ['bandeja','Bandeja de validación','PAN-04 · confianza y revisión'],
    ['validar/1042','Visor de facturas','PAN-05 · fuentes y asiento'],
    ['sin-asignar','Sin asignar','PAN-06 · clasificar documentos'],
    ['exportaciones','Exportaciones','PAN-07 · enlace contable'],
    ['avisos','Avisos y calendario','PAN-08 · aprobación y seguimiento'],
    ['conversaciones','Conversaciones','PAN-09 · IA y escalados'],
    ['conciliacion','Conciliación bancaria','PAN-10 · punteo del N43'],
    ['config','Configuración','PAN-11 · equipo e integraciones'],
    ['metricas','Métricas','PAN-12 · ahorro y línea base'],
    ['importar','Importar cartera','PAN-13 · mapeo y errores'],
    ['login','Acceso y doble factor','PAN-01 · login y MFA'],
    ['tareas','Tareas del equipo','Llamadas y trabajo pendiente']
  ];
  const handlers = {
    tour() {
      show('Todo tu despacho, en una sola vista', 'Explora el diseño completo de Nexa Despacho.', `<div class="tour-intro"><span class="ico">${icon('sparkles')}</span><div>Este es un prototipo visual con datos ficticios. Los estados de IA, conexiones, ahorros y envíos son ejemplos para presentar el producto.</div></div><div class="tour-grid">${tour.map(([r,t,s]) => `<a class="tour-link" data-tour-link href="#/${r}"><span class="ico">${icon('chevronRight')}</span><div><b>${t}</b><small>${s}</small></div></a>`).join('')}<button class="tour-link" type="button" data-demo="states"><div><b>Estados de la interfaz</b><small>Vacío, carga, error y permisos</small></div></button></div>`, 'Explorar');
    },
    period() { show('Periodo de trabajo', 'La demo representa el cierre del 3T 2026.', `<div class="form">${select('Periodo', ['3T 2026 · escenario activo','4T 2026 · ejemplo','2T 2026 · cerrado'])}${select('Ámbito fiscal', ['España · trimestral','España · mensual','Andorra · IGI'])}<div class="why"><b>Fecha del escenario: 16/10/2026</b></div><p class="muted">Los contadores pertenecen al escenario de ejemplo; cambiar el selector no recalcula los datos de la demo.</p></div>`, 'Ver selección'); },
    upload() { show('Subir documentación', 'Así recibe el despacho los documentos escaneados o enviados manualmente.', `<div class="form"><label class="drop"><span class="ico">${icon('upload')}</span><b>Selecciona facturas, fotos o extractos</b><small>PDF, JPG o PNG · hasta 20 MB por documento</small><input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" /></label>${select('Cliente', ['Detectar automáticamente por NIF','Talleres Puig, SL','Marta Soler Ferrer','Construccions Vall, SL'])}<div class="f-row">${select('Periodo', ['3T 2026','4T 2026'])}${select('Tipo', ['Detectar automáticamente','Factura recibida','Factura emitida','Extracto bancario','Otro'])}</div><div class="why"><span class="ico">${icon('sparkles')}</span><p>Clasificación → lectura → propuesta → revisión del técnico. Esta vista no sube archivos.</p></div></div>`, 'Simular recepción'); },
    client() { show('Nuevo cliente', 'Una ficha para documentación, contabilidad y comunicaciones.', `<div class="form">${field('Razón social o nombre','')}<div class="f-row">${field('NIF / CIF')}${select('Tipo', ['Sociedad limitada','Autónomo','Cliente de Andorra'])}</div><div class="f-row">${field('Email','','email')}${field('WhatsApp','','tel')}</div><div class="f-row">${select('Responsable', ['Laura Garriga','Marc Puig','Núria Soler','Jordi Vidal'])}${select('Idioma', ['Castellano','Català'])}</div><div class="f-row">${select('Plantilla documental', ['SL estándar','Autónomo · estimación directa','Andorra · IGI'])}${select('Periodicidad', ['Trimestral','Mensual','Semestral · Andorra'])}</div>${field('Código de empresa en A3')}<label class="setting"><div><b>Consentimiento para avisos</b><small>Registrar el canal acordado con el cliente</small></div><input type="checkbox" class="cbx" /></label></div>`, 'Crear ficha de ejemplo'); },
    task() { show('Nueva tarea', 'Reserva el criterio humano para lo que lo necesita.', `<div class="form">${field('Título de la tarea')}<div class="f-row">${select('Cliente', ['Sin cliente','Bar Ca l’Anna','Talleres Puig, SL'])}${select('Responsable', ['Laura Garriga','Marc Puig','Núria Soler'])}</div><div class="f-row">${select('Prioridad', ['Alta','Media','Baja'])}${field('Vencimiento','2026-10-19','date')}</div><label class="f"><span>Contexto para el técnico</span><textarea placeholder="Añade el motivo, los documentos y el siguiente paso…"></textarea></label></div>`, 'Crear tarea de ejemplo'); },
    invite() { show('Invitar al equipo', 'Asigna el acceso según el trabajo de cada persona.', `<div class="form">${field('Email profesional','','email')}${select('Rol', ['Técnico · su cartera','Administrativo · recepción','Responsable · todas las carteras','Administrador · configuración'])}<div class="why"><span class="ico">${icon('shield')}</span><p>La pantalla contempla doble factor obligatorio y permisos por cartera. La demo no crea cuentas ni envía invitaciones.</p></div></div>`, 'Previsualizar invitación'); },
    assign() { show('Asignar documento', 'Confirma el cliente y el periodo antes de procesarlo.', `<div class="form">${select('Cliente', ['Talleres Puig, SL','Clínica Vet Gràcia, SLP','Arquitectura Mas i Font, SLP'])}<div class="f-row">${select('Periodo', ['3T 2026','2T 2026 · cerrado'])}${select('Tipo de documento', ['Factura recibida','Factura emitida','Ticket','Extracto bancario','No contabilizable'])}</div><label class="f"><span>Motivo de la asignación</span><textarea placeholder="El NIF coincide con la ficha del cliente…"></textarea></label><span class="tag t-ai">La acción quedará registrada en el historial</span></div>`, 'Confirmar en la demo'); },
    message() { show('Preparar mensaje', 'Revisa el canal, la plantilla y el texto antes de aprobarlo.', `<div class="form"><div class="f-row">${select('Canal', ['WhatsApp Business','Email'])}${select('Idioma', ['Castellano','Català'])}</div>${select('Plantilla', ['Reclamación de documentación','Aviso informativo','Acuse de entrega'])}<label class="f"><span>Vista previa editable</span><textarea>Hola, para completar el 3T nos faltan las facturas recibidas y el extracto bancario. Puedes enviarlos por este mismo canal. Gracias.</textarea></label><div class="why"><p>La ventana de WhatsApp y la aprobación de plantillas se muestran como parte del diseño.</p></div></div>`, 'Aprobar ejemplo'); },
    bank() { show('Importar extracto Norma 43', 'Revisa cuenta, periodo y duplicados antes del punteo.', `<div class="form"><label class="drop"><span class="ico">${icon('upload')}</span><b>Selecciona el fichero N43</b><small>Extracto de movimientos bancarios</small><input type="file" accept=".txt,.n43,.dat" /></label>${select('Cliente', ['Talleres Puig, SL','Marta Soler Ferrer'])}${select('Cuenta', ['572001 · Sabadell ****4021','572002 · CaixaBank ****7710'])}<div class="why"><p>Vista previa: 142 movimientos · saldo cuadrado · sin duplicados. Valores ficticios para presentar el flujo.</p></div></div>`, 'Simular importación'); },
    entry() { show('Editar asiento', 'El técnico puede corregir la propuesta antes de validarla.', `<div class="form">${select('Cuenta contable', ['628 · Suministros','623 · Servicios profesionales','629 · Otros servicios','626 · Servicios bancarios'])}${field('Concepto','Factura de proveedor')}<div class="f-row">${field('Debe','412,30')}${field('Haber','0,00')}</div>${select('Tratamiento fiscal', ['IVA general 21 %','IVA reducido 10 %','Exento','Inversión del sujeto pasivo','Intracomunitaria'])}<label class="f"><span>Motivo de la corrección</span><textarea placeholder="Explica el criterio aplicado…"></textarea></label><span class="tag t-ok">Debe y haber se comprueban antes de validar</span></div>`, 'Ver corrección'); },
    audit() { show('Trazabilidad de la entrega', 'Recepción, revisiones y confirmación en un único historial.', `<ul class="tl">${[['09:42 · Recepción por WhatsApp','Documento de ejemplo · hash 3f9a…c21e'],['09:43 · Lectura y propuesta','Nexa · campos extraídos y confianza registrada'],['10:18 · Revisión del técnico','Laura Garriga · cuenta 628 confirmada'],['10:21 · Acuse de recepción','WhatsApp · entregado y leído'],['12:40 · Exportación','Lote L-0233 · pendiente de confirmar en A3']].map(([a,b]) => `<li style="--c:#0891b2"><b>${a}</b><small>${b}</small></li>`).join('')}</ul><div class="why" style="margin-top:24px"><p>El informe reúne fechas, responsables y huellas del documento. Todos los eventos de esta vista son ficticios.</p></div>`, 'Ver informe de ejemplo'); },
    integration() { show('Gestionar integración', 'Estado, permisos y últimas sincronizaciones.', `<div class="form"><div class="setting"><div><b>Conexión de demostración</b><small>Última sincronización · hoy 09:42</small></div><span class="tag t-ok">Conectado</span></div>${select('Modo', ['Solo lectura y propuestas','Importación por fichero'])}${select('Responsable de incidencias', ['Laura Garriga','Administrador del despacho'])}<ul class="tl"><li style="--c:#059669"><b>512 documentos recibidos</b><small>Hoy · sin incidencias en el escenario</small></li><li style="--c:#0891b2"><b>Permisos revisados</b><small>Lectura del buzón de documentación</small></li></ul><p class="muted">La demo muestra el flujo de conexión; no solicita claves ni conecta servicios.</p></div>`, 'Ver configuración'); },
    recover() { show('Recuperar acceso', 'Diseño del proceso de recuperación de cuenta.', `<div class="form">${field('Email del equipo','laura@garriga-associats.cat','email')}<div class="why"><p>En el producto se enviaría un enlace al correo registrado y se verificaría el segundo factor.</p></div></div>`, 'Ver confirmación'); },
    filters() { show('Filtros avanzados', 'Prioriza los documentos que necesitan criterio.', `<div class="form"><div class="f-row">${select('Confianza', ['Todas','Alta','Revisar'])}${select('Motivo', ['Todos','Proveedor nuevo','ISP','Intracomunitaria','Ticket','Importes descuadrados'])}</div><div class="f-row">${field('Fecha desde','2026-07-01','date')}${field('Fecha hasta','2026-09-30','date')}</div>${select('Responsable', ['Todos','Laura Garriga','Marc Puig','Núria Soler'])}</div>`, 'Ver selección'); },
    states() { show('Estados de la interfaz', 'Diseño de los casos de carga, vacío y error.', `<div class="state-tabs">${[['empty','Vacío'],['loading','Cargando'],['error','Error'],['denied','Sin permiso']].map(([s,t])=>`<button type="button" class="btn btn--ghost btn--sm" data-state="${s}">${t}</button>`).join('')}</div><div id="state-preview"></div>`, 'Volver'); drawState('empty'); }
  };
  function drawState(s) {
    dialog.querySelectorAll('[data-state]').forEach(b => b.classList.toggle('btn--primary', b.dataset.state === s));
    const states = {
      empty: '<div class="demo-state"><div class="empty__ic">✓</div><h3>No hay propuestas pendientes</h3><p>Tu bandeja está al día. Te avisaremos cuando llegue documentación.</p></div>',
      loading: '<div class="demo-state" aria-busy="true"><h3>Preparando tu bandeja</h3><div class="skeleton" style="width:240px"></div><div class="skeleton" style="width:200px"></div><div class="skeleton" style="width:220px"></div><p>Ordenando las propuestas por prioridad…</p></div>',
      error: '<div class="demo-state"><div class="empty__ic bg-bad">!</div><h3>No hemos podido cargar los documentos</h3><p>Conservamos tus cambios. Vuelve a intentarlo en unos segundos.</p><button type="button" class="btn btn--primary" data-state="loading">Reintentar</button></div>',
      denied: '<div class="demo-state"><div class="empty__ic">🔒</div><h3>Necesitas permiso para acceder</h3><p>Solicita acceso al administrador del despacho para ver esta cartera.</p></div>'
    };
    dialog.querySelector('#state-preview').innerHTML = states[s];
  }
  const textActions = [
    [/^Nuevo cliente$/, 'client'], [/^Nueva tarea$/, 'task'], [/^Invitar$/, 'invite'],
    [/^(Subir|Subir documento|Subir escaneados)$/, 'upload'], [/^Subir N43$/, 'bank'],
    [/^Elegir cliente$/, 'assign'], [/^(Enviar mensaje|Aviso informativo)$/, 'message'],
    [/^(Editar|Añadir línea|Crear asiento|Añadir documento|Corregir)$/, 'entry'],
    [/^Más filtros$/, 'filters'], [/^Gestionar$/, 'integration'],
    [/^Informe de entregas$/, 'audit'], [/^¿Has olvidado la contraseña\?$/, 'recover'],
    [/^Usa un código de recuperación$/, 'recover'], [/^Entrar con Microsoft$/, 'recover']
  ];
  // Add light UI behavior without turning the prototype into a backend product.
  document.addEventListener('click', e => {
    const button = e.target.closest('button, a');
    if (!button) return;
    if (button.textContent.trim() === 'Vista previa del calendario') { e.preventDefault(); document.querySelector('[data-tab=cal][data-group=av]')?.click(); return; }
    const action = button.dataset.demo || textActions.find(([re]) => re.test(button.textContent.trim()))?.[1];
    if (action === 'send-chat') {
      e.preventDefault(); e.stopImmediatePropagation();
      const textarea = document.querySelector('.composer textarea');
      if (!textarea?.value.trim()) { textarea?.focus(); return; }
      const bubble = document.createElement('div'); bubble.className = 'bub bub--tec';
      const author = document.createElement('div'); author.className = 'bub__who'; author.textContent = 'Laura Garriga · demo';
      bubble.append(author, document.createTextNode(textarea.value.trim()));
      document.querySelector('.chat__body').append(bubble); bubble.scrollIntoView({block:'nearest'}); textarea.value = '';
      return;
    }
    if (action && handlers[action]) { e.preventDefault(); e.stopImmediatePropagation(); handlers[action](); return; }
    if (button.closest('.viewer__bar') && button.querySelector('svg') && !button.title) {
      if (button === button.parentElement.querySelector('button')) button.closest('.viewer').classList.toggle('is-zoomed');
    }
    if (button.classList.contains('side-scrim')) document.querySelector('#shell').classList.remove('side-open');
  }, true);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelector('#shell').classList.remove('side-open');
    const item = e.target.closest('[data-conv], tr[data-href]');
    if (item && /^(Enter| )$/.test(e.key)) { e.preventDefault(); item.click(); }
  });
  function finishView() {
    view.querySelectorAll('table').forEach(table => {
      const parent = table.parentElement;
      if (parent.classList.contains('table-scroll') || parent.style.overflowX === 'auto') return;
      const scroll = document.createElement('div'); scroll.className = 'table-scroll';
      table.replaceWith(scroll); scroll.append(table);
    });
    view.querySelectorAll('tr[data-href]').forEach(row => { row.tabIndex = 0; row.setAttribute('aria-label', 'Abrir ' + row.innerText.replace(/\s+/g,' ').trim()); });
    document.querySelectorAll('button.icon-btn:not([aria-label]):not([title])').forEach(b => b.setAttribute('aria-label', b.querySelector('svg') ? 'Opciones de ' + (b.closest('.card')?.querySelector('h3')?.textContent || 'documento') : 'Opciones'));
    view.querySelectorAll('input[placeholder]:not([aria-label])').forEach(input => input.setAttribute('aria-label', input.placeholder));
    view.querySelectorAll('.toolbar input[placeholder]').forEach(input => {
      input.addEventListener('input', () => {
        const scope = input.closest('.card') || view;
        const query = input.value.toLocaleLowerCase('es');
        scope.querySelectorAll('tbody tr').forEach(row => { row.hidden = !row.textContent.toLocaleLowerCase('es').includes(query); });
        scope.querySelectorAll('[data-conv]').forEach(row => { row.hidden = !row.textContent.toLocaleLowerCase('es').includes(query); });
      });
    });
    document.querySelector('#menuBtn').setAttribute('aria-expanded', String(document.querySelector('#shell').classList.contains('side-open')));
  }
  new MutationObserver(() => {
    const open = document.querySelector('#shell').classList.contains('side-open');
    document.querySelector('.side-scrim').hidden = !open;
    document.querySelector('#menuBtn').setAttribute('aria-expanded', String(open));
  }).observe(document.querySelector('#shell'), {attributes:true, attributeFilter:['class']});
  // Route rendering is synchronous in app.js, so augment each completed view.
  addEventListener('hashchange', finishView);
  finishView();
})();
