const data = JSON.parse(localStorage.getItem("weatherData"));

const container = document.getElementById("container");
const recommendItems = document.getElementById("recommendItems");

/* =========================
   1. 추천 의류 (그대로 유지 + 확장)
========================= */

const clothes = [];

if (data.temp === "더움") {
  clothes.push(
    { icon: "👕", label: "반팔" },
    { icon: "🩳", label: "반바지" },
    { icon: "🎽", label: "나시" },
  );
}

if (data.temp === "쌀쌀함") {
  clothes.push(
    { icon: "👔", label: "긴팔" },
    { icon: "👖", label: "긴바지" },
    { icon: "🧥", label: "얇은잠바" },
  );
}

if (data.temp === "추움") {
  clothes.push(
    { icon: "🧥", label: "패딩" },
    { icon: "🥼", label: "롱패딩" },
    { icon: "👖", label: "기모바지" },
  );
}

clothes.forEach((item) => {
  recommendItems.innerHTML += `
    <div>
      <div class="recommend-item">${item.icon}</div>
      <div class="recommend-label">${item.label}</div>
    </div>
  `;
});

/* =========================
   2. 룩북 데이터 풀
========================= */

const pool = {
  summer_casual: "yk",
  summer_street: "ys",
  summer_minimal: "ym",
  fall_casual: "gk",
  hoodie: "gh",
  windbreaker: "b",
  winter_casual: "wk",
  padding: "wp",
  coat: "c",
  rainy: "r",
};

/* =========================
   3. 상황별 가중치
========================= */

let weights = {};

if (data.temp === "더움") {
  weights = {
    summer_casual: 4,
    summer_street: 3,
    summer_minimal: 3,
  };
}

if (data.temp === "쌀쌀함") {
  weights = {
    fall_casual: 4,
    hoodie: 3,
    windbreaker: 3,
  };
}

if (data.temp === "추움") {
  weights = {
    winter_casual: 4,
    padding: 3,
    coat: 3,
  };
}

/* 날씨 보정 */
if (data.weather === "비") {
  weights.rainy = 4;
  weights.coat = (weights.coat || 0) + 1;
}

if (data.weather === "맑음") {
  if (weights.summer_street) weights.summer_street += 1;
}

/* 습도 보정 */
if (data.humidity > 70) {
  if (weights.summer_casual) weights.summer_casual += 1;
}

if (data.humidity < 30) {
  if (weights.hoodie) weights.hoodie += 1;
}

/* =========================
   4. 랜덤 룩 생성 (핵심)
========================= */

let imageList = [];
let used = new Set();

function pickRandom(folder, prefix) {
  let num = Math.floor(Math.random() * 10) + 1;
  return `../image/lookbook/${folder}/${prefix}${num}.jpg`;
}

let keys = Object.keys(weights);

while (imageList.length < 10) {
  let randomKey = keys[Math.floor(Math.random() * keys.length)];
  let prefix = pool[randomKey];

  let img = pickRandom(randomKey, prefix);

  // ⭐ 핵심: 중복이면 다시 뽑기
  if (used.has(img)) continue;

  used.add(img);
  imageList.push(img);
}

/* =========================
   5. 출력
========================= */

imageList.forEach((img) => {
  container.innerHTML += `
    <div class="card">
      <img src="${img}">
    </div>
  `;
});
