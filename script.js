const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const gameArea = document.getElementById("game-area");
const message = document.getElementById("message");
const reactionTimeEl = document.getElementById("reaction-time");
const bestTimeEl = document.getElementById("best-time");

let waiting = false;
let startTime = 0;
let timeout;
let best = localStorage.getItem("best_reaction") || "--";

bestTimeEl.textContent = best;

startBtn.addEventListener("click", () => {
  message.textContent = "Prépare-toi...";
  gameArea.classList.remove("active");
  gameArea.classList.add("ready");
  waiting = true;

  timeout = setTimeout(() => {
    message.textContent = "🏐 SMASH !!!";
    gameArea.classList.remove("ready");
    gameArea.classList.add("active");
    startTime = Date.now();
    waiting = false;
  }, Math.random() * 3000 + 2000); // random 2–5s
});

gameArea.addEventListener("click", () => {
  if (waiting) {
    message.textContent = "Trop tôt ! 🟥";
    gameArea.classList.remove("ready");
    waiting = false;
    clearTimeout(timeout);
  } else if (gameArea.classList.contains("active")) {
    const reaction = Date.now() - startTime;
    reactionTimeEl.textContent = reaction;
    message.textContent = "Bon réflexe ! ⚡";
    gameArea.classList.remove("active");

    if (best === "--" || reaction < best) {
      best = reaction;
      bestTimeEl.textContent = best;
      localStorage.setItem("best_reaction", best);
      message.textContent += " Nouveau record ! 🏆";
    }
  }
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("best_reaction");
  best = "--";
  bestTimeEl.textContent = "--";
  reactionTimeEl.textContent = "--";
  message.textContent = "Clique sur Start pour recommencer.";
  gameArea.classList.remove("ready", "active");
});
