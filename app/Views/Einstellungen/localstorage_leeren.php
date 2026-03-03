<div class="d-grid"><button type="button" class="btn btn-outline-<?php
if( array_key_exists('farbe', WERKZEUGE['localstorage_leeren']) ) echo WERKZEUGE['localstorage_leeren']['farbe']; else echo "primary";
?> werkzeug" werkzeug="localstorage_leeren" modal_title="<?= WERKZEUGE['localstorage_leeren']['beschriftung']; ?>">
    <span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['localstorage_leeren']['symbol'] ]['bootstrap']; ?>"></i> <?= WERKZEUGE['localstorage_leeren']['beschriftung']; ?></span>
</button></div>