window.onload = function() {
    // Load everything and then remove loading screen
    document.getElementById("loading").remove();
    document.getElementById("body").style.display = "block";
    document.getElementById("preloadCSS").remove();
}

function toggleMenu() {
    var links = document.getElementById("links");
    var hamburgerIcon = document.getElementById("hamburgerIcon");

    // Style list for screen < 1000px
    if (window.innerWidth < 1000) {
        if (links.classList.contains("hide-links")) { // If menu is open
            hamburgerIcon.classList.add("fa-times");
            hamburgerIcon.classList.remove("fa-bars");
            hamburgerIcon.style.transform = "rotate(90deg)";
        } else { // If menu is closed
            hamburgerIcon.classList.add("fa-bars");
            hamburgerIcon.classList.remove("fa-times");
            hamburgerIcon.style.transform = "rotate(0deg)";
        }
        links.classList.toggle("hide-links");
    }

    // Resize handle
    window.addEventListener("resize", function() {
        if (window.innerWidth > 1000) { // If screen is > 1000px
            links.classList.remove("hide-links");
            hamburgerIcon.classList.add("fa-times");
            hamburgerIcon.classList.remove("fa-bars");
            hamburgerIcon.style.transform = "rotate(90deg)";
        }
    });
    return;
}