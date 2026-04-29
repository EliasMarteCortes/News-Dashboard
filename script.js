const API_KEY = "9ae5290a-938e-46bc-885a-8e24e19783e8";

articles = []
favorites = {}

function getNews(category, query) {
    let url = `https://content.guardianapis.com/search?api-key=${API_KEY}&show-fields=thumbnail,trailText&page-size=20`;

    if (category) {
        url = url + `&section=${category}`;
    }

    if (query) {
        url = url + `&q=${query}`;
    }

    fetch(url).then(response => response.json()).then(data => {
        articles = data.response.results;
        console.log(articles);
        showNews(articles, "news-container");
    }).catch(error => {
        console.error("Error fetching news:", error); 

    });
}

function showNews(list, containerId) {
    let newsContainer = document.getElementById(containerId);
    newsContainer.innerHTML = "";

    if (list.length === 0) {
        newsContainer.innerHTML = "<p>No news found.</p>";
        return;
    }

    for (let i = 0; i < list.length; i++) {
        let article = list[i];
        let thumbnail = article.fields.thumbnail ? article.fields.thumbnail: "https://placehold.co/280x160?text=No+Image";
        let desc = article.fields.trailText ? article.fields.trailText : "No description available.";

        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${thumbnail}" alt="Article Image">
            <div class="card-content">
                <h3>${article.webTitle}</h3>
                <p>${desc}</p>
                <a href="${article.webUrl}" target="_blank">Read more</a>
            </div>
        `;

        newsContainer.appendChild(card);
    }
};

let catBtns = document.querySelectorAll(".cat-btn");

for (let i = 0; i < catBtns.length; i++) {
    catBtns[i].addEventListener("click", function() {

        for (let j = 0; j < catBtns.length; j++) {
        catBtns[j].classList.remove("active");
        }

        this.classList.add("active");

        getNews(this.value, "");
    });
}

let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", function() {
    let query = searchInput.value;

    if (query == "") {
    return;
    }

    getNews("", query);
});

searchInput.addEventListener("keydown", function(e) {
    if (e.key == "Enter") {
        searchBtn.click();
    }
})