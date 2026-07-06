// Keeps the hero exactly one viewport tall by accounting for the real,
// breakpoint-dependent height of the sticky header above it
function setHeaderHeightVar() {
    const header = document.querySelector("header");
    if (header) {
        document.documentElement.style.setProperty(
            "--header-height",
            `${header.offsetHeight}px`,
        );
    }
}

setHeaderHeightVar();
window.addEventListener("resize", setHeaderHeightVar);

// Animated Counter
const statNumbers = document.querySelectorAll(".stat-number");
const speed = 60;

statNumbers.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";

    const updateCount = () => {
        const count = Number(counter.innerText.replace(/\D/g, ""));
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment) + suffix;
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target.toLocaleString() + suffix;
        }
    };
    updateCount();
});
