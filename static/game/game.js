// ================== GAME VARIABLES ==================
const game = document.getElementById("game");
const symbols = [
    "🦄","🦄",
    "🐶","🐶",
    "🐱","🐱",
    "🐰","🐰",
    "🌟","🌟",
    "🍀","🍀",
    "🍎","🍎",
    "🍌","🍌"
];


let first = null;
let second = null;
let lock = false;
let moves = 0;
let matched = 0;
let time = 0;
let timer = setInterval(() => { time++; document.getElementById("time").innerText = "Time: " + time + "s"; }, 1000);

// ================== SHUFFLE FUNCTION ==================
function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

// ================== CREATE CARDS ==================
function createCards() {
    const shuffled = shuffle(symbols);
    shuffled.forEach(sym => {
        let card = document.createElement("div");
        card.className = "card";
        let inner = document.createElement("div");
        inner.className = "card-inner";
        let front = document.createElement("div");
        front.className = "card-front";
        let back = document.createElement("div");
        back.className = "card-back";
        back.innerText = sym;
        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);
        game.appendChild(card);

        card.onclick = () => {
            if(lock || card.classList.contains("open")) return;
            card.classList.add("open");
            if(!first) first = card;
            else second = card;

            if(first && second){
                lock = true;
                moves++;
                document.getElementById("moves").innerText = "Moves: " + moves;

                const firstSymbol = first.querySelector(".card-back").innerText;
                const secondSymbol = second.querySelector(".card-back").innerText;

                if(firstSymbol === secondSymbol){
                    matched += 2;
                    resetCards();
                    if(matched === symbols.length){
                        // Game won, submit score
                        document.getElementById("movesInput").value = moves;
                        document.getElementById("timeInput").value = time;
                        document.getElementById("scoreForm").submit();
                    }
                } else {
                    setTimeout(() => {
                        first.classList.remove("open");
                        second.classList.remove("open");
                        resetCards();
                    }, 800);
                }
            }
        }
    });
}

// ================== RESET TEMP VARIABLES ==================
function resetCards() {
    first = null;
    second = null;
    lock = false;
}

// ================== RESTART FUNCTION ==================
function restartGame() {
    game.innerHTML = "";
    moves = 0;
    matched = 0;
    time = 0;
    document.getElementById("moves").innerText = "Moves: 0";
    document.getElementById("time").innerText = "Time: 0s";
    clearInterval(timer);
    timer = setInterval(() => { time++; document.getElementById("time").innerText = "Time: " + time + "s"; }, 1000);
    createCards();
}

// ================== INITIALIZE ==================
createCards();
