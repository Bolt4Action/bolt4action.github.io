//! 1st Method: Quote Generator Via an API.

let quote = document.getElementById("quote");
let author = document.getElementById("author");
let quotes = [];
let randomQuote;

async function getRandomQuoteAPI() {
        let response = await fetch("https://api.quotable.io/quotes/random");
        let data = await response.json();
        quote.textContent = data[0].content;
        author.textContent = "- " + data[0].author;
}

document.body.addEventListener("click", () => {
    if (window.getSelection().type === "Caret")
    {
        getRandomQuoteAPI();
    }
});

getRandomQuoteAPI();


//! 2nd Method: Quote Generator Via a Static Array.

// let quote = document.getElementById("quote");
// let author = document.getElementById("author");
// let quotes = [
//     { content: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
//     { content: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
//     { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
//     { content: "The best revenge is massive success.", author: "Frank Sinatra" },
//     { content: "The biggest adventure you can take is to live the life of your dreams.", author: "Oprah Winfrey" },
//     { content: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
//     { content: "The person who says it cannot be done should not interrupt the person who is doing it.", author: "Chinese Proverb" },
//     { content: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
//     { content: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
//     { content: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
// ];

// let newRandomQuote;
// let prevRandomQuote;

// function getRandomQuote() {
//     while (prevRandomQuote === newRandomQuote) {
//         newRandomQuote = quotes[Math.floor(Math.random() * quotes.length)];
//     }
//     quote.textContent = newRandomQuote.content;
//     author.textContent = "- " + newRandomQuote.author;
//     prevRandomQuote = newRandomQuote;
// }

// document.body.addEventListener("click", () => {
//     getRandomQuote();
// })

// getRandomQuote();
