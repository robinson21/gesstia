/**
 * GeSSTia - Aplicación Principal
 * Gestión Integral de Seguridad y Salud en el Trabajo
 * Chile 2026
 */

// ============================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ============================================
const AppState = {
    usuario: null,
    empresa: null,
    rol: null,
    tenantId: null,
    seccionActual: 'inicio',
    menuAbierto: false,
    
    // Inicializar estado
    init(user, empresaData, rol) {
        this.usuario = user;
        this.empresa = empresaData;
        this.rol = rol;
        this.tenantId = empresaData?.id || null;
        
        // Actualizar UI
        document.getElementById('user-name').textContent = user?.nombre || user?.email || 'Usuario';
        
        // Mostrar/ocultar elementos según rol
        this.actualizarPermisosUI();
    },
    
    actualizarPermisosUI() {
        const esAdmin = this.rol === APP_CONFIG.ROLES.ADMIN || this.rol === APP_CONFIG.ROLES.SUPER_ADMIN;
        const esSupervisor = this.rol === APP_CONFIG.ROLES.SUPERVISOR;
        
        // Mostrar opciones de admin
        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = esAdmin ? 'block' : 'none';
        });
    },
    
    tienePermiso(permiso) {
        const permisosRol = APP_CONFIG.PERMISOS[this.rol] || [];
        return permisosRol.includes('*') || permisosRol.includes(permiso);
    },
    
    reset() {
        this.usuario = null;
        this.empresa = null;
        this.rol = null;
        this.tenantId = null;
    }
};

// ============================================
// NAVEGACIÓN
// ============================================

function cambiarPantalla(pantalla) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(pantalla).classList.add('active');
}

function cambiarSeccion(seccion) {
    // Verificar permisos
    const permisoMap = {
        'inicio': 'perfil.ver',
        'empresa': 'empresa.ver',
        'trabajadores': 'trabajadores.ver',
        'iper': 'iper.ver',
        'capacitaciones': 'capacitaciones.ver',
        'contratistas': 'contratistas.ver',
        'firmas': 'firmas.ver',
        'reportes': 'reportes.ver',
        'admin': 'empresa.ver'
    };
    
    if (!AppState.tienePermiso(permisoMap[seccion])) {
        mostrarToast('No tienes permiso para acceder a esta sección', 'error');
        return;
    }
    
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    
    // Mostrar sección seleccionada
    const seccionEl = document.getElementById(`section-${seccion}`);
    if (seccionEl) {
        seccionEl.classList.add('active');
        AppState.seccionActual = seccion;
    }
    
    // Actualizar navegación activa
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === seccion) {
            item.classList.add('active');
        }
    });
    
    // Cargar datos específicos de la sección
    cargarDatosSeccion(seccion);
}

function cargarDatosSeccion(seccion) {
    switch(seccion) {
        case 'trabajadores':
            cargarTrabajadores();
            break;
        case 'iper':
            cargarIPER();
            break;
        case 'capacitaciones':
            cargarCapacitaciones();
            break;
        case 'contratistas':
            cargarContratistas();
            break;
        // ... etc
    }
}

// ============================================
// AUTENTICACIÓN
// ============================================

async function login(email, password) {
    try {
        mostrarLoading(true);
        
        // En producción: auth.signInWithEmailAndPassword
        // Para demo: validar contra datos demo
        const usuario = validarCredencialesDemo(email, password);
        
        if (!usuario) {
            mostrarToast('Credenciales incorrectas', 'error');
            return false;
        }
        
        // Guardar sesión
        sessionStorage.setItem('gesstia_user', JSON.stringify(usuario));
        
        // Inicializar estado
        AppState.init(usuario, usuario.empresa, usuario.rol);
        
        // Ir al dashboard
        cambiarPantalla('dashboard-screen');
        mostrarToast(`¡Bienvenido, ${usuario.nombre || usuario.email}!`, 'success');
        
        return true;
    } catch (error) {
        console.error('Error login:', error);
        mostrarToast('Error al iniciar sesión', 'error');
        return false;
    } finally {
        mostrarLoading(false);
    }
}

