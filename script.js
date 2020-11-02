// DOM elements
const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const quoteAuthor = document.getElementById("author")
const twitterButton = document.getElementById("twitter-btn")
const newQuoteBtn = document.getElementById("new-quote")
const spinner = document.getElementById("spinner")

var counter = 0

// Get quote from API
async function getQuote() {
    // use proxy url to avoid cors issue
    const proxyUrl = "https://shielded-ridge-78392.herokuapp.com/"
    const url =
        "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"

    showLoadingSpinner()

    try {
        const response = await fetch(proxyUrl + url)
        const data = await response.json()

        // reduce font size for large quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote")
        } else {
            quoteText.classList.remove("long-quote")
        }

        console.log(data)

        // update quote and author
        quoteText.innerText = data.quoteText
        quoteAuthor.innerText = data.quoteAuthor || "Unknown"

        hideLoadingSpinner()
    } catch (error) {
        while (counter < 7) {
            getQuote()
            counter++
        }
    }
}

function showLoadingSpinner() {
    quoteContainer.hidden = true
    spinner.hidden = false
}

function hideLoadingSpinner() {
    spinner.hidden = true
    quoteContainer.hidden = false
}

function tweetCode() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`
    window.open(twitterUrl, "_blank")
}

newQuoteBtn.addEventListener("click", getQuote)
twitterButton.addEventListener("click", tweetCode)

// onload
getQuote()
