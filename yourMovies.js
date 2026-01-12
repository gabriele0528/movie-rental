


const movies = [
  { id: 1, name: "Batman",       genre: "Action",  price12h: 4.55, countInStock: 3 },
  { id: 2, name: "Inception",    genre: "Sci-Fi",  price12h: 5.20, countInStock: 2 },
  { id: 3, name: "Interstellar", genre: "Sci-Fi",  price12h: 5.50, countInStock: 1 },
  { id: 4, name: "Titanic",      genre: "Drama",   price12h: 3.99, countInStock: 0 },
  { id: 5, name: "The Hangover", genre: "Comedy",  price12h: 3.50, countInStock: 4 },
  { id: 6, name: "The Conjuring",genre: "Horror",  price12h: 4.10, countInStock: 2 },
  { id: 7, name: "Avengers",     genre: "Action",  price12h: 5.00, countInStock: 1 },
  { id: 8, name: "La La Land",   genre: "Romance", price12h: 4.25, countInStock: 0 },
];


const yourMovies = [
  { rentId: 101, movieId: 1, hours: 12 },
  { rentId: 102, movieId: 1, hours: 12 },
];


const yourMoviesRows = document.getElementById("yourMoviesRows");


const MIN_HOURS = 12;    
const MAX_HOURS = 168;   
const STEP_HOURS = 12;   


function formatPrice(price) {

  return price.toFixed(2) + "$";
}


function calcRentPrice(price12h, hours) {
 
  return price12h * (hours / 12);
}


function renderYourMovies() {

  yourMoviesRows.innerHTML = "";


  if (yourMovies.length === 0) {
    const empty = document.createElement("div");    
    empty.style.padding = "10px";                    
    empty.textContent = "You have no rented movies."; 
    yourMoviesRows.appendChild(empty);               
    return;                                          
  }

  
  for (let i = 0; i < yourMovies.length; i++) {
    const rent = yourMovies[i]; 

   
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

    
    const rent = yourMovies.find(r => r.rentId === rentId);
    if (!rent) return; 

    
    if (action === "inc") {
      
      if (rent.hours + STEP_HOURS <= MAX_HOURS) {
        rent.hours += STEP_HOURS;
      }
    }

    
    if (action === "dec") {
      
      if (rent.hours - STEP_HOURS >= MIN_HOURS) {
        rent.hours -= STEP_HOURS;
      }
    }

    
    renderYourMovies();
    return;
  }


  if (removeBtn) {
    const rentId = Number(removeBtn.dataset.rentid); 

   
    const index = yourMovies.findIndex(r => r.rentId === rentId);
    if (index === -1) return;

   
    const rent = yourMovies[index];

   
    const movie = movies.find(m => m.id === rent.movieId);
    if (movie) {
      movie.countInStock += 1;
    }

   
    yourMovies.splice(index, 1);

   
    renderYourMovies();
    return;
  }
});


renderYourMovies();
