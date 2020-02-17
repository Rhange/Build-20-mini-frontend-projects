const select = document.querySelector(".select");
const seats = document.querySelectorAll(".seat");

const MOVIE_LS = "movie";
const SEATS_LS = "seats";

let selected = [];
let currentMovie = "";

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

load = () => {
  const loadedMovie = localStorage.getItem(MOVIE_LS);
  const loadedSeatsNumber = localStorage.getItem(SEATS_LS);
  if (loadedMovie !== null) {
    select.value = JSON.parse(loadedMovie);
    currentMovie = JSON.parse(loadedMovie);
  }
  if (loadedSeatsNumber !== null) {
    selected = JSON.parse(loadedSeatsNumber);
    loadedSeats(selected);
  }
};

saveMovie = input => localStorage.setItem(MOVIE_LS, JSON.stringify(input));
saveSeats = input => localStorage.setItem(SEATS_LS, JSON.stringify(input));

showResult = () => {
  const priceObj = {
    avengers: 10,
    joker: 12,
    toy: 8,
    lion: 9
  };
  const seatCount = selected.length;
  const priceOfMovie = priceObj[currentMovie];
  const counts = document.querySelector(".js-seat-nums");
  const price = document.querySelector(".js-totalPrice");
  if (
    localStorage.getItem(MOVIE_LS) &&
    localStorage.getItem(SEATS_LS) !== null
  ) {
    counts.innerText = seatCount;
    price.innerText = seatCount * priceOfMovie;
  } else {
    counts.innerText = 0;
    price.innerText = 0;
  }
};

handleChange = e => {
  const movieName = e.target.value;
  saveMovie(movieName);
  currentMovie = movieName;
  showResult();
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
  showResult();
};

init = () => {
  load();
  select.addEventListener("change", handleChange);
  seats.forEach(function(seat) {
    seat.addEventListener("click", handleClick);
  });
  showResult();
};

init();
