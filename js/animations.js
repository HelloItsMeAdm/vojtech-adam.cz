const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

async function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;

        let animations = getUserData("animations");
        if (animations.length == 0) {
            if (areAnimationsEnabled()) {
                if (elementTop < windowHeight - 80) {
                    reveals[i].classList.add("active");
                    delayTime = await delay(200);
                } else {
                    reveals[i].classList.remove("active");
                }
            } else {
                revealAll(reveals);
            }
        } else if (animations[0].toggledOn == true) {
            if (elementTop < windowHeight - 80) {
                reveals[i].classList.add("active");
                delayTime = await delay(250);
            } else {
                reveals[i].classList.remove("active");
            }
        } else {
            revealAll(reveals);
        }
    }
}

function revealAll(reveals) {
    for (var i = 0; i < reveals.length; i++) {
        reveals[i].classList.add("active");
    }
}


window.addEventListener("scroll", reveal);
document.addEventListener("DOMContentLoaded", reveal);