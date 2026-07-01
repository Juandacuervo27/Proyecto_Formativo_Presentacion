document.addEventListener("DOMContentLoaded", () => {

    const progressBar = document.getElementById("progressBar");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalClose = document.getElementById("modalClose");
    const docModal = document.getElementById("docModal");
    const docModalContent = document.getElementById("docModalContent");
    const docModalClose = document.getElementById("docModalClose");

    const updateProgressBar = () => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", updateProgressBar, { passive: true });
    updateProgressBar();

    // ==========================
    // Resaltar la sección activa
    // ==========================
    const mainContent = document.querySelector("main");
    const targets = document.querySelectorAll("main section, main [id]");
    const navLinks = document.querySelectorAll(".sidebar nav a");

    const observer = new IntersectionObserver((entries) => {
        const visibleEntry = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;

        navLinks.forEach(link => link.classList.remove("active"));

        const id = visibleEntry.target.getAttribute("id");
        const current = document.querySelector(`.sidebar nav a[href="#${id}"]`);

        if (current) {
            current.classList.add("active");
        }
    }, {
        root: mainContent,
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-10% 0px -35% 0px"
    });

    targets.forEach(target => observer.observe(target));

    // ==========================
    // Scroll suave del menú
    // ==========================
    navLinks.forEach(link => {

        link.addEventListener("click", (e) => {

            e.preventDefault();

            const targetId = link.getAttribute("href")?.slice(1);
            const target = targetId ? document.getElementById(targetId) : null;

            if (target && mainContent) {
                const topOffset = window.innerWidth < 1024 ? 100 : 24;
                const targetPosition = target.offsetTop - topOffset;

                mainContent.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

                navLinks.forEach(item => item.classList.remove("active"));
                link.classList.add("active");
            }

        });

    });

    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    };

    const closeDocModal = () => {
        docModal.classList.remove("active");
        docModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    document.querySelectorAll(".diagram-container img, .section-media img, .card-media img").forEach(image => {
        image.addEventListener("click", () => {
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.querySelectorAll(".btn-doc").forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.docTarget;
            const template = targetId ? document.getElementById(targetId) : null;

            if (docModalContent && template) {
                const title = template.querySelector("h2")?.textContent?.trim() || "Documento";
                const icon = button.dataset.docIcon || "📄";
                const label = button.dataset.docLabel || "Documento";
                const body = template.innerHTML.replace(/<h2[^>]*>[\s\S]*?<\/h2>/i, "");

                docModalContent.innerHTML = `
                    <div class="doc-modal__header">
                        <div class="doc-modal__icon">${icon}</div>
                        <div>
                            <div class="doc-modal__eyebrow">${label}</div>
                            <h2>${title}</h2>
                        </div>
                    </div>
                    <div class="doc-modal__body">${body}</div>
                `;
            }

            if (docModal) {
                docModal.classList.add("active");
                docModal.setAttribute("aria-hidden", "false");
                docModal.setAttribute("data-accent", targetId || "doc-default");
            }
            document.body.style.overflow = "hidden";
        });
    });

    docModalClose.addEventListener("click", closeDocModal);
    docModal.addEventListener("click", (event) => {
        if (event.target.dataset.close === "true") {
            closeDocModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
            closeDocModal();
        }
    });

    // ==========================
    // Efectos hover en botones
    // ==========================
    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("mouseenter", () => {
            button.style.transform = "translateY(-4px)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });

    });

    // ==========================
    // Efectos hover en tarjetas
    // ==========================
    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-8px)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });

    });

    // ============================================
    // FUNCIONALIDADES FUTURAS
    // ============================================
    // - Modal para ampliar diagramas
    // - Galería interactiva de imágenes
    // - Visor de documentos PDF
    // - Integración con Figma en tiempo real
    // - Animaciones adicionales de scroll
    // - Reproductor de videos
    // ============================================

});