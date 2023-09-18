const url = "https://superheroapi.com/api.php/10223569763528853";
const randomBtnDiv = document.getElementById("newHeroButton");
const searchBtnDiv = document.getElementById("searchButton");
const imgDiv = document.getElementById("heroImage");
const inpDiv = document.getElementById("searchInput");
const statsDiv = document.getElementById("statsDiv");
const alertPlaceholder = document.getElementById("alertDiv");
randomBtnDiv.onclick = () => getRandomHero();

searchBtnDiv.onclick = () => {
  const name = inpDiv.value;
  searchHero(name);
};
const searchHero = (name) => {
  fetch(`${url}/search/${name}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.response === "error") {
        appendAlert("Pls Enter a valid Hero name", "danger");
      } else {
        showHero(data.results[0]);
      }
    });
};
const getRandomHero = () => {
  const random = Math.ceil(Math.random() * 731);
  fetch(`${url}/${random}`)
    .then((response) => response.json())
    .then((data) => {
      let sup = data;
      console.log(sup);
      showHero(sup);
    });
};
const statToEmoji = {
  intelligence: "🧠",
  strength: "💪",
  speed: "⚡",
  durability: "🏋️‍♂️",
  power: "📊",
  combat: "⚔️",
};
const showHero = (hero) => {
  console.log(hero);
  imgDiv.innerHTML = `<h1>${hero.name}</h1>
  <img src='${hero.image.url}' alt='Hero Image' class="img" height=200>
  `;
  statsDiv.innerHTML = `<p>${Object.keys(hero.powerstats)
    .map((stat) => {
      return `<p>${stat.toUpperCase()} ${statToEmoji[stat]}: ${
        hero.powerstats[stat]
      }</p>`;
    })
    .join(" ")}</p>`;
};

document.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    searchBtnDiv.click();
  }
});

// if (alertTrigger) {
//   alertTrigger.addEventListener('click', () => {
//     appendAlert('Nice, you triggered this alert message!', 'success')
//   })}

const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};
