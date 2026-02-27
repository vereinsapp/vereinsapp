<div class="verknuepfungen_auswahlmoeglichkeiten" data-verknuepfungen="<?= $verknuepfungen ?>">
    <div class="verknuepfung_moeglich stretched-link-unwirksam invisible">
        <div class="btn-group btn-group-sm d-flex" role="group">
            <button type="button" class="btn werkzeug<?php
            if( VERKNUEPFUNGEN[ $verknuepfungen ]['bestaetigung_einfordern'] === TRUE ) echo ' bestaetigung_einfordern';
            ?> btn-outline-<?= VERKNUEPFUNGEN[ $verknuepfungen ]['status_erlaubt'][1]['farbe']; ?> w-25 flex-fill" data-werkzeug="<?= LISTEN[ $verknuepfungen ]['element']?>_erstellen" data-status="1">
                <span class="beschriftung"><?= VERKNUEPFUNGEN[ $verknuepfungen ]['status_erlaubt'][1]['aktiv']; ?></span>
            </button>
            <button type="button" class="btn btn-outline-primary flex-fill formular_oeffnen werkzeug" data-werkzeug="bemerkung_aendern" data-liste="<?= $verknuepfungen ?>">
                <span class="beschriftung"><i class="bi bi-<?= SYMBOLE['bemerkung']['bootstrap']; ?>"></i></span>
            </button>
            <button type="button" class="btn werkzeug<?php
            if( VERKNUEPFUNGEN[ $verknuepfungen ]['bestaetigung_einfordern'] === TRUE ) echo ' bestaetigung_einfordern';
            ?> btn-outline-<?= VERKNUEPFUNGEN[ $verknuepfungen ]['status_erlaubt'][2]['farbe']; ?> w-25 flex-fill" data-werkzeug="<?= LISTEN[ $verknuepfungen ]['element']?>_erstellen" data-status="2">
                <span class="beschriftung"><?= VERKNUEPFUNGEN[ $verknuepfungen ]['status_erlaubt'][2]['aktiv']; ?></span>
            </button>
        </div>
    </div>
    <div class="verknuepfung_nicht_moeglich invisible text-secondary text-center small"></div>
</div>
