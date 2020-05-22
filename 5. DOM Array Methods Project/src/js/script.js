const add = document.getElementById("add");
const double = document.getElementById("double");
const filter = document.getElementById("filter");
const sort = document.getElementById("sort");
const total = document.getElementById("total");
const ul = document.getElementById("lists");

let userList = [];

// formatter function makes number to dollar's format
const formatter = (wealth) => {
  const result = wealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return `$${result}`;
};

// Show userList info on web page
const paintList = () => {
  // initialize ul
  ul.innerHTML = "";
  userList.forEach((each) => {
    const li = document.createElement("li");
    const person = document.createElement("span");
    const wealth = document.createElement("span");

    person.className = "person";
    person.innerText = `${each.name}`;
    li.appendChild(person);

    wealth.className = "money";
    wealth.innerText = formatter(each.wealth);
    li.appendChild(wealth);

    // append <li> to <ul> as child
    ul.appendChild(li);
  });
};

// add random user function with userAPI
const addUser = async () => {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const {
    results: [
      {
        name: { first, last }
      }
    ]
  } = data;

  const name = `${first} ${last}`;
  // create user's wealth with random number
  const wealth = Math.ceil(Math.random() * 1000000 + 100000);
  // save user info to object
  const userObj = {
    name,
    wealth
  };
  // add userObj to userList
  userList.push(userObj);
  // call paintList function which show user's info
  paintList();
};

// doubleMoney function makes userList all value twice
const doubleMoney = () => {
  userList = userList.map((each) => {
    return { ...each, wealth: each.wealth * 2 };
  });
  paintList();
};

const replaceUserObj = (nameArr) => {
  const newObj = {};
  nameArr.forEach((each) => (newObj[each] = userList[each]));
  userList = newObj;
};

// filterMoney function filters keys which values are more than or equal to 1000000
const filterMoney = () => {
  userList = userList.filter((each) => each.wealth >= 1000000);
  paintList();
};

// sortMoney function sorting user list with descending order
const sortMoney = () => {
  userList.sort((a, b) => b.wealth - a.wealth);
  paintList();
};

// sumMoney function sum user's wealth and show the result value
const sumMoney = () => {
  const totalWealth = userList.reduce((acc, user) => (acc += user.wealth), 0);

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
