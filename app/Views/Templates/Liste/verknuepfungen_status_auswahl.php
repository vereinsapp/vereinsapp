<div class="verknuepfungen" verknuepfungen="<?= $verknuepfungen ?>">
    <div class="verknuepfung_moeglich stretched-link-unwirksam invisible">
        <div class="btn-group btn-group-sm d-flex" role="group">
            <button type="button" class="btn btn-outline-<?= VERKNUEPFUNGEN[ $verknuepfungen ]['status_erlaubt'][1]['farbe']; ?> w-25 flex-fill werkzeug" werkzeug="<?= LISTEN[ $verknuepfungen ]['element']?>_erstellen" status="1">
                <span class="beschriftung"><?= VERKNUEPFUNGEN[ $verknuepfungen ]['status_erlaubt'][1]['aktiv']; ?></span>
            </button>
            <button type="button" class="btn btn-outline-<?php
            if( array_key_exists('farbe', WERKZEUGE['bemerkung_aendern']) ) echo WERKZEUGE['bemerkung_aendern']['farbe']; else echo "primary";
            ?> flex-fill werkzeug" werkzeug="bemerkung_aendern" liste="<?= $verknuepfungen ?>">
                <span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['bemerkung_aendern']['symbol'] ]['bootstrap']; ?>"></i></span>
            </button>
            <button type="button" class="btn btn-outline-<?= VERKNUEPFUNGEN[ $verknuepfungen ]['status_erlaubt'][2]['farbe']; ?> w-25 flex-fill werkzeug" werkzeug="<?= LISTEN[ $verknuepfungen ]['element']?>_erstellen" status="2">
                <span class="beschriftung"><?= VERKNUEPFUNGEN[ $verknuepfungen ]['status_erlaubt'][2]['aktiv']; ?></span>
            </button>
        </div>
    </div>
    <div class="verknuepfung_nicht_moeglich invisible text-secondary text-center small"></div>
</div>
