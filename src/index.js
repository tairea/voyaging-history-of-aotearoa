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
  .to(".storyText01, .ball02", {}, 52.73)
  .to(".storyText02, .ball03", {}, 60.65)
  .to(".storyText03, .ball04", {}, 67.46);
// .to(".storyText04, .ball05", {}, 79)
// .to(".storyText05, .ball06", {}, 80);

const main = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#svg",
      scrub: true,
      start: "top top",
      end: "bottom bottom"
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

document.getElementById("maui-playbutton").addEventListener("click", triggerMauiLightbox, false)
document.getElementById("lightbox-closebutton").addEventListener("click", triggerMauiLightbox, false)

var activeFlag = false

function triggerMauiLightbox() {
  activeFlag = !activeFlag
  if (activeFlag) {

    // add noscroll class to body
    document.getElementsByTagName("body")[0].classList.add("noscroll");
    // display: flex to lightbox maui
    document.getElementById("maui-lightbox").classList.add("active");
  } else {
    // add noscroll class to body
    document.getElementsByTagName("body")[0].classList.remove("noscroll");
    // display: flex to lightbox maui
    document.getElementById("maui-lightbox").classList.remove("active");
  }
}