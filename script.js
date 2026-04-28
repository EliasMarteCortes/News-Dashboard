const API_KEY = "9ae5290a-938e-46bc-885a-8e24e19783e8";

articles = []
favorites = {}

function getNews() {
    const url = `https://content.guardianapis.com/search?api-key=${API_KEY}&show-fields=thumbnail,trailText&page-size=20`;

    fetch(url).then(response => response.json()).then(data => {
        articles = data.response.results;
        console.log(articles);

    }).catch(error => {
        console.error("Error fetching news:", error); 

    });
}