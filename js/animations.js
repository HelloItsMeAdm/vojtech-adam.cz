const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

async function reveal() {
    delayTime = await delay(0);
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;

        if (elementTop < windowHeight - 80) {
            reveals[i].classList.add("active");
            delayTime = await delay(300);
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);