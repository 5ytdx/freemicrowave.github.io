---

---
// technoabyss @ chitin.link

const wrap = document.getElementById("wrap");

// Random in range
const r_range = (min, max) => Math.ceil(Math.random() * ( max - min ) + min);

// Async get img
const getImage = src => new Promise(
  (resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  }
);

// Images + links
const
  fakead_images = {%
    assign fakeads = site.static_files
    | where: "fakead", true
    | map: "path" %}{{
    fakeads | jsonify }},
  fakead_links = {{ site.data.fakeads | jsonify }},
  fakeads = fakead_images.map(
    (e, i) => { return { img: e, link: fakead_links[i] } }
  );

// On load
window.addEventListener("load", async () => {
  // range of ads
  const num_ads = r_range(1, 3);
  // Get #wrap bounding rect
  let wrap_rect = wrap.getBoundingClientRect();

  // We're alternating the side the ad is placed,
  // and we need to track vertical space.
  let side = true; // true = right; false = left
  let lowest_left = 0, lowest_right = 0;

  // (num_ads) times
  for (let i = 0; i <= num_ads; i++) {
    // Select random ad, pop it out
    let a_i = Math.floor(Math.random() * fakeads.length);
    let ad_data = fakeads[a_i];
    console.log(a_i);
    fakeads.splice(a_i, 1);
    // Break out if we're out of ads
    if (!ad_data) break;

    // Create and compose elements
    let
      ad_cont = document.createElement("div"),
      ad_link = document.createElement("a"),
      ad_img  = await getImage(ad_data.img);
    ad_cont.classList.add("fakead");
    ad_cont.appendChild(ad_link);
    ad_link.appendChild(ad_img);
    if (ad_data.link) ad_link.href = ad_data.link;
    // Append to #wrap
    // .fakead css rules set these up to start at 0,0
    wrap.appendChild(ad_cont);

    // Logic for positioning ads
    // Ads are positioned 10-150px below the top of the page/other ad,
    // and 18px from the margin on either side.
    let vmargin = r_range(10, 80);
    if (side) {
      let top = lowest_right + vmargin;
      lowest_right += top + ad_img.height;
      ad_cont.style.top  = `${top}px`;
      ad_cont.style.left = `calc(var(--fakead_right) + 18px)`;
    } else {
      let top = lowest_left + vmargin;
      lowest_left += top + ad_img.height;
      ad_cont.style.top =  `${top}px`;
      ad_cont.style.left = `calc(var(--fakead_left) - ${ad_img.width}px - 18px`;
    }
    // Alternate
    side = !side;
  }

  // Set anchors on both side of #wrap and update them on window resize events
  document.body.style.setProperty("--fakead_left", wrap_rect.left + "px");
  document.body.style.setProperty("--fakead_right", wrap_rect.right + "px");
  window.addEventListener("resize", e => {
    let wrap_rect = wrap.getBoundingClientRect();
    document.body.style.setProperty("--fakead_left", wrap_rect.left + "px");
    document.body.style.setProperty("--fakead_right", wrap_rect.right + "px");
  });
});
