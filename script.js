"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       PAGE LOADER
    ========================= */

    const loader = document.getElementById("page-loader");
    const progressBar = document.getElementById("loader-progress");
    const percentage = document.getElementById("loader-percentage");

    let progress = 0;

    function updateLoader(value) {
        progress = Math.min(value, 100);

        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

        if (percentage) {
            percentage.textContent = Math.round(progress) + "%";
        }
    }

    /* Guaranteed loading animation */
    const loaderTimer = setInterval(function () {

        if (progress < 90) {
            progress += Math.random() * 8 + 4;
            updateLoader(progress);
        }

    }, 100);

    /* Never allow the loader to remain stuck */
    function finishLoader() {

        clearInterval(loaderTimer);

        updateLoader(100);

        setTimeout(function () {

            if (loader) {
                loader.classList.add("loaded");
            }

            document.body.classList.add("page-ready");

        }, 500);
    }

    /* Start immediately */
    updateLoader(5);

    /* Normal page load */
    window.addEventListener("load", function () {

        setTimeout(function () {
            finishLoader();
        }, 400);

    });

    /* Safety fallback */
    setTimeout(function () {
        finishLoader();
    }, 3500);


    /* =========================
       NAVBAR
    ========================= */

    const navbar = document.getElementById("navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle =
        document.getElementById("menu-toggle");

    const mainNavigation =
        document.getElementById("main-navigation");

    if (menuToggle && mainNavigation) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                mainNavigation.classList.toggle("open");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });

        const links =
            mainNavigation.querySelectorAll(".nav-link");

        links.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNavigation.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });

    }


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    /* =========================
       COUNTERS
    ========================= */

    const counters =
        document.querySelectorAll(".counter");

    let countersStarted = false;

    function animateCounters() {

        if (countersStarted) return;

        countersStarted = true;

        counters.forEach(function (counter) {

            const target =
                Number(counter.dataset.target);

            const duration = 1500;

            const startTime =
                performance.now();

            function animate(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progressValue =
                    Math.min(elapsed / duration, 1);

                const eased =
                    1 - Math.pow(
                        1 - progressValue,
                        3
                    );

                counter.textContent =
                    Math.floor(eased * target);

                if (progressValue < 1) {

                    requestAnimationFrame(animate);

                } else {

                    counter.textContent = target;

                }

            }

            requestAnimationFrame(animate);

        });

    }

    const statsSection =
        document.querySelector(".hero-stats");

    if (statsSection &&
        "IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            animateCounters();

                            counterObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.2
                }
            );

        counterObserver.observe(statsSection);

    } else {

        animateCounters();

    }


    /* =========================
       SKILL BARS
    ========================= */

    const skillBars =
        document.querySelectorAll(
            ".skill-bar span"
        );

    if ("IntersectionObserver" in window) {

        const skillObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            const bar = entry.target;

                            const width =
                                bar.dataset.width || 0;

                            setTimeout(function () {

                                bar.style.width =
                                    width + "%";

                            }, 100);

                            observer.unobserve(bar);

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );

        skillBars.forEach(function (bar) {
            skillObserver.observe(bar);
        });

    } else {

        skillBars.forEach(function (bar) {

            bar.style.width =
                (bar.dataset.width || 0) + "%";

        });

    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const id =
                            entry.target.getAttribute(
                                "id"
                            );

                        navLinks.forEach(function (link) {

                            link.classList.remove(
                                "active"
                            );

                            if (
                                link.getAttribute("href") ===
                                "#" + id
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-30% 0px -60% 0px"
                }
            );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

    }


    /* =========================
       CURRENT YEAR
    ========================= */

    const year =
        document.getElementById("current-year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =========================
       BACK TO TOP
    ========================= */

    const backToTop =
        document.getElementById("back-to-top");

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    }

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }

    updateBackToTop();


    /* =========================
       PROFILE IMAGE
    ========================= */

    const profileImage =
        document.querySelector(".profile-image");

    if (profileImage) {

        profileImage.addEventListener(
            "error",
            function () {

                console.warn(
                    "Profile image could not be loaded."
                );

                profileImage.style.opacity = "0";

            }
        );

    }


    /* =========================
       HERO MOUSE EFFECT
    ========================= */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (
        heroVisual &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        heroVisual.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left)
                    / rect.width;

                const y =
                    (event.clientY - rect.top)
                    / rect.height;

                const moveX =
                    (x - 0.5) * 12;

                const moveY =
                    (y - 0.5) * 12;

                heroVisual.style.setProperty(
                    "--mouse-x",
                    moveX + "px"
                );

                heroVisual.style.setProperty(
                    "--mouse-y",
                    moveY + "px"
                );

            }
        );

        heroVisual.addEventListener(
            "mouseleave",
            function () {

                heroVisual.style.setProperty(
                    "--mouse-x",
                    "0px"
                );

                heroVisual.style.setProperty(
                    "--mouse-y",
                    "0px"
                );

            }
        );

    }


    /* =========================
       ESCAPE KEY
    ========================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mainNavigation &&
                mainNavigation.classList.contains("open")
            ) {

                mainNavigation.classList.remove("open");

                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =========================
       JAVASCRIPT ENABLED
    ========================= */

    document.documentElement.classList.add(
        "js-enabled"
    );

});
