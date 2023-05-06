const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

async function reveal() {
    delayTime = await delay(0);
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;

        let animations = getUserData("animations");
        if (animations.length == 0 || animations[0].toggledOn == undefined || animations[0].toggledOn == true) {
            if (elementTop < windowHeight - 80) {
                reveals[i].classList.add("active");
                delayTime = await delay(250);
            } else {
                reveals[i].classList.remove("active");
            }
        } else {
            reveals[i].classList.remove("reveal-left");
            reveals[i].classList.remove("reveal-right");
            reveals[i].classList.remove("reveal-bottom");
            reveals[i].classList.remove("reveal");
        }
    }
}

window.addEventListener("scroll", reveal);
document.addEventListener("DOMContentLoaded", reveal);