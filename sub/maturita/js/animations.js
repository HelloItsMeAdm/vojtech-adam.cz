function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function scroll() {
    // If scrolled past header, hide header
    let header = document.getElementById("header");
    if (window.scrollY > header.offsetHeight) {
        header.classList.add("hide-header");
    } else {
        header.classList.remove("hide-header");
    }
}

// Add event listeners
window.addEventListener("touchmove", scroll);
window.addEventListener("scroll", scroll);