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

function displayDonate() {
    var dialog = document.createElement("div");
    dialog.id = "donate";
    dialog.style.position = "fixed";
    dialog.style.top = "0";
    dialog.style.left = "0";
    dialog.style.width = "100%";
    dialog.style.height = "100%";
    dialog.style.backgroundColor = "rgba(0,0,0,0.5)";
    dialog.style.zIndex = "1000";
    dialog.style.display = "flex";
    dialog.style.justifyContent = "center";
    dialog.style.alignItems = "center";
    dialog.style.flexDirection = "row";

    var paypal = document.createElement("a");
    paypal.href = "https://paypal.me/helloitsmeadm";
    paypal.target = "_blank";
    paypal.style.textDecoration = "none";
    paypal.style.color = "black";
    paypal.style.margin = "10px";
    paypal.style.padding = "10px";
    paypal.style.borderRadius = "5px";
    paypal.style.display = "flex";
    paypal.style.justifyContent = "center";
    paypal.style.alignItems = "center";
    paypal.style.flexDirection = "column";
    paypal.style.transition = "all 0.2s ease-in-out";
    paypal.style.backgroundColor = "var(--darker-gray)";
    paypal.style.color = "white";
    paypal.style.width = "200px";
    paypal.style.height = "200px";
    var paypalIcon = document.createElement("img");
    paypalIcon.src = "/images/paypal.png";
    paypalIcon.style.width = "50px";
    paypalIcon.style.height = "50px";
    paypalIcon.style.margin = "10px";
    paypal.appendChild(paypalIcon);
    var paypalText = document.createElement("p");
    paypalText.innerHTML = "Paypal";
    paypalText.style.fontSize = "20px";
    paypalText.style.textAlign = "center";
    paypal.appendChild(paypalText);

    var coffee = document.createElement("a");
    coffee.href = "https://www.buymeacoffee.com/vojtechadam";
    coffee.target = "_blank";
    coffee.style.textDecoration = "none";
    coffee.style.color = "black";
    coffee.style.margin = "10px";
    coffee.style.padding = "10px";
    coffee.style.borderRadius = "5px";
    coffee.style.display = "flex";
    coffee.style.justifyContent = "center";
    coffee.style.alignItems = "center";
    coffee.style.flexDirection = "column";
    coffee.style.transition = "all 0.2s ease-in-out";
    coffee.style.backgroundColor = "var(--darker-gray)";
    coffee.style.color = "white";
    coffee.style.width = "200px";
    coffee.style.height = "200px";
    var coffeeIcon = document.createElement("img");
    coffeeIcon.src = "/images/buymeacoffee.png";
    coffeeIcon.style.width = "50px";
    coffeeIcon.style.height = "50px";
    coffeeIcon.style.margin = "10px";
    coffee.appendChild(coffeeIcon);
    var coffeeText = document.createElement("p");
    coffeeText.innerHTML = "Buy me a coffee";
    coffeeText.style.fontSize = "20px";
    coffeeText.style.textAlign = "center";
    coffee.appendChild(coffeeText);

    var close = document.createElement("button");
    close.innerHTML = "Close";
    close.style.margin = "10px";
    close.style.padding = "20px";
    close.style.borderRadius = "5px";
    close.style.transition = "all 0.2s ease-in-out";
    close.style.backgroundColor = "var(--darker-gray)";
    close.style.color = "white";
    close.style.cursor = "pointer";
    close.style.fontSize = "20px";
    close.style.border = "none";
    close.style.outline = "none";
    close.onclick = function() {
        dialog.remove();
    }
    close.style.position = "absolute";
    close.style.top = "0";
    close.style.right = "0";

    paypal.addEventListener("mouseover", function() {
        paypal.style.transform = "translateY(-10px)";
    });
    paypal.addEventListener("mouseout", function() {
        paypal.style.transform = "translateY(0px)";
    });
    coffee.addEventListener("mouseover", function() {
        coffee.style.transform = "translateY(-10px)";
    });
    coffee.addEventListener("mouseout", function() {
        coffee.style.transform = "translateY(0px)";
    });
    close.addEventListener("mouseover", function() {
        close.style.transform = "translateX(-10px)";
    });
    close.addEventListener("mouseout", function() {
        close.style.transform = "translateX(0px)";
    });

    document.addEventListener("keydown", function(e) {
        if (e.key == "Escape") {
            dialog.remove();
        }
    });
    dialog.addEventListener("click", function(e) {
        if (e.target == dialog) {
            dialog.remove();
        }
    });

    paypal.addEventListener("click", function() {
        dialog.remove();
    });
    coffee.addEventListener("click", function() {
        dialog.remove();
    });

    dialog.appendChild(paypal);
    dialog.appendChild(coffee);
    dialog.appendChild(close);
    document.body.appendChild(dialog);

    return;
}