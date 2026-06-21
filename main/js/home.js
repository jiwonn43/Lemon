let data = {
  temp: null,
  weather: null,
  humidity: 50,
};

// 기온 버튼
const tempBtns = document.querySelectorAll(".temp");

tempBtns.forEach((btn) => {
  btn.onclick = function () {
    tempBtns.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    data.temp = btn.textContent;
  };
});

// 날씨 버튼
const weatherBtns = document.querySelectorAll(".weather");

weatherBtns.forEach((btn) => {
  btn.onclick = function () {
    weatherBtns.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    data.weather = btn.textContent;
  };
});

// 습도
const slider = document.getElementById("humidity");
const hval = document.getElementById("hval");

slider.oninput = function () {
  hval.textContent = this.value + "%";
  data.humidity = this.value;
};

// 시작 버튼
document.getElementById("start").onclick = function () {
  localStorage.setItem("weatherData", JSON.stringify(data));
  location.href = "./lookbook.html";
};
