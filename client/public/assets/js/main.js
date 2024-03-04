// add hovered class to selected list item
let list = document.querySelectorAll(".AdminDashboard .navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".AdminDashboard .toggle");
let navigation = document.querySelector(".AdminDashboard .navigation");
let main = document.querySelector(".AdminDashboard .main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
