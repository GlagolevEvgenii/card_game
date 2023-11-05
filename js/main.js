const cards = document.querySelectorAll(".memory-card");
const dateSelectElement = document.getElementById('date__select');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let remainingPairs = cards.length / 2;

dateSelectElement.addEventListener('change', function() {
  const selectedDate = dateSelectElement.value;

  cards.forEach((card, index) => {
    const frontFace = card.querySelector('.front-face');
    const groupName = card.getAttribute('data-name');
    const suffix = `-${(index + 1).toString().padStart(2, '0')}`;
    if (groupName && selectedDate) {
      const suffix = groupName;
      frontFace.src = `./images/${selectedDate}-${suffix}.png`;
    }
  });
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  remainingPairs--;

  if (remainingPairs === 0) {
    setTimeout(() => {
      document.querySelector(".modal-fader").className += " active";
      document.querySelector(".modal-finish").className += " active";
    }, 500);
  }
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 6);
    card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener("click", flipCard));


function showModalWindow (buttonEl) {
  let modalTarget = "#" + buttonEl.getAttribute("data-target");

  document.querySelector(".modal-fader").className += " active";
  document.querySelector(modalTarget).className += " active";
}

function hideAllModalWindows () {
  let modalFader = document.querySelector(".modal-fader");
  let modalWindows = document.querySelectorAll(".modal-window");

  if(modalFader.className.indexOf("active") !== -1) {
    modalFader.className = modalFader.className.replace("active", "");
  }

  modalWindows.forEach(function (modalWindow) {
    if(modalWindow.className.indexOf("active") !== -1) {
      modalWindow.className = modalWindow.className.replace("active", "");
    }
  });
}

document.querySelectorAll(".open-modal").forEach(function (trigger) {
  trigger.addEventListener("click", function () {
    hideAllModalWindows();
    showModalWindow(this);
  });
});

document.querySelectorAll(".modal-hide").forEach(function (closeBtn) {
  closeBtn.addEventListener("click", function () {
    hideAllModalWindows();
  });
});

document.querySelector(".modal-fader").addEventListener("click", function () {
  hideAllModalWindows();
});