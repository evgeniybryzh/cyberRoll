document.addEventListener("DOMContentLoaded", () => {
  const mainBetVariants = [1, 2, 3, 4, 5, 6];
  let winCounter = 0;
  let loseCounter = 0;
  const $circle = document.getElementById("circle");
  const $button = document.getElementById("button");
  const $buttonAgain = document.getElementById("button-again");
  const $result = document.getElementById("result");
  const $modal = document.getElementById("modal");
  const inputArr = document.querySelectorAll(".bet__radio");
  const $exitButton = document.getElementById("exit");
  const winNumbers = document.querySelector(".history__win-number");
  const loseNumbers = document.querySelector(".history__lose-number");
  //GET RANDOM NUMBER
  const getRandom = () => {
    return Math.floor(Math.random() * 6);
  };
  const getRandomBetwenTwoNumbers = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  //FIND WINNER
  const findIfYouWin = (bet, result) => {
    if (bet === result) {
      return true;
    } else return false;
  };

  //START AUDIO
  const playAudio = (name, audio) => {
    var name = new Audio(audio);
    name.play();
  };

  //DISABLE BET MENU
  const disableBetMenu = () => {
    const $betMenu = document.querySelector(".bet");
    $betMenu.style.display = "none";
  };
  //ACTIVATE BET MENU
  const activateBetMenu = () => {
    const $betMenu = document.querySelector(".bet");
    $betMenu.style.display = "block";
  };

  //ADD COUNTERS TO DOM
  const showCounterInDOM = (counter, elem) => {
    elem.innerHTML = counter;
  };

  //MAKE SPIN
  const makeSpin = (choosenColorElement) => {
    $circle.style.transform = `rotate(-0deg)`;
    disableBetMenu();
    $result.innerHTML = "";
    let betId = "";
    betId = choosenColorElement.id;
    console.log(loseCounter);
    //GET RANDOM ELEMENT FROM MAIN ARRAY
    const winner = mainBetVariants[getRandom()];

    let rotateCount = 0;

    if (winner === 1) {
      rotateCount = 0;
    } else if (winner === 2) {
      rotateCount = 60;
    } else if (winner === 3) {
      rotateCount = 120;
    } else if (winner === 4) {
      rotateCount = 180;
    } else if (winner === 5) {
      rotateCount = 240;
    } else if (winner === 6) {
      rotateCount = 300;
    }

    $circle.style.transform = `rotate(-${
      rotateCount + 360 * winner * getRandomBetwenTwoNumbers(5, 20)
    }deg)`;

    playAudio("wheel", "images/wheel.mp3");

    mainBetVariants.forEach((item, idx) => {
      if (winner === item) {
        if (item === 1) {
          item = "bet-red";
        } else if (item === 2) {
          item = "bet-blue";
        } else if (item === 3) {
          item = "bet-purple";
        } else if (item === 4) {
          item = "bet-pink";
        } else if (item === 5) {
          item = "bet-brown";
        } else if (item === 6) {
          item = "bet-yellow";
        }

        setTimeout(() => {
          activateBetMenu();
          if (findIfYouWin(item, betId)) {
            $result.innerHTML = "You are the WINNER";
            winCounter += 1;
            showCounterInDOM(winCounter, winNumbers);
            playAudio("win", "images/win.mp3");
          } else {
            $result.innerHTML = "Sorry, try next time!";
            loseCounter += 1;
            showCounterInDOM(loseCounter, loseNumbers);
            playAudio("win", "images/lose.mp3");
          }
          $modal.style.display = "block";
        }, 4000);
      }
    });
  };

  const findCheckedColors = (inputArr) => {
    inputArr.forEach((elem, idx) => {
      if (elem.checked) {
        makeSpin(elem);
      }
    });
  };

  $button.addEventListener("click", (e) => {
    e.preventDefault();
    findCheckedColors(inputArr);
  });
  $buttonAgain.addEventListener("click", (e) => {
    e.preventDefault();
    $modal.style.display = "none";
    findCheckedColors(inputArr);
  });
  $exitButton.addEventListener("click", (e) => {
    e.preventDefault();
    $modal.style.display = "none";
  });
});
