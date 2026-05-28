<div class="blanko invisible" blanko="auswertung" verknuepfungen="termine_rueckmeldungen" instanz="<?= $auswertung['instanz']; ?>" liste="<?= $auswertungen['liste']; ?>">
    <div class="row g-0"<?php if( array_key_exists( 'collapse', $auswertung ) AND $auswertung['collapse'] ) { ?> data-bs-toggle="collapse" role="button"<?php } ?>>
        <div class="ergebnis_anzahl col-1 h5 float-start text-start text-<?= VERKNUEPFUNGEN['termine_rueckmeldungen']['status_erlaubt'][1]['farbe']; ?>" status=1></div>
        <div class="col-10 text-center">
            <span class="beschriftung"></span>
            <?php if( array_key_exists( 'collapse', $auswertung ) AND $auswertung['collapse'] ) { ?><i class="bi bi-<?= SYMBOLE['collapse_oeffnen']; ?> wechselsymbol text-primary ms-1" wechselsymbol='<?= json_encode( array( 'collapse_schliessen', 'collapse_oeffnen' ), JSON_UNESCAPED_UNICODE ) ?>'></i><?php } ?>
            <?php if( array_key_exists( 'progress', $auswertung ) AND $auswertung['progress'] ) { ?><div class="progress-stacked auswertung_progress">
                <div class="progress ergebnis_anzahl" role="progressbar" status=1><div class="progress-bar bg-<?= VERKNUEPFUNGEN['termine_rueckmeldungen']['status_erlaubt'][1]['farbe']; ?>"></div></div>
                <div class="progress ergebnis_anzahl" role="progressbar" status=0><div class="progress-bar bg-transparent"></div></div>
                <div class="progress ergebnis_anzahl" role="progressbar" status=2><div class="progress-bar bg-<?= VERKNUEPFUNGEN['termine_rueckmeldungen']['status_erlaubt'][2]['farbe']; ?>"></div></div>
            </div><?php } ?>
        </div>
        <div class="ergebnis_anzahl col-1 h5 float-end text-end text-<?= VERKNUEPFUNGEN['termine_rueckmeldungen']['status_erlaubt'][2]['farbe']; ?>" status=2></div>
    </div>
    <?php if( array_key_exists( 'collapse', $auswertung ) AND $auswertung['collapse'] ) { ?><div class="row g-0 collapse">
        <div id="<?= $auswertung['instanz']; ?>_ergebnis_1" class="ergebnis liste col-6 text-center text-<?= VERKNUEPFUNGEN['termine_rueckmeldungen']['status_erlaubt'][1]['farbe']; ?>" liste="termine" status=1>
            <div class="elemente"><div class="blanko invisible" blanko="element" liste="termine" instanz="<?= $auswertung['instanz']; ?>_ergebnis_1"><span class="element_beschriftung"></span><span class="zusatzsymbole" zusatzsymbole='<?= json_encode( array( 'bemerkung' ), JSON_UNESCAPED_UNICODE ) ?>'></span></div></div>
        </div>
        <div id="<?= $auswertung['instanz']; ?>_ergebnis_2" class="ergebnis liste col-6 text-center text-<?= VERKNUEPFUNGEN['termine_rueckmeldungen']['status_erlaubt'][2]['farbe']; ?>" liste="termine" status=2>
            <div class="elemente"><div class="blanko invisible" blanko="element" liste="termine" instanz="<?= $auswertung['instanz']; ?>_ergebnis_2"><span class="element_beschriftung"></span><span class="zusatzsymbole" zusatzsymbole='<?= json_encode( array( 'bemerkung' ), JSON_UNESCAPED_UNICODE ) ?>'></span></div></div>
        </div>
        <div id="<?= $auswertung['instanz']; ?>_ergebnis_0" class="ergebnis liste col-12 text-center text-<?= VERKNUEPFUNGEN['termine_rueckmeldungen']['status_erlaubt'][0]['farbe']; ?> small" liste="termine" status=0>
            <div class="elemente"><span class="me-1 blanko invisible" blanko="element" liste="termine" instanz="<?= $auswertung['instanz']; ?>_ergebnis_0"><span class="element_beschriftung"></span><?= VERKNUEPFUNGEN['termine_rueckmeldungen']['status_erlaubt'][0]['aktiv']; ?></span></div>
        </div>
    </div><?php } ?>
</div>