const frame = document.querySelector("section");
const list = frame.querySelectorAll("article");
const len = list.length;
const deg = 360 / len;

const names = ["cardio", "groove", "happy", "light", "lily", "limes", "pop", "swing"];

for (let i = 0; i < len; i++) {
  list[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;

  const pic = list[i].querySelector(".pic");
  pic.style.backgroundImage = `url(../img/${names[i]}.jpg)`;

  const title = list[i].querySelector(".text>h2");
  title.innerHTML = `${names[i]}`;

  const audio = document.createElement("audio");
  audio.setAttribute("src", `../music/${names[i]}.mp3`);
  audio.setAttribute("loop", "loop");

  list[i].append(audio);
}

const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
let num = 0;

let active = 0;

prev.addEventListener("click", function (e) {
  frame.style.transform = `rotate(${deg * ++num}deg)`;

  if (active === 0) {
    active = len - 1;
  } else {
    active--;
  }

  for (let el of list) {
    el.classList.remove("on");
  }
  list[active].classList.add("on");
});

next.addEventListener("click", function (e) {
  frame.style.transform = `rotate(${deg * --num}deg)`;

  if (active === len - 1) {
    active = 0;
  } else {
    active++;
  }

  for (let el of list) {
    el.classList.remove("on");
  }
  list[active].classList.add("on");
});

let before = 0;

for (let el of list) {
  const play = el.querySelector(".play");
  const pause = el.querySelector(".pause");
  const load = el.querySelector(".reload");

  play.addEventListener("click", function (e) {
    if (before === 0) {
      before = e.currentTarget;
    } else if (before !== e.currentTarget) {
      before.closest("article").querySelector("audio").pause();
      before.closest("article").querySelector(".pic").classList.remove("on");
      before = e.currentTarget;
    }

    e.currentTarget
      .closest("article")
      .querySelector(".pic")
      .classList.add("on");

    e.currentTarget.closest("article").querySelector("audio").play();
  });

  pause.addEventListener("click", function (e) {
    e.currentTarget
      .closest("article")
      .querySelector(".pic")
      .classList.remove("on");

    e.currentTarget.closest("article").querySelector("audio").pause();
  });

  load.addEventListener("click", function (e) {
    if (before === 0) {
      before = e.currentTarget;
    } else if (before !== e.currentTarget) {
      before.closest("article").querySelector("audio").pause();
      before.closest("article").querySelector(".pic").classList.remove("on");
      before = e.currentTarget;
    }

    e.currentTarget
      .closest("article")
      .querySelector(".pic")
      .classList.add("on");

    e.currentTarget.closest("article").querySelector("audio").load();
    e.currentTarget.closest("article").querySelector("audio").play();
  });
}
