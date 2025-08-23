window.onload = function () {
  
  // Game setup and functions
  // Get the canvas and context
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Game variables
  let ballRadius = 10;
  let x = canvas.width / 2;
  let y = canvas.height - 30;
  let dx = 3; // Ball speed in x-direction
  let dy = -3; // Ball speed in y-direction

  let paddleHeight = 10;
  let paddleWidth = 200;
  let paddleX = (canvas.width - paddleWidth) / 2;
  let rightPressed = false;
  let leftPressed = false;
  let paddleSpeed = 7;
  let ballColor = ["#0095DD", "#0095DD", "#dd1a00ff", "#1686007e", "#6b018bc7", "#9c5901d5", "#dd00d27c", "#1713f5ff"]

  let totalScore = 0;
  let lives = 3;
  let score = 0;
  let level = 1; // Start at level 1
  let levelSpeedIncrease = 1.1; // 10% increase per level
  let levelPaddleSizeChange = .9; // 10% decrease in paddle size
  let paddleSpeedIncrease = 1.1;

   let gameOver = false;

  // Event listeners to move the paddle
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    }
  }

  // Draw the ball
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    if(level < 8){
        ctx.fillStyle = ballColor[level];
    }else{
        ctx.fillStyle = "#0095DD"; 
    }
    ctx.fill();
    ctx.closePath();
  }

  // Draw the paddle
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    if(level < 8){
        ctx.fillStyle = ballColor[level];
    }else{
        ctx.fillStyle = "#0095DD"; 
    }
    ctx.fill();
    ctx.closePath();
  }

  // Draw the score, lives, and level
  function drawInfo() {
    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;
    document.getElementById("level").textContent = level;
    document.getElementById("totalScore").textContent = totalScore;
  }

  // Update the ball position
  function updateBall() {
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }

    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if ((x > paddleX -15) && (x < paddleX + paddleWidth + 15)) {
        dy = -dy;
        score++; // Increase score for successful bounce
        totalScore++;
      } else {
        lives--;
        if (lives <= 0) {
          //drawGameOver(); // Display "Game Over" message
          gameOver = true; // Set the gameOver flag to true
        } else {
          x = canvas.width / 2;
          y = ballRadius ;
        }
      }
    }

    x += dx;
    y += dy;
  }

  // Update paddle position based on user input
  function updatePaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= paddleSpeed;
    }
  }

  // Check if the player has passed the current level
  function checkLevelUp() {
    if (score >=  5) {
      level++;
      lives = 3;
      dx *= levelSpeedIncrease;
      dy *= levelSpeedIncrease;
      paddleWidth *= levelPaddleSizeChange;
      paddleSpeed *= paddleSpeedIncrease;
      score = 0;
    }
  }

    // Draw the "Game Over" text on the canvas
  function drawGameOver() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  }

  // Draw the game elements
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawInfo();
    updateBall();
    updatePaddle();
    checkLevelUp(); // Check if level up is required
    
    if (gameOver) {
      drawGameOver(); // Display "Game Over" message
      return; // Stop the game loop
    }

    requestAnimationFrame(draw); // Keep the game running
  }

  // Start the game
  draw();
};


