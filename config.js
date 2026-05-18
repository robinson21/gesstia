/**
 * GeSSTia - Configuración Principal (Stable)
 * Gestión Integral de Seguridad y Salud en el Trabajo
 * Chile 2026
 * 
 * MODO: Demo Local / Offline-First
 * Esta versión funciona 100% con datos locales sin depender de Supabase/Firebase
 */

// ============================================
// CONFIGURACIÓN
// ============================================
const APP_CONFIG = {
    name: 'GeSSTia',
    version: '1.0.0-demo',
    locale: 'es-CL',
    
    // Roles del sistema
    ROLES: {
        SUPER_ADMIN: 'super_admin',
        ADMIN: 'admin',
        SUPERVISOR: 'supervisor',
        COLABORADOR: 'colaborador'
    },
    
    // Permisos por rol
    PERMISOS: {
        super_admin: ['*'],
        admin: ['*'],
        supervisor: [
            'empresa.ver', 'trabajadores.ver', 'iper.ver',
            'capacitaciones.ver', 'capacitaciones.asignar', 'reportes.ver'
        ],
        colaborador: [
            'perfil.ver', 'capacitaciones.mis-capacitaciones', 'firmas.firmar'
        ]
    },
    
    // Estados de cumplimiento
    ESTADOS_CUMPLIMIENTO: [
        { id: 'completo', label: 'Cumple', color: '#2ecc71' },
        { id: 'parcial', label: 'Parcial', color: '#f39c12' },
        { id: 'pendiente', label: 'Pendiente', color: '#e74c3c' },
        { id: 'no-aplica', label: 'No Aplica', color: '#95a5a6' }
    ]
};

// ============================================
// SUPABASE (Opcional - para futuro)
// ============================================
let supabase = null;
let supabaseReady = false;

// Intentar inicializar Supabase si está disponible
function initSupabase() {
    try {
        if (typeof window !== 'undefined' && window.supabase) {
            supabase = window.supabase.createClient(
                "https://zpmcivfnwalqlmchajvn.supabase.co",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwbWNpdmZud2FscWxtY2hhanZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNTA3MjEsImV4cCI6MjA5NDYyNjcyMX0.jw-e6rthKiE-mhwRQMr514pcMoCeTLHIfOQvqUnikqY"
            );
            supabaseReady = true;
            console.log('✅ Supabase inicializado');
        } else {
            console.log('ℹ️ Supabase no disponible, usando modo demo local');
        }
    } catch (e) {
        console.log('ℹ️ Supabase no disponible, usando modo demo local');
    }
}

// ============================================
// FUNCIONES UTILITARIAS
// ============================================

function formatearRUT(rut) {
    if (!rut) return '';
    rut = rut.replace(/\./g, '').replace('-', '');
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    return cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
}

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

function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function mostrarToast(mensaje, tipo) {
    tipo = tipo || 'info';
    const container = document.getElementById('toast-container');
    if (!container) return;
    
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
        margin-top: 8px;
    `;
    toast.textContent = mensaje;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function abrirModal(titulo, contenido) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;
    
    modalBody.innerHTML = '<span class="modal-close" onclick="cerrarModal()">&times;</span>' +
        '<h2 style="margin-bottom: 20px; color: var(--color-highlight);">' + titulo + '</h2>' + contenido;
    
    modal.classList.add('active');
}

function cerrarModal() {
    document.getElementById('modal')?.classList.remove('active');
}

// Exportar
window.APP_CONFIG = APP_CONFIG;
window.supabase = supabase;
window.initSupabase = initSupabase;
window.formatearRUT = formatearRUT;
window.validarRUT = validarRUT;
window.generarId = generarId;
window.mostrarToast = mostrarToast;
window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;
