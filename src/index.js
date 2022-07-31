import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import MotionPathPlugin from "gsap/MotionPathPlugin";

gsap.registerPlugin(
  ScrollTrigger,
  DrawSVGPlugin,
  MotionPathPlugin
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
  .to(".storyText06, .ball06", {}, 65.65)
  .to(".storyText07, .ball07", {}, 75)
  .to(".storyText08, .ball08", {}, 81.72)
  .to(".storyText09, .ball09", {}, 82.41)



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
       Maui
   ============== */
  .to(
    ".Maui",
    {
      scrollTrigger: {
        trigger: ".Maui",
        start: "center 40%",
        // end: "+=350",
        // pin: "#svg",
        // markers: true,
        toggleClass: {
          targets: ".storyMauiHidden",
          className: "storyMauiShow"
        }
      },
      duration: 100
    },
    0
  )
  .add(pulses, 0);

// GSDevTools.create({ animation: main });



// Lightboxes
document.getElementById("uiterangi-playbutton").addEventListener("click", triggerUiTerangiLightbox, false)
document.getElementById("maui-playbutton").addEventListener("click", triggerMauiLightbox, false)
document.getElementById("disclaimer-infobutton").addEventListener("click", triggerInfoLightbox, false)
console.log(document.getElementById("disclaimer-infobutton"))




// info button
function triggerInfoLightbox() {
  console.log("info clicked")
  // add noscroll class to body
  document.getElementsByTagName("body")[0].classList.add("noscroll");
  // display: flex to lightbox info
  document.getElementById("info-lightbox").classList.add("active");
}

// maui lightbox
function triggerUiTerangiLightbox() {
  // add noscroll class to body
  document.getElementsByTagName("body")[0].classList.add("noscroll");
  // display: flex to lightbox maui
  document.getElementById("uiterangi-lightbox").classList.add("active");
}

// te uirangi ora lightbox
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