async function logout() {
    try {
        sessionStorage.removeItem('gesstia_user');
        AppState.reset();
        cambiarPantalla('login-screen');
        mostrarToast('Sesión cerrada', 'info');
    } catch (error) {
        console.error('Error logout:', error);
    }
}

async function register(datos) {
    try {
        mostrarLoading(true);
        
        // Validar
        if (datos.password !== datos.passwordConfirm) {
            mostrarToast('Las contraseñas no coinciden', 'error');
            return false;
        }
        
        if (datos.password.length < 8) {
            mostrarToast('La contraseña debe tener al menos 8 caracteres', 'error');
            return false;
        }
        
        // Validar RUT empresa
        if (!validarRUT(datos.rutEmpresa)) {
            mostrarToast('RUT de empresa inválido', 'error');
            return false;
        }
        
        // En producción: crear auth + firestore
        // Para demo: simular creación
        const nuevoUsuario = crearEmpresaDemo(datos);
        
        mostrarToast('Cuenta creada exitosamente. Inicia sesión.', 'success');
        cambiarPantalla('login-screen');
        
        return true;
    } catch (error) {
        console.error('Error registro:', error);
        mostrarToast('Error al crear cuenta', 'error');
        return false;
    } finally {
        mostrarLoading(false);
    }
}

function validarCredencialesDemo(email, password) {
    // Buscar en datos demo
    return DATOS_DEMO.usuarios.find(u => u.email === email && u.password === password);
}

function crearEmpresaDemo(datos) {
    const empresaId = generarId();
    const userId = generarId();
    
    const empresa = {
        id: empresaId,
        nombre: datos.nombreEmpresa,
        rut: datos.rutEmpresa,
        tipo: 'principal',
        creada: new Date().toISOString(),
        activa: true
    };
    
    const usuario = {
        id: userId,
        nombre: datos.nombreAdmin,
        email: datos.email,
        password: datos.password, // En producción: hash!
        rol: APP_CONFIG.ROLES.ADMIN,
        empresaId: empresaId,
        activo: true
    };
    
    // Guardar en datos demo
    DATOS_DEMO.empresas.push(empresa);
    DATOS_DEMO.usuarios.push(usuario);
    
    return usuario;
}

// ============================================
// MÓDULO: TRABAJADORES
// ============================================

let trabajadoresCache = [];

async function cargarTrabajadores() {
    try {
        // Simular carga desde Firestore
        const trabajadores = DATOS_DEMO.trabajadores.filter(t => 
            !AppState.tenantId || t.empresaId === AppState.tenantId
        );
        
        trabajadoresCache = trabajadores;
        renderizarTrabajadores(trabajadores);
        
        // Actualizar contador
        document.getElementById('stat-trabajadores').textContent = trabajadores.length;
        
    } catch (error) {
        console.error('Error cargando trabajadores:', error);
    }
}

