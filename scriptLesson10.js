"use strict";

const div = document.querySelectorAll("div");

div[0].replaceWith(div[1], div[0], div[4], div[3], div[5], div[2]);

let headBook = document.querySelectorAll("a")[2];
headBook.textContent = "Книга 3. this и Прототипы Объектов";

let body = document.querySelector("body");
body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

div[6].remove();

let li = document.querySelectorAll("li");
li[8].replaceWith(li[9], li[12], li[14], li[10], li[11], li[13], li[15], li[8], li[16]);

li[38].replaceWith(li[45], li[39], li[40], li[38], li[42], li[43], li[41], li[44], li[46]);

let ul = document.querySelectorAll("ul")[5];

ul.insertAdjacentHTML("beforeend", "<li>Глава 8: За пределами ES6</li>");
