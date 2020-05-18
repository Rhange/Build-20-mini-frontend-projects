const inputCountryList = document.getElementById("currency-input");
const outputCountryList = document.getElementById("currency-output");
const inputAmount = document.querySelector("#amount-input");
const outputAmount = document.querySelector("#amount-output");
const showRate = document.querySelector(".swap-rate .swap-rate__rate");
const swapBtn = document.querySelector(".swap-rate__btn");

const COUNTRY_LS = "country";

const load = () => {
  const loadedData = localStorage.getItem(COUNTRY_LS);

  if (loadedData !== null) {
    const parsedData = JSON.parse(loadedData);
    inputCountryList.value = parsedData.inputName;
    outputCountryList.value = parsedData.outputName;
    inputAmount.value = parsedData.inputAmount;
  }

  handleChange();
};

const updateInputSelect = (optionElement) =>
  inputCountryList.appendChild(optionElement);

const updateOutputSelect = (optionElement) =>
  outputCountryList.appendChild(optionElement);

const makeOptionElement = (country) => {
  const option = document.createElement("option");
  option.value = country;
  option.innerText = country;
  return option;
};

const getCountryList = () => {
  fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then((response) => response.json())
    .then((json) => {
      const { rates } = json;
      const countryList = Object.keys(rates);

      // input countryName to select as option
      countryList.forEach((country) => {
        updateInputSelect(makeOptionElement(country));
        updateOutputSelect(makeOptionElement(country));
      });

      load();
    });
};

const paintExchange = (inputName, outputName, rate) => {
  showRate.innerText = `1 ${inputName} = ${rate} ${outputName}`;

  const result = inputAmount.value * rate;
  outputAmount.value = result.toFixed(2);
};

const saveData = (countryObj) => {
  localStorage.setItem(COUNTRY_LS, JSON.stringify(countryObj));
};

const handleChange = () => {
  const inputName = inputCountryList.value;
  const outputName = outputCountryList.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${inputName}`)
    .then((response) => response.json())
    .then((json) => {
      const { rates } = json;
      const exchangeRate = rates[outputName];

      paintExchange(inputName, outputName, exchangeRate);

      const countryObj = {
        inputName,
        outputName,
        inputAmount: inputAmount.value
      };
      saveData(countryObj);
    });
};

const handleClick = () => {
  [inputCountryList.value, outputCountryList.value] = [
    outputCountryList.value,
    inputCountryList.value
  ];
  handleChange();
};

const init = () => {
  getCountryList();
  inputCountryList.addEventListener("change", handleChange);
  outputCountryList.addEventListener("change", handleChange);
  inputAmount.addEventListener("change", handleChange);
  inputAmount.addEventListener("keydown", handleChange);
  swapBtn.addEventListener("click", handleClick);
};

init();
