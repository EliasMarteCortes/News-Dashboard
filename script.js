const API_KEY = "9ae5290a-938e-46bc-885a-8e24e19783e8";

articles = []
favorites = {}

function getNews(category, query) {
    const url = `https://content.guardianapis.com/search?api-key=${API_KEY}&show-fields=thumbnail,trailText&page-size=20`;

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
        let thumbnail = article.fields.thumbnail ? article.fields.thumbnail: "https://placehold.co/280x160?text=No+Imag ";
        let desc = article.fields.trailText ? article.fields.trailText : "No description available.";

        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${thumbnail}" alt="Article Image">
            <h3>${article.webTitle}</h3>
            <p>${desc}</p>
            <a href="${article.webUrl}" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(card);
    }
};

getNews();