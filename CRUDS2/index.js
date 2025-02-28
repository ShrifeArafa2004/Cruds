let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let deleteall = document.getElementById("deleteall");
let search_field = document.getElementById("search-field");
let info = document.querySelectorAll(".info");
let Data_set = [];
let temp;
let mood = "create";
let searcMood="searchByTitle";

if (localStorage.product != null) Data_set = JSON.parse(localStorage.product);
else Data_set = [];

function getTotalPrice() {
  let totalP = 0;
  if (
    price.value.length == 0 ||
    ads.value.length == 0 ||
    taxes.value.length == 0
  ) {
    total.innerText = "";
    total.style.backgroundColor = "#a00d02";
  } else {
    totalP =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      discount.value;
    total.innerText = totalP;
    total.style.backgroundColor = "green";
  }
}
create.onclick = () => {
  let obj = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    discount: discount.value,
    ads: ads.value,
    total: total.innerText,
    category: category.value,
    count: count.value,
  };
  if (title.value.length != 0) {
    if (mood === "create") {
      if (count.value < 2) {
        Data_set.push(obj);
      } else {
        for (let i = 0; i < count.value; i++) {
          Data_set.push(obj);
        }
      }
      count.style.display = "block";
    } else {
      Data_set[temp] = obj;
      mood = "create";
      create.innerText = "Create";
      count.style.display='block'
    }

    localStorage.setItem("product", JSON.stringify(Data_set));
    emptyInfo();
  }
  show();
};
show();

function emptyInfo() {
  info.forEach((el) => {
    el.value = "";
  });
  total.innerText = "";
}
function show() {
  if (localStorage.length > 0) {
    deleteall.innerHTML = `
    <button onclick="deleteAllData()">Delete all data ${Data_set.length}</button>
    `;
  } else {
    deleteall.innerHTML = "";
  }
  let div = "";

  for (let i = 0; i < Data_set.length; i++) {
    div += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${Data_set[i].title}</td>
                    <td>${Data_set[i].price}</td>
                    <td>${Data_set[i].taxes}</td>
                    <td>${Data_set[i].ads}</td>
                    <td>${Data_set[i].discount}</td>
                    <td>${Data_set[i].total}</td>
                    <td>${Data_set[i].category}</td>
                    <td><button onclick="Update(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})">delete</button></td>
                </tr>
`;
  }
  document.querySelector("tbody").innerHTML = div;
}
function deleteData(i) {
  Data_set.splice(i, 1);
  localStorage.product = JSON.stringify(Data_set);
  show();
}
function deleteAllData() {
  Data_set.splice(0);
  localStorage.clear();
  show();
}
function Update(i) {
  title.value = Data_set[i].title;
  price.value = Data_set[i].price;
  taxes.value = Data_set[i].taxes;
  discount.value = Data_set[i].discount;
  ads.value = Data_set[i].ads;
  total.innerText = Data_set[i].total;
  category.value = Data_set[i].category;
  temp = i;
  mood = "update";
  create.innerText = "Update";
  count.style.display='none'

}
function getMood(val){
  let div=""
  for (let i = 0; i < Data_set.length; i++) {
    if((searcMood==="searchByTitle"&&Data_set[i].title.includes(val))||(searcMood==="searchByCategory"&&Data_set[i].category.includes(val))){
      div += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${Data_set[i].title}</td>
                    <td>${Data_set[i].price}</td>
                    <td>${Data_set[i].taxes}</td>
                    <td>${Data_set[i].ads}</td>
                    <td>${Data_set[i].discount}</td>
                    <td>${Data_set[i].total}</td>
                    <td>${Data_set[i].category}</td>
                    <td><button onclick="Update(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})">delete</button></td>
                </tr>
`;
    }
   
  }
  document.querySelector("tbody").innerHTML = div;
  // show();
// console.log("hi")
}

function search(id){
switch(id){
  case "search-by-title":
    searcMood="searchByTitle"
    search_field.placeholder="Search by Title"
    break;
  case "search-by-category":
    searcMood="searchByCategory"
    search_field.placeholder="Search by Category"
  break 
}
}