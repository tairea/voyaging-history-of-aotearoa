import gsap from "gsap-trial";

import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { DrawSVGPlugin } from "gsap-trial/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap-trial/MotionPathPlugin";
import { GSDevTools } from "gsap-trial/GSDevTools";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";

gsap.registerPlugin(
  ScrollTrigger,
  DrawSVGPlugin,
  MotionPathPlugin,
  GSDevTools,
  ScrollSmoother
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
  .to(".storyText04, .ball04", {}, 39)
  .to(".storyText05, .ball05", {}, 40.7)
  .to(".storyText06, .ball06", {}, 42)
  .to(".storyText07, .ball07", {}, 44)
  .to(".storyText08, .ball08", {}, 47.26)



const main = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#svg",
      scrub: true,
      start: "top top",
      end: "bottom bottom",
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
  // 650AD Story
  // .to(
  //   ".storyLine01",
  //   {
  //     scrollTrigger: {
  //       trigger: ".storyLine01",
  //       start: "center 20%",
  //       end: "+=300",
  //       pin: "#svg"
  //       // markers: true,
  //       // toggleClass: {
  //       //   targets: ".story650ADHidden",
  //       //   className: "story650ADShow"
  //       // }
  //     },
  //     duration: 100
  //   },
  //   0
  // )
  // .add(pulses, 0)





  // 233BC Story
  .to(
    ".storyLine00",
    {
      scrollTrigger: {
        trigger: ".storyLine00",
        start: "center 10%",
        // end: "+=350",
        // pin: "#svg",
        markers: true,
        toggleClass: {
          targets: ".story233BCHidden",
          className: "story233BCShow"
        }
      },
      duration: 100
    },
    0
  )
  .add(pulses, 0)
  // 800AD Story
  .to(
    ".storyLine02",
    {
      scrollTrigger: {
        trigger: ".storyLine02",
        start: "center 20%",
        end: "+=350",
        pin: "#svg",
        // markers: true,
        toggleClass: {
          targets: ".story800ADHidden",
          className: "story800ADShow"
        }
      },
      duration: 100
    },
    0
  )
  .add(pulses, 0);

GSDevTools.create({ animation: main });



// Lightboxes
document.getElementById("maui-playbutton").addEventListener("click", triggerMauiLightbox, false)
document.getElementById("disclaimer-infobutton").addEventListener("click", triggerInfoLightbox, false)

function triggerMauiLightbox() {
  // add noscroll class to body
  document.getElementsByTagName("body")[0].classList.add("noscroll");
  // display: flex to lightbox maui
  document.getElementById("maui-lightbox").classList.add("active");
}
function triggerInfoLightbox() {
  // add noscroll class to body
  document.getElementsByTagName("body")[0].classList.add("noscroll");
  // display: flex to lightbox info
  document.getElementById("info-lightbox").classList.add("active");
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
  });
});
