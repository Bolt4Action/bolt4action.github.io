const siteName = document.getElementById("bookmarkName");
const siteURL = document.getElementById("bookmarkURL");
const submitBtn = document.getElementById("submitBtn");
const tableContent = document.getElementById("tableContent");
let deleteBtns;
let visitBtns;
const closeBtn = document.getElementById("closeBtn");
const boxModal = document.querySelector(".box-info");
let bookmarks = [];

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (let x = 0; x < bookmarks.length; x++) {
    displayBookmark(x);
  }
}


function displayBookmark(indexOfWebsite) {
  let userURL = bookmarks[indexOfWebsite].siteURL;
  let httpsRegex = /^https?:\/\//g;
  if (httpsRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
      .split("")
      .splice(validURL.match(httpsRegex)[0].length)
      .join("");
  } else {
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
  }
  let newBookmark = `
              <tr>
                <td>${indexOfWebsite + 1}</td>
                <td>${bookmarks[indexOfWebsite].siteName}</td>              
                <td>
                  <button class="btn btn-visit" data-index="${indexOfWebsite}">
                    <a href="${fixedURL}" target="_blank">${fixedURL}</a>
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete btn-outline-danger pe-2" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  tableContent.innerHTML += newBookmark;


  deleteBtns = document.querySelectorAll(".btn-delete");
  if (deleteBtns) {
    for (let j = 0; j < deleteBtns.length; j++) {
      deleteBtns[j].addEventListener("click", function (e) {
        deleteBookmark(e);
      });
    }
  }


  visitBtns = document.querySelectorAll(".btn-visit");
  if (visitBtns) {
    for (let l = 0; l < visitBtns.length; l++) {
      visitBtns[l].addEventListener("click", function (e) {
        visitWebsite(e);
      });
    }
  }
}


function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}


function capitalize(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}


submitBtn.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    let bookmark = {
      siteName: capitalize(siteName.value),
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    boxModal.classList.remove("d-none");
  }
});


function deleteBookmark(e) {
  tableContent.innerHTML = "";
  let deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  for (let k = 0; k < bookmarks.length; k++) {
    displayBookmark(k);
  }
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}


function visitWebsite(e) {
  let websiteIndex = e.target.dataset.index;
  let httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
    open(bookmarks[websiteIndex].siteURL);
  } else {
    open(`https://${bookmarks[websiteIndex].siteURL}`);
  }
}


let nameRegex = /^\w{3,}(\s+\w+)*$/;
let urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});

function validate(element, regex) {
  let testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}


function closeModal() {
  boxModal.classList.add("d-none");
}


closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});
