<?php
// Get config
$messages = require "messages.php";
echo <<<HTML
<footer>
    <div class="content">
        <div class="about-contact">
            <div class="item aboutus">
                <h2>O nás</h2>
                <p>Jsme zkušený tým umělců v oblasti fotografie, kteří se spojili s vášní a touhou sdílet krásu
                    okamžiků. Naše jméno - Barevný příběh - odráží naši lásku k barvám a schopnost vyprávět
                    příběhy skrze fotografii.</p>
            </div>
            <div class="item contact">
                <h2>Kontakt</h2>
                <p>{$messages['contact']['name']}</p>
                <a href="tel:{$messages['contact']['phone']}">{$messages['contact']['phone']}</a>
                <a href="mailto:D20547@oaopava.cz" class="email">D20547@oaopava.cz</a>
                <a href="{$messages['contact']['adressUrl']}" target="_blank">{$messages['contact']['adress']}</a>
            </div>
        </div>
        <div class="warning">
            <p>Tato webová stránka je součástí závěrečné práce k maturitě. Upozorňujeme, že není skutečná a slouží výhradně
                pro demonstrační účely.</p>
        </div>
    </div>
</footer>
HTML;