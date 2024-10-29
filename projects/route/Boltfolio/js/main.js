let navBar = document.querySelector(".navbar");
let navBarBrand = document.querySelector(".navbar-brand");
let dancingText = document.querySelector(".dancing-text");
let isSwitched = false;
let navLinks = Array.from(document.querySelectorAll(".nav-link"));
navLinks.pop();

navBarBrand.addEventListener("mouseover", () => {
    if (!isSwitched) {
        isSwitched = true;
        dancingText.classList.add("dancing-text-disabled");
        setTimeout(() => {
            dancingText.innerHTML = "ack to Bolt's Site";
            dancingText.classList.remove("dancing-text-disabled");
        }, 1000)
        setTimeout(() => {
            dancingText.classList.add("dancing-text-disabled");
            setTimeout(() => {
                dancingText.innerHTML = "oltfolio";
            }, 800)
            isSwitched = false;
            if (!navBar.classList.contains("navbar-scrolled")) {
                setTimeout(() => {
                    dancingText.classList.remove("dancing-text-disabled");
                }, 800)
            }
        }, 5000)
    }
})


//Animate footer text
let dancingFooter = document.querySelector(".dancing-footer");

function dancingFooterDisplayBootstrap() {
    dancingFooter.classList.add("dancing-footer-disabled");
    setTimeout(() => {
        dancingFooter.innerHTML = "uilt with Bootstrap"
        dancingFooter.classList.remove("dancing-footer-disabled");
    }, 1100)
}

function dancingFooterDisplayBoltfolio() {
    dancingFooter.classList.add("dancing-footer-disabled");
    setTimeout(() => {
        dancingFooter.innerHTML = "oltFolio"
        dancingFooter.classList.remove("dancing-footer-disabled");
    }, 1100)
}


function animatedFooter() {
    setTimeout(() => {
        dancingFooterDisplayBootstrap();
    }, 2000);
    
    setTimeout(() => {
        dancingFooterDisplayBoltfolio();
    }, 8000);
}


animatedFooter();
setInterval(() => {
    animatedFooter();
}, 10000)



// Change navbar style on scroll
let prevScrollpos = window.scrollY;

window.onscroll = function () {
    let currentScrollPos = window.scrollY;
    if (window.scrollY === 0) {
        navBar.classList.add("navbar-transparent");
    }
    else if (prevScrollpos > currentScrollPos) { //If scrolling up
        navBar.classList.remove("navbar-transparent");
        navBar.classList.remove("navbar-scrolled");
    } else { //if scrolling down
        navBar.classList.remove("navbar-transparent");
        navBar.classList.add("navbar-scrolled");
    }
    prevScrollpos = currentScrollPos;
}


// Change active navbar link on scroll

let sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
    let activeSection;
    let sectionTops = [];
    for (let i = 0; i < sections.length; i++) {
        sectionTops.push(sections[i].getBoundingClientRect().top)
    }
    for (let i = 0; i < sectionTops.length; i++) {

        if (sectionTops[i] <= 250) {
            activeSection = i;
        }
    }
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
    }
    navLinks[activeSection].classList.add("active");
})

