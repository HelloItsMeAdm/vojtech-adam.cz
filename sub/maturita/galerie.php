<!DOCTYPE html>
<html lang="cs" style="background-color:#121212">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barevný Příběh | Galerie</title>
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
                <i class="fa-solid fa-image"></i>
                <div class="project-hero-title-text">
                    <h1>Galerie</h1>
                    <h2>Zajímá vás, jaké fotografie vytváříme? Zde najdetete některé z našich prací.</h2>
                </div>
            </div>
        </div>

        <div class="section-spacer">
            <h2 class="section-title">Ukázka našich prací</h2>
        </div>

        <div class="section cards">
            <div class="showcase">
                <?php
                // Get data from database
                require "includes/database.php";
                $db = new Database();
                $result = $db->executeCommand("SELECT p.image_path, p.title, p.description AS image_description, s.name AS style_name, s.description as style_description, s.id as style_id FROM gallery AS p JOIN styles AS s ON p.style = s.id ORDER BY s.id ASC");
                // Check if data was fetched
                if (!$result) {
                    header("Location: /error.php?error=databaseFetch");
                    exit();
                }
                // Display data
                $count = 0;
                foreach ($result as $row) {
                    echo <<<HTML
                    <a class="card" href="/poptavka.php/?selected={$row['style_id']}">
                        <i class="fa fa-spinner fa-spin image-loading" id="loading-{$count}"></i>
                        <img class="content-image hidden" src="{$row['image_path']}" alt="{$row['title']}" loading="lazy" id="img-{$count}">
                        <div class="content-text hidden" id="text-{$count}">
                            <div class="style-tag" data-text="{$row['style_description']}">{$row['style_name']}</div>
                            <h3>{$row['title']}</h3>
                            <p>{$row['image_description']}</p>
                            <div class="overlay">
                                <div class="overlay-text">
                                    <h2>Klikni pro odeslání poptávky</h2>
                                    <h3>{$row['style_name']}</h3>
                                </div>
                            </div>
                        </div>
                        <script>
                            // When image loads, remove all loading elements
                            document.getElementById("img-{$count}").onload = function() {
                                document.getElementById("loading-{$count}").remove();
                                document.getElementById("img-{$count}").classList.remove("hidden");
                                document.getElementById("text-{$count}").classList.remove("hidden");
                            }
                        </script>
                    </a>
                    HTML;
                    $count++;
                }
                ?>
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