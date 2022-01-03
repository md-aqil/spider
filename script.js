gsap.registerPlugin(MotionPathPlugin);
const logo = "#dpad-logo";
function registerPath(timeline, path, isLast) {
    const el = document.querySelector(path);
    const start = parseInt(el.getAttribute("data-start") || 1);
    const end = parseInt(el.getAttribute("data-end") || 0);
    console.log({ start, end });
    timeline.to(logo, {
        motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            start,
            end,
        },
        duration: 0.5,
        scale: isLast ? 0.5 : 1,
        immediateRender: true,
        opacity: 0.5,
    });
}

for (const component of document.querySelectorAll("[data-path]")) {
    const paths = component.getAttribute("data-path");
    const timeline = gsap.timeline({
        yoyo: true,
        paused: true,
        ease: Linear.easeNone,
    });
    paths.split(",").map((x, i, all) => registerPath(timeline, x, all.length - 1 === i));
    component.addEventListener("mouseenter", () => {
        timeline.play();
    });
    component.addEventListener("mouseleave", () => timeline.reverse());
}
