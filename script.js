
document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".ember-navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        });
    }

    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* ================================
       3. ACTIVE NAVIGATION
    ================================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".ember-navbar .nav-link");

    if (sections.length && navLinks.length) {

        window.addEventListener("scroll", () => {

            let currentSection = "";

            sections.forEach(section => {

                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {
                    currentSection = section.getAttribute("id");
                }
            });

            navLinks.forEach(link => {

                link.classList.remove("active");

                const href = link.getAttribute("href");

                if (href === `#${currentSection}`) {
                    link.classList.add("active");
                }
            });
        });
    }


    /* ================================
       4. CATEGORY CARD INTERACTION
    ================================= */

    const categoryCards = document.querySelectorAll(".category-card");

    categoryCards.forEach(card => {

        card.addEventListener("click", event => {

            const href = card.getAttribute("href");

            if (!href || href === "#") {
                event.preventDefault();

                card.style.transform = "scale(0.98)";

                setTimeout(() => {
                    card.style.transform = "";
                }, 150);
            }
        });
    });


    /* ================================
       5. MENU TABS
    ================================= */

    const menuTabs = document.querySelectorAll(".ember-menu-tabs .nav-link");
    const menuCards = document.querySelectorAll(".menu-card");

    if (menuTabs.length && menuCards.length) {

        menuTabs.forEach(tab => {

            tab.addEventListener("click", event => {

                event.preventDefault();

                menuTabs.forEach(item => {
                    item.classList.remove("active");
                });

                tab.classList.add("active");

                const category = tab.dataset.category;

                menuCards.forEach(card => {

                    const cardCategory = card.dataset.category;

                    if (
                        category === "all" ||
                        !category ||
                        cardCategory === category
                    ) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }


    /* ================================
       6. ADD TO CART
    ================================= */

    const addButtons = document.querySelectorAll(".menu-add-btn");

    let cartCount = 0;

    const cartCounter = document.querySelector(".cart-count");

    addButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();
            event.stopPropagation();

            cartCount++;

            if (cartCounter) {
                cartCounter.textContent = cartCount;
            }

            button.classList.add("added");

            const originalHTML = button.innerHTML;

            button.innerHTML = '<i class="bi bi-check"></i>';

            setTimeout(() => {

                button.innerHTML = originalHTML;
                button.classList.remove("added");

            }, 1000);
        });
    });


    /* ================================
       7. BUTTON PRESS EFFECT
    ================================= */

    const buttons = document.querySelectorAll(
        ".ember-primary-btn, .ember-outline-btn, .ember-nav-btn"
    );

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            button.style.transform = "scale(0.96)";

            setTimeout(() => {
                button.style.transform = "";
            }, 120);
        });
    });


    /* ================================
       8. SCROLL REVEAL
    ================================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".story-content, " +
        ".story-image-wrapper, " +
        ".category-card, " +
        ".menu-card, " +
        ".offer-wrapper, " +
        ".visit-content, " +
        ".visit-visual, " +
        ".reserve-content"
    );

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal-visible");

                    revealObserver.unobserve(entry.target);
                }
            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal-hidden");
        revealObserver.observe(element);
    });


    /* ================================
       9. HERO PARALLAX EFFECT
    ================================= */

    const heroImage = document.querySelector(".hero-image");

    if (heroImage) {

        window.addEventListener("scroll", () => {

            const scrollPosition = window.scrollY;

            if (scrollPosition < window.innerHeight) {

                heroImage.style.transform =
                `translateY(${scrollPosition * 0.08}px)`;
            }
        });
    }


    /* ================================
       10. RESERVATION BUTTON
    ================================= */

    const reservationButtons = document.querySelectorAll(
        ".reserve-buttons .ember-primary-btn, " +
        ".visit-buttons .ember-primary-btn"
    );

    reservationButtons.forEach(button => {

        button.addEventListener("click", event => {

            const href = button.getAttribute("href");

            if (!href || href === "#") {

                event.preventDefault();

                alert(
                    "Reservation booking will be available soon."
                );
            }
        });
    });


    /* ================================
       11. GALLERY LINK
    ================================= */

    const galleryLinks = document.querySelectorAll(
        ".visit-gallery-link"
    );

    galleryLinks.forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (!href || href === "#") {

                event.preventDefault();

                alert(
                    "Our gallery will be available soon."
                );
            }
        });
    });


    /* ================================
       12. IMAGE ERROR HANDLING
    ================================= */

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("error", () => {

            image.style.opacity = "0.4";

            console.warn(
                `Image could not be loaded: ${image.src}`
            );
        });
    });


    /* ================================
       13. CURRENT YEAR
    ================================= */

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* ================================
       14. BACK TO TOP
    ================================= */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener("click", event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* ================================
       15. CONSOLE MESSAGE
    ================================= */

    console.log("🔥 Ember JavaScript loaded successfully.");

});
