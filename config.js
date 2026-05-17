/**
 * GeSSTia - Configuración Principal
 * Gestión Integral de Seguridad y Salud en el Trabajo
 * Chile 2026 - Normativa DS 44, DS 594, Ley 16.744
 */

// ============================================
// CONFIGURACIÓN DE FIREBASE (Reemplazar con tus credenciales)
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyC_dEMO_KEY_GESSTIA_1234567890",
    authDomain: "gesstia-demo.firebaseapp.com",
    projectId: "gesstia-demo",
    storageBucket: "gesstia-demo.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};

// Inicializar Firebase (si no está inicializado)
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Referencias globales
const auth = firebase ? firebase.auth() : null;
const db = firebase ? firebase.firestore() : null;
const storage = firebase ? firebase.storage() : null;

// ============================================
// CONFIGURACIÓN DE LA APLICACIÓN
// ============================================
const APP_CONFIG = {
    name: 'GeSSTia',
    version: '1.0.0',
    locale: 'es-CL',
    currency: 'CLP',
   DateFormat: 'DD/MM/YYYY',
    
    // Roles del sistema
    ROLES: {
        SUPER_ADMIN: 'super_admin',
        ADMIN: 'admin',
        SUPERVISOR: 'supervisor',
        COLABORADOR: 'colaborador'
    },
    
    // Permisos por rol
    PERMISOS: {
        super_admin: ['*'], // Todo
        admin: [
            'empresa.ver', 'empresa.editar',
            'trabajadores.ver', 'trabajadores.crear', 'trabajadores.editar', 'trabajadores.eliminar',
            'iper.ver', 'iper.crear', 'iper.editar',
            'capacitaciones.ver', 'capacitaciones.crear', 'capacitaciones.editar',
            'contratistas.ver', 'contratistas.crear',
            'firmas.ver', 'firmas.crear',
            'reportes.ver'
        ],
        supervisor: [
            'empresa.ver',
            'trabajadores.ver',
            'iper.ver',
            'capacitaciones.ver', 'capacitaciones.asignar',
            'reportes.ver'
        ],
        colaborador: [
            'perfil.ver', 'perfil.editar',
            'capacitaciones.mis-capacitaciones',
            'firmas.firmar'
        ]
    },
    
    // Estados de cumplimiento normativo
    ESTADOS_CUMPLIMIENTO: [
        { id: 'completo', label: 'Cumple', color: '#2ecc71' },
        { id: 'parcial', label: 'Parcial', color: '#f39c12' },
        { id: 'pendiente', label: 'Pendiente', color: '#e74c3c' },
        { id: 'no-aplica', label: 'No Aplica', color: '#95a5a6' }
    ],
    
    // Niveles de riesgo IPER
    NIVELES_RIESGO: [
        { id: 'bajo', label: 'Bajo', valor: 1, color: '#2ecc71' },
        { id: 'medio', label: 'Medio', valor: 2, color: '#f39c12' },
        { id: 'alto', label: 'Alto', valor: 3, color: '#e67e22' },
        { id: 'critico', label: 'Crítico', valor: 4, color: '#e74c3c' }
    ],
    
    // Tipos de documentos
    TIPOS_DOCUMENTO: [
        { id: 'procedimiento', label: 'Procedimiento' },
        { id: 'protocolo', label: 'Protocolo' },
        { id: 'capacitacion', label: 'Capacitación' },
        { id: 'informe', label: 'Informe' },
        { id: 'checklist', label: 'Checklist' },
        { id: 'matriz-iper', label: 'Matriz IPER' },
        { id: 'evaluacion', label: 'Evaluación' }
    ]
};

// ============================================
// FUNCIONES UTILITARIAS
// ============================================

/**
 * Formatear RUT Chileno
 */
function formatearRUT(rut) {
    if (!rut) return '';
    rut = rut.replace(/\./g, '').replace('-', '');
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    return cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
}

/**
 * Validar RUT Chileno
 */
function validarRUT(rut) {
    rut = rut.replace(/\./g, '').replace('-', '');
    const cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    
    if (cuerpo.length < 7) return false;
    
    let suma = 0;
    let multiplo = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    
    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    
    return dv === dvCalculado;
}

/**
 * Formatear fecha
 */
function formatearFecha(fecha, formato = 'DD/MM/YYYY') {
    const d = new Date(fecha);
    const pad = (n) => n.toString().padStart(2, '0');
    
    const map = {
        'DD': pad(d.getDate()),
        'MM': pad(d.getMonth() + 1),
        'YYYY': d.getFullYear(),
        'HH': pad(d.getHours()),
        'mm': pad(d.getMinutes())
    };
    
    return formato.replace(/DD|MM|YYYY|HH|mm/g, match => map[match]);
}

/**
 * Generar ID único
 */
function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Mostrar toast notification
 */
function mostrarToast(mensaje, tipo = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const colores = {
        info: '#3498db',
        success: '#2ecc71',
        warning: '#f39c12',
        error: '#e74c3c'
    };
    
    toast.style.cssText = `
        background: ${colores[tipo] || colores.info};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        word-break: break-word;
    `;
    toast.textContent = mensaje;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============================================
// MANEJO DE MODALES
// ============================================

function abrirModal(titulo, contenido) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h2 style="margin-bottom: 20px; color: var(--color-highlight);">${titulo}</h2>
        ${contenido}
    `;
    
    modal.classList.add('active');
}

function cerrarModal() {
    document.getElementById('modal').classList.remove('active');
}

document.querySelector('.modal-close')?.addEventListener('click', cerrarModal);
document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) cerrarModal();
});

// Exportar configuración global
window.APP_CONFIG = APP_CONFIG;
window.formatearRUT = formatearRUT;
window.validarRUT = validarRUT;
window.formatearFecha = formatearFecha;
window.generarId = generarId;
window.mostrarToast = mostrarToast;
window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;
