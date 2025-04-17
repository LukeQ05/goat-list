
const players = ['Michael Jordan', 'LeBron James', 'Kareem Abdul-Jabbar', 'Magic Johnson', 'Kobe Bryant', "Shaquille O'Neal", 'Larry Bird', 'Wilt Chamberlain', 'Tim Duncan', 'Stephen Curry', 'Bill Russell', 'Hakeem Olajuwon', 'Oscar Robertson', 'Kevin Durant', 'Jerry West', 'Dirk Nowitzki', 'Giannis Antetokounmpo', 'Julius Erving', 'Charles Barkley', 'Karl Malone', 'Dwyane Wade', 'Moses Malone', 'Scottie Pippen', 'Isiah Thomas', 'Chris Paul'];

let comparisons = [];
let ranks = {};

function generateMatchups() {
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      comparisons.push([players[i], players[j]]);
    }
  }
  shuffle(comparisons);
  players.forEach(p => ranks[p] = 0);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let current = 0;

function renderMatchup() {
  if (current >= comparisons.length) {
    showFinalRanking();
    return;
  }
  const [left, right] = comparisons[current];
  document.getElementById("left").innerText = left;
  document.getElementById("right").innerText = right;
  document.getElementById("progress").innerText = "Matchup " + (current + 1) + " of " + comparisons.length;
}

function choose(winnerSide) {
  const [left, right] = comparisons[current];
  const winner = winnerSide === "left" ? left : right;
  ranks[winner]++;
  current++;
  renderMatchup();
}

function showFinalRanking() {
  const sorted = Object.entries(ranks).sort((a, b) => b[1] - a[1]);
  let html = "<h2>Your NBA Top 25</h2><ol>";
  sorted.forEach(([name]) => {
    html += "<li>" + name + "</li>";
  });
  html += "</ol>";
  document.getElementById("goat-ranker").innerHTML = html;
}

window.onload = () => {
  generateMatchups();
  renderMatchup();
};
