<div class="blanko invisible" blanko="auswertung" auswertungen="termine_anwesenheiten" instanz="<?= $auswertung['instanz']; ?>" liste="<?= $auswertungen['liste']; ?>">
    <div class="row g-0"<?php if( array_key_exists( 'collapse', $auswertung ) AND $auswertung['collapse'] ) { ?> data-bs-toggle="collapse" role="button"<?php } ?>>
        <div class="ergebnis_anzahl col-1 h5 float-start text-start text-<?= VERKNUEPFUNGEN['termine_anwesenheiten']['status_erlaubt'][1]['farbe']; ?>" status=1></div>
        <div class="col-10 text-center">
            <span class="beschriftung"></span>
            <?php if( array_key_exists( 'collapse', $auswertung ) AND $auswertung['collapse'] ) { ?><i class="bi bi-<?= SYMBOLE['collapse_oeffnen']; ?> wechselsymbol text-primary ms-1" wechselsymbol='<?= json_encode( array( 'collapse_schliessen', 'collapse_oeffnen' ), JSON_UNESCAPED_UNICODE ) ?>'></i><?php } ?>
            <?php if( array_key_exists( 'progress', $auswertung ) AND $auswertung['progress'] ) { ?><div class="progress-stacked auswertung_progress">
                <div class="progress ergebnis_anzahl" role="progressbar" status=1><div class="progress-bar bg-<?= VERKNUEPFUNGEN['termine_anwesenheiten']['status_erlaubt'][1]['farbe']; ?>"></div></div>
                <div class="progress ergebnis_anzahl" role="progressbar" status=0><div class="progress-bar bg-<?= VERKNUEPFUNGEN['termine_anwesenheiten']['status_erlaubt'][0]['farbe']; ?>"></div></div>
            </div><?php } ?>
        </div>
        <div class="ergebnis_anzahl col-1 h5 float-end text-end text-<?= VERKNUEPFUNGEN['termine_anwesenheiten']['status_erlaubt'][0]['farbe']; ?>" status=0></div>
    </div>
    <?php if( array_key_exists( 'collapse', $auswertung ) AND $auswertung['collapse'] ) { ?><div class="row g-0 collapse">
        <div id="<?= $auswertung['instanz']; ?>_ergebnis_1" class="ergebnis liste col-6 text-center text-<?= VERKNUEPFUNGEN['termine_anwesenheiten']['status_erlaubt'][1]['farbe']; ?>" liste="termine_anwesenheiten" status=1>
            <div class="elemente"><div class="blanko invisible" blanko="element" liste="mitglieder" instanz="<?= $auswertung['instanz']; ?>_ergebnis_1"><span class="eigenschaft" eigenschaft="vorname"></span> <span class="eigenschaft" eigenschaft="nachname"></span><span class="zusatzsymbole" zusatzsymbole='<?= json_encode( array( 'bemerkung' ), JSON_UNESCAPED_UNICODE ) ?>'></span></div></div>
        </div>
        <div id="<?= $auswertung['instanz']; ?>_ergebnis_0" class="ergebnis liste col-6 text-center text-<?= VERKNUEPFUNGEN['termine_anwesenheiten']['status_erlaubt'][0]['farbe']; ?>" liste="mitglieder" status=0>
            <div class="elemente"><div class="blanko invisible" blanko="element" liste="mitglieder" instanz="<?= $auswertung['instanz']; ?>_ergebnis_0"><span class="eigenschaft" eigenschaft="vorname"></span> <span class="eigenschaft" eigenschaft="nachname"></span></div></div>
        </div>
    </div><?php } ?>
</div>