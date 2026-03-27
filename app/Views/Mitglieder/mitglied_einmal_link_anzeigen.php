<div class="mb-2 mitglied_einmal_link_anzeigen_nachricht"></div>

<div class="input-group mb-2">
    <div class="form-floating">
        <input type="text" class="form-control einmal_link" readonly />
        <label>Einmal-Link</label>
    </div>
    <div class="input-group-text text-<?php
    if( array_key_exists('farbe', WERKZEUGE['inhalt_kopieren']) ) echo WERKZEUGE['inhalt_kopieren']['farbe']; else echo "primary";
    ?> werkzeug" werkzeug="inhalt_kopieren" data-clipboard-target=".einmal_link" role="button"><i class="bi bi-<?= ICONS[ WERKZEUGE['inhalt_kopieren']['symbol'] ]; ?>"></i></div>
</div>

<div class="d-grid"><button type="button" class="btn btn-outline-<?php
if( array_key_exists('farbe', WERKZEUGE['einmal_link_anzeigen']) ) echo WERKZEUGE['einmal_link_anzeigen']['farbe']; else echo "success";
?> werkzeug" werkzeug="einmal_link_anzeigen"><span class="beschriftung"><i class="bi bi-<?= ICONS[ WERKZEUGE['einmal_link_anzeigen']['symbol'] ]; ?>"></i>  <?= WERKZEUGE['einmal_link_anzeigen']['beschriftung']['beschriftung']; ?></span></button></div>
