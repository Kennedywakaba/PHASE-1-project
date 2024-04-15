document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "dd1458d5002b4ca58142c4dcbfd8ea50";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const blogContainer = document.getElementById("bolg-container");
            const articles = data.articles;

            function displayArticles(articlesToDisplay) {
                // Clear previous articles
                blogContainer.innerHTML = "";

                const articleCards = articlesToDisplay.map(article => {
                    const blogCard = document.createElement("div");
                    blogCard.classList.add("blog-card");

                    const img = document.createElement("img");
                    img.src = article.urlToImage || "./images/placeholder.png";
                    img.alt = "Image";

                    const title = document.createElement("h2");
                    title.textContent = article.title;

                    const content = document.createElement("p");
                    content.textContent = article.description || "No description available.";

                    blogCard.appendChild(img);
                    blogCard.appendChild(title);
                    blogCard.appendChild(content);
                    blogCard.addEventListener("click", () => {
                        window.open(article.url, "_blank");
                    });

                    return blogCard;
                });

                blogContainer.append(...articleCards);
            }

            displayArticles(articles);

            // Add event listener to search button
            const searchButton = document.getElementById("search-button");
            searchButton.addEventListener("click", function () {
                const searchInput = document.getElementById("search-input").value.toLowerCase().trim();
                if (searchInput === "") {
                    displayArticles(articles);
                } else {
                    // Filter articles based on search input
                    const filteredArticles = articles.filter(article =>
                        article.title.toLowerCase().includes(searchInput) ||
                        (article.description && article.description.toLowerCase().includes(searchInput))
                    );
                    displayArticles(filteredArticles);
                }
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});
