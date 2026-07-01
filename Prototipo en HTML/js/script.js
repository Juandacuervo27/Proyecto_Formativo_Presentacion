// ==========================================================================
// CONTROLADOR LOGICO DE INTERFACES - COSMETICLAB
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------------------------
    // 1. CAPTURA DE COMPONENTES DEL DOM
    // -----------------------------------------------------------------------
    const btnOpenLogin = document.getElementById('btn-open-login');
    const navInicio    = document.getElementById('nav-inicio');
    const navLogo      = document.getElementById('nav-logo');
    const navProductos = document.getElementById('nav-productos');
    const navNosotros  = document.getElementById('nav-nosotros');
    const navContacto  = document.getElementById('nav-contacto');
    const navServicios = document.getElementById('nav-servicios');

    // Todas las vistas registradas
    const allViews = {
        home:      document.getElementById('view-home'),
        login:     document.getElementById('view-login'),
        productos: document.getElementById('view-productos'),
        nosotros:  document.getElementById('view-nosotros'),
        servicios: document.getElementById('view-servicios'),
        contacto:  document.getElementById('view-contacto'),
    };

    // Todos los nav-items para gestionar el estado activo
    const navItems = document.querySelectorAll('.nav-item');


    // -----------------------------------------------------------------------
    // 2. FUNCIÓN CENTRAL DE CAMBIO DE VISTA
    // -----------------------------------------------------------------------
    const showView = (targetKey, activeNavId = null) => {
        // Oculta todas las vistas
        Object.values(allViews).forEach(v => v && v.classList.add('hide-view'));

        // Muestra la vista objetivo
        if (allViews[targetKey]) {
            allViews[targetKey].classList.remove('hide-view');
        }

        // Actualiza el estado activo del menú
        navItems.forEach(item => item.classList.remove('active'));
        if (activeNavId) {
            const activeEl = document.getElementById(activeNavId);
            if (activeEl) activeEl.classList.add('active');
        }

        // Scroll suave al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    // -----------------------------------------------------------------------
    // 3. ASIGNACIÓN DE EVENTOS DE NAVEGACIÓN
    // -----------------------------------------------------------------------

    // Login
    btnOpenLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showView('login');
    });

    // Inicio (logo y enlace "Inicio")
    const goHome = (e) => { e.preventDefault(); showView('home', 'nav-inicio'); };
    navInicio.addEventListener('click', goHome);
    navLogo.addEventListener('click', goHome);

    // Secciones nuevas
    navProductos.addEventListener('click', (e) => { e.preventDefault(); showView('productos', 'nav-productos'); });
    navNosotros.addEventListener('click',  (e) => { e.preventDefault(); showView('nosotros',  'nav-nosotros');  });
    navServicios.addEventListener('click', (e) => { e.preventDefault(); showView('servicios', 'nav-servicios'); });
    navContacto.addEventListener('click',  (e) => { e.preventDefault(); showView('contacto',  'nav-contacto');  });

    // Botones "Ver productos" del Home
    document.querySelectorAll('.btn-ver-productos').forEach(btn => {
        btn.addEventListener('click', (e) => { e.preventDefault(); showView('productos', 'nav-productos'); });
    });


    // -----------------------------------------------------------------------
    // 4. LOGIN — TOGGLE CONTRASEÑA Y SUBMIT
    // -----------------------------------------------------------------------
    const btnTogglePassword = document.getElementById('btn-toggle-pwd');
    const passwordInput     = document.getElementById('password');

    btnTogglePassword.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            btnTogglePassword.textContent = '🔒';
        } else {
            passwordInput.type = 'password';
            btnTogglePassword.textContent = '👁️';
        }
    });

    const loginForm = document.getElementById('form-login-element');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailValue = document.getElementById('email').value;
        alert(`¡Bienvenido de nuevo a CosmeticLAB!\nSesión iniciada correctamente con: ${emailValue}`);
        showView('home', 'nav-inicio');
        loginForm.reset();
    });


    // -----------------------------------------------------------------------
    // 5. AGENDAMIENTO DE SERVICIOS — MODAL
    // -----------------------------------------------------------------------
    const bookingModal   = document.getElementById('booking-modal');
    const modalServiceName = document.getElementById('modal-service-name');
    const btnCloseBooking  = document.getElementById('btn-close-booking');
    const btnConfirmBooking = document.getElementById('btn-confirm-booking');

    // Abrir modal al pulsar "Agendar ahora"
    document.querySelectorAll('.btn-book').forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceName = btn.getAttribute('data-service');
            modalServiceName.textContent = serviceName;
            bookingModal.classList.remove('hide-view');
            document.body.style.overflow = 'hidden'; // bloquea scroll
        });
    });

    // Cerrar modal
    const closeModal = () => {
        bookingModal.classList.add('hide-view');
        document.body.style.overflow = '';
    };

    btnCloseBooking.addEventListener('click', closeModal);

    // Cerrar al hacer clic fuera de la tarjeta
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) closeModal();
    });

    // Confirmar cita
    btnConfirmBooking.addEventListener('click', () => {
        alert(`¡Cita agendada para "${modalServiceName.textContent}"!\nNos pondremos en contacto pronto para confirmar.`);
        closeModal();
    });


    // -----------------------------------------------------------------------
    // 6. FORMULARIO DE CONTACTO
    // -----------------------------------------------------------------------
    const contactForm = document.getElementById('form-contact');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Mensaje enviado! Te responderemos en menos de 24 horas. 💙');
        contactForm.reset();
    });


    // -----------------------------------------------------------------------
    // 7. FILTROS DE CATÁLOGO (visual — sin backend aún)
    // -----------------------------------------------------------------------
    document.querySelectorAll('.filter-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // Quita activo del mismo grupo (mismo ul)
            const siblings = item.closest('ul').querySelectorAll('.filter-item');
            siblings.forEach(s => s.classList.remove('active'));
            item.classList.add('active');
        });
    });

});
JSEOF