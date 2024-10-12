 let mobileMenu = document.getElementsByClassName("mobile-menu")[0];
 let allSections = document.getElementsByTagName("section");
 let mobileMainBtn = document.getElementsByClassName("mobile-main-button")[0].addEventListener("click", () => {
    document.getElementsByClassName("mobile-menu")[0].classList.toggle("mobile-menu-active")

    for (let i = 0; i < allSections.length; i++) {
        allSections[i].style.filter = "brightness(50%)" + "blur(2px)";
    }
    mobileMenu.style.left = "50%"
    mobileMenu.style.display = "block";
})

document.getElementsByClassName("mobile-menu-close-button")[0].addEventListener("click", () => {
   mobileMenu.classList.toggle("mobile-menu-active")

    for (let i = 0; i < allSections.length; i++) {
        allSections[i].style.filter = "none";
    }
    mobileMenu.style.left = "120%"
    // setTimeout(() => {
    //     mobileMenu.style.display = "none";
    // }, 500)
})

let navLinks = document.getElementsByClassName("nav-link");

for (let i = 0; i < navLinks.length; i++) {
    document.getElementsByClassName("nav-link")[i].addEventListener("click", () => {
        mobileMenu.classList.toggle("mobile-menu-active")
        
        for (let i = 0; i < allSections.length; i++) {
            allSections[i].style.filter = "none";
        }
        mobileMenu.style.left = "120%"
        // setTimeout(() => {
        //     mobileMenu.style.display = "none";
        // }, 200)
    })
}


// Dark Mode

let root = document.querySelector(":root");

let rootStyles =getComputedStyle(root);

let darkModeBtn = document.querySelectorAll(".dark-mode-button");
let lightModeBtn = document.querySelectorAll(".light-mode-button");

for (let i = 0; i < darkModeBtn.length; i++) {
    darkModeBtn[i].addEventListener("click", () => {
        root.style.setProperty("--background1", rootStyles.getPropertyValue("--dark-background1"));
        root.style.setProperty("--background2", rootStyles.getPropertyValue("--dark-background2"));
        root.style.setProperty("--text-color1", rootStyles.getPropertyValue("--dark-text-color1"));
        root.style.setProperty("--text-color2", rootStyles.getPropertyValue("--dark-text-color2"));
        root.style.setProperty("--text-color3", rootStyles.getPropertyValue("--dark-text-color3"));
        root.style.setProperty("--primary-color1", rootStyles.getPropertyValue("--dark-primary-color1"));
        root.style.setProperty("--primary-color1-tint", rootStyles.getPropertyValue("--dark-primary-color1-tint"));
        darkModeBtn[i].style.display = "none";
        lightModeBtn[i].style.display = "block";
    })
}


for (let i = 0; i < lightModeBtn.length; i++) {
    lightModeBtn[i].addEventListener("click", () => {
        root.style.setProperty("--background1", rootStyles.getPropertyValue("--light-background1"));
        root.style.setProperty("--background2", rootStyles.getPropertyValue("--light-background2"));
        root.style.setProperty("--text-color1", rootStyles.getPropertyValue("--light-text-color1"));
        root.style.setProperty("--text-color2", rootStyles.getPropertyValue("--light-text-color2"));
        root.style.setProperty("--text-color3", rootStyles.getPropertyValue("--light-text-color3"));
        root.style.setProperty("--primary-color1", rootStyles.getPropertyValue("--light-primary-color1"));
        root.style.setProperty("--primary-color1-tint", rootStyles.getPropertyValue("--light-primary-color1-tint"));
        lightModeBtn[i].style.display = "none";
        darkModeBtn[i].style.display = "block";
    })
}

