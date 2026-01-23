requireAuth();
seedMoviesIfNeeded();


const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) logoutBtn.addEventListener("click", logout);


const moviesRows = document.getElementById("moviesRows");

function renderMovies() {
  const movies = getMovies();
  moviesRows.innerHTML = "";

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];

    const row = document.createElement("div");
    row.className = "table-row";

    row.innerHTML = `
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

  const movies = getMovies();
  const rents = getRents();

  const movie = movies.find(m => m.id === movieId);
  if (!movie) return;

 
  if (movie.countInStock === 0) return;

 
  movie.countInStock -= 1;
  saveMovies(movies);

 
  rents.push({
    rentId: Date.now(),  
    movieId: movieId,
    hours: 12
  });
  saveRents(rents);

  
  renderMovies();
});

renderMovies();
