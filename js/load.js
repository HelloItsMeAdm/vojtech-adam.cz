let body = document.getElementById("body");
body.style.display = "none";

let loading = document.createElement("div");
loading.id = "loading";
loading.className = "loading";

let loadingWrapper = document.createElement("div");
loadingWrapper.className = "loading-wrapper";
loading.appendChild(loadingWrapper);

let dots = document.createElement("div");
dots.className = "lds-ellipsis";
loadingWrapper.appendChild(dots);

for (let i = 0; i < 4; i++) {
    let loadingDot = document.createElement("div");
    dots.appendChild(loadingDot);
}

let loadingText = document.createElement("h1");
loadingText.innerHTML = "Načítání...";
loadingWrapper.appendChild(loadingText);

let loadingSubtitle = document.createElement("h2");
loadingSubtitle.innerHTML = "Prosím počkejte, než se stránka načte. Nemělo by to trvat dlouho.";
loadingWrapper.appendChild(loadingSubtitle);

loading.appendChild(loadingWrapper);
document.body.appendChild(loading);

function loaded() {
    loading.remove();
    body.style.display = "block";
}