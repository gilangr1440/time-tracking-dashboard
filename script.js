const cardsContainer = document.querySelector(".cards");
const dailyButton = document.getElementById("dailyButton");
const weeklyButton = document.getElementById("weeklyButton");
const monthlyButton = document.getElementById("monthlyButton");

document.addEventListener("DOMContentLoaded", showData());
dailyButton.addEventListener("click", () => showData("daily"));
weeklyButton.addEventListener("click", () => showData("weekly"));
monthlyButton.addEventListener("click", () => showData("monthly"));

function getData() {
  return fetch("./data.json")
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
}

async function showData(timeframes = "daily") {
  cardsContainer.classList.remove("fadeEffect");
  let dataElement = "";
  const data = await getData();

  data.forEach((item) => {
    dataElement += createCard(item, timeframes);
  });

  cardsContainer.classList.add("fadeEffect");

  setTimeout(() => {
    cardsContainer.innerHTML = dataElement;
  }, 500);

  dailyButton.classList.remove("active");
  weeklyButton.classList.remove("active");
  monthlyButton.classList.remove("active");

  if (timeframes === "daily") {
    dailyButton.classList.add("active");
  } else if (timeframes === "weekly") {
    weeklyButton.classList.add("active");
  } else if (timeframes === "monthly") {
    monthlyButton.classList.add("active");
  }
}

function createCard(data, timeframes) {
  return `
        <div class="card card_bg_${data.title.toLowerCase().replace(/\s/g, "-")}">
        <img src="images/icon-${data.title.toLowerCase().replace(/\s/g, "-")}.svg" alt="work-icon" class="card__icon" />
        <div class="card__main">
            <div class="card__header">
            <h2 class="card__title">${data.title}</h2>
            <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg" class="card__button"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#fff" fill-rule="evenodd"/></svg>
            </div>
            <p class="card__time">${data.timeframes[timeframes].current > 1 ? data.timeframes[timeframes].current + "hrs" : data.timeframes[timeframes].current + "hr"}</p>
            <p class="card__previous">Previous - ${data.timeframes[timeframes].previous > 1 ? data.timeframes[timeframes].previous + "hrs" : data.timeframes[timeframes].previous + "hr"}</p>
        </div>
        </div>
    `;
}
