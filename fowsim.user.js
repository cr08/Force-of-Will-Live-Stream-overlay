// ==UserScript==
// @name        New script forceofwind.online
// @namespace   Violentmonkey Scripts
// @match       https://www.forceofwind.online/card/*
// @grant       none
// @version     1.0
// @author      -
// @description 1/25/2024, 9:07:29 PM
// ==/UserScript==

// Getting card image url
img = document.querySelector('meta[property="og:image"]').content

// Attempt to get url suffic of card image
const cardimg_url = (img) => {
  const parsed = new URL(img);
  const path = parsed.pathname.split('/');
  return path.slice(-1).join('');
};
let cardimg = cardimg_url(img);

// Getting card ID number
url = window.location.href;
const cardID_url = (url) => {
  const parsed = new URL(url);
  const path = parsed.pathname.split('/');
  return path.slice(-2).join('');
};
let cardID = cardID_url(url);

// Removing user decklist div since we won't need this
const decklist = document.getElementById("card-decklists");
decklist.remove();

// Getting card text data from page and converting to a JSON string
var element = document.getElementsByClassName('card-right-half');
var element = element[0];
var html = element.innerHTML;
var data = { html: html };
var json = JSON.stringify(data);

// Adding Push JS code to page
var script = document.createElement("script");
script.type = 'text/javascript';

script.textContent = "var jsonArray = [\""+ url + "\", \""+ cardID + "\", \"" + cardimg + "\", \"" + img + "\", " + json + "]; \
                    var jsonData = JSON.stringify(jsonArray); \
                    \
                    console.log(jsonData); \
        function pushToOBS() { \
        fetch(\"https://ferdonia.tv/fow-overlay/sse/push.php\", { \
          method: \"POST\", \
          headers: { \
            \"Content-Type\": \"application/json\" \
          }, \
          body: jsonArray \
        }) \
        .then( \
          function(response) { \
              if (response.status !== 200) { \
              console.log('Looks like there was a problem. Status Code: ' + \
                  response.status); \
              return; \
              } \
              \
              response.json().then(function(data) { \
              console.log(data); \
              document.getElementById('overlay-push-button').style.background = \"green\"; \
              document.getElementById('overlay-push-button').textContent=\"Push [" + cardID + "] to OBS \u{2705}\"; \
              document.getElementById('overlay-push-button-reset').removeAttribute(\"style\"); \
              document.getElementById('overlay-push-button-reset').textContent=\"OBS Reset\"; \
              }); \
          } \
          ) \
          .catch(function(err) { \
          console.log('Fetch Error :-S', err); \
          }); \
        } \
         \
        function ResetOBS() { \
        \
        $.get('https://ferdonia.tv/fow-overlay/sse/push.php?id=XYZ-1234', \
        function(response) { \
        document.getElementById('overlay-push-button-reset').style.background = \"green\"; \
        document.getElementById('overlay-push-button-reset').textContent=\"OBS Reset \u{2705}\"; \
        document.getElementById('overlay-push-button').removeAttribute(\"style\"); \
        document.getElementById('overlay-push-button').textContent=\"Push [" + cardID + "] to OBS\"; \
        \
        }); \
        }";

document.head.appendChild(script);

// Adding OBS Push/Reset buttons to page
var parent = document.getElementById("advanced-search").parentNode;
var html_button = '<div class="overlay-push-button-header" id="overlay-push-button-header" align="center"><button id="overlay-push-button" type="button" onclick="pushToOBS()">Push [' + cardID + '] to OBS</button> <button id="overlay-push-button-reset" type="button" onclick="ResetOBS()">OBS Reset</button></div>'
var reference = document.getElementById("view-card-container");
reference.insertAdjacentHTML("beforebegin", html_button);


// Debug logging to console
console.log(url);
console.log(cardID);
console.log(cardimg);
console.log(img);
// console.log(json);

// More code to be added in later...
// fetch('https://reqbin.com/echo/post/json', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ "id": 78912 })
// })
//    .then(response => response.json())
//    .then(response => console.log(JSON.stringify(response)))