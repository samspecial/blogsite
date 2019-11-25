// NAVIGATION MENU TOGGLE
var navBar = document.getElementById("navbar-toggle");
var toggleMenu = document.getElementById("toggleMenuBar");
toggleMenu.addEventListener("click", topNavBar);

function topNavBar() {
  if (navBar.className === "navbar") {
    navBar.className += " open";
    toggleMenu.innerHTML = "&times;";
  } else {
    navBar.className = "navbar";
    toggleMenu.innerHTML = "&#9776";
  }
}

// TEXT TYPING CAROUSEL
var changeText = function (el, toChange, period) {
  this.toChange = toChange;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.text = "";
  this.tick();

  this.isDeleting = false;
};

changeText.prototype.tick = function () {
  var i = this.loopNum % this.toChange.length;
  var allText = this.toChange[i];

  if (this.isDeleting) {
    this.text = allText.substring(0, this.text.length - 1);
  } else {
    this.text = allText.substring(0, this.text.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.text + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }
  if (!this.isDeleting && this.text === allText) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.text === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("word-carousel");
  for (var i = 0; i < elements.length; i++) {
    var toChange = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toChange) {
      new changeText(elements[i], JSON.parse(toChange), period);
    }
  }

  // INJECT CSS
  var style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = ".word-carousel > .wrap {border-right: 0.08em solid #666}";
  document.body.appendChild(style);
};

// NETWORK REQUEST

const getBlogPost = () => {
  fetch(
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b7b6d8fc10f2435aa7abdd28f84d044b"
  )
    .then(res => res.json())
    .then(data => {
      let newPost = "";
      for (var i = 0; i < data.articles.length; i++) {
        var pageHead = document.createElement("h2");
        pageHead.textContent = data.articles[i].source.id;
        document.getElementById("post-card").appendChild(pageHead);
        newPost += `<div class="post-content">
            <div><a href="${data.articles[i].url}">
            <img src="${data.articles[i].urlToImage}" alt="first "></a></div>
      <div class="body">

      <h2 class="post-heading" id="post-heading"><a href="${
          data.articles[i].url
          }">${data.articles[i].title}</a>
      </h2>
      <span><h6>Source: ${data.articles[i].source.name}</h6><h6>Author: ${
          data.articles[i].author
          }</h6>
       <span>${data.articles[i].description}</span>

      <p class="post-body">${data.articles[i].content}</p></div></div>`;
      }
      document.querySelectorAll(".wrapper")[0].innerHTML = newPost;
    });
};
getBlogPost();

const business = () => {
  fetch(
    "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b7b6d8fc10f2435aa7abdd28f84d044b"
  )
    .then(res => res.json())
    .then(data => {
      let newBusiness = "";
      for (var i = 0; i < data.articles.length; i++) {
        var pageHead = document.createElement("h2");
        pageHead.textContent = data.articles[i].source.id;
        // document.getElementById("post-card").appendChild(pageHead);
        newBusiness += `<div class="post-content">
            <div><a href="${data.articles[i].url}">
            <img src="${data.articles[i].urlToImage}" alt="first "></a></div>
      <div class="body">

      <h2 class="post-heading" id="post-head"><a href="${
          data.articles[i].url
          }">${data.articles[i].title}</a>
      </h2>
      <span><h6>Source: ${data.articles[i].source.name}</h6><h6>Author: ${
          data.articles[i].author
          }</h6>
       <span>${data.articles[i].description}</span>

      <p class="post-body">${data.articles[i].content}</p></div></div>`;
      }
      document.querySelectorAll(".wrapper")[1].innerHTML = newBusiness;
    });
};
business();

// Subscription Section

const getEmail = document.getElementById("email");
const submitEmail = document.getElementById("email-submit");
const errorMessage = document.getElementById("error");
const emailOptin = document.getElementById("email-optin");

emailOptin.addEventListener("change", e => {
  e.preventDefault();
  var redEx = /\S+@\S+\.\S+/;
  if (redEx.test(getEmail.value)) {
    submitEmail.disabled = false;
    errorMessage.innerHTML = "Thank you for subscribing";
    errorMessage.style.color = "green";

  } else {
    submitEmail.disabled = true;
    errorMessage.textContent = "This can't be empty";
    errorMessage.style.color = "red";
  }

});
