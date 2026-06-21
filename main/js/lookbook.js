const data = JSON.parse(localStorage.getItem("weatherData"));

const container = document.getElementById("container");
const recommendItems = document.getElementById("recommendItems");

/* =========================
   추천 의류 아이콘
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
    { icon: "🧥", label: "얇은 잠바" },
  );
}

if (data.temp === "추움") {
  clothes.push(
    { icon: "🥼", label: "롱패딩" },
    { icon: "🧥", label: "패딩" },
    { icon: "👖", label: "긴바지" },
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
   룩북 이미지 추천
========================= */

let imageList = [];

/* 더움 */

if (data.temp === "더움") {
  for (let i = 1; i <= 4; i++) {
    imageList.push(`../image/lookbook/summer_casual/yk${i}.jpg`);
  }

  for (let i = 1; i <= 3; i++) {
    imageList.push(`../image/lookbook/summer_street/ys${i}.jpg`);
  }

  for (let i = 1; i <= 3; i++) {
    imageList.push(`../image/lookbook/summer_minimal/ym${i}.jpg`);
  }
} else if (data.temp === "쌀쌀함") {
  /* 쌀쌀함 */
  for (let i = 1; i <= 4; i++) {
    imageList.push(`../image/lookbook/fall_casual/gk${i}.jpg`);
  }

  for (let i = 1; i <= 3; i++) {
    imageList.push(`../image/lookbook/hoodie/gh${i}.jpg`);
  }

  for (let i = 1; i <= 3; i++) {
    imageList.push(`../image/lookbook/windbreaker/b${i}.jpg`);
  }
} else {
  /* 추움 */
  for (let i = 1; i <= 4; i++) {
    imageList.push(`../image/lookbook/winter_casual/wk${i}.jpg`);
  }

  for (let i = 1; i <= 3; i++) {
    imageList.push(`../image/lookbook/padding/wp${i}.jpg`);
  }

  for (let i = 1; i <= 3; i++) {
    imageList.push(`../image/lookbook/coat/c${i}.jpg`);
  }
}

/* =========================
   비 오는 날 보정
========================= */

if (data.weather === "비") {
  imageList.splice(7);

  imageList.push("../image/lookbook/rainy/r1.jpg");
  imageList.push("../image/lookbook/rainy/r2.jpg");
  imageList.push("../image/lookbook/rainy/r3.jpg");
}

/* =========================
   이미지 출력
========================= */

imageList.forEach((img) => {
  container.innerHTML += `
    <div class="card">
      <img src="${img}">
    </div>
  `;
});
