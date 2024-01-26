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

// Adding OBS Push/Reset buttons to page
var parent = document.getElementById("advanced-search").parentNode;
var html_button = '<div class="overlay-push-button-header" id="overlay-push-button-header" align="center"><button id="overlay-push-button" type="button" onclick="pushToOBS()">Push [' + cardID + '] to OBS</button> <button id="overlay-push-button-reset" type="button" onclick="ResetOBS()">OBS Reset</button></div>'
var reference = document.getElementById("view-card-container");
reference.insertAdjacentHTML("beforebegin", html_button);


// Debug logging to console
console.log(url);
console.log(cardID);
console.log(img);
console.log(json);

// Temp code to be added in proper later

{/* <script type="text/javascript">
        function pushToOBS() {
        
        $.get('https://ferdonia.tv/cardoverlay/push.php?id=GRV-015',
        function(response) {
        document.getElementById('overlay-push-button').style.background = "green";
        document.getElementById('overlay-push-button').textContent="Push [GRV-015] to OBS \u{2705}";
        document.getElementById('overlay-push-button-reset').removeAttribute("style");
        document.getElementById('overlay-push-button-reset').textContent="OBS Reset";
    
        });
        }
    
        function ResetOBS() {
        
        $.get('https://ferdonia.tv/cardoverlay/push.php?id=XYZ-1234',
        function(response) {
        document.getElementById('overlay-push-button-reset').style.background = "green";
        document.getElementById('overlay-push-button-reset').textContent="OBS Reset \u{2705}";
        document.getElementById('overlay-push-button').removeAttribute("style");
        document.getElementById('overlay-push-button').textContent="Push [GRV-015] to OBS";
    
        });
        }
        </script>
     */}