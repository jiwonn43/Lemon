const data = JSON.parse(localStorage.getItem("weatherData"));

let score = 0;
let comment = "";

/* =========================
1. 기본 점수
========================= */

const base = {
  temp: {
    더움: 40,
    쌀쌀함: 25,
    추움: 10,
  },
  weather: {
    맑음: 40,
    흐림: 25,
    비: 15,
    눈: 10,
  },
};

score += base.temp[data.temp] || 0;
score += base.weather[data.weather] || 0;

/* 습도 */
if (data.humidity < 30) score += 20;
else if (data.humidity < 50) score += 15;
else if (data.humidity < 70) score += 10;
else score += 5;

/* =========================
2. 조합 룰 (핵심 확장)
========================= */

const comboRules = [
  // 🌞 최고 조합
  {
    condition: (d) =>
      d.temp === "더움" && d.weather === "맑음" && d.humidity < 50,
    effect: (s) => s + 15,
  },

  // 😵 불쾌 더위
  {
    condition: (d) => d.temp === "더움" && d.humidity > 70,
    effect: (s) => s - 10,
  },

  // ❄️ 최악 겨울비
  {
    condition: (d) => d.temp === "추움" && d.weather === "비",
    effect: (s) => s - 20,
  },

  // 🌧️ 흐림 + 습함 = 최악
  {
    condition: (d) => d.weather === "흐림" && d.humidity > 70,
    effect: (s) => s - 15,
  },

  // 🌤️ 완벽한 산책 날씨
  {
    condition: (d) =>
      d.temp === "쌀쌀함" && d.weather === "맑음" && d.humidity < 60,
    effect: (s) => s + 12,
  },

  // 🌨️ 눈 + 추움 = 감성 + 약간 감점
  {
    condition: (d) => d.weather === "눈" && d.temp === "추움",
    effect: (s) => s + 5,
  },

  // 🔥 더움 + 맑음 + 습도 낮음 = 쾌적
  {
    condition: (d) =>
      d.temp === "더움" && d.weather === "맑음" && d.humidity < 30,
    effect: (s) => s + 10,
  },
];

/* 적용 */
comboRules.forEach((rule) => {
  if (rule.condition(data)) {
    score = rule.effect(score);
  }
});

/* =========================
3. 점수 제한
========================= */

score = Math.max(0, Math.min(100, score));

/* =========================
4. 멘트 (세분화)
========================= */

const comments = [
  { min: 90, text: "완벽한 날씨에요! 꼭 오늘을 놓치지 마세요." },
  { min: 75, text: "매우 좋은 날이네요! 좋은 하루를 보낼 수 있을 것 같아요." },
  { min: 55, text: "무난한 날씨에요. 오늘은 어디에 있어도 좋아요!" },
  { min: 35, text: "외출보단 집을 선택하는게 좋은 날씨에요." },
  { min: 0, text: "오늘은 집에서 넷플릭스나 보는걸로..." },
];

for (let i = 0; i < comments.length; i++) {
  if (score >= comments[i].min) {
    comment = comments[i].text;
    break;
  }
}

/* =========================
5. 출력
========================= */

document.getElementById("scoreNumber").textContent = score;
document.getElementById("barFill").style.width = score + "%";
document.getElementById("comment").textContent = comment;
