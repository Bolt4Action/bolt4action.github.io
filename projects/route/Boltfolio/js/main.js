let navBar = document.querySelector(".navbar");

let prevScrollpos = window.scrollY;
window.onscroll = function () {
    let currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) { //If scrolling up
        navBar.classList.remove("navbar-scrolled");
    } else { //if scrolling down
        navBar.classList.add("navbar-scrolled");
    }
    prevScrollpos = currentScrollPos;
}