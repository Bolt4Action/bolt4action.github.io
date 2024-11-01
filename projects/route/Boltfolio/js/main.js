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
        // if (dancingText.matches(':hover'))
        
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
    }, 7000);
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


// Change active navbar link on scroll (I didn't know Bootstrap scrollspy existed yet)

let sections = document.querySelectorAll("section");
let activeSection;
let sectionTops = [];
window.addEventListener("scroll", () => {
    sectionTops = [];
    for (let i = 0; i < sections.length; i++) {
        sectionTops.push(sections[i].getBoundingClientRect().top)
    }
    for (let i = 0; i < sectionTops.length; i++) {

        if (sectionTops[i] <= 300) {
            activeSection = i;
        }
    }
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
    }
    navLinks[activeSection].classList.add("active");
})

//Scroll to top
let scrollToTop = document.getElementById("scroll-to-top");
scrollToTop.addEventListener("click", () => {
    window.scrollTo(0, 0);
})

window.addEventListener("scroll", () => {
   if (activeSection === 0) {
       scrollToTop.classList.add("hidden");
   }
   else {
       scrollToTop.classList.remove("hidden");
   }
})



//Scroll Animations
    //Animate progress bars

let progressBars = document.querySelectorAll(".progress-bar");

function animateProgressBar() {
    if (activeSection === 1) {
        for (let i = 0; i < progressBars.length; i++) {
            progressBars[i].classList.remove("progress-bar-empty");
        }
    }
}

window.addEventListener("scroll", animateProgressBar);

    //Animated about paragraphs
let aboutParagraphs = document.querySelectorAll("#about-section p");

function animateAboutParagraphs() {
    if (activeSection === 1) {
        for (let i = 0; i < aboutParagraphs.length; i++) {
            aboutParagraphs[i].classList.remove("hidden");
        }
    }
}

window.addEventListener("scroll", animateAboutParagraphs);

    //Animated counters

let counterNumbers = document.querySelectorAll("#counters-section .counter-number");

let counterValue1 = 0, counterValue2 = 0, counterValue3 = 0, counterValue4 = 0;

let countersIntervalFlag1 = false;
let countersFlag = true;
window.addEventListener("scroll", () => {
    if (sectionTops[3] < 600 && countersFlag) {
        countersFlag = false;
        let intervalID1 = setInterval(() => {
            if (counterValue1 <= 430) {
                counterNumbers[0].innerHTML = counterValue1++;
                countersIntervalFlag1 = true;
            }
            if (counterValue2 <= 0) {
                counterNumbers[1].innerHTML = counterValue2++;
                countersIntervalFlag1 = true;
            }
            if (counterValue3 <= 530) {
                counterNumbers[2].innerHTML = counterValue3++;
                countersIntervalFlag1 = true;
            }
            if (counterValue4 <= 15) {
                counterNumbers[3].innerHTML = counterValue4++;
                countersIntervalFlag1 = true;
            }
            if (!countersIntervalFlag1) {
                clearInterval(intervalID1);
            }
        }, 5)
        let countersIntervalFlag2 = false;
        let intervalID2 = setInterval(() => {
            if (counterValue1 <= 450 && counterValue1 >= 430) {
                counterNumbers[0].innerHTML = counterValue1++;
                countersIntervalFlag2 = true;
            }
            if (counterValue2 <= 25) {
                counterNumbers[1].innerHTML = counterValue2++;
                countersIntervalFlag2 = true;
            }
            if (counterValue3 <= 550 && counterValue3 >= 530) {
                counterNumbers[2].innerHTML = counterValue3++;
                countersIntervalFlag2 = true;
            }
            if (counterValue4 <= 48 && counterValue4 >= 15) {
                counterNumbers[3].innerHTML = counterValue4++;
                countersIntervalFlag2 = true;
            }
            if (!countersIntervalFlag2) {
                clearInterval(intervalID2);
            }
        }, 100)
    }
})

let portfolioIMG = document.querySelectorAll("#work-section img"); 
