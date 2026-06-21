const data = JSON.parse(localStorage.getItem("weatherData"));

/* =========================
   준비물 추천
========================= */
let item = [];

if (!data) {
  item = ["No data"];
} else if (data.weather === "비") {
  item = ["우산", "장화"];
} else if (data.weather === "눈") {
  item = ["장갑", "스카프"];
} else if (data.weather === "맑음") {
  item = ["선글라스", "모자"];
} else if (data.weather === "흐림") {
  item = ["잠바"];
} else {
  item = ["Mask"];
}

document.getElementById("item").innerHTML = item
  .map((x) => "• " + x)
  .join("<br>");

/* =========================
   MATCH DATA
========================= */
const matchData = {
  navy: ["white", "gray", "beige"],
  gray: ["black", "white", "navy"],
  white: ["black", "blue", "beige"],
  black: ["white", "red", "gray"],
  blue: ["white", "gray", "navy"],
  red: ["black", "white", "navy"],
  brown: ["beige", "white", "navy"],
};

/* =========================
   SELECT COLOR
========================= */
function selectColor(color, event) {
  const container = document.getElementById("match");
  container.innerHTML = "";

  const list = matchData[color];

  list.forEach((c) => {
    const div = document.createElement("div");
    div.className = "match-chip " + c;
    div.textContent = c.toUpperCase();
    container.appendChild(div);
  });

  document.querySelectorAll(".chip").forEach((el) => {
    el.style.border = "2px solid #ddd";
  });

  event.currentTarget.querySelector(".chip").style.border = "3px solid #89cff0";
}
