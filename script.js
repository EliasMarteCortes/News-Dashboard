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
        showNews(articles, "news-container", true);
    }).catch(error => {
        console.error("Error fetching news:", error); 

    });
}

// showNews runtime analysis:
// this function loops through every article in the list once to build its card
// that makes it O(n) where n is the number of articles
// if there are 10 articles it does 10 iterations, if increased to 20 articles then it does 20 iterations
// it grows linearly with the size of the list
// a nested loop would make it O(n^2) but we only have one loop so it stays O(n)
function showNews(list, containerId, showSaveBtn) {
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
        
        let saveBtn = "";
        if (showSaveBtn) {
            saveBtn = `<button onClick="saveArticle(${i})">Save</button>`;
        } else {
            saveBtn = `<button onClick="removeArticle('${article.webUrl}')" class="remove-btn">Remove</button>`;
        }

        card.innerHTML = `
            <img src="${thumbnail}" alt="Article Image">
            <div class="card-content">
                <h3>${article.webTitle}</h3>
                <p>${desc}</p>
                <a href="${article.webUrl}" target="_blank">Read more</a>
                ${saveBtn}
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

function saveArticle(index) {
    let article = articles[index]

    if (favorites[article.webUrl]) {
        alert("Already saved!")
        return
    }

    favorites[article.webUrl] = article
    showFavorites()
}

function removeArticle(url) {
    delete favorites[url]
    showFavorites()
}

function showFavorites() {
    let saved = Object.values(favorites)
    showNews(saved, "favorites-container", false)
}

getNews();