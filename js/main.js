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
    } else {
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
    var x = document.getElementById("links");
    var y = document.getElementById("hamburger");
    var toggled = true;
    if (x.style.display === "block") {
        x.style.display = "none";
        toggled = false;
    } else {
        x.style.display = "block";
        toggled = true;
    }
    window.addEventListener("resize", function() {
        if (window.innerWidth > 1000) {
            x.style.display = "block";
            y.style.display = "none";
            y.style.opacity = 0;
        } else {
            if (toggled) {
                x.style.display = "block";
                y.style.display = "block";
                y.style.opacity = 1;
            } else {
                x.style.display = "none";
                y.style.display = "block";
                y.style.opacity = 1;
            }
        }
    });
    return;
}