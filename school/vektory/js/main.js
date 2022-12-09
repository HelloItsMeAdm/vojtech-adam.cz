let lengtha;
let lengthb;
let sum;
let difference;
let scalar;
let offset;

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
    offset.innerHTML = ((Math.acos((ax * bx + ay * by) / ((Math.sqrt(ax * ax + ay * ay).toFixed(2)) * (Math.sqrt(bx * bx + by * by).toFixed(2))))) * (180 / Math.PI)).toFixed(2) + "°";
}

function changeNames() {
    getValues();
    const namesSelector = document.querySelector('#namesSelector');
    const vectorNamesa = document.querySelectorAll('#vectorNamea');
    const vectorNamesb = document.querySelectorAll('#vectorNameb');
    namesSelector.blur();

    switch (namesSelector.value) {
        case 'uv':
            vectorNamesa.forEach((vectorNamea) => {
                vectorNamea.innerHTML = 'u';
            });
            vectorNamesb.forEach((vectorNameb) => {
                vectorNameb.innerHTML = 'v';
            });
            document.querySelector('#ax').value = 6;
            document.querySelector('#ay').value = 3;
            document.querySelector('#bx').value = 2;
            document.querySelector('#by').value = -4;
            calc();
            return
        case 'ab':
            vectorNamesa.forEach((vectorNamea) => {
                vectorNamea.innerHTML = 'a';
            });
            vectorNamesb.forEach((vectorNameb) => {
                vectorNameb.innerHTML = 'b';
            });
            document.querySelector('#ax').value = -2;
            document.querySelector('#ay').value = 3;
            document.querySelector('#bx').value = 3;
            document.querySelector('#by').value = 0;
            calc();
            return
    }
}

function getValues() {
    ax = parseInt(document.querySelector('#ax').value);
    ay = parseInt(document.querySelector('#ay').value);
    bx = parseInt(document.querySelector('#bx').value);
    by = parseInt(document.querySelector('#by').value);
}