function renderizarTrabajadores(trabajadores) {
    let html = `
        <div class="section-header">
            <h2>👷 Gestión de Trabajadores</h2>
            <button class="btn btn-primary" onclick="abrirModalTrabajador()" style="width:auto;">
                ➕ Nuevo Trabajador
            </button>
        </div>
        <div class="data-table-container">
    `;
    
    if (trabajadores.length === 0) {
        html += `<div class="empty-state">No hay trabajadores registrados</div>`;
    } else {
        html += `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Run Ut</th>
                        <th>Nombre</th>
                        <th>Cargo</th>
                        <th>Centro de Trabajo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${trabajadores.map(t => `
                        <tr data-id="${t.id}">
                            <td>${t.rut}</td>
                            <td>${t.nombre} ${t.apellido}</td>
                            <td>${t.cargo}</td>
                            <td>${t.centroTrabajo}</td>
                            <td><span class="badge badge-${t.activo ? 'success' : 'inactive'}">${t.activo ? 'Activo' : 'Inactivo'}</span></td>
                            <td>
                                <button class="btn-icon" onclick="verTrabajador('${t.id}')">👁️</button>
                                <button class="btn-icon" onclick="editarTrabajador('${t.id}')">✏️</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    
    html += `</div>`;
    
    const seccion = document.getElementById('section-trabajadores');
    if (seccion) {
        seccion.innerHTML = html;
    }
}

function abrirModalTrabajador(trabajador = null) {
    const esEdicion = !!trabajador;
    
    const contenido = `
        <form id="form-trabajador" class="form-modal">
            <div class="form-row">
                <div class="form-group">
                    <label>RUT *</label>
                    <input type="text" id="t-rut" value="${trabajador?.rut || ''}" placeholder="12.345.678-9" required maxlength="12">
                </div>
                <div class="form-group">
                    <label>Nombres *</label>
                    <input type="text" id="t-nombre" value="${trabajador?.nombre || ''}" placeholder="Juan Pablo" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Apellido Paterno *</label>
                    <input type="text" id="t-apellido-p" value="${trabajador?.apellido?.split(' ')[0] || ''}" placeholder="Pérez" required>
                </div>
                <div class="form-group">
                    <label>Apellido Materno</label>
                    <input type="text" id="t-apellido-m" value="${trabajador?.apellido?.split(' ')[1] || ''}" placeholder="González">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Centro de Trabajo *</label>
                    <select id="t-centro" required>
                        <option value="">Seleccione...</option>
                        ${DATOS_DEMO.centrosTrabajo.map(c => `<option value="${c.id}" ${trabajador?.centroTrabajo === c.nombre ? 'selected' : ''}>${c.nombre}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Cargo *</label>
                    <select id="t-cargo" required onchange="actualizarIRLPreview()">
                        <option value="">Seleccione...</option>
                        ${DATOS_DEMO.cargos.map(c => `<option value="${c.id}" ${trabajador?.cargo === c.nombre ? 'selected' : ''}>${c.nombre}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Teléfono</label>
                    <input type="tel" id="t-telefono" value="${trabajador?.telefono || ''}" placeholder="+56 9 1234 5678">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="t-email" value="${trabajador?.email || ''}" placeholder="trabajador@empresa.cl">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Fecha de Ingreso</label>
                    <input type="date" id="t-fecha-ingreso" value="${trabajador?.fechaIngreso || ''}">
                </div>
                <div class="form-group">
                    <label>Previsión de Salud</label>
                    <select id="t-prevision">
                        <option value="">Seleccione...</option>
                        <option value="fonasa" ${trabajador?.prevision === 'fonasa' ? 'selected' : ''}>FONASA</option>
                        <option value="isapre" ${trabajador?.prevision === 'isapre' ? 'selected' : ''}>ISAPRE</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Alergias / Condiciones Médicas</label>
                <textarea id="t-alergias" rows="3" placeholder="Describa alergias o condiciones relevantes...">${trabajador?.alergias || ''}</textarea>
            </div>
            
            <!-- IRL Preview -->
            <div class="irl-preview" id="irl-preview" style="display:none; margin: 16px 0; padding: 16px; background: var(--color-bg); border-radius: 8px; border: 1px solid var(--color-border);">
                <h4>⚠️ Riesgos Laborales Identificados (IRL)</h4>
                <div id="irl-list"></div>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn btn-primary" style="width: auto;">${esEdicion ? '💾 Guardar Cambios' : '➕ Crear Trabajador'}</button>
                ${esEdicion ? `<button type="button" class="btn btn-danger" style="width: auto; margin-left: 8px;" onclick="eliminarTrabajador('${trabajador.id}')">🗑️ Eliminar</button>` : ''}
            </div>
        </form>
    `;
    
    abrirModal(esEdicion ? 'Editar Trabajador' : 'Nuevo Trabajador', contenido);
    
    // Event listener form
    setTimeout(() => {
        document.getElementById('form-trabajador')?.addEventListener('submit', (e) => {
            e.preventDefault();
            guardarTrabajador(trabajador?.id);
        });
    }, 100);
}

function actualizarIRLPreview() {
    const cargoId = document.getElementById('t-cargo')?.value;
    if (!cargoId) return;
    
    const cargo = DATOS_DEMO.cargos.find(c => c.id === cargoId);
    if (!cargo) return;
    
    const riesgos = cargo.riesgos || [];
    const previewEl = document.getElementById('irl-preview');
    const listEl = document.getElementById('irl-list');
    
    if (riesgos.length > 0) {
        previewEl.style.display = 'block';
        listEl.innerHTML = riesgos.map(r => `
            <div class="risk-item" style="padding: 8px; margin: 4px 0; background: ${r.nivel === 'alto' ? 'rgba(231, 76, 60, 0.2)' : r.nivel === 'medio' ? 'rgba(243, 156, 18, 0.2)' : 'rgba(46, 204, 113, 0.2)'}; border-radius: 4px;">
                <strong>${r.tipo}</strong> - ${r.descripcion} <span class="badge badge-${r.nivel}">${r.nivel.toUpperCase()}</span>
            </div>
        `).join('');
    }
}

async function guardarTrabajador(id = null) {
    try {
        const rut = document.getElementById('t-rut').value;
        if (!validarRUT(rut)) {
            mostrarToast('RUT inválido', 'error');
            return;
        }
        
        const trabajador = {
            id: id || generarId(),
            rut: formatearRUT(rut),
            nombre: document.getElementById('t-nombre').value,
            apellido: `${document.getElementById('t-apellido-p').value} ${document.getElementById('t-apellido-m').value}`.trim(),
            cargo: document.getElementById('t-cargo').value,
            centroTrabajo: document.getElementById('t-centro').value,
            telefono: document.getElementById('t-telefono').value,
            email: document.getElementById('t-email').value,
            fechaIngreso: document.getElementById('t-fecha-ingreso').value,
            prevision: document.getElementById('t-prevision').value,
            alergias: document.getElementById('t-alergias').value,
            empresaId: AppState.tenantId,
            activo: true,
            creado: new Date().toISOString()
        };
        
        // En producción: db.collection('trabajadores').add()
        if (id) {
            const idx = DATOS_DEMO.trabajadores.findIndex(t => t.id === id);
            if (idx >= 0) DATOS_DEMO.trabajadores[idx] = { ...DATOS_DEMO.trabajadores[idx], ...trabajador };
        } else {
            DATOS_DEMO.trabajadores.push(trabajador);
        }
        
        mostrarToast(id ? 'Trabajador actualizado' : 'Trabajador creado', 'success');
        cerrarModal();
        cargarTrabajadores();
        
    } catch (error) {
        console.error('Error guardando trabajador:', error);
        mostrarToast('Error al guardar', 'error');
    }
}

// ============================================
// MÓDULO: IPER / IRL
// ============================================

function cargarIPER() {
    const seccion = document.getElementById('section-iper');
    if (!seccion) return;
    
    seccion.innerHTML = `
        <div class="section-header">
            <h2>⚠️ Matriz IPER - Identificación de Peligros y Evaluación de Riesgos</h2>
            <div class="actions">
                <button class="btn btn-secondary" style="width:auto;" onclick="generarIPERGeneral()">🔄 Generar IPER General</button>
                <button class="btn btn-primary" style="width:auto;" onclick="exportarIPER()">📥 Exportar</button>
            </div>
        </div>
        
        <div class="iper-cards">
            <div class="iper-card">
                <h3>📋 Matriz IPER General</h3>
                <div class="iper-stats">
                    <div class="stat-item">
                        <span class="stat-number">${DATOS_DEMO.iper.riesgos.filter(r => r.nivel === 'critico').length}</span>
                        <span class="stat-label">Críticos</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${DATOS_DEMO.iper.riesgos.filter(r => r.nivel === 'alto').length}</span>
                        <span class="stat-label">Altos</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${DATOS_DEMO.iper.riesgos.filter(r => r.nivel === 'medio').length}</span>
                        <span class="stat-label">Medios</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${DATOS_DEMO.iper.riesgos.filter(r => r.nivel === 'bajo').length}</span>
                        <span class="stat-label">Bajos</span>
                    </div>
                </div>
                
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Peligro</th>
                            <th>Riesgo</th>
                            <th>Prob.</th>
                            <th>Cons.</th>
                            <th>Nivel</th>
                            <th>Control</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${DATOS_DEMO.iper.riesgos.map(r => `
                            <tr>
                                <td>${r.peligro}</td>
                                <td>${r.riesgo}</td>
                                <td>${r.probabilidad}</td>
                                <td>${r.consecuencia}</td>
                                <td><span class="badge badge-${r.nivel}">${r.nivel.toUpperCase()}</span></td>
                                <td>${r.control || 'Pendiente'}</td>
                                <td>
                                    <button class="btn-icon" onclick="editarRiesgo('${r.id}')">✏️</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="recomendaciones-ia">
            <h3>🤖 Recomendaciones IA</h3>
            <div class="ia-suggestions">
                ${generarRecomendacionesIA()}
            </div>
        </div>
    `;
}

function generarRecomendacionesIA() {
    const criticos = DATOS_DEMO.iper.riesgos.filter(r => r.nivel === 'critico' || r.nivel === 'alto');
    
    if (criticos.length === 0) {
        return '<p class="empty-state">No hay riesgos críticos identificados.</p>';
    }
    
    return criticos.slice(0, 3).map(r => `
        <div class="ia-card">
            <div class="ia-card-header">
                <span class="ia-icon">🤖</span>
                <h4>${r.riesgo}</h4>
                <span class="badge badge-${r.nivel}">${r.nivel.toUpperCase()}</span>
            </div>
            <div class="ia-card-body">
                <p><strong>Sugerencia IA:</strong> Implementar ${r.controlSugerido || 'protocolo de seguridad específico'} para mitigar el riesgo de ${r.riesgo.toLowerCase()}.</p>
                <div class="ia-actions">
                    <button class="btn btn-sm btn-secondary" onclick="editarRecomendacion('${r.id}')">✏️ Editar</button>
                    <button class="btn btn-sm btn-primary" onclick="aplicarRecomendacion('${r.id}')">✅ Aplicar</button>
                    <button class="btn btn-sm btn-danger" onclick="descartarRecomendacion('${r.id}')">🗑️ Descartar</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// MÓDULO: CAPACITACIONES
// ============================================

function cargarCapacitaciones() {
    const seccion = document.getElementById('section-capacitaciones');
    if (!seccion) return;
    
    // ... implementación similar a trabajadores
    seccion.innerHTML = `
        <div class="section-header">
            <h2>🎓 Aula Virtual - Capacitaciones SST</h2>
            <div class="actions">
                <button class="btn btn-secondary" style="width:auto;" onclick="generarCapsulaIA()">🤖 Generar Cápsula IA</button>
                <button class="btn btn-primary" style="width:auto;" onclick="nuevaCapacitacion()">➕ Nueva Capacitación</button>
            </div>
        </div>
        
        <div class="capsulas-grid">
            ${DATOS_DEMO.capacitaciones.map(c => `
                <div class="capsula-card ${c.tipo === 'transversal' ? 'transversal' : 'especifica'}">
                    <div class="capsula-header">
                        <span class="capsula-badge">${c.tipo === 'transversal' ? '🌍 Transversal' : '🎯 Específica'}</span>
                        <h3>${c.titulo}</h3>
                        <p>${c.descripcion}</p>
                    </div>
                    <div class="capsula-meta">
                        <span>⏱️ ${c.duracion} min</span>
                        <span>👥 ${c.asistentes || 0} asistentes</span>
                        <span>⭐ ${c.calificacion || 'N/A'}</span>
                    </div>
                    <div class="capsula-actions">
                        <button class="btn btn-sm btn-primary" onclick="iniciarCapacitacion('${c.id}')">▶️ Iniciar</button>
                        <button class="btn btn-sm btn-secondary" onclick="editarCapacitacion('${c.id}')">✏️</button>
                        ${c.tipo === 'transversal' ? `<button class="btn btn-sm btn-success" onclick="asignarAColaborador('${c.id}')">👤 Asignar</button>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="procedimientos-section">
            <h3>📄 Capacitaciones derivadas de Procedimientos</h3>
            <p class="hint">Sube un procedimiento y genera cápsulas automáticamente</p>
            <input type="file" id="upload-procedimiento" accept=".pdf,.doc,.docx" onchange="procesarProcedimiento(this)">
        </div>
    `;
}

// ============================================
// MÓDULO: CONTRATISTAS
// ============================================

function cargarContratistas() {
    const seccion = document.getElementById('section-contratistas');
    if (!seccion) return;
    
    // Solo admin puede ver contratistas
    if (!AppState.tienePermiso('contratistas.ver')) {
        seccion.innerHTML = `<div class="error-state">No tienes permiso para ver esta sección.</div>`;
        return;
    }
    
    seccion.innerHTML = `
        <div class="section-header">
            <h2>🤝 Gestión de Contratistas</h2>
            <p class="legal-notice">Cumplimiento Ley 20.940 - Subcontratación</p>
            <button class="btn btn-primary" style="width:auto;" onclick="vincularContratista()">🔗 Vincular Contratista</button>
        </div>
        
        <div class="contratistas-list">
            ${DATOS_DEMO.contratistas.length === 0 ? '<p class="empty-state">No hay contratistas vinculados</p>' : DATOS_DEMO.contratistas.map(c => `
                <div class="contratista-card">
                    <div class="contratista-info">
                        <h4>${c.nombre}</h4>
                        <p>RUT: ${c.rut}</p>
                        <p>Contrato: ${c.tipoContrato}</p>
                    </div>
                    <div class="contratista-cumplimiento">
                        <div class="cumplimiento-bar">
                            <div class="fill" style="width: ${c.cumplimiento}%"></div>
                        </div>
                        <span>${c.cumplimiento}% cumplimiento SST</span>
                    </div>
                    <button class="btn btn-sm btn-secondary" onclick="auditarContratista('${c.id}')">📋 Auditar</button>
                </div>
            `).join('')}
        </div>
    `;
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Login
    document.getElementById('btn-login')?.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
    
    // Registro
    document.getElementById('register-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarPantalla('register-screen');
    });
    
    document.getElementById('btn-register')?.addEventListener('click', () => {
        const datos = {
            nombreEmpresa: document.getElementById('reg-nombre-empresa').value,
            rutEmpresa: document.getElementById('reg-rut-empresa').value,
            nombreAdmin: document.getElementById('reg-nombre-admin').value,
            email: document.getElementById('reg-email').value,
            password: document.getElementById('reg-password').value,
            passwordConfirm: document.getElementById('reg-password-confirm').value
        };
        register(datos);
    });
    
    document.getElementById('btn-back-login')?.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarPantalla('login-screen');
    });
    
    // Logout
    document.getElementById('btn-logout')?.addEventListener('click', logout);
    
    // Navegación sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const seccion = item.dataset.section;
            cambiarSeccion(seccion);
        });
    });
    
    // Mobile menu
    document.getElementById('menu-toggle')?.addEventListener('click', () => {
        document.querySelector('.sidebar')?.classList.toggle('mobile-open');
    });
    
    // Verificar sesión existente
    const sesionGuardada = sessionStorage.getItem('gesstia_user');
    if (sesionGuardada) {
        try {
            const usuario = JSON.parse(sesionGuardada);
            const empresa = DATOS_DEMO.empresas.find(e => e.id === usuario.empresaId);
            AppState.init(usuario, empresa, usuario.rol);
            cambiarPantalla('dashboard-screen');
        } catch (e) {
            console.error('Error restaurando sesión:', e);
        }
    }
    
    // Renderizar sección inicial
    cambiarSeccion('inicio');
});

// Utility: loading
function mostrarLoading(show) {
    const btn = document.getElementById('btn-login');
    if (btn) {
        btn.querySelector('.btn-text').style.display = show ? 'none' : 'inline';
        btn.querySelector('.btn-loading').style.display = show ? 'inline' : 'none';
        btn.disabled = show;
    }
}
