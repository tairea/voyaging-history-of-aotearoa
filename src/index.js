import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import MotionPathPlugin from "gsap/MotionPathPlugin";
// import GSDevTools from "gsap/GSDevTools";

gsap.registerPlugin(
  ScrollTrigger,
  DrawSVGPlugin,
  MotionPathPlugin,
  // GSDevTools
);

gsap.to(".main-title", {
  yPercent: -200,
  ease: "none",
  scrollTrigger: {
    trigger: ".title",
    // start: "top bottom", // the default values
    // end: "bottom top",
    scrub: true
  }
});

gsap.to(".sub-title", {
  yPercent: 50,
  ease: "none",
  scrollTrigger: {
    trigger: ".title",
    // start: "top bottom", // the default values
    // end: "bottom top",
    scrub: true
  }
});

gsap.defaults({ ease: "none" });

const pulses = gsap
  .timeline({
    defaults: {
      scale: 2,
      autoAlpha: 1,
      transformOrigin: "center",
      ease: "elastic(2.5,1)"
    }
  })
  // These are the GSAP Timeline timings of when to pulse the text & circles
  .to(".storyText01, .ball01", {}, 7.05)
  .to(".storyText02, .ball02", {}, 20.44)
  .to(".storyText03, .ball03", {}, 25.4)
  .to(".storyText04, .ball04", {}, 49.4)
  .to(".storyText05, .ball05", {}, 60.26)
  .to(".storyText06, .ball06", {}, 67.11)
  .to(".storyText07, .ball07", {}, 75)
  .to(".storyText08, .ball08", {}, 81.22)
  .to(".storyText09, .ball09", {}, 82.07)
  .to(".storyText10, .ball10", {}, 82.85)
  .to(".storyText11, .ball11", {}, 84.75)



const main = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#svg",
      scrub: true,
      start: "top top",
      end: "bottom 70%",
      // markers: true
    }
  })
  .from(".theLine", { drawSVG: 0, duration: 100 })
  .to(
    ".waka",
    {
      motionPath: {
        path: ".theLine",
        align: ".theLine",
        alignOrigin: [0.5, 1.2],
        autoRotate: 90
      },
      duration: 100
    },
    0
  )
  /* ==============
      Ui TeRangi Ora
     ============== */
  .to(
    ".UiTeRangi",
    {
      scrollTrigger: {
        trigger: ".UiTeRangi",
        start: "center 40%",
        // end: "+=450",
        // pin: "#svg",
        // markers: true,
        toggleClass: {
          targets: ".storyUiTeRangiHidden",
          className: "storyUiTeRangiShow"
        }
      },
      duration: 100
    },
    0
  )
  .add(pulses, 0)
  /* ==============
       Muturangawhenua
   ============== */
  .to(
    ".Muturangawhenua",
    {
      scrollTrigger: {
        trigger: ".Muturangawhenua",
        start: "center 40%",
        // end: "+=350",
        // pin: "#svg",
        // markers: true,
        toggleClass: {
          targets: ".storyMuturangawhenuaHidden",
          className: "storyMuturangawhenuaShow"
        }
      },
      duration: 100
    },
    0
  )
  .add(pulses, 0)
  /* ==============
       Arutanganuku
   ============== */
  .to(
    ".Arutanganuku",
    {
      scrollTrigger: {
        trigger: ".Arutanganuku",
        start: "center 40%",
        // end: "+=350",
        // pin: "#svg",
        // markers: true,
        toggleClass: {
          targets: ".storyArutanganukuHidden",
          className: "storyArutanganukuShow"
        }
      },
      duration: 100
    },
    0
  )
  .add(pulses, 0)
  /* ==============
       Tangiia
   ============== */
  .to(
    ".Tangiia",
    {
      scrollTrigger: {
        trigger: ".Tangiia",
        start: "center 40%",
        end: "+=650",
        // pin: "#svg",
        // markers: true,
        toggleClass: {
          targets: ".storyTangiiaHidden",
          className: "storyTangiiaShow"
        }
      },
      duration: 100
    },
    0
  )
  .add(pulses, 0);

// GSDevTools.create({ animation: main });



// Lightboxes
document.getElementById("disclaimer-infobutton").addEventListener("click", triggerInfoLightbox)
document.getElementById("uiterangi-playbutton").addEventListener("click", triggerUiTerangiLightbox)
document.getElementById("maui-playbutton").addEventListener("click", triggerMauiLightbox)
document.getElementById("Muturangawhenua-playbutton").addEventListener("click", triggerMuturangawhenuaLightbox)
document.getElementById("Arutanganuku-playbutton").addEventListener("click", triggerArutanganukuLightbox)
console.log(document.getElementById("disclaimer-infobutton"))




// info button
function triggerInfoLightbox() {
  console.log("info clicked")
  // add noscroll class to body
  document.getElementsByTagName("body")[0].classList.add("noscroll");
  // display: flex to lightbox info
  document.getElementById("info-lightbox").classList.add("active");
}

// te uirangi ora lightbox
function triggerUiTerangiLightbox() {
  // add noscroll class to body
  document.getElementsByTagName("body")[0].classList.add("noscroll");
  // display: flex to lightbox maui
  document.getElementById("uiterangi-lightbox").classList.add("active");
}
// Muturangawhenua lightbox
function triggerMuturangawhenuaLightbox() {
  // add noscroll class to body
  document.getElementsByTagName("body")[0].classList.add("noscroll");
  // display: flex to lightbox maui
  document.getElementById("Muturangawhenua-lightbox").classList.add("active");
}
// Arutanganuku lightbox
function triggerArutanganukuLightbox() {
  // add noscroll class to body
  document.getElementsByTagName("body")[0].classList.add("noscroll");
  // display: flex to lightbox maui
  document.getElementById("Arutanganuku-lightbox").classList.add("active");
}

// maui lightbox
function triggerMauiLightbox() {
  // add noscroll class to body
  document.getElementsByTagName("body")[0].classList.add("noscroll");
  // display: flex to lightbox maui
  document.getElementById("maui-lightbox").classList.add("active");
}


// close x's
const closeXs = document.querySelectorAll('.close-button');
console.log("closeXs", closeXs)
closeXs.forEach(X => {
  X.addEventListener('click', function handleClick(event) {
    // remove noscroll class from body
    document.getElementsByTagName("body")[0].classList.remove("noscroll");
    // remove active class from all lightboxes
    document.querySelectorAll(".lightbox").forEach(obj => obj.classList.remove("active"));
    // stop videos
    const videos = document.querySelectorAll('iframe')
    videos.forEach(i => {
      const source = i.src
      i.src = ''
      i.src = source
    })
  });
});
