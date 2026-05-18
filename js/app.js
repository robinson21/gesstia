/**
 * GeSSTia - Funciones Compartidas
 */

// Verificar sesión al cargar
function checkAuth() {
    const session = localStorage.getItem('gesstia_session');
    if (!session) {
        // Si estamos en una página que no es login, redirigir
        if (!window.location.href.includes('index.html') && window.location.pathname !== '/') {
            window.location.href = 'index.html';
        }
        return null;
    }
    return JSON.parse(session);
}

// Login
function doLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    const btn = document.getElementById('btn-login');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Cargando...';
    btn.disabled = true;
    
    setTimeout(() => {
        const user = DATOS_DEMO.usuarios.find(u => u.email === email && u.password === password);
        
        if (!user) {
            alert('Credenciales incorrectas');
            btn.innerHTML = originalText;
            btn.disabled = false;
            return;
        }
        
        localStorage.setItem('gesstia_session', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    }, 500);
}

// Logout
function doLogout() {
    if (confirm('¿Cerrar sesión?')) {
        localStorage.removeItem('gesstia_session');
        window.location.href = 'index.html';
    }
}

// Cargar datos de usuario en sidebar
function loadUserData() {
    const session = checkAuth();
    if (!session) return;
    
    const userNameEl = document.getElementById('user-name');
    const userAvatarEl = document.getElementById('user-avatar');
    
    if (userNameEl) userNameEl.textContent = session.nombre || 'Usuario';
    if (userAvatarEl) userAvatarEl.textContent = (session.nombre || 'U')[0].toUpperCase();
}

// Inicializar navegación activa
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'dashboard';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href')?.replace('.html', '') || '';
        if (href === currentPage || (currentPage === 'index' && href === 'dashboard')) {
            link.classList.add('active');
        }
    });
}

// Marcar sección activa en sidebar basado en data-attribute
function markActiveSection(section) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === section) {
            link.classList.add('active');
        }
    });
}
