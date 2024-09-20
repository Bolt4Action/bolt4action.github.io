

// Navigation color change
let nav = document.getElementsByTagName("nav")[0];
let logoText = document.getElementById("logo-text");

function switchNavColor() {
    if (nav.classList.contains("white-nav")) {
        nav.classList.remove("white-nav");
        nav.classList.add("purple-nav");
        logoText.classList.remove("white-nav");
        logoText.classList.add("purple-nav");
    }

    else {
        nav.classList.remove("purple-nav");
        nav.classList.add("white-nav");
        logoText.classList.remove("purple-nav");
        logoText.classList.add("white-nav");
    }
}


nav.addEventListener("click", switchNavColor);


// View More button
let viewMoreBtn = document.getElementsByClassName("view-more-btn");

function buttonRemove() {
    this.classList.remove("view-more-btn");
    this.classList.add("view-more-btn-clicked");
    this.innerText = "Working on more, Stay Tuned !";
}

// for (let i = 0; i < viewMoreBtn.length; i++) {
//     viewMoreBtn[i].addEventListener("mouseup", buttonRemove);
// }

// Mobile Menu
let mobileMenu = document.querySelector(".mobile-menu");
let mainMenu = document.querySelector("main");

function toggleMobileMenu() {
    mobileMenu.classList.toggle("mobile-menu-open");
    mainMenu.classList.toggle("hidden");
}

let mobileMenuBtn = document.querySelector(".mobile-menu-button");
let mobileMenuCloseBtn = document.querySelector(".mobile-menu-back-button");

mobileMenuBtn.addEventListener("click", toggleMobileMenu);
mobileMenuCloseBtn.addEventListener("click", toggleMobileMenu);


//Hide navbar on scroll

// let prevScrollpos = window.scrollY;
// window.onscroll = function () {
//     let currentScrollPos = window.scrollY;
//     if (prevScrollpos > currentScrollPos) {
//         document.querySelector("nav").style.top = "0";
//     } else {
//         document.querySelector("nav").style.top = "-200px";
//     }
//     prevScrollpos = currentScrollPos;
// }


//Beta alert timeout

let betaAlert = document.querySelector(".beta-alert");
betaAlert.style.transition = "right 1.5s ease-in-out";


setTimeout(() => {
    betaAlert.style.right = "1%";
}, 500)

setTimeout(() => {
    betaAlert.style.right = "-100%";
}, 6000)

setTimeout(() => {
    betaAlert.style.display ="none";
}, 10000)