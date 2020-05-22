const add = document.getElementById("add");
const double = document.getElementById("double");
const filter = document.getElementById("filter");
const sort = document.getElementById("sort");
const total = document.getElementById("total");
const ul = document.getElementById("lists");

let userObj = {};

// formatter function makes number to dollar's format
const formatter = (wealth) => {
  const result = wealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return `$${result}`;
};

// Show userObj info on web page
const paintList = () => {
  // initialize ul
  ul.innerHTML = "";

  // call user's name and wealth from userObj
  const nameList = Object.keys(userObj);
  const wealthList = Object.values(userObj);

  // create <li> tag with name[key] and wealth[value]
  for (let i = 0; i < nameList.length; i++) {
    const li = document.createElement("li");
    const person = document.createElement("span");
    const wealth = document.createElement("span");

    person.className = "person";
    person.innerText = nameList[i];
    li.appendChild(person);

    wealth.className = "money";
    wealth.innerText = formatter(wealthList[i]);
    li.appendChild(wealth);

    // append <li> to <ul> as child
    ul.appendChild(li);
  }
};

// add random user function with userAPI
const addUser = () => {
  // get random user from userAPI with fetch
  fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((data) => {
      const {
        results: [
          {
            name: { first, last }
          }
        ]
      } = data;

      const person = `${first} ${last}`;
      // create user's wealth with random number
      const wealth = Math.ceil(Math.random() * 1000000 + 100000);
      // save user info to object
      userObj[person] = wealth;
      // call paintList function which show user's info with <li> tag
      paintList();
    });
};

// doubleMoney function makes userObj all value twice
const doubleMoney = () => {
  Object.keys(userObj).map((each) => (userObj[each] *= 2));
  paintList();
};

const replaceUserObj = (nameArr) => {
  const newObj = {};
  nameArr.forEach((each) => (newObj[each] = userObj[each]));
  userObj = newObj;
};

// filterMoney function filters keys which values are more than or equal to 1000000
const filterMoney = () => {
  const filteredUsers = Object.keys(userObj).filter(
    (each) => userObj[each] >= 1000000
  );
  replaceUserObj(filteredUsers);
  paintList();
};

// sortMoney function sorting user list with descending order
const sortMoney = () => {
  const sortedUsers = Object.keys(userObj)
    .sort((a, b) => userObj[a] - userObj[b])
    .reverse();
  replaceUserObj(sortedUsers);
  paintList();
};

// sumMoney function sum user's wealth and show the result value
const sumMoney = () => {
  const wealthArr = Object.values(userObj);
  const totalWealth = wealthArr.reduce((a, b) => a + b);

  const li = document.createElement("li");
  li.className = "total";
  const title = document.createElement("span");
  title.innerText = "Total Wealth:";
  const value = document.createElement("span");
  value.innerText = formatter(totalWealth);
  value.className = "total-value";

  li.appendChild(title);
  li.appendChild(value);
  ul.appendChild(li);
};

const init = () => {
  // initial create 3 random users
  for (let i = 0; i < 3; i++) {
    addUser();
  }
  add.addEventListener("click", addUser);
  double.addEventListener("click", doubleMoney);
  filter.addEventListener("click", filterMoney);
  sort.addEventListener("click", sortMoney);
  total.addEventListener("click", sumMoney);
};

init();
