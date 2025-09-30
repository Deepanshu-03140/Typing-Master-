const words = [
      "matrix", "future", "neon", "cyber", "typing",
      "javascript", "glow", "design", "speed", "focus",
      "keyboard", "monitor", "galaxy", "digital", "dark",
      "theme", "blade", "storm", "code", "logic"
    ];

    let currentWord = "";
    let score = 0;
    let time = 5;
    let timer;
    let gameRunning = false;

    const wordDisplay = document.getElementById("word");
    const input = document.getElementById("input");
    const timeDisplay = document.getElementById("time");
    const scoreDisplay = document.getElementById("score");
    const gameOverText = document.getElementById("gameOverText");
    const startBtn = document.getElementById("startBtn");
    const restartBtn = document.getElementById("restartBtn");
    const gameOverSound = document.getElementById("gameOverSound");

    function getRandomWord() {
      return words[Math.floor(Math.random() * words.length)];
    }

    function setNewWord() {
      currentWord = getRandomWord();
      wordDisplay.textContent = currentWord;
      input.value = "";
      time = 5;
      updateTimerDisplay();
    }

    function updateTimerDisplay() {
      timeDisplay.textContent = time;
    }

    function updateScoreDisplay() {
      scoreDisplay.textContent = score;
    }

    function endGame() {
      gameRunning = false;
      clearInterval(timer);
      wordDisplay.textContent = "Game Over";
      input.disabled = true;
      gameOverText.textContent = "Wrong word or time's up!";
      restartBtn.style.display = "inline-block";
      startBtn.style.display = "none";
      gameOverSound.play();
    }

    function startGame() {
      score = 0;
      updateScoreDisplay();
      gameOverText.textContent = "";
      gameRunning = true;
      input.disabled = false;
      input.focus();
      startBtn.style.display = "none";
      restartBtn.style.display = "none";
      setNewWord();

      clearInterval(timer);
      timer = setInterval(() => {
        time--;
        updateTimerDisplay();
        if (time <= 0) {
          checkWord(false); // if time runs out
        }
      }, 1000);
    }

    function checkWord(manualCheck = true) {
      const userInput = input.value.trim().toLowerCase();
      if (userInput === currentWord.toLowerCase()) {
        if (manualCheck) {
          score++;
          updateScoreDisplay();
          setNewWord();
        }
      } else {
        endGame();
      }
    }

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && gameRunning) {
        checkWord(true);
      }
    });

    window.onload = () => {
      input.disabled = true;
    };