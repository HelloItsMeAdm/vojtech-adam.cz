let shown = false;

function displayDonate() {
    var dialog = document.createElement("div");
    dialog.classList.add('dialog');

    var donate = document.createElement("div");
    donate.classList.add('donate');

    var payments = document.createElement("div");
    payments.classList.add('dialog-payments');

    var paypal = document.createElement("a");
    paypal.href = "https://paypal.me/helloitsmeadm";
    paypal.target = "_blank";
    var paypalIcon = document.createElement("img");
    paypalIcon.src = "/images/paypal.png";
    paypal.appendChild(paypalIcon);
    var paypalText = document.createElement("p");
    paypalText.innerHTML = "Paypal";
    paypal.appendChild(paypalText);

    var coffee = document.createElement("a");
    coffee.href = "https://www.buymeacoffee.com/vojtechadam";
    coffee.target = "_blank";
    var coffeeIcon = document.createElement("img");
    coffeeIcon.src = "/images/buymeacoffee.png";
    coffee.appendChild(coffeeIcon);
    var coffeeText = document.createElement("p");
    coffeeText.innerHTML = "Buy me a coffee";
    coffee.appendChild(coffeeText);

    var close = document.createElement("button");
    close.innerHTML = "Zavřít";
    close.classList.add('btn-close');
    close.onclick = function() {
        dialog.remove();
    }

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

    payments.appendChild(paypal);
    payments.appendChild(coffee);
    donate.appendChild(payments);
    donate.appendChild(close);
    dialog.appendChild(donate);

    var leaderboard = document.createElement("div");
    leaderboard.classList.add('leaderboard');

    var leaderboardTitle = document.createElement("h2");
    leaderboardTitle.innerHTML = "Nejvíce přispěli";
    leaderboard.appendChild(leaderboardTitle);

    var leaderboardLoading = document.createElement("p");
    leaderboardLoading.innerHTML = "Načítám...";
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
            var price = data.data[i].support_coffees * parseInt(data.data[i].support_coffee_price);
            person.innerHTML = index + ". " + data.data[i].payer_name + " - " + price + " " + data.data[i].support_currency;
            leaderboard.appendChild(person);
        }
    });
    donate.appendChild(leaderboard);
    document.body.appendChild(dialog);
    shown = true;
    return;
}

function askDonate() {
    if (shown) {
        return;
    }
    var dialog = document.createElement("div");
    dialog.id = "donate";
    dialog.classList.add('dialog');

    var donate = document.createElement("div");
    donate.classList.add('donate');

    var donateTitle = document.createElement("h2");
    donateTitle.innerHTML = "Chceš mě podpořit? 💰";
    donate.appendChild(donateTitle);

    var donateText = document.createElement("p");
    donateText.innerHTML = "Pokud mě chceš podpořit, můžeš to udělat pomocí <span class='bold'>Buy Me A Coffee</span> nebo <span class='bold'>PayPalu</span>. Kliknutím na tlačítko níže se ti otevře nové okno, kde si můžeš vybrat, jak mě chceš podpořit.";
    donate.appendChild(donateText);

    var donateButton = document.createElement("button");
    donateButton.classList.add("button");
    donateButton.style.marginTop = "20px";

    var arrow = document.createElement("span");
    arrow.classList.add("donateSymbol");
    arrow.innerHTML = "Přispět";
    donateButton.appendChild(arrow);
    donateButton.onclick = function() {
        dialog.remove();
        displayDonate();
    }
    donate.appendChild(donateButton);

    var close = document.createElement("button");
    close.innerHTML = "Zavřít";
    close.classList.add('btn-close');
    close.onclick = function() {
        dialog.remove();
    }

    setTimeout(function() {
        donate.appendChild(close);
    }, 3000);

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