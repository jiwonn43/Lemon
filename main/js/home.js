// HOME
// (사용자가 입력한 날씨 데이터를 저장하는 로직)

let data = {
  temp: null,
  weather: null,
  humidity: 50,
};

// (기온 선택 로직)

const tempBtns = document.querySelectorAll(".temp");

tempBtns.forEach((btn) => {
  btn.onclick = function () {
    tempBtns.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    data.temp = btn.textContent;
  };
});

// (날씨 선택 로직)

const weatherBtns = document.querySelectorAll(".weather");

weatherBtns.forEach((btn) => {
  btn.onclick = function () {
    weatherBtns.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    data.weather = btn.textContent;
  };
});

// (습도 조절 UI)

const slider = document.getElementById("humidity");
const hval = document.getElementById("hval");

slider.oninput = function () {
  hval.textContent = this.value + "%";
  data.humidity = Number(this.value);
};

// START BUTTON
// (데이터 저장 후 페이지 이동)

document.getElementById("start").onclick = function () {
  localStorage.setItem("weatherData", JSON.stringify(data));
  location.href = "./lookbook.html";
};
