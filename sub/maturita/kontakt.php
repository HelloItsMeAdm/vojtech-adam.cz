<?php
// Get config
$messages = require "includes/messages.php";
?>
<!DOCTYPE html>
<html lang="cs" style="background-color:#121212">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barevný Příběh | Kontakt</title>
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
                <i class="fa fa-envelope"></i>
                <div class="project-hero-title-text">
                    <h1>Kontakt</h1>
                    <h2>Rozhodli jste se nás kontaktovat? To je skvělé! Níže najdete všechny potřebné informace. Rádi
                        vám pomůžeme!</h2>
                </div>
            </div>
        </div>

        <div class="section-spacer">
            <h2 class="section-title">Nejdůležitější kontakty</h2>
        </div>

        <div class="section cards">
            <div class="container">
                <i class="fa fa-phone content-image"></i>
                <div class="content-text">
                    <h3>Telefon</h3>
                    <p>Telefon je nejrychlejší způsob, jak nás kontaktovat. Pokud máte jakékoliv dotazy, neváhejte nás
                        kontaktovat
                        na telefonním čísle níže.</p>
                    <button class="button"
                        onclick="location.href='tel:<?php echo $messages['contact']['phone'] ?>'"><span class="phone">
                            <?php echo $messages['contact']['phone'] ?>
                        </span></button>
                </div>
            </div>
            <div class="container">
                <i class="fa fa-envelope content-image"></i>
                <div class="content-text">
                    <h3>Email</h3>
                    <p>Pokud máte jakékoliv dotazy, neváhejte nás kontaktovat na emailu níže. Odpověď vám dorazí do 24
                        hodin.</p>
                    <button class="button"
                        onclick="location.href='mailto:<?php echo $messages['contact']['email'] ?>'"><span class="send">
                            <?php echo $messages['contact']['email'] ?>
                        </span></button>
                </div>
            </div>
            <div class="container">
                <i class="fa-solid fa-people-roof content-image"></i>
                <div class="content-text">
                    <h3>Osobně na adrese</h3>
                    <p>Pokud byste nás chtěli navštívit, můžete se zastavit na naší adrese níže. Rádi vás uvidíme.</p>
                    <?php
                    echo "<button class='button' onclick=\"window.open('{$messages['contact']['adressUrl']}')\"><span class='home'>{$messages['contact']['adress']}</span></button>";
                    ?>
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