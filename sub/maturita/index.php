<!DOCTYPE html>
<html lang="cs" style="background-color:#121212">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barevný Příběh | Domů</title>
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

        <div class="section hero">
            <div class="hero-text">
                <h1 class="pacifico">Barevný Příběh</h1>
                <h2 class="pacifico">Zachycujeme chvíle, barvíme příběhy</h2>
                <p>Vítej na našem webu! Jsme rádi, že jsi se sem zavítal. Níže najdeš několik
                    odkazů, které tě přesměrují na různé části našeho webu. Pokud máš nějaké dotazy, neváhej
                    nás kontaktovat.</p>
            </div>
            <div class="hero-image">
                <img src="/images/logo.svg" alt="Logo">
            </div>
        </div>

        <div class="section-spacer">
            <h2 class="section-title">Copak hledáš?</h2>
        </div>

        <div class="section cards">
            <div class="container">
                <i class="fa-solid fa-question-circle content-image"></i>
                <div class="content-text">
                    <h3>O nás</h3>
                    <p>Jsme zkušený tým umělců v oblasti fotografie, kteří se spojili s vášní a touhou sdílet
                        krásu okamžiků. Naše jméno - Barevný příběh - odráží naši lásku k barvám a schopnost
                        vyprávět příběhy skrze fotografii.</p>
                    <button class="button" onclick="location.href='o-nas.php'"><span class="url">Přejít</span></button>
                </div>
            </div>
            <div class="container">
                <i class="fa-solid fa-image content-image"></i>
                <div class="content-text">
                    <h3>Galerie</h3>
                    <p>Podívej se na naše nejlepší práce a nech se inspirovat.</p>
                    <button class="button" onclick="location.href='galerie.php'"><span class="url">Přejít</span></button>
                </div>
            </div>
            <div class="container">
                <i class="fa fa-calendar content-image"></i>
                <div class="content-text">
                    <h3>Dotaz na termín</h3>
                    <p>Máš zájem o konkrétní termín? Neváhej a klikni na tlačítko níže.</p>
                    <button class="button" onclick="location.href='poptavka.php'"><span class="calendar">Odeslat
                            poptávku</span></button>
                </div>
            </div>
            <div class="container">
                <i class="fa-solid fa-envelope content-image"></i>
                <div class="content-text">
                    <h3>Kontakt</h3>
                    <p>Máš nějaké dotazy? Neváhej nás kontaktovat.</p>
                    <button class="button" onclick="location.href='kontakt.php'"><span class="contact">Kontaktovat</span></button>
                </div>
            </div>
        </div>

        <div class="section-spacer">
            <h2 class="section-title">Video ukázka</h2>
        </div>

        <div class="section cards">
            <div class="container">
                <!--<video class="content-image video" src="/images/showcase.mp4" controls></video> -- REMOVED TO GAIN FREE SPACE -->
                <iframe class="content-image video" style="width: 1120px; height: 630px;" src="https://www.youtube.com/embed/ZWVIiVwdYyg?si=ISdelqbmFeeuGqGY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>

        <?php
        require "includes/footer.php";
        ?>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <script src="/js/main.js"></script>
    <script src="/js/animations.js"></script>
</body>

</html>