gsap.registerPlugin(MotionPathPlugin);
const logo = "#dpad-logo";
function registerPath(timeline, path, isLast) {
    const el = document.querySelector(path);
    const start = parseInt(el.getAttribute("data-start") || 1);
    const end = parseInt(el.getAttribute("data-end") || 0);
    timeline.to(logo, {
        motionPath: {
            path,
            align: path,
            alignOrigin: [
                0.5,
                0.5
            ],
            start,
            end
        },
        duration: 0.5,
        scale: isLast ? 0.5 : 1,
        immediateRender: true,
        opacity: 0.5
    });
}
function handleClick(e) {
    const link = e.getAttribute("data-href");
    if (!link) return;
    window.location.href = link;
}
let previousTimeline = {
    paths: [],
    timeline: null
};
for (const component of document.querySelectorAll("[data-path]")){
    const paths = component.getAttribute("data-path");
    const child = component.getAttribute("data-child");
    const timeline = gsap.timeline({
        yoyo: true,
        paused: true,
        ease: Linear.easeNone
    });
    const pathsArray = paths.split(",");
    pathsArray.map((x, i, all)=>registerPath(timeline, x, all.length - 1 === i)
    );
    if (child) timeline.to(child, {
        duration: 0.5,
        scale: 0.5,
        transformOrigin: "center"
    }, 0);
    component.addEventListener("mouseenter", ()=>{
        timeline.play();
    });
    // component.addEventListener("mouseleave", () => timeline.reverse());
    component.addEventListener("click", ()=>handleClick(component)
    );
}
function intersect(source, target) {
    for (const item of source){
        if (target.includes(item)) return true;
    }
    return false;
}

//# sourceMappingURL=index.18b01ba4.js.map
