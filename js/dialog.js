function displayDonate() {
    var dialog = document.createElement("div");
    dialog.id = "donate";
    dialog.style.position = "fixed";
    dialog.style.top = "0";
    dialog.style.left = "0";
    dialog.style.width = "100%";
    dialog.style.height = "100%";
    dialog.style.backgroundColor = "rgba(0,0,0,0.75)";
    dialog.style.zIndex = "1000";
    dialog.style.display = "flex";
    dialog.style.justifyContent = "center";
    dialog.style.alignItems = "center";
    dialog.style.flexDirection = "column";

    var payments = document.createElement("div");
    payments.style.width = "100%";
    payments.style.display = "flex";
    payments.style.justifyContent = "center";
    payments.style.alignItems = "center";
    payments.style.flexDirection = "row";

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
    close.innerHTML = "Zavřít";
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

    payments.appendChild(paypal);
    payments.appendChild(coffee);
    dialog.appendChild(payments);
    dialog.appendChild(close);

    var leaderboard = document.createElement("div");
    leaderboard.style.display = "flex";
    leaderboard.style.justifyContent = "center";
    leaderboard.style.alignItems = "center";
    leaderboard.style.flexDirection = "column";
    leaderboard.style.margin = "10px";
    leaderboard.style.padding = "10px";
    leaderboard.style.borderRadius = "5px";
    leaderboard.style.transition = "all 0.2s ease-in-out";
    leaderboard.style.backgroundColor = "var(--darker-gray)";
    leaderboard.style.color = "white";

    var leaderboardTitle = document.createElement("h2");
    leaderboardTitle.innerHTML = "Nejvíce přispěli";
    leaderboardTitle.style.margin = "10px";
    leaderboardTitle.style.padding = "10px";
    leaderboardTitle.style.borderRadius = "5px";
    leaderboardTitle.style.transition = "all 0.2s ease-in-out";
    leaderboardTitle.style.backgroundColor = "var(--darker-gray)";
    leaderboardTitle.style.color = "white";
    leaderboardTitle.style.fontSize = "40px";
    leaderboardTitle.style.textAlign = "center";
    leaderboardTitle.style.fontWeight = "bold";
    leaderboard.appendChild(leaderboardTitle);

    var leaderboardLoading = document.createElement("p");
    leaderboardLoading.innerHTML = "Načítám...";
    leaderboardLoading.style.margin = "0";
    leaderboardLoading.style.padding = "0";
    leaderboardLoading.style.fontSize = "25px";
    leaderboard.appendChild(leaderboardLoading);

    fetch('https://developers.buymeacoffee.com/api/v1/supporters', {
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MTI5ZDIwMC1kYTdkLTRjY2MtOWQzZC01ODA0MTU0ZTgyMjYiLCJqdGkiOiIxOWYyMjFlZGI5OGViYjEyOWVhZjkyM2JkZjI1ZmRkNDE4ZmY3N2Q1MzlhMzEyMGQwNmE0MzI0M2ZkOGYyOTNkMDE2MTU1NThhNGFiZWRhNCIsImlhdCI6MTY2ODUwNzAzMSwibmJmIjoxNjY4NTA3MDMxLCJleHAiOjE2ODQxNDU0MzEsInN1YiI6IjI3Njc2NjIiLCJzY29wZXMiOlsicmVhZC1vbmx5Il19.rVhOCH9uCjcbb_2tuQ5gM_emkppFLmG5RSLRrDx9vOBqaDAuoZYKDSX6AddYnFiz_j2BTiaZQB6J3J6SJhCpn8JOaosetGnikBT1vj1o6mRXxCb42ZQGpJGK1tbGC9gStKUhnQbQ6AoxPTSn5wxsfnFfjaE0Zq5qz9EEhLesvMasFTOeI2IGhQNHjL-bKLzm0LTErkwTrmDjml4bVZY0LV2Btv6nrAYuf0-7wVnOv3_Oty581d68SLw_LxI14a5BRi1M-l8vG37Zjp879RjfBieoQoA6VDP5Y6R9jYBywkg4Je2owSJ0QwnsJtFoaArMwIzSjRPmV-GgTzd8As5SQrehaX20yFvqdDgSDrlmYidZlgKSabjg_lDqUAWfMo4l08730TSlE9h40oX3aayEEXGGxuvtXUJDolXYd2IRCoi2ByPEnYyKkn6H9tmzRVLQTEmmdXt_freq_0IZI2ti1pL9L0D7RIPgUI09vgy8GK-TvrwGVTimV2ijzAmXX0QVmTdvIA-UFMGa65W3yyGwcsPWlaYTJUvGx9IW_fe0ezRi5vGyUWa4NpwnB7xBNJBadMlr1opZpJQFLqHtwcLpRFLSiwKF9qPSjALq90rL_6rXCZPBFUus2W5PKwMPkGZ4l2tRj3M-vq9edKqvPiBV6Rz6_FyboKDFQ1eIcon1QKU'
        }
    }).then(response => response.json()).then(data => {
        var index = 0;
        leaderboardLoading.remove();
        for (var i = 0; i < Object.keys(data.data).length; i++) {
            index++;
            if (index > 10) {
                break;
            }
            var person = document.createElement("p");
            person.style.margin = "0";
            person.style.padding = "0";
            person.style.fontSize = "25px";
            var price = data.data[i].support_coffees * parseInt(data.data[i].support_coffee_price);
            person.innerHTML = index + ". " + data.data[i].payer_name + " - " + price + " " + data.data[i].support_currency;
            leaderboard.appendChild(person);
        }
    });
    dialog.appendChild(leaderboard);
    document.body.appendChild(dialog);
    return;
}

