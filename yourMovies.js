requireAuth();
seedMoviesIfNeeded();

const yourMoviesRows = document.getElementById("yourMoviesRows");

const MIN_HOURS = 12;
const MAX_HOURS = 168;
const STEP_HOURS = 12;

function calcRentPrice(price12h, hours) {
  return price12h * (hours / 12);
}

function renderYourMovies() {
  const movies = getMovies();
  const rents = getRents();

  yourMoviesRows.innerHTML = "";

  if (rents.length === 0) {
    const empty = document.createElement("div");
    empty.style.padding = "10px";
    empty.textContent = "You have no rented movies yet.";
    yourMoviesRows.appendChild(empty);
    return;
  }

  for (let i = 0; i < rents.length; i++) {
    const rent = rents[i];
    const movie = movies.find(m => m.id === rent.movieId);
    if (!movie) continue;

    const price = calcRentPrice(movie.price12h, rent.hours);

    const row = document.createElement("div");
    row.className = "table-row";

    row.innerHTML = `
      <div>${movie.name}</div>
      <div>${movie.genre}</div>

      <div class="time-control">
        <button class="time-btn" data-action="dec" data-rentid="${rent.rentId}">‹</button>
        <span class="time-value">${rent.hours}h</span>
        <button class="time-btn" data-action="inc" data-rentid="${rent.rentId}">›</button>
      </div>

      <div class="price">${formatPrice(price)}</div>

      <div class="delete">
        <button class="delete-btn" data-rentid="${rent.rentId}">Remove</button>
      </div>
    `;

    yourMoviesRows.appendChild(row);
  }
}

yourMoviesRows.addEventListener("click", (e) => {
  const timeBtn = e.target.closest(".time-btn");
  const removeBtn = e.target.closest(".delete-btn");


  if (timeBtn) {
    const action = timeBtn.dataset.action;
    const rentId = Number(timeBtn.dataset.rentid);

    const rents = getRents();
    const rent = rents.find(r => r.rentId === rentId);
    if (!rent) return;

    if (action === "inc" && rent.hours + STEP_HOURS <= MAX_HOURS) {
      rent.hours += STEP_HOURS;
    }

    if (action === "dec" && rent.hours - STEP_HOURS >= MIN_HOURS) {
      rent.hours -= STEP_HOURS;
    }

    saveRents(rents);
    renderYourMovies();
    return;
  }


  if (removeBtn) {
    const rentId = Number(removeBtn.dataset.rentid);

    const rents = getRents();
    const movies = getMovies();

    const idx = rents.findIndex(r => r.rentId === rentId);
    if (idx === -1) return;

    const rent = rents[idx];

  
    const movie = movies.find(m => m.id === rent.movieId);
    if (movie) {
      movie.countInStock += 1;
      saveMovies(movies);
    }

  
    rents.splice(idx, 1);
    saveRents(rents);

    renderYourMovies();
    return;
  }
});

renderYourMovies();
