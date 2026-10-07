/* =========================================================
   ANEEB RAZA — PREMIUM PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   PAGE LOADER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("page-loader");
    const progress = document.getElementById("loader-progress");
    const percentage = document.getElementById("loader-percentage");

    let value = 0;

    const loadingInterval = setInterval(() => {

        value += Math.floor(Math.random() * 8) + 3;

        if (value >= 100) {
            value = 100;
            clearInterval(loadingInterval);
        }

        if (progress) {
            progress.style.width = value + "%";
        }

        if (percentage) {
            percentage.textContent = value + "%";
        }

    }, 70);


    window.addEventListener("load", () => {

        setTimeout(() => {

            if (progress) {
                progress.style.width = "100%";
            }

            if (percentage) {
                percentage.textContent = "100%";
            }

            setTimeout(() => {

                if (loader) {
                    loader.classList.add("loaded");
                }

            }, 450);

        }, 500);

    });

});


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.getElementById("navbar");

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

}

window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);

updateNavbar();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const mainNavigation = document.getElementById("main-navigation");

if (menuToggle && mainNavigation) {

    menuToggle.addEventListener("click", () => {

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


    const navigationLinks =
        mainNavigation.querySelectorAll(".nav-link");

    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

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


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   ANIMATED COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;


function animateCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        const duration = 1600;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            const easedProgress =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                Math.floor(
                    easedProgress * target
                );


            counter.textContent =
                currentValue;


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    });

}


/* =========================================================
   COUNTER OBSERVER
========================================================= */

const statsSection =
    document.querySelector(".hero-stats");


if (statsSection) {

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounters();

                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.3
            }
        );


    counterObserver.observe(
        statsSection
    );

}


/* =========================================================
   SKILL BAR ANIMATION
========================================================= */

const skillBars =
    document.querySelectorAll(
        ".skill-bar span"
    );


const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const bar =
                        entry.target;

                    const width =
                        bar.dataset.width;

                    setTimeout(() => {

                        bar.style.width =
                            width + "%";

                    }, 150);


                    skillObserver.unobserve(
                        bar
                    );

                }

            });

        },
        {
            threshold: 0.5
        }
    );


skillBars.forEach(bar => {

    skillObserver.observe(bar);

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                const sectionId =
                    entry.target.getAttribute("id");


                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );


                    const href =
                        link.getAttribute("href");


                    if (
                        href ===
                        "#" + sectionId
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


sections.forEach(section => {

    sectionObserver.observe(
        section
    );

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
    document.getElementById(
        "current-year"
    );


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById(
        "back-to-top"
    );


function updateBackToTop() {

    if (!backToTop) return;


    if (window.scrollY > 600) {

        backToTop.classList.add(
            "visible"
        );

    } else {

        backToTop.classList.remove(
            "visible"
        );

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
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


updateBackToTop();


/* =========================================================
   PROFILE IMAGE FALLBACK
========================================================= */

const profileImage =
    document.querySelector(
        ".profile-image"
    );


if (profileImage) {

    profileImage.addEventListener(
        "error",
        () => {

            profileImage.style.display =
                "none";

            const frame =
                profileImage.closest(
                    ".profile-frame-inner"
                );


            if (frame) {

                frame.classList.add(
                    "image-missing"
                );

            }

        }
    );

}


/* =========================================================
   MOUSE MOVEMENT EFFECT
========================================================= */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


if (
    heroVisual &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

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
        () => {

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


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            mainNavigation &&
            mainNavigation.classList.contains("open")
        ) {

            mainNavigation.classList.remove(
                "open"
            );

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


/* =========================================================
   PAGE READY
========================================================= */

document.documentElement.classList.add(
    "js-enabled"
);
