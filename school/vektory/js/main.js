let lengtha;
let lengthb;
let sum;
let difference;
let scalar;
let offset;
let parallel;

let ax;
let ay;
let bx;
let by;

let loaded = false;
document.addEventListener('DOMContentLoaded', () => {
    lengtha = document.querySelector("#lengtha");
    lengthb = document.querySelector("#lengthb");
    sum = document.querySelector("#sum");
    difference = document.querySelector("#difference");
    scalar = document.querySelector("#scalar");
    offset = document.querySelector("#offset");
    parallel = document.querySelector("#parallel");

    loaded = true;
    calc();
});

function calc() {
    getValues();
    if (!loaded) {
        alert('Dokument nenačten!');
        return;
    } else if (ax === "" || ay === "" || bx === "" || by === "") {
        alert('Jedna nebo více souřadnic chybí!');
        return;
    }

    // Length of a
    lengtha.innerHTML = Math.sqrt(ax * ax + ay * ay).toFixed(2);
    // Length of b
    lengthb.innerHTML = Math.sqrt(bx * bx + by * by).toFixed(2);
    // Sum
    sum.innerHTML = `{${ax + bx};${ay + by}}`;
    // Difference
    difference.innerHTML = `{${ax - bx};${ay - by}}`;
    // Scalar
    scalar.innerHTML = ax * bx + ay * by;
    // Offset
    let offsetVal = ((Math.acos((ax * bx + ay * by) / ((Math.sqrt(ax * ax + ay * ay).toFixed(2)) * (Math.sqrt(bx * bx + by * by).toFixed(2))))) * (180 / Math.PI)).toFixed(2);
    if (offsetVal == "NaN") {
        offset.innerHTML = "Nelze určit";
    } else {
        offset.innerHTML = offsetVal + "°";
    }
    // Parallel
    if ((ax / bx) === (ay / by)) {
        let k = (ax / bx).toFixed(2);
        if (k.toString().startsWith('-')) {
            parallel.innerHTML = "<span class='green'>Ano</span><br><span id='value'>k</span> = (" + k + ")";
        } else {
            parallel.innerHTML = "<span class='green'>Ano</span><br><span id='value'>k</span> = " + k;
        }
    } else {
        parallel.innerHTML = "<span class='red'>Ne</span>";
    }
}

function changeNames() {
    getValues();
    const namesSelector = document.querySelector('#namesSelector');
    namesSelector.blur();

    const name = namesSelector.options[namesSelector.selectedIndex].dataset.name;
    const ax = namesSelector.options[namesSelector.selectedIndex].dataset.ax;
    const ay = namesSelector.options[namesSelector.selectedIndex].dataset.ay;
    const bx = namesSelector.options[namesSelector.selectedIndex].dataset.bx;
    const by = namesSelector.options[namesSelector.selectedIndex].dataset.by;

    changeLetters(name);
    document.querySelector('#ax').value = ax;
    document.querySelector('#ay').value = ay;
    document.querySelector('#bx').value = bx;
    document.querySelector('#by').value = by;
    calc();
    return
}

function changeLetters(value) {
    value = value.split('');
    const vectorNamesa = document.querySelectorAll('#vectorNamea');
    const vectorNamesb = document.querySelectorAll('#vectorNameb');
    vectorNamesa.forEach((vectorNamea) => {
        vectorNamea.innerHTML = value[0];
    });
    vectorNamesb.forEach((vectorNameb) => {
        vectorNameb.innerHTML = value[1];
    });
}

function getValues() {
    ax = parseInt(document.querySelector('#ax').value);
    ay = parseInt(document.querySelector('#ay').value);
    bx = parseInt(document.querySelector('#bx').value);
    by = parseInt(document.querySelector('#by').value);
}