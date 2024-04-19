<?php
function showHeader(string $activeLink)
{
    // Get .php file name
    $activeLink = parse_url($activeLink)['path'];
    $activeLink = pathinfo($activeLink)['basename'];
    
    echo <<<HTML
<header id="header">
    <div class="header-items" id="headerItems">
        <div class="mobile">
            <a href="/">
                <img src="/images/logo.svg" class="logo">
            </a>
            <a href="javascript:void(0);" class="hamburger" onclick="toggleMenu()" id="hamburger">
                <i class="fa fa-solid fa-times" id="hamburgerIcon" style="transform: rotate(90deg);"></i>
            </a>
        </div>
        <ul id="links">
HTML;
    $links = array("Domů" => "index.php", "O nás" => "o-nas.php", "Galerie" => "galerie.php", "Poptávka" => "poptavka.php", "Kontakt" => "kontakt.php");
    foreach ($links as $name => $link) {
        if ($activeLink == $link) { // If the link is current page, add active class
            echo "<li><a href=\"#\" class=\"active\">$name</a></li>";
        } else {
            echo "<li><a href=\"/$link\">$name</a></li>";
        }
    }
    echo <<<HTML
            </a></li>
        </ul>
    </div>
</header>
HTML;
}
?>