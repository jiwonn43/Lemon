/*데이터 없을 시*/

const data = JSON.parse(localStorage.getItem("weatherData")) || {
  weather: "맑음",
  temp: "더움",
  humidity: 50,
};

let mood = null;

/*기분 event*/

document.querySelectorAll('input[name="mood"]').forEach((input) => {
  input.addEventListener("change", (e) => {
    mood = e.target.value;
    updatePlaylist();
  });
});

/* 운세 */

const fortunes = [
  "오늘은 좋은 일이 생길 날입니다.",
  "조금 피곤하지만 잘 풀립니다.",
  "새로운 기회가 올 수 있습니다.",
  "조심하면 무난한 하루입니다.",
];

document.getElementById("fortune").textContent =
  fortunes[Math.floor(Math.random() * fortunes.length)];

/*날씨 기반 플리*/

let playlist = [];

if (data.weather === "맑음" && data.temp === "더움") {
  playlist = [
    "하츠투하츠 - Lemon Tang",
    "레드벨벳 - 빨간 맛",
    "베이비몬스터 - Drip",
    "트와이스 - FANCY",
  ];
} else if (data.weather === "맑음" && data.temp === "쌀쌀함") {
  playlist = [
    "이준형 - Cosmos",
    "악동뮤지션 - Be with you",
    "볼빨간 사춘기 - 여행",
    "로꼬&유주 - 우연히 봄",
  ];
} else if (data.weather === "맑음" && data.temp === "추움") {
  playlist = [
    "긱스 - Oficially missing you",
    "태연 - 그대라는 시",
    "크러쉬 - 미안해 미워해 사랑해",
    "장범준 - 흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야",
  ];
} else if (data.weather === "흐림") {
  playlist = [
    "g.o.d - 사랑해 그리고 기억해",
    "폴킴 - 비",
    "전람회 - 취중진담",
    "임현정 - 사랑은 봄비처럼 이별은 겨울비처럼",
  ];
} else if (data.weather === "비") {
  playlist = [
    "비스트 - 비가 오는 날엔",
    "헤이즈 - 헤픈 우연",
    "바이브 - 가을 타나 봐",
    "하츠투하츠 - Apple pie",
  ];
} else if (data.weather === "눈") {
  playlist = [
    "이무진&헤이즈 - 눈이 오나봐",
    "Back Number - Heroine",
    "핑클 - White",
    "샵 - 내입술... 따뜻한 커피처럼",
  ];
} else {
  playlist = [
    "하츠투하츠 - Rude!",
    "아이유 - 이 지금",
    "비투비 - 그리워하다",
    "숀 - Way back home",
  ];
}

/*기분 영향 플리*/

function updatePlaylist() {
  const musicEl = document.getElementById("music");
  if (!musicEl) return;

  // mood 안 고르면 안내문
  if (!mood) {
    musicEl.textContent = "오늘의 기분을 선택해 주세요.";
    return;
  }

  // mood 영향
  let moodSongs = [];

  if (mood === "happy") {
    moodSongs = [
      "아이유 - 좋은 날",
      "뉴진스 - Hype Boy",
      "트와이스 - What is love?",
      "세븐틴 - 아주 나이스",
    ];
  } else if (mood === "normal") {
    moodSongs = [
      "잔나비 - 주저하는 연인들을 위해",
      "폴킴 - 모든 날, 모든 순간",
      "볼빨간 사춘기 - 나만, 봄",
      "아이유 - 밤편지",
    ];
  } else if (mood === "sad") {
    moodSongs = [
      "백예린 - Square",
      "이하이 - 한숨",
      "헤이즈 - 비도 오고 그래서",
      "태연 - Blue",
    ];
  }

  const total = [...playlist, ...moodSongs];

  const shuffled = total.sort(() => Math.random() - 0.5);

  const pick = shuffled.slice(0, 2);

  musicEl.innerHTML = pick.map((s) => "🎵 " + s).join("<br>");
}

updatePlaylist();
