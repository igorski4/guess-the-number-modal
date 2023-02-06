let hiddenNumber = 77;
let countGame = 0;
let countStep = 1;

let statistics = document.querySelector(".main__statistics");
statistics.innerHTML = "Сыграно игр: " + countGame;

const button = document.querySelector(".main__button");
const input = document.querySelector(".main__input");
const hint = document.querySelector(".main__hint");
const wrapper = document.querySelector(".main__wrapper");
const container = document.querySelector(".container");
const buttonModal = document.querySelectorAll(
  ".modal__wrapper > .main__button"
);

let newString = document.createElement("p");
newString.className = "main__hint";
newString.style.marginBottom = 0;

let newButton = document.createElement("button");
newButton.className = "main__button";
newButton.innerHTML = "Начать сначала";
newButton.style.width = "183px";
newButton.style.textAlign = "center";
newButton.style.marginBottom = "43px";
newButton.style.marginLeft = "auto";
newButton.style.marginRight = "auto";

let modal = document.querySelector(".main__modal.modal");

const addString = () => {
  newString.innerHTML = "Угадал за " + countStep + " ходов";
  wrapper.innerHTML = "";
  wrapper.append(newString);
};

const addButton = () => {
  wrapper.after(newButton);
};

const checkNumber = () => {
  if (input.value >= 1 && input.value <= 100) {
    modal.style.visibility = "visible";
    document.body.style.overflow = "hidden";

    event.stopPropagation();
    modal.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  } else {
    if (input.value) {
      input.value = "";
      document.querySelector(".main__hint").innerHTML =
        "Число не входит в диапазон!";
    } else document.querySelector(".main__hint").innerHTML = "Введите число!";
    input.style.borderColor = "red";
    setTimeout(() => (input.style.borderColor = "#292E49"), 400);
    countStep++;
  }
};

const reset = () => {
  input.value = "";
  modal.style.visibility = "hidden";
  document.body.style.overflow = "";
};

const confirm = () => {
  if (input.value) {
    if (input.value > hiddenNumber) {
      hint.innerHTML = "Меньше";
      countStep++;
    } else if (input.value < hiddenNumber) {
      hint.innerHTML = "Больше";
      countStep++;
    } else {
      hint.remove();
      statistics.innerHTML = "Сыграно игр: " + ++countGame;
      addString();
      addButton();
      hiddenNumber = Math.floor(Math.random() * 100 + 1);
      countStep = 1;
    }
  }
  reset();
};

const resetForm = () => {
  newString.remove();
  newButton.remove();
  wrapper.append(input);
  wrapper.append(button);
  wrapper.after(hint);
  hint.innerHTML = "—";
};

button.addEventListener("click", checkNumber);

newButton.addEventListener("click", resetForm);

buttonModal[0].addEventListener("click", reset);

buttonModal[1].addEventListener("click", confirm);

window.addEventListener("click", () => {
  if (modal.style.visibility === "visible") {
    reset();
  }
});

window.addEventListener("keydown", (event) => {
  if (modal.style.visibility === "visible") {
    if (event.code === "Escape") reset();
    else if (event.code === "Enter") confirm();
  } else {
    if (
      event.key >= "0" &&
      event.key <= "9" &&
      !(input === document.activeElement)
    )
      input.value += +event.key;
    else if (event.key === "Backspace")
      input.value = input.value.slice(0, input.value.length - 1);
    if (event.code === "Enter") {
      if (document.querySelector(".main__button").innerHTML === "Угадать")
        checkNumber();
      else resetForm();
    }
  }
});
