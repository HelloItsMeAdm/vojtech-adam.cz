var prevScrollpos = window.pageYOffset;
var headerHeight = "100px";
window.ontouchmove = function() {
    scroll();
}
window.onscroll = function() {
    scroll();
}
window.onload = function() {
    toggleMenu();
    if (document.title === "Vojtěch Adam | Školní projekty") {
        getSchoolProjects();
    } else {
        showContent();
    }
    loadFooter();
    donateCountdown = setInterval(function() {
        var counter = parseInt(localStorage.getItem("donateCountdown"));
        if (isNaN(counter)) {
            counter = 0;
        }
        counter++;
        localStorage.setItem("donateCountdown", counter);
        if (counter >= 5) {
            if (parseInt(localStorage.getItem("askedDonate")) !== 1) {
                askDonate();
            }
            localStorage.setItem("askedDonate", 1);
            clearInterval(donateCountdown);
        }
    }, 1000);
}

function scroll() {
    if (window.pageYOffset > headerHeight.replace("px", "")) {
        document.getElementById("header").style.height = "0px";
        document.getElementById("header").style.opacity = "0";
    } else {
        document.getElementById("header").style.height = headerHeight;
        document.getElementById("header").style.opacity = "1";
    }
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

    header.style.position = "sticky";

    if (window.innerWidth < 1000) {
        if (links.style.display === "block") {
            links.style.display = "none";
            headerHeight = "100px";
            header.style.height = headerHeight;
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
            headerHeight = "240px";
            header.style.height = headerHeight;
            headerItems.style.height = "235px";
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
            headerHeight = "100px";
            header.style.height = headerHeight;
            headerItems.style.height = "95px";
        } else {
            if (toggled) {
                links.style.display = "block";
                hamburger.style.display = "block";
                hamburger.style.opacity = 1;
                headerHeight = "240px";
                header.style.height = headerHeight;
                headerItems.style.height = "235px";
            } else {
                links.style.display = "none";
                hamburger.style.display = "block";
                hamburger.style.opacity = 1;
                headerHeight = "100px";
                header.style.height = headerHeight;
                headerItems.style.height = "95px";
            }
        }
    });
    return;
}

function showContent() {
    document.getElementById("loading").remove();
    document.getElementById("body").style.display = "block";
    document.getElementById("preloadCSS").remove();
}

function getSchoolProjects() {
    fetch("/school/projects.json")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let section = document.createElement("section");
                section.classList.add("cards");

                let container = document.createElement("div");
                container.classList.add("container");
                container.classList.add("reveal");
                container.classList.add("reveal-left");

                let img = document.createElement("img");
                img.classList.add("content-image");
                img.src = data[i].image;
                img.alt = data[i].name;

                let contentText = document.createElement("div");
                contentText.classList.add("content-text");

                let projectTitle = document.createElement("div");
                projectTitle.classList.add("project-double-title");

                let h3 = document.createElement("h3");
                h3.innerHTML = data[i].name;

                let h4 = document.createElement("h4");
                h4.innerHTML = "Vytvořeno: " + data[i].date;

                let p = document.createElement("p");
                p.innerHTML = data[i].description;

                let button = document.createElement("button");
                button.classList.add("button");
                button.onclick = function() {
                    window.open(data[i].url, "_blank");
                }

                let buttonSpan = document.createElement("span");
                buttonSpan.classList.add("arrow");
                buttonSpan.innerHTML = "Přejít";

                button.appendChild(buttonSpan);

                projectTitle.appendChild(h3);
                projectTitle.appendChild(h4);

                contentText.appendChild(projectTitle);
                contentText.appendChild(p);
                contentText.appendChild(button);

                container.appendChild(img);
                container.appendChild(contentText);

                section.appendChild(container);

                document.body.appendChild(section);
            }
            let footer = document.createElement("footer");
            footer.id = "footer";
            document.body.appendChild(footer);
            showContent();
        });
}

function getEffects() {
    let button = document.getElementById('toggleEffectsButton');
    button.innerHTML = "Načítám...";
    $.getScript("/js/snowflakes.js", function(sf) {
        sf = new Snowflakes({
            color: "white"
        });
        let current = getUserData('snowflakes');
        if (current.length == 0) {
            refreshUserData('snowflakes', [{
                toggledOn: true
            }]);
            button.innerHTML = "Vypnout efekty";
            return;
        }
        if (current[0].toggledOn) {
            sf.start();
            button.innerHTML = "Vypnout efekty";
        }
    });
}

function toggleEffects() {
    let button = document.getElementById('toggleEffectsButton');
    button.innerHTML = "Načítám...";
    $.getScript("/js/snowflakes.js", function(sf) {
        sf = new Snowflakes({
            color: "white"
        });
        let current = getUserData('snowflakes');
        if (current[0].toggledOn) {
            sf.destroy();
            document.getElementsByClassName('snowflakes')[0].remove();
            refreshUserData('snowflakes', [{
                toggledOn: false
            }]);
            button.innerHTML = "Zapnout efekty";
        } else {
            sf.start();
            refreshUserData('snowflakes', [{
                toggledOn: true
            }]);
            button.innerHTML = "Vypnout efekty";
        }
    });
}

function getUserData(requested) {
    let json = [];
    if (localStorage.getItem('cookies') === 'accepted') {
        let data = localStorage.getItem(requested);
        if (data !== 'undefined' && data !== null && data !== '' && data !== 'null') {
            json = JSON.parse(data);
        }
        refreshUserData(requested, json);
    }
    return json;
}

function refreshUserData(requested, newJson) {
    localStorage.setItem(requested, JSON.stringify(newJson));
}

function getAnimations() {
    let button = document.getElementById('toggleAnimationsButton');
    button.innerHTML = "Načítám...";
    let current = getUserData('animations');
    if (current.length == 0) {
        refreshUserData('animations', [{
            toggledOn: true
        }]);
        button.innerHTML = "Vypnout animace 😥";
        return;
    }
    current[0].toggledOn == true ? button.innerHTML = "Vypnout animace 😥" : button.innerHTML = "Zapnout animace 😎";
}

function toggleAnimations() {
    let button = document.getElementById('toggleAnimationsButton');
    button.innerHTML = "Načítám...";
    let current = getUserData('animations');
    if (current.length == 0) {
        refreshUserData('animations', [{
            toggledOn: false
        }]);
        button.innerHTML = "Zapnout animace 😎";
        return;
    }
    if (current[0].toggledOn) {
        refreshUserData('animations', [{
            toggledOn: false
        }]);
        button.innerHTML = "Zapnout animace 😎";
    } else {
        refreshUserData('animations', [{
            toggledOn: true
        }]);
        button.innerHTML = "Vypnout animace 😥";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}