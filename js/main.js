var prevScrollpos = window.pageYOffset;
window.ontouchmove = function() {
    scroll();
}
window.onscroll = function() {
    scroll();
}
window.onload = function() {
    loadFooter();
    toggleMenu();
}

function scroll() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("header").style.height = "80px";
        document.getElementById("header").style.opacity = "1";
    }
    if (prevScrollpos < currentScrollPos - 5) {
        document.getElementById("header").style.height = "0px";
        document.getElementById("header").style.opacity = "0";
    }
    prevScrollpos = currentScrollPos;
}

function loadFooter(e) {
    (e || window.event).preventDefault();

    fetch("/assets/footer.html")
        .then((response) => response.text())
        .then((html) => {
            document.getElementById("footer").innerHTML = html;
            var scripts = document.getElementById("footer").getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++) {
                eval(scripts[i].innerHTML);
            }
        })
        .catch((error) => {
            console.warn(error);
        });
}

function toggleMenu() {
    var toggled = true;
    var links = document.getElementById("links");
    var hamburger = document.getElementById("hamburger");
    var header = document.getElementById("header");
    var headerItems = document.getElementById("headerItems");
    var hamburgerIcon = hamburger.getElementsByTagName("i")[0];

    if (window.innerWidth < 1000) {
        if (links.style.display === "block") {
            links.style.display = "none";
            header.style.height = "100px";
            headerItems.style.height = "95px";
            hamburgerIcon.classList.remove("fa-times");
            hamburgerIcon.classList.add("fa-bars");
            toggled = false;
            hamburgerIcon.style.transform = "rotate(0deg)";
            hamburgerIcon.style.opacity = "0";
            sleep(200).then(() => {
                hamburgerIcon.style.opacity = "1";
            });
        } else {
            links.style.display = "block";
            header.style.height = "190px";
            headerItems.style.height = "185px";
            hamburgerIcon.classList.remove("fa-bars");
            hamburgerIcon.classList.add("fa-times");
            toggled = true;
            hamburgerIcon.style.transform = "rotate(90deg)";
            hamburgerIcon.style.opacity = "0";
            sleep(200).then(() => {
                hamburgerIcon.style.opacity = "1";
            });
        }
    }
    window.addEventListener("resize", function() {
        if (window.innerWidth > 1000) {
            links.style.display = "block";
            hamburger.style.display = "none";
            hamburger.style.opacity = 0;
            header.style.height = "100px";
            headerItems.style.height = "95px";
        } else {
            if (toggled) {
                links.style.display = "block";
                hamburger.style.display = "block";
                hamburger.style.opacity = 1;
                header.style.height = "190px";
                headerItems.style.height = "185px";
            } else {
                links.style.display = "none";
                hamburger.style.display = "block";
                hamburger.style.opacity = 1;
                header.style.height = "100px";
                headerItems.style.height = "95px";
            }
        }
    });
    return;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}