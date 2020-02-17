const select = document.querySelector(".select");
const seats = document.querySelectorAll(".seat");

const MOVIE_LS = "movie";
const SEATS_LS = "seats";

let selected = [];

loadedSeats = Arr => {
  if (Arr !== null) {
    Arr.forEach(function(each) {
      let arraySeats = Array.prototype.slice.call(seats);
      arraySeats.filter(function(seat) {
        if (parseInt(seat.id) === parseInt(each)) {
          seat.classList.add("seat-selected");
        }
      });
    });
  }
};

// showResult = (selectedSeatsCount, selectedMovie) => {
//   console.log(selectedSeatsCount);
//   console.log(typeof selectedMovie);
//   const price = selectedSeatsCount * priceObj.selectedMovie;
//   console.log(priceObj.toy);
//   const result = document.createElement("h3");
//   document.querySelector("body");
//   result.innerText =
// };

showResult = (movie, seatsCount) => {
  const priceObj = {
    avengers: 10,
    joker: 12,
    toy: 8,
    lion: 9
  };
  const priceOfMovie = priceObj[movie];
  const result = document.createElement("h1");
  const body = document.querySelector(".container");

  const counts = document.createElement("span");
  const price = document.createElement("span");
  counts.innerText = seatsCount;
  price.innerText = seatsCount * priceOfMovie;

  result.innerText = `You have selected ${counts.innerText} seats for a price of $${price.innerText}`;
  body.appendChild(result);
};

load = () => {
  const loadedMovie = localStorage.getItem(MOVIE_LS);
  const loadedSeatsNumber = localStorage.getItem(SEATS_LS);
  if (loadedMovie && loadedSeatsNumber !== null) {
    select.value = JSON.parse(loadedMovie);
    selected = JSON.parse(loadedSeatsNumber);
    loadedSeats(selected);
    showResult(select.value, selected.length);
  }
};

saveMovie = input => localStorage.setItem(MOVIE_LS, JSON.stringify(input));
saveSeats = input => localStorage.setItem(SEATS_LS, JSON.stringify(input));

handleChange = e => {
  const movieName = e.target.value;
  saveMovie(movieName);
};

handleClick = e => {
  const btn = e.target;
  if (btn.classList.length === 1) {
    btn.classList.add("seat-selected");
    selected.push(btn.id);
  } else {
    btn.classList.remove("seat-selected");
    const index = selected.indexOf(btn.id);
    if (index > -1) {
      selected.splice(index, 1);
    }
  }
  saveSeats(selected);
};

init = () => {
  load();
  select.addEventListener("change", handleChange);
  seats.forEach(function(seat) {
    seat.addEventListener("click", handleClick);
  });
};

init();