function askDonate() {
    var dialog = document.createElement("div");
    dialog.id = "donate";
    dialog.style.position = "fixed";
    dialog.style.top = "0";
    dialog.style.left = "0";
    dialog.style.width = "100%";
    dialog.style.height = "100%";
    dialog.style.backgroundColor = "rgba(0,0,0,0.75)";
    dialog.style.zIndex = "1000";
    dialog.style.display = "flex";
    dialog.style.justifyContent = "center";
    dialog.style.alignItems = "center";
    dialog.style.flexDirection = "column";

    var donate = document.createElement("div");
    donate.style.width = "50%";
    donate.style.height = "50%";
    donate.style.backgroundColor = "var(--darker-gray)";
    donate.style.borderRadius = "5px";
    donate.style.display = "flex";
    donate.style.justifyContent = "center";
    donate.style.alignItems = "center";
    donate.style.flexDirection = "column";

    var donateTitle = document.createElement("h2");
    donateTitle.innerHTML = "Chceš mě podpořit? 💰";
    donateTitle.style.margin = "0";
    donateTitle.style.padding = "0";
    donateTitle.style.fontSize = "45px";
    donateTitle.style.color = "var(--white)";
    donateTitle.style.fontWeight = "bold";
    donateTitle.style.textAlign = "center";
    donate.appendChild(donateTitle);

    var donateText = document.createElement("p");
    donateText.innerHTML = "Pokud mě chceš podpořit, můžeš to udělat pomocí Buy Me A Coffee nebo PayPalu. Kliknutím na tlačítko níže se ti otevře nové okno, kde si můžeš vybrat, jak mě chceš podpořit.";
    donateText.style.margin = "0";
    donateText.style.marginTop = "10px";
    donateText.style.padding = "0";
    donateText.style.fontSize = "25px";
    donateText.style.color = "var(--white)";
    donateText.style.textAlign = "center";
    donate.appendChild(donateText);

    var donateButton = document.createElement("button");
    donateButton.classList.add("button");
    donateButton.style.marginTop = "20px";
    var arrow = document.createElement("span");
    arrow.classList.add("donate");
    arrow.innerHTML = "Přispět";
    donateButton.appendChild(arrow);
    donateButton.onclick = function() {
        dialog.remove();
        displayDonate();
    }
    donate.appendChild(donateButton);

    var close = document.createElement("button");
    close.innerHTML = "Zavřít";
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

    setTimeout(function() {
        donate.appendChild(close);
    }, 3000);

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

    dialog.appendChild(donate);
    document.body.appendChild(dialog);
    return;
}