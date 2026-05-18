/**
 * GeSSTia - Aplicación Principal (Stable v1.0.1)
 * Gestión Integral de Seguridad y Salud en el Trabajo
 * Chile 2026 - Modo Demo Local
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
    logueado: false,
    
    init(user, empresaData, rol) {
        this.usuario = user;
        this.empresa = empresaData;
        this.rol = rol;
        this.tenantId = empresaData?.id || null;
        this.logueado = true;
    },
    
    tienePermiso(permiso) {
        const permisosMap = {
            super_admin: ['*'],
            admin: ['*'],
            supervisor: ['inicio', 'empresa', 'trabajadores', 'iper', 'capacitaciones', 'reportes'],
            colaborador: ['inicio', 'perfil']
        };
        const permisosRol = permisosMap[this.rol] || [];
        return permisosRol.includes('*') || permisosRol.includes(permiso);
    },
    
    reset() {
        this.usuario = null;
        this.empresa = null;
        this.rol = null;
        this.tenantId = null;
        this.logueado = false;
    }
};

// ============================================
// NAVEGACIÓN
// ============================================

function cambiarPantalla(pantallaId) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    const pantalla = document.getElementById(pantallaId);
    if (pantalla) pantalla.classList.add('active');
}

function cambiarSeccion(seccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
    });
    
    // Mostrar sección seleccionada
    const seccionEl = document.getElementById('section-' + seccion);
    if (seccionEl) {
        seccionEl.classList.add('active');
        seccionEl.style.display = 'block';
        AppState.seccionActual = seccion;
        
        // Cargar contenido específico
        cargarSeccion(seccion);
    }
    
    // Actualizar nav activo
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === seccion) item.classList.add('active');
    });
    
    // Cerrar sidebar en mobile
    document.querySelector('.sidebar')?.classList.remove('mobile-open');
}

// ============================================
// LOGIN / LOGOUT
// ============================================

function doLogin() {
    const emailVal = document.getElementById('email')?.value?.trim();
    const passVal = document.getElementById('password')?.value;
    
    console.log('🔐 Intentando login con:', emailVal);
    
    if (!emailVal || !passVal) {
        mostrarToast('Complete email y contraseña', 'error');
        return;
    }
    
    // Buscar usuario demo
    const user = DATOS_DEMO.usuarios.find(u => u.email === emailVal && u.password === passVal);
    
    if (!user) {
        mostrarToast('Credenciales incorrectas', 'error');
        return;
    }
    
    // Encontrar empresa
    const empresa = DATOS_DEMO.empresas.find(e => e.id === (user.empresaId || 'emp-001'));
    
    // Inicializar estado
    AppState.init(user, empresa, user.rol);
    sessionStorage.setItem('gesstia_session', JSON.stringify({ email: user.email, rol: user.rol }));
    
    // Actualizar UI
    const userNameEl = document.getElementById('user-name');
    if (userNameEl) userNameEl.textContent = user.nombre || user.email;
    
    // Ir al dashboard
    cambiarPantalla('dashboard-screen');
    cambiarSeccion('inicio');
    mostrarToast('¡Bienvenido, ' + (user.nombre || 'Usuario') + '!', 'success');
    
    // Actualizar stats
    actualizarStats();
}

function doLogout() {
    AppState.reset();
    sessionStorage.removeItem('gesstia_session');
    cambiarPantalla('login-screen');
    mostrarToast('Sesión cerrada', 'info');
}

// ============================================
// CARGAR SECCIONES
// ============================================

function cargarSeccion(seccion) {
    switch(seccion) {
        case 'inicio': actualizarStats(); break;
        case 'trabajadores': cargarTrabajadores(); break;
        case 'iper': cargarIPER(); break;
        case 'capacitaciones': cargarCapacitaciones(); break;
        case 'contratistas': cargarContratistas(); break;
        case 'reportes': cargarReportes(); break;
        case 'empresa': cargarEmpresa(); break;
        case 'firmas': cargarFirmas(); break;
        default: break;
    }
}

function actualizarStats() {
    const sTrab = document.getElementById('stat-trabajadores');
    const sRiesgo = document.getElementById('stat-riesgos');
    const sCap = document.getElementById('stat-capacitaciones');
    const sFirma = document.getElementById('stat-firmas');
    
    if (sTrab) sTrab.textContent = (DATOS_DEMO.trabajadores || []).length;
    if (sRiesgo) sRiesgo.textContent = ((DATOS_DEMO.iper?.riesgos || []).filter(r => r.nivel === 'critico' || r.nivel === 'alto').length);
    if (sCap) sCap.textContent = (DATOS_DEMO.capacitaciones || []).length;
    if (sFirma) sFirma.textContent = (DATOS_DEMO.firmas || []).filter(f => !f.fechaFirma).length;
}

// ============================================
// TRABAJADORES
// ============================================

function cargarTrabajadores() {
    const container = document.getElementById('section-trabajadores');
    if (!container) return;
    
    const trabajadores = DATOS_DEMO.trabajadores || [];
    
    let html = '<h2>👷 Trabajadores</h2>';
    html += '<button class="btn btn-primary" onclick="abrirModalTrabajador()" style="width:auto;margin-bottom:20px;">➕ Agregar Trabajador</button>';
    html += '<div class="data-table-container"><table border="1" cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;background:var(--color-card);color:var(--color-text);border-color:var(--color-border);">';
    html += '<thead style="background:var(--color-secondary);"><tr><th>RUN</th><th>Nombre</th><th>Cargo</th><th>Centro</th><th>Estado</th></tr></thead>';
    html += '<tbody>';
    
    trabajadores.forEach(t => {
        html += `<tr style="border-bottom:1px solid var(--color-border);">
            <td>${t.rut || ''}</td>
            <td>${t.nombre || ''} ${t.apellido || ''}</td>
            <td>${t.cargo || ''}</td>
            <td>${t.centroTrabajo || ''}</td>
            <td><span style="color:${t.activo ? '#2ecc71' : '#e74c3c'};">${t.activo ? 'Activo' : 'Inactivo'}</span></td>
        </tr>`;
    });
    
    html += '</tbody></table></div>';
    container.innerHTML = html;
}

function abrirModalTrabajador() {
    abrirModal('Nuevo Trabajador', '<p>Formulario de registro de trabajador (demo)</p>');
}

// ============================================
// IPER
// ============================================

function cargarIPER() {
    const container = document.getElementById('section-iper');
    if (!container) return;
    
    const riesgos = (DATOS_DEMO.iper?.riesgos || []);
    
    let html = '<h2>⚠️ Matriz IPER</h2>';
    html += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">';
    html += `<div style="background:var(--color-card);padding:16px;border-radius:8px;text-align:center;"><div style="font-size:2rem;font-weight:bold;color:#e74c3c;">${riesgos.filter(r => r.nivel === 'critico').length}</div><div>Críticos</div></div>`;
    html += `<div style="background:var(--color-card);padding:16px;border-radius:8px;text-align:center;"><div style="font-size:2rem;font-weight:bold;color:#f39c12;">${riesgos.filter(r => r.nivel === 'alto').length}</div><div>Altos</div></div>`;
    html += `<div style="background:var(--color-card);padding:16px;border-radius:8px;text-align:center;"><div style="font-size:2rem;font-weight:bold;color:#f39c12;">${riesgos.filter(r => r.nivel === 'medio').length}</div><div>Medios</div></div>`;
    html += `<div style="background:var(--color-card);padding:16px;border-radius:8px;text-align:center;"><div style="font-size:2rem;font-weight:bold;color:#2ecc71;">${riesgos.filter(r => r.nivel === 'bajo').length}</div><div>Bajos</div></div>`;
    html += '</div>';
    
    html += '<div class="data-table-container"><table border="1" cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;background:var(--color-card);color:var(--color-text);border-color:var(--color-border);">';
    html += '<thead style="background:var(--color-secondary);"><tr><th>Peligro</th><th>Riesgo</th><th>Prob</th><th>Cons</th><th>Nivel</th><th>Control</th></tr></thead>';
    html += '<tbody>';
    
    riesgos.forEach(r => {
        const colorNivel = r.nivel === 'critico' ? '#e74c3c' : r.nivel === 'alto' ? '#f39c12' : r.nivel === 'medio' ? '#f39c12' : '#2ecc71';
        html += `<tr style="border-bottom:1px solid var(--color-border);">
            <td>${r.peligro}</td>
            <td>${r.riesgo}</td>
            <td style="text-align:center;">${r.probabilidad}</td>
            <td style="text-align:center;">${r.consecuencia}</td>
            <td style="color:${colorNivel};font-weight:bold;text-transform:uppercase;">${r.nivel}</td>
            <td>${r.control?.substring(0, 50)}...</td>
        </tr>`;
    });
    
    html += '</tbody></table></div>';
    container.innerHTML = html;
}

// ============================================
// CAPACITACIONES
// ============================================

function cargarCapacitaciones() {
    const container = document.getElementById('section-capacitaciones');
    if (!container) return;
    
    const caps = DATOS_DEMO.capacitaciones || [];
    
    let html = '<h2>🎓 Capacitaciones</h2>';
    html += '<div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(300px,1fr));gap:16px;">';
    
    caps.forEach(c => {
        html += `<div style="background:var(--color-card);padding:20px;border-radius:12px;border:1px solid var(--color-border);">
            <div style="color:var(--color-highlight);font-size:0.85rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">${c.tipo === 'transversal' ? '🌍 Transversal' : '🎯 Específica'}</div>
            <h3 style="margin:0 0 8px 0;">${c.titulo}</h3>
            <p style="color:var(--color-text-dim);font-size:0.9rem;margin-bottom:12px;">${c.descripcion}</p>
            <div style="display:flex;gap:16px;color:var(--color-text-dim);font-size:0.85rem;">
                <span>⏱️ ${c.duracion} min</span>
                <span>👥 ${c.asistentes}</span>
                <span>⭐ ${c.calificacion}</span>
            </div>
        </div>`;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// ============================================
// CONTRATISTAS, REPORTES, EMPRESA, FIRMAS
// ============================================

function cargarContratistas() {
    const container = document.getElementById('section-contratistas');
    if (!container) return;
    
    const contratistas = DATOS_DEMO.contratistas || [];
    let html = '<h2>🤝 Contratistas</h2>';
    html += '<p style="color:var(--color-text-dim);margin-bottom:16px;">Cumplimiento Ley 20.940 - Subcontratación</p>';
    
    contratistas.forEach(c => {
        html += `<div style="background:var(--color-card);padding:20px;border-radius:12px;margin-bottom:12px;border:1px solid var(--color-border);">
            <h3>${c.nombre}</h3>
            <p>RUT: ${c.rut}</p>
            <p>Contrato: ${c.tipoContrato}</p>
            <div style="margin-top:12px;">
                <div style="background:var(--color-bg);height:8px;border-radius:4px;overflow:hidden;">
                    <div style="width:${c.cumplimiento}%;height:100%;background:linear-gradient(90deg,#2ecc71,#f39c12);border-radius:4px;"></div>
                </div>
                <span style="color:var(--color-text-dim);font-size:0.85rem;">${c.cumplimiento}% cumplimiento</span>
            </div>
        </div>`;
    });
    
    container.innerHTML = html;
}

function cargarReportes() {
    const container = document.getElementById('section-reportes');
    if (!container) return;
    container.innerHTML = '<h2>📊 Reportes</h2><p style="color:var(--color-text-dim);">Módulo de reportes y estadísticas (en desarrollo)</p>';
}

function cargarEmpresa() {
    const container = document.getElementById('section-empresa');
    if (!container) return;
    container.innerHTML = '<h2>🏢 Mi Empresa</h2><p style="color:var(--color-text-dim);">Configuración de empresa (en desarrollo)</p>';
}

function cargarFirmas() {
    const container = document.getElementById('section-firmas');
    if (!container) return;
    container.innerHTML = '<h2>✍️ Firmas Digitales</h2><p style="color:var(--color-text-dim);">Gestión de firmas digitales (en desarrollo)</p>';
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 GeSSTia v1.0.1 iniciando...');
    
    // Botón login
    const btnLogin = document.getElementById('btn-login');
    if (btnLogin) {
        btnLogin.addEventListener('click', (e) => {
            e.preventDefault();
            doLogin();
        });
    }
    
    // Botón registro
    const btnReg = document.getElementById('btn-register');
    if (btnReg) {
        btnReg.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Registro:Funciona en modo demo, usa login con admin@losandes.cl / Demo1234!');
        });
    }
    
    // Links registro y forgot
    document.getElementById('register-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarPantalla('register-screen');
    });
    
    document.getElementById('btn-back-login')?.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarPantalla('login-screen');
    });
    
    document.getElementById('forgot-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Recuperar contraseña (demo)');
    });
    
    // Logout
    document.getElementById('btn-logout')?.addEventListener('click', (e) => {
        e.preventDefault();
        doLogout();
    });
    
    // Navegación
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            cambiarSeccion(item.dataset.section);
        });
    });
    
    // Mobile menu
    document.getElementById('menu-toggle')?.addEventListener('click', () => {
        document.querySelector('.sidebar')?.classList.toggle('mobile-open');
    });
    
    // Verificar sesión existente
    const saved = sessionStorage.getItem('gesstia_session');
    if (saved) {
        try {
            const session = JSON.parse(saved);
            const user = DATOS_DEMO.usuarios.find(u => u.email === session.email);
            if (user) {
                const empresa = DATOS_DEMO.empresas[0];
                AppState.init(user, empresa, user.rol);
                cambiarPantalla('dashboard-screen');
                cambiarSeccion('inicio');
                actualizarStats();
            }
        } catch (e) { console.error('Error restaurando sesión:', e); }
    }
    
    console.log('✅ GeSSTia listo');
});
