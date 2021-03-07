// technoabyss @ galaxybra.in

const
  snd = new Audio("/assets/skull_trumpet.mp3");
snd.volume = 0.05;
let snd_canplay = false;
snd.addEventListener("canplaythrough", () => snd_canplay = true);

window.addEventListener("load", () => {
  let ket_cont = document.createElement("div");
  let ket_img = document.createElement("img");
  let ket_ctr = document.createElement("div");
  ket_cont.classList.add("ketchupfuck");
  ket_img.src = "/assets/img/ketchup_fuck.png";
  ket_ctr.innerText = 0;
  ket_cont.appendChild(ket_img);
  ket_cont.appendChild(ket_ctr);
  ket_cont.addEventListener("click", async () => {
    ket_ctr.innerText = Number( ket_ctr.innerText ) + 1;
    if (snd_canplay) {
      snd.pause();
      snd.currentTime = 0;
      await snd.play();
    }
  });
  document.body.appendChild(ket_cont);
});
