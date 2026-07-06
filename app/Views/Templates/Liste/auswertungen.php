<div id="<?= $auswertungen['instanz']; ?>" class="auswertungen w-100" verknuepfungen="<?= $auswertungen['verknuepfungen']; ?>" liste="<?= $auswertungen['liste']; ?>"<?php
    if( array_key_exists( 'filtern', $auswertungen ) AND is_array( $auswertungen['filtern'] ) AND count( $auswertungen['filtern'] ) > 0 ) {
        ?> filtern='<?= json_encode( $auswertungen['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    if( array_key_exists( 'gruppieren', $auswertungen ) AND is_string( $auswertungen['gruppieren'] ) ) {
        ?> gruppieren='<?= $auswertungen['gruppieren']; ?>'<?php }
    foreach( LISTEN as $liste_eigenschaften ) if( array_key_exists( $liste_eigenschaften['element'].'_id', $auswertungen ) ) {
        ?> <?= $liste_eigenschaften['element']; ?>_id="<?= $auswertungen[ $liste_eigenschaften['element'].'_id' ]; ?>"<?php }
    ?>>
    <div class="meta w-100 text-center invisible"><?php
    if( array_key_exists( 'werkzeuge', $auswertungen ) AND is_array( $auswertungen['werkzeuge'] ) AND count( $auswertungen['werkzeuge'] ) > 0 ) {
        ?><span class="werkzeuge float-end" werkzeuge='<?= json_encode( $auswertungen['werkzeuge'], JSON_UNESCAPED_UNICODE ); ?>'></span><?php }
    ?></div>
    <div class="auswertungen_auswertungen row w-100 g-0">

        <div class="blanko invisible" blanko="auswertung" verknuepfungen="<?= $auswertungen['verknuepfungen']; ?>" instanz="<?= $auswertungen['instanz']; ?>" liste="<?= $auswertungen['liste']; ?>">

            <div class="row g-0"<?php if( array_key_exists( 'collapse', $auswertungen ) AND $auswertungen['collapse'] ) { ?> data-bs-toggle="collapse" role="button"<?php } ?>>
                <div class="ergebnis_anzahl col-1 h5 float-start text-start text-<?= VERKNUEPFUNGEN[ $auswertungen['verknuepfungen'] ]['status_erlaubt'][1]['farbe']; ?>" status=1></div>
                <div class="col-10 text-center">
                    <span class="beschriftung"></span>
                    <?php if( array_key_exists( 'collapse', $auswertungen ) AND $auswertungen['collapse'] ) { ?><i class="bi bi-<?= SYMBOLE['collapse_oeffnen']; ?> wechselsymbol text-primary ms-1" wechselsymbol='<?= json_encode( array( 'collapse_schliessen', 'collapse_oeffnen' ), JSON_UNESCAPED_UNICODE ) ?>'></i><?php } ?>
                    <?php if( array_key_exists( 'progress', $auswertungen ) AND $auswertungen['progress'] ) { ?><div class="progress-stacked auswertung_progress">
                        <div class="progress ergebnis_anzahl" role="progressbar" status=1><div class="progress-bar bg-<?= VERKNUEPFUNGEN[ $auswertungen['verknuepfungen'] ]['status_erlaubt'][1]['farbe']; ?>"></div></div>
                        <div class="progress ergebnis_anzahl" role="progressbar" status=0><div class="progress-bar bg-transparent"></div></div>
                        <?php if( array_key_exists( 2, VERKNUEPFUNGEN[ $auswertungen['verknuepfungen'] ]['status_erlaubt'] ) ) { ?><div class="progress ergebnis_anzahl" role="progressbar" status=2><div class="progress-bar bg-<?= VERKNUEPFUNGEN[ $auswertungen['verknuepfungen'] ]['status_erlaubt'][2]['farbe']; ?>"></div></div><?php } ?>
                    </div><?php } ?>
                </div>
                <?php if( array_key_exists( 2, VERKNUEPFUNGEN[ $auswertungen['verknuepfungen'] ]['status_erlaubt'] ) ) { ?><div class="ergebnis_anzahl col-1 h5 float-end text-end text-<?= VERKNUEPFUNGEN[ $auswertungen['verknuepfungen'] ]['status_erlaubt'][2]['farbe']; ?>" status=2></div><?php } ?>
            </div>

            <?php if( array_key_exists( 'collapse', $auswertungen ) AND $auswertungen['collapse'] ) { ?><div class="row g-0 collapse">
                <div id="<?= $auswertungen['instanz']; ?>_ergebnis_1" class="ergebnis liste col-6 text-start text-<?= VERKNUEPFUNGEN[ $auswertungen['verknuepfungen'] ]['status_erlaubt'][1]['farbe']; ?>" liste="<?= $auswertungen['liste']; ?>" status=1>
                    <div class="liste_elemente"><div class="blanko invisible" blanko="element" liste="<?= $auswertungen['liste']; ?>" instanz="<?= $auswertungen['instanz']; ?>_ergebnis_1"><span class="element_beschriftung"></span><?= view( 'Templates/Liste/verknuepfung_bemerkung_symbol', array( 'verknuepfungen' => $auswertungen['verknuepfungen'], ) ); ?></div></div>
                </div>
                <?php if( array_key_exists( 2, VERKNUEPFUNGEN[ $auswertungen['verknuepfungen'] ]['status_erlaubt'] ) ) { ?><div id="<?= $auswertungen['instanz']; ?>_ergebnis_2" class="ergebnis liste col-6 text-end text-<?= VERKNUEPFUNGEN[ $auswertungen['verknuepfungen'] ]['status_erlaubt'][2]['farbe']; ?>" liste="<?= $auswertungen['liste']; ?>" status=2>
                    <div class="liste_elemente"><div class="blanko invisible" blanko="element" liste="<?= $auswertungen['liste']; ?>" instanz="<?= $auswertungen['instanz']; ?>_ergebnis_2"><span class="element_beschriftung"></span><?= view( 'Templates/Liste/verknuepfung_bemerkung_symbol', array( 'verknuepfungen' => $auswertungen['verknuepfungen'], ) ); ?></div></div>
                </div><?php } ?>
                <div id="<?= $auswertungen['instanz']; ?>_ergebnis_0" class="ergebnis liste col-10 text-center text-secondary small" liste="<?= $auswertungen['liste']; ?>" status=0>
                    <div class="liste_elemente"><span class="me-1 blanko invisible" blanko="element" liste="<?= $auswertungen['liste']; ?>" instanz="<?= $auswertungen['instanz']; ?>_ergebnis_0"><span class="element_beschriftung"></span><?= VERKNUEPFUNGEN[ $auswertungen['verknuepfungen'] ]['status_erlaubt'][0]['aktiv']; ?></span></div>
                </div>
            </div><?php } ?>

        </div>

    </div>
</div>