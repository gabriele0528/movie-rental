const movies = [

    { id: 1, name: "Batman", genre: "Action", price12h: 4.55, countInStock: 3 },
    { id: 2, name: "Inception", genre: "Sci-Fi", price12h: 5.20, countInStock: 2 },
    { id: 3, name: "Interstellar", genre: "Sci-Fi", price12h: 5.50, countInStock: 1 },
    { id: 4, name: "Titanic", genre: "Drama", price12h: 3.99, countInStock: 0 },
    { id: 5, name: "The Hangover", genre: "Comedy", price12h: 3.50, countInStock: 4 },
    { id: 6, name: "The Conjuring", genre: "Horror", price12h: 4.10, countInStock: 2 },
    { id: 7, name: "Avengers", genre: "Action", price12h: 5.00, countInStock: 1 },
    { id: 8, name: "La La Land", genre: "Romance", price12h: 4.25, countInStock: 0 },
];


const yourMovies = [];

const moviesRows = document.getElementById("moviesRows");

function formatPrice(price) {
    return price.toFixed(2) + "$";
}

function getStockIcon(countInStock) {
    return countInStock > 0 ? "./images/check.png" : "./images/cancel.png";
}


function renderMovies() {
    moviesRows.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];

        const row = document.createElement("div");
        row.className = "table-row";

        row.innerHTML =
            `
    <div>${movie.name}</div>
    <div>${movie.genre}</div>
    <div class="price">${formatPrice(movie.price12h)}</div>
    <div><img src="${getStockIcon(movie.countInStock)}" class="check-img"></div>
    <div class="action">
      <button class="rent-btn" data-id="${movie.id}">Rent</button>
    </div>
  `;

        moviesRows.appendChild(row);
    }
}

moviesRows.addEventListener("click", (e) => {
    const btn = e.target.closest(".rent-btn");
    if (!btn) return;

    const movieId = Number(btn.dataset.id);
    const movie = movies.find(m => m.id === movieId);
    if(!movie) return;


    if (movie.countInStock === 0) return;

    yourMovies.push(movieId);
    movie.countInStock--;

    renderMovies();

});

renderMovies();