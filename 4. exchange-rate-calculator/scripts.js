fetch("https://api.exchangerate-api.com/v4/latest/USD")
  .then((response) => response.json())
  .then((myJson) => console.log(JSON.stringify(myJson)));
