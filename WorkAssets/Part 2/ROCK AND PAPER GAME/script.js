// ——— Inline SVG data URLs (always load) ———
const ROCK = "data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 128 128'>\
<rect width='128' height='128' rx='16' fill='%23f3f4f6'/>\
<path d='M78 35c9 3 15 12 15 22 0 18-16 32-31 32S31 75 31 57c0-10 6-19 15-22 3-1 7 1 10 2 3-1 7-3 10-2z' fill='%239ca3af'/>\
</svg>";

const PAPER = "data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 128 128'>\
<rect width='128' height='128' rx='16' fill='%23f3f4f6'/>\
<rect x='34' y='20' width='60' height='88' rx='6' fill='%23ffffff' stroke='%23e5e7eb'/>\
<line x1='42' y1='40' x2='86' y2='40' stroke='%239ca3af' stroke-width='3'/>\
<line x1='42' y1='52' x2='86' y2='52' stroke='%239ca3af' stroke-width='3'/>\
<line x1='42' y1='64' x2='86' y2='64' stroke='%239ca3af' stroke-width='3'/>\
<line x1='42' y1='76' x2='86' y2='76' stroke='%239ca3af' stroke-width='3'/>\
</svg>";

const SCISSORS = "data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 128 128'>\
<rect width='128' height='128' rx='16' fill='%23f3f4f6'/>\
<circle cx='42' cy='86' r='10' fill='none' stroke='%236b7280' stroke-width='6'/>\
<circle cx='64' cy='74' r='10' fill='none' stroke='%236b7280' stroke-width='6'/>\
<path d='M60 68 L90 40' stroke='%236b7280' stroke-width='8' stroke-linecap='round'/>\
<path d='M68 80 L96 108' stroke='%236b7280' stroke-width='8' stroke-linecap='round'/>\
</svg>";

// Map moves to images
const moves = { R: ROCK, P: PAPER, S: SCISSORS };

// DOM
const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const cpuResult  = document.querySelector(".cpu_result img");
const result     = document.querySelector(".result");
const optionBtns = document.querySelectorAll(".option_image");

// Initialize images so you see them immediately
userResult.src = ROCK;
cpuResult.src  = ROCK;
optionBtns[0].querySelector("img").src = ROCK;     // Rock
optionBtns[1].querySelector("img").src = PAPER;    // Paper
optionBtns[2].querySelector("img").src = SCISSORS; // Scissors

// Outcome table
const outcomes = {
  RR: "Draw", RP: "CPU", RS: "User",
  PP: "Draw", PR: "User", PS: "CPU",
  SS: "Draw", SR: "CPU", SP: "User"
};

// Play
optionBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    optionBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    userResult.src = cpuResult.src = ROCK; // neutral while thinking
    result.textContent = "Wait...";
    gameContainer.classList.add("start");

    setTimeout(() => {
      gameContainer.classList.remove("start");

      const userValue = ["R","P","S"][i];
      const cpuValue  = ["R","P","S"][Math.floor(Math.random()*3)];

      userResult.src = moves[userValue];
      cpuResult.src  = moves[cpuValue];

      const outcome = outcomes[userValue + cpuValue];
      result.textContent = (userValue === cpuValue) ? "Match Draw" : `${outcome} Won!!`;
    }, 900);
  });
});
