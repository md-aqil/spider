gsap.registerPlugin(MotionPathPlugin);

const logo = "#dpad-logo";
function registerPaths(timeline, paths) {
  paths.split(",").forEach((path) => {
    timeline.to(logo, {
      motionPath: {
        path,
        align: path,
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
        start: 1,
        end: 0,
      },
      duration: 0.5,
      scale: 0.5,
      immediateRender: true,
      opacity: 0.5,
    });
  });
}

for (const component of document.querySelectorAll("[data-path]")) {
  const path = component.getAttribute("data-path");
  const timeline = gsap.timeline({
    yoyo: true,
    paused: true,
    ease: Linear.easeNone,
  });
  registerPaths(timeline, path);
  component.addEventListener("mouseenter", () => {
    console.log("mouse enter");
    console.log({ path, timeline });
    timeline.play();
  });
  component.addEventListener("mouseleave", () => timeline.reverse());
}
