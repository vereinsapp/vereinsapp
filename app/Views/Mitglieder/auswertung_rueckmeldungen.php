<li class="blanko auswertung invisible" style="list-style: none;">
    <div class="row g-0"<?php if( array_key_exists( 'collapse', $auswertung ) AND $auswertung['collapse'] ) { ?> data-bs-toggle="collapse" role="button"<?php } ?>>
        <div class="ergebnis_anzahl col-1 h5 float-start text-start" data-status=1></div>
        <div class="col-10 text-center">
            <span class="beschriftung"></span>
            <?php if( array_key_exists( 'collapse', $auswertung ) AND $auswertung['collapse'] ) { ?><i class="bi bi-<?= SYMBOLE['collapse_oeffnen']['bootstrap']; ?> toggle_symbol text-primary ms-1" data-toggle_symbol="<?= SYMBOLE['collapse_schliessen']['bootstrap']; ?>"></i><?php } ?>
            <?php if( array_key_exists( 'progress', $auswertung ) AND $auswertung['progress'] ) { ?><div class="progress-stacked auswertung_progress">
                <div class="progress ergebnis_anzahl" role="progressbar" data-status=1><div class="progress-bar bg-<?= VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'][1]['farbe']; ?>"></div></div>
                <div class="progress ergebnis_anzahl" role="progressbar" data-status=0><div class="progress-bar bg-transparent"></div></div>
                <div class="progress ergebnis_anzahl" role="progressbar" data-status=2><div class="progress-bar bg-<?= VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'][2]['farbe']; ?>"></div></div>
            </div><?php } ?>
        </div>
        <div class="ergebnis_anzahl col-1 h5 float-end text-end" data-status=2></div>
    </div>
    <?php if( array_key_exists( 'collapse', $auswertung ) AND $auswertung['collapse'] ) { ?><div class="row g-0 collapse auswertung_collapse">
        <ul id="<?= $auswertung['id']; ?>_ergebnis_1" class="ergebnis liste col-6 text-center text-<?= VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'][1]['farbe']; ?>" data-liste="termine_rueckmeldungen" style="list-style-type: none;" data-status=1>
            <li class="blanko element invisible"><span class="eigenschaft" data-eigenschaft="termin_start"></span> <span class="eigenschaft" data-eigenschaft="termin_titel"></span><span class="zusatzsymbol ms-2" data-zusatzsymbol="bemerkung"></span></li>
        </ul>
        <ul id="<?= $auswertung['id']; ?>_ergebnis_2" class="ergebnis liste col-6 text-center text-<?= VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'][2]['farbe']; ?>" data-liste="termine_rueckmeldungen" style="list-style-type: none;" data-status=2>
            <li class="blanko element invisible"><span class="eigenschaft" data-eigenschaft="termin_start"></span> <span class="eigenschaft" data-eigenschaft="termin_titel"></span><span class="zusatzsymbol ms-2" data-zusatzsymbol="bemerkung"></span></li>
        </ul>
        <div id="<?= $auswertung['id']; ?>_ergebnis_0" class="ergebnis liste col-12 text-center text-secondary small" data-liste="termine" data-status=0>
            <span class="blanko element invisible"><span class="eigenschaft" data-eigenschaft="start"></span> <span class="eigenschaft" data-eigenschaft="titel"></span><i class="bi bi-<?= SYMBOLE['ohne_rueckmeldung']['bootstrap']; ?> me-1"></i></span>
        </div>
    </div><?php } ?>
</li>