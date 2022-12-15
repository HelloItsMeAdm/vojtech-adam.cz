document.addEventListener('DOMContentLoaded', () => {
    let json = [];
    let data = sessionStorage.getItem('todos');
    if (data !== 'undefined' && data !== null && data !== '' && data !== 'null') {
        json = JSON.parse(data);
    }
    refreshUserData(json);

    const table = document.getElementById("table");

    for (let i = 0; i < json.length; i++) {
        let tr = document.createElement("tr");

        let completeTd = document.createElement("td");
        let completeTdButton = document.createElement("button");
        let completeTdButtonIcon = document.createElement("i");

        let nameTd = document.createElement("td");

        let deleteTd = document.createElement("td");
        let deleteTdButton = document.createElement("button");
        let deleteTdButtonIcon = document.createElement("i");

        completeTdButtonIcon.classList.add("fa-regular");

        completeTdButton.addEventListener("click", () => {
            if (json[i].completed) {
                json[i].completed = false;
                completeTdButtonIcon.classList.remove("fa-check-circle");
                completeTdButtonIcon.classList.add("fa-circle");
                nameTd.classList.remove("completed");
            } else {
                json[i].completed = true;
                completeTdButtonIcon.classList.remove("fa-circle");
                completeTdButtonIcon.classList.add("fa-check-circle");
                nameTd.classList.add("completed");
            }
            refreshUserData(json);
        });

        completeTdButton.appendChild(completeTdButtonIcon);
        completeTd.appendChild(completeTdButton);

        nameTd.innerHTML = json[i].name;
        if (json[i].completed) {
            completeTdButtonIcon.classList.add("fa-check-circle");
            nameTd.classList.add("completed");
        } else {
            completeTdButtonIcon.classList.add("fa-circle");
        }

        deleteTdButtonIcon.classList.add("fa-solid");
        deleteTdButtonIcon.classList.add("fa-xmark");

        deleteTdButton.addEventListener("click", () => {
            table.removeChild(tr);
            json.splice(i, 1);
            refreshUserData(json);
        });

        deleteTdButton.appendChild(deleteTdButtonIcon);
        deleteTd.appendChild(deleteTdButton);

        tr.appendChild(completeTd);
        tr.appendChild(nameTd);
        tr.appendChild(deleteTd);

        table.appendChild(tr);
    }
});

function addTask() {
    let textInput = document.getElementById("textInput").value;

    let json = JSON.parse(sessionStorage.getItem('todos')) || [];
    json.push({
        name: textInput,
        completed: false
    });
    refreshUserData(json);
}

function refreshUserData(newJson) {
    sessionStorage.setItem('todos', JSON.stringify(newJson));
    refreshGui(newJson);
}

function refreshGui(activeJson) {
    let title = document.getElementById('title');
    let header = document.getElementById('header');
    if (activeJson.length > 0) {
        title.innerHTML = `Vítej! Dnes tě ${inflectWord(activeJson.length, 'čeká', 'čekají', 'čeká')} ${activeJson.length} ${inflectWord(activeJson.length, 'úkol', 'úkoly', 'úkolů')}.`;
        header.classList.remove('corners');
    } else {
        title.innerHTML = 'Vítej! Dnes nemáš žádné úkoly.';
        header.classList.add('corners');
    }
    document.getElementById("textInput").focus();
}

function inflectWord(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}