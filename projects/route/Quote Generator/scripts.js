let quote = document.getElementById("quote");
let author = document.getElementById("author");
let quotes = [];
let randomQuote;

async function getRandomQuote() {
        let response = await fetch("https://api.quotable.io/quotes/random")
        let data = await response.json();
        quote.textContent = data[0].content;
        author.textContent = "- " + data[0].author;
}

document.body.addEventListener("click", () => {
    getRandomQuote();
});

getRandomQuote();
