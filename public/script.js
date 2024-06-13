// const apiKey = "01f4ccd57d92456ab4af838af18e439f";
// const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const response = await fetch(`/news?q=${query}`);
        const data = await response.json();
        bindData(data); // Assuming data is already an array of articles
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}


//
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);

        
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

//Hammburger menu
body = document.querySelector('.body')
nav = document.querySelector('.main-nav');
burger = document.querySelector('.burger');
navbar = document.querySelector('.h-vis');

burger.addEventListener("click", myFunction);

function myFunction() {
    navbar.classList.toggle('h-vis');
    nav.classList.toggle('h-nav');
}


//Mode changing
img_moon = document.querySelector('.moon')

function toggleDarkTheme() {
    body.classList.toggle('darktheme')
if(document.body.classList.contains('darktheme')){
    img_moon.src = "./images/sun.png"
}
else{
    img_moon.src = "./images/moon.png"

}

}

img_moon.addEventListener("click", toggleDarkTheme);

