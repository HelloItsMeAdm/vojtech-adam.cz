<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
function loadType()
{
    // 0: Default
    // 1: Submitted
    // 2: Error
    if (!empty($_GET['error'])) {
        return 2;
    } else if (isset($_SESSION['result'])) {
        return 1;
    } else {
        return 0;
    }
}

// Check if there is an error, if there is, check if it is in messages.php
// Get messages
$messages = require 'includes/messages.php';
if (isset($_GET['error'])) {
    // If error is not in messages.php, redirect to error.php
    if (!array_key_exists($_GET['error'], $messages['errors'])) {
        header("Location: /error.php?error=invalidError");
        exit();
    }
}
?>
<!DOCTYPE html>
<html lang="cs" style="background-color:#121212">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barevný Příběh | Poptávka</title>
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
                <i class="fa fa-solid fa-calendar"></i>
                <div class="project-hero-title-text">
                    <?php
                    switch (loadType()) {
                        case 0:
                            echo "<h1>Zájem o termín</h1>";
                            echo "<h2>Jsme rádi, že vás zaujala naše práce. Pokud si chcete u nás domluvit focení, vyplňte formulář níže a my se vám ozveme.</h2>";
                            break;
                        case 1:
                            echo "<h1>Poptávka odeslána!</h1>";
                            echo "<h2>Poptávka byla úspěšně odeslána, my se Vám co nejdříve ozveme.</h2>";
                            break;
                        case 2:
                            echo "<h1>Poptávka se nepodařila odeslat</h1>";
                            echo "<h2>Bohužel se nám nepodařilo odeslat poptávku. Níže je uveden důvod, proč se to nepodařilo.</h2>";
                            break;
                    }
                    ?>
                </div>
            </div>
        </div>

        <div class="section cards">
            <?php
            require_once 'includes/database.php';
            $db = new Database();
            if (loadType() == 2) {
                echo <<<HTML
                    <div class="container">
                        <lottie-player class="content-image" src="/lotties/error.json" background="transparent" speed="1" loop
                            autoplay></lottie-player>
                        <div class="content-text center">
                            <h3>{$messages['errors'][$_GET['error']]['title']}</h3>
                            <p>{$messages['errors'][$_GET['error']]['message']}</p>
                            <button class="button" onclick="location.href='poptavka.php'"><span class="back">Zpět</span></button>
                        </div>
                    </div>
                HTML;
            } else if (loadType() == 1) {
                // Get data from session
                $data = $_SESSION['result'];
                // Reset session
                session_unset();
                session_destroy();
                ?>
                    <div class="container column">
                    <?php echo "<h2 class='form-submit'>Číslo #{$data['id']}</h2>"; ?>
                        <p class="form-submit">Pod tímto číslem se můžete na poptávku kdykoliv odkázat.</p>
                        <div class="content">
                            <div class="content-image-wrapper">
                                <lottie-player class="content-image" src="/lotties/submitted.json" background="transparent"
                                    speed="1" autoplay></lottie-player>
                            </div>
                            <div class="submitted-text">
                                <?php
                                echo <<<HTML
                        <div class="item">
                            <p>Jméno</p>
                            <h3>{$data['name']}</h3>
                        </div>
                        <div class="item">
                            <p>Příjmení</p>
                            <h3>{$data['surname']}</h3>
                        </div>
                        <div class="item">
                            <p>Email</p>
                            <h3>{$data['email']}</h3>
                        </div>
                        <div class="item">
                            <p>Telefon</p>
                            <h3>{$data['phone']}</h3>
                        </div>
                        <div class="item">
                            <p>Datum a čas</p>
                            <h3>{$data['f_date']} v {$data['f_time']}</h3>
                        </div>
                        <div class="item">
                            <p>Typ focení</p>
                            <h3>{$data['style_name']}</h3>
                        </div>
                        <div class="item">
                                    <p>Poznámka</p>
                        HTML;
                                if ($data['note'] == '') {
                                    echo '<h3 class="italic">Poznámka nebyla přidána.</h3>';
                                } else {
                                    echo "<h3>{$data['note']}</h3>";
                                }
                                echo <<<HTML
                            </div>
                        <div class="item">
                            <p>Odesláno v</p>
                            <h3>{$data['f_sent_date']} v {$data['f_sent_time']}</h3>
                        </div>
                    HTML;
                                ?>
                            </div>
                        </div>
                        <button class="button" onclick="location.href='poptavka.php'"><span class="back">Zpět</span></button>
                    </div>
                <?php
            } else {
                ?>
                    <form action="/includes/formpost.php" method="POST" id="form" class="container">
                        <div class="form-item">
                            <label for="name">Jméno</label>
                            <input type="text" name="name" id="name" placeholder="Jan" required autocomplete="given-name">
                        </div>
                        <div class="form-item">
                            <label for="surname">Příjmení</label>
                            <input type="text" name="surname" id="surname" placeholder="Novák" required
                                autocomplete="family-name">
                        </div>
                        <div class="form-item">
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Jan.Novak@email.cz"
                                pattern="[^@\s]+@[^@\s]+\.[a-z]{2,4}" required autocomplete="email">
                        </div>
                        <div class="form-item">
                            <label for="phone">Telefon</label>
                            <input type="tel" name="phone" id="phone" placeholder="111222333" pattern="[0-9]{9}" maxlength="9"
                                required autocomplete="tel">
                        </div>
                        <div class="form-item">
                            <label for="date">Datum</label>
                            <input type="date" class="icon" name="date" id="date" required>
                            <script>
                                // Get current date and set it as min
                                let today = new Date().toISOString().split("T")[0];
                                document.getElementsByName("date")[0].setAttribute("min", today);
                            </script>
                        </div>
                        <div class="form-item">
                            <label for="time">Čas</label>
                            <input type="time" class="icon" name="time" id="time" required>
                            <script>
                                // When date changes, set min time to current time
                                document.getElementById("date").addEventListener("change", function () {
                                    let today = new Date().toISOString().split("T")[0];
                                    let date = document.getElementById("date").value;
                                    if (date == today) { // If date is today
                                        let h = new Date().getHours();
                                        let m = new Date().getMinutes();
                                        // Fix time format
                                        if (h < 10) {
                                            h = "0" + h;
                                        }
                                        if (m < 10) {
                                            m = "0" + m;
                                        }
                                        document.getElementsByName("time")[0].setAttribute("min", h + ":" + m);
                                    } else {
                                        document.getElementsByName("time")[0].removeAttribute("min");
                                    }
                                });
                            </script>
                        </div>
                        <div class="form-item">
                            <label for="style">Typ focení</label>
                            <div class="select-wrapper">
                                <select name="style" id="style" required>
                                    <?php
                                    // Get data from database
                                    $result = $db->executeCommand("SELECT id, name FROM styles;");
                                    // If result cannot be fetched
                                    if ($result->num_rows == 0) {
                                        header("Location: /error.php?error=databaseFetch");
                                        exit();
                                    }
                                    foreach ($result as $row) {
                                        $selected = "";
                                        if (isset($_GET['selected'])) {
                                            if ($_GET['selected'] == $row['id']) {
                                                $selected = "selected";
                                            }
                                        }
                                        echo <<<HTML
                                                <option value="{$row['id']}" {$selected}>{$row['name']}</option>
                                            HTML;
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-item textarea">
                            <div class="textarea-wrapper">
                                <label for="note">Poznámka</label>
                                <textarea name="note" id="note" cols="30" rows="10" placeholder="Poznámka (Nepovinná)"
                                    maxlength="500" onkeyup="textCounter(this);"></textarea>
                            </div>
                            <p id="count">0/500</p>
                            <script>
                                function textCounter(field) {
                                    // Get count paragraph
                                    let count = document.getElementById("count");
                                    // Set text
                                    count.innerHTML = field.value.length + "/" + field.maxLength;
                                    // If text is too long add class .warning
                                    if (field.value.length >= field.maxLength) {
                                        count.classList.add("warning");
                                    } else {
                                        count.classList.remove("warning");
                                    }
                                }
                            </script>
                        </div>
                        <button class="button" id="sendButton" type="submit"><span class="send">Odeslat</span></button>
                        <script>
                            // If form is submitted change button to loading state
                            document.getElementById('form').addEventListener('submit', function () {
                                document.getElementById('sendButton').innerHTML = '<i class="fa fa-spinner fa-spin"></i> Odesílání...';
                                document.getElementById('sendButton').classList.add('button-loading');
                            });
                        </script>
                    </form>
                <?php
            }
            ?>
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