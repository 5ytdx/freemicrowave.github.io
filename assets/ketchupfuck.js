// technoabyss @ chitin.link

let ketchup_score = Number(window.localStorage.getItem("ketchup_score") || 0);

let update_ketchup_score = () => {
  window.localStorage.setItem("ketchup_score", String(ketchup_score));
};
update_ketchup_score();

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
  ket_ctr.innerText = ketchup_score;
  ket_cont.appendChild(ket_img);
  ket_cont.appendChild(ket_ctr);
  ket_cont.addEventListener("click", async () => {
    ketchup_score += 1;
    update_ketchup_score();
    ket_ctr.innerText = ketchup_score;
    if (snd_canplay) {
      snd.pause();
      snd.currentTime = 0;
      await snd.play();
    }
  });
  document.body.appendChild(ket_cont);
});
