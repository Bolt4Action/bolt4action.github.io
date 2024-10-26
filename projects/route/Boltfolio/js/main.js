let navBar = document.querySelector(".navbar");
let navBarBrand = document.querySelector(".navbar-brand");
let dancingText = document.querySelector(".dancing-text");
let isSwitched = false;

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
// dancingText.addEventListener("mouseout", () => {
//     navBar.classList.remove("navbar-scrolled");
// })

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

// setInterval(() => {
//     if (window.scrollY === 0) {
//         navBar.classList.remove("navbar-scrolled");
        
//     }
//     else {
//     }
// }, 1000)