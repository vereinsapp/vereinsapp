<li class="blanko invisible" data-blanko="auswertung" data-auswertungen="termine_anwesenheiten" data-instanz="<?= $auswertung['instanz']; ?>" data-liste="<?= $auswertungen['liste']; ?>" style="list-style: none;">
    <div class="row g-0"<?php if( array_key_exists( 'collapse', $auswertung ) AND $auswertung['collapse'] ) { ?> data-bs-toggle="collapse" role="button"<?php } ?>>
        <div class="ergebnis_anzahl col-1 h5 float-start text-start text-<?= VERKNUEPFUNGEN['termine_anwesenheiten']['status_erlaubt'][1]['farbe']; ?>" data-status=1></div>
        <div class="col-10 text-center">
            <span class="beschriftung"></span>
            <?php if( array_key_exists( 'collapse', $auswertung ) AND $auswertung['collapse'] ) { ?><i class="bi bi-<?= SYMBOLE['collapse_oeffnen']['bootstrap']; ?> toggle_symbol text-primary ms-1" data-toggle_symbol="<?= SYMBOLE['collapse_schliessen']['bootstrap']; ?>"></i><?php } ?>
            <?php if( array_key_exists( 'progress', $auswertung ) AND $auswertung['progress'] ) { ?><div class="progress-stacked auswertung_progress">
                <div class="progress ergebnis_anzahl" role="progressbar" data-status=1><div class="progress-bar bg-<?= VERKNUEPFUNGEN['termine_anwesenheiten']['status_erlaubt'][1]['farbe']; ?>"></div></div>
                <div class="progress ergebnis_anzahl" role="progressbar" data-status=0><div class="progress-bar bg-<?= VERKNUEPFUNGEN['termine_anwesenheiten']['status_erlaubt'][0]['farbe']; ?>"></div></div>
            </div><?php } ?>
        </div>
        <div class="ergebnis_anzahl col-1 h5 float-end text-end text-<?= VERKNUEPFUNGEN['termine_anwesenheiten']['status_erlaubt'][0]['farbe']; ?>" data-status=0></div>
    </div>
    <?php if( array_key_exists( 'collapse', $auswertung ) AND $auswertung['collapse'] ) { ?><div class="row g-0 collapse auswertung_collapse">
        <ul id="<?= $auswertung['instanz']; ?>_ergebnis_1" class="ergebnis liste col-6 text-center text-<?= VERKNUEPFUNGEN['termine_anwesenheiten']['status_erlaubt'][1]['farbe']; ?>" data-liste="termine_anwesenheiten" style="list-style-type: none;" data-status=1>
            <li class="blanko invisible" data-blanko="element" data-liste="termine_anwesenheiten" data-instanz="<?= $auswertung['instanz']; ?>_ergebnis_1"><span class="eigenschaft" data-eigenschaft="mitglied_vorname"></span> <span class="eigenschaft" data-eigenschaft="mitglied_nachname"></span><span class="zusatzsymbol ms-2" data-zusatzsymbol="bemerkung"></span></li>
        </ul>
        <ul id="<?= $auswertung['instanz']; ?>_ergebnis_0" class="ergebnis liste col-6 text-center text-<?= VERKNUEPFUNGEN['termine_anwesenheiten']['status_erlaubt'][0]['farbe']; ?>" data-liste="mitglieder" style="list-style-type: none;" data-status=0>
            <li class="blanko invisible" data-blanko="element" data-liste="mitglieder" data-instanz="<?= $auswertung['instanz']; ?>_ergebnis_0"><span class="eigenschaft" data-eigenschaft="vorname"></span> <span class="eigenschaft" data-eigenschaft="nachname"></span></li>
        </ul>
    </div><?php } ?>
</li>