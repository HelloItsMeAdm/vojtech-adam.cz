<!DOCTYPE html>
<html lang="cs" style="background-color:#121212">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barevný Příběh | O nás</title>
    <link href="/images/logo.svg" type="image/svg+xml" rel="icon" sizes="any">
    <link rel="stylesheet" href="/css/style.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/be1f410c2f.js" crossorigin="anonymous"></script>
</head>

<body>
    <link rel="stylesheet" href="/css/preload.css" id="preloadCSS">
    <div class="loading" id="loading">
        <div class="loading-wrapper">
            <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h1>Načítání...</h1>
            <h2>Prosím počkejte, než se stránka načte. Nemělo by to dlouho trvat.</h2>
        </div>
    </div>
    <div id="body">
        <?php
        require "includes/header.php";
        showHeader($_SERVER['PHP_SELF']);
        ?>

        <canvas id="gradient-canvas" data-js-darken-top></canvas>
        <script src="/js/Gradient.js"></script>
        <script>
            const gradient = new Gradient();
            gradient.initGradient('#gradient-canvas')
        </script>

        <div class="section project-hero">
            <div class="project-hero-title">
                <i class="fa-solid fa-question-circle"></i>
                <div class="project-hero-title-text">
                    <h1>O nás</h1>
                    <h2>Jsme zkušený tým umělců v oblasti fotografie, kteří se spojili s vášní a touhou sdílet
                        krásu okamžiků. Naše jméno - Barevný příběh - odráží naši lásku k barvám a schopnost
                        vyprávět příběhy skrze fotografii.</h2>
                </div>
            </div>
        </div>

        <div class="section-spacer">
            <h2 class="section-title">To nejdůležitější</h2>
        </div>

        <div class="section cards">
            <div class="container">
                <i class="fa-solid fa-history content-image"></i>
                <div class="content-text">
                    <h3>Historie</h3>
                    <p>Začali jsme v srdci Opavy s cílem přinášet jedinečné vizuální zážitky. Naše cesta byla plná
                        kreativity a nezapomenutelných chvil s našimi klienty.</p>
                </div>
            </div>
            <div class="container">
                <i class="fa-solid fa-hand-holding-dollar content-image"></i>
                <div class="content-text">
                    <h3>Naše služby</h3>
                    <p>Zaměřujeme se na poskytování kvalitních fotografických služeb, které vám pomohou
                        zachytit a sdílet výjimečné okamžiky vašeho života. Naše nabídka služeb je navržena tak, aby
                        splňovala různorodé potřeby našich klientů.</p>
                </div>
            </div>
        </div>

        <div class="section-spacer">
            <h2 class="section-title">Vybavení</h2>
        </div>

        <div class="section cards">
            <div class="container">
                <i class="fa-solid fa-camera content-image"></i>
                <div class="content-text">
                    <h3>Náš ateliér</h3>
                    <p>Naše moderní a dobře vybavené prostory jsou navrženy tak, aby poskytovaly optimální podmínky
                        pro
                        tvorbu fotografií. Věřte nám, že se u nás budete cítit jako doma.</p>
                </div>
            </div>
            <div class="container">
                <i class="fa-solid fa-map-location-dot content-image"></i>
                <div class="content-text">
                    <h3>Kde nás najdete?</h3>
                    <p>Naše studio se nachází v centru Opavy. V případě, že byste se k
                        nám chtěli podívat, neváhejte nás <a href="/kontakt.php">kontaktovat</a>.</p>
                </div>
            </div>
        </div>

        <?php
        require "includes/footer.php";
        ?>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.js"
        integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <script src="/js/main.js"></script>
    <script src="/js/animations.js"></script>
</body>

</html>