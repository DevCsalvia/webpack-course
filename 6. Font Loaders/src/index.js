import styles from './index.scss';
import _ from "lodash";
import "./clearButton";
import logo from './assets/logo.jpg';
import "./assets/fonts/XanhMono-Regular.ttf";

const btn1 = document.getElementById("button1");
const logoEl = document.getElementById("logo");

btn1.addEventListener("click", function () {
    const el = document.getElementById("header");
    el.innerHTML = "Hey i have updated the code!";
    el.classList.add([styles.header]);

    const listItems = ["Apple", "Orange", "Banana"];
    const ul = document.getElementById("shoppingList");
    _.forEach(listItems, function(item){
        const tempEl = document.createElement("li");
        tempEl.innerHTML = item;
        ul.appendChild(tempEl);
    })
})

btn1.classList.add([styles.button]);
logoEl.src = logo;
