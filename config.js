/**
 * GeSSTia - Configuración Principal
 * Gestión Integral de Seguridad y Salud en el Trabajo
 * Chile 2026 - Stack: Supabase + GitHub Pages
 */

// ============================================
// CONFIGURACIÓN DE SUPABASE (Producción)
// ============================================
const SUPABASE_CONFIG = {
    url: "https://zpmcivfnwalqlmchajvn.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwbWNpdmZud2FscWxtY2hhanZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNTA3MjEsImV4cCI6MjA5NDYyNjcyMX0.jw-e6rthKiE-mhwRQMr514pcMoCeTLHIfOQvqUnikqY"
};

// Importar Supabase client (se carga desde CDN)
let supabase = null;

document.addEventListener('DOMContentLoaded', async () => {
    if (typeof supabaseClient !== 'undefined') {
        supabase = supabaseClient.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        window.supabase = supabase;
        console.log('✅ Supabase inicializado');
    } else {
        console.warn('⚠️ Supabase Client no cargado. Cargando desde CDN...');
    }
});


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
