let nav = document.getElementsByTagName("nav")[0];
let logoText = document.getElementById("logo-text");

function switchNavColor() {
    if (nav.classList.contains("white-nav")) {
        nav.classList.remove("white-nav");
        nav.classList.add("purple-nav");
        logoText.classList.remove("white-nav");
        logoText.classList.add("purple-nav");
    }

    else
    {
        nav.classList.remove("purple-nav");
        nav.classList.add("white-nav");
        logoText.classList.remove("purple-nav");
        logoText.classList.add("white-nav");
    }
}


nav.addEventListener("click",switchNavColor);


let viewMoreBtn = document.getElementsByClassName("view-more-btn");

function buttonRemove() {
    this.classList.remove("view-more-btn");
    this.classList.add("view-more-btn-clicked");
    this.innerText = "Working on more, Stay Tuned !";
}

for (let i = 0; i < viewMoreBtn.length; i++) {
    viewMoreBtn[i].addEventListener("mouseup", buttonRemove);
}




