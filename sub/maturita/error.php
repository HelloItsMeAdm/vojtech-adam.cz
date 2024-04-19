<?php
// Check if error is set, if not, redirect to home page
if (empty($_GET['error'])) {
    header('Location: /');
    exit();
}
?>
<!DOCTYPE html>
<html lang="cs" style="background-color:#121212">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barevný Příběh | Chyba</title>
    <link href="/images/logo.svg" type="image/svg+xml" rel="icon" sizes="any">
    <link rel="stylesheet" href="/css/style.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/be1f410c2f.js" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
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
                <i class="fa fa-solid fa-exclamation-triangle"></i>
                <div class="project-hero-title-text">
                    <h1>Chyba!</h1>
                    <h2>Vyskytla se nějaká chyba při operaci s databází. Níže najdeš informace o chybě.</h2>
                </div>
            </div>
        </div>

        <div class="section cards">
            <div class="container">
                <lottie-player class="content-image" src="/lotties/error.json" background="transparent" speed="1" loop
                    autoplay></lottie-player>
                <div class="content-text">
                    <?php
                    $messages = require 'includes/messages.php';
                    echo "<h3>{$messages['errors'][$_GET['error']]['title']}</h3>";
                    echo "<p>{$messages['errors'][$_GET['error']]['message']}</p>";
                    if (!empty($_GET['data'])) {
                        echo <<<HTML
                        <pre class="code-block">
                            {$_GET['data']}
                        </pre>
                        HTML;
                    }
                    ?>
                    <button class="button" onclick="location.href='/'"><span class="home">Domů</span></button>
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