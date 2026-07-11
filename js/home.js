// Calculate header height
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
// Reset variable whener screen size changes
window.addEventListener("resize", setHeaderHeightVar);

// Animated stat counter
const statNumbers = document.querySelectorAll(".stat-number");
const speed = 60; // Lower value = higher speed

// Loop through each stat counter
statNumbers.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";

    // Increments counter until target
    const updateCount = () => {
        const count = Number(counter.innerText.replace(/\D/g, ""));
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment) + suffix;
            setTimeout(updateCount, 20);
        }
        // Once hit, lock in the exact value
        else {
            counter.innerText = target.toLocaleString() + suffix;
        }
    };
    // Kick off the animation for this counter
    updateCount();
});
