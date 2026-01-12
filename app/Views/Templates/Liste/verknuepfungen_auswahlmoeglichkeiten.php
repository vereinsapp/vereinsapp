<div class="verknuepfungen_auswahlmoeglichkeiten" data-verknuepfungen="<?= $verknuepfungen['verknuepfungen'] ?>"<?php
foreach( ELEMENTE as $element => $eigenschaften ) if( array_key_exists( $element.'_id', $verknuepfungen ) ) { ?> data-<?= $element; ?>_id="<?= $verknuepfungen[ $element.'_id' ]; ?>"<?php }
?>>
    <div class="verknuepfung_moeglich stretched-link-unwirksam invisible">
        <div class="btn-group btn-group-sm d-flex" role="group">
            <button type="button" class="btn btn_verknuepfung_erstellen btn-outline-<?= VERKNUEPFUNGEN[ $verknuepfungen['verknuepfungen'] ]['auswahlmoeglichkeiten'][1]['farbe']; ?> w-25 flex-fill" data-status="1">
                <span class="beschriftung"><?= VERKNUEPFUNGEN[ $verknuepfungen['verknuepfungen'] ]['auswahlmoeglichkeiten'][1]['aktiv']; ?></span>
            </button>
            <button type="button" class="btn btn_element_bemerkung_aendern formular_oeffnen btn-outline-primary flex-fill" data-liste="<?= $verknuepfungen['verknuepfungen'] ?>">
                <span class="beschriftung"><i class="bi bi-<?= SYMBOLE['bemerkung']['bootstrap']; ?>"></i></span>
            </button>
            <button type="button" class="btn btn_verknuepfung_erstellen btn-outline-<?= VERKNUEPFUNGEN[ $verknuepfungen['verknuepfungen'] ]['auswahlmoeglichkeiten'][2]['farbe']; ?> w-25 flex-fill" data-status="2">
                <span class="beschriftung"><?= VERKNUEPFUNGEN[ $verknuepfungen['verknuepfungen'] ]['auswahlmoeglichkeiten'][2]['aktiv']; ?></span>
            </button>
        </div>
    </div>
    <div class="verknuepfung_nicht_moeglich invisible text-secondary text-center small"></div>
</div>
