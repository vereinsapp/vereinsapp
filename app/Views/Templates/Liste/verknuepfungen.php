<div id="<?= $liste['instanz']; ?>" class="verknuepfungen col" liste="<?= $liste['liste']; ?>"<?php
    if( array_key_exists( 'filtern', $liste ) AND is_array( $liste['filtern'] ) AND count( $liste['filtern'] ) > 0 ) {
        ?> filtern='<?= json_encode( $liste['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    if( array_key_exists( 'sortieren', $liste ) AND is_array( $liste['sortieren'] ) AND count( $liste['sortieren'] ) > 0 ) {
        ?> sortieren='<?= json_encode( $liste['sortieren'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    foreach( LISTEN as $liste_eigenschaften ) if( array_key_exists( $liste_eigenschaften['element'].'_id', $liste ) ) {
        ?> <?= $liste_eigenschaften['element']; ?>_id="<?= $liste[ $liste_eigenschaften['element'].'_id' ]; ?>"<?php }
    if( array_key_exists( 'disabled_ids', $liste ) AND is_array( $liste['disabled_ids'] ) AND count( $liste['disabled_ids'] ) > 0 ) {
        ?> disabled_ids='<?= json_encode( $liste['disabled_ids'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    ?>><div class="card">
    <div class="meta card-header text-center invisible"><?php
    if( array_key_exists( 'werkzeuge', $liste ) AND is_array( $liste['werkzeuge'] ) AND count( $liste['werkzeuge'] ) > 0 ) {
        ?><span class="werkzeuge float-end" werkzeuge='<?= json_encode( $liste['werkzeuge'], JSON_UNESCAPED_UNICODE ); ?>'></span><?php }
    if( array_key_exists( 'ueberschrift', $liste ) ) {
        ?><span class="ueberschrift text-secondary"><?= $liste['ueberschrift']; ?></span><?php }
    ?></div>
    <div class="liste_elemente list-group list-group-flush<?php
    if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND array_key_exists( 'verknuepfung_werkzeuge', $liste['element']['verknuepfungen'] ) AND is_array( $liste['element']['verknuepfungen']['verknuepfung_werkzeuge'] ) AND in_array( 'verknuepfung_status_aendern', $liste['element']['verknuepfungen']['verknuepfung_werkzeuge'] ) )
        echo ' sortable';
    ?>"<?php
    if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND array_key_exists( 'verknuepfung_werkzeuge', $liste['element']['verknuepfungen'] ) AND is_array( $liste['element']['verknuepfungen']['verknuepfung_werkzeuge'] ) AND in_array( 'verknuepfung_status_aendern', $liste['element']['verknuepfungen']['verknuepfung_werkzeuge'] ) ) {
        ?> liste="<?= $liste['liste']; ?>"<?php }
    ?>>

        <div class="list-group-item blanko invisible" blanko="element" liste="<?= $liste['liste']; ?>" instanz="<?= $liste['instanz']; ?>">

            <div class="text-truncate d-flex flex-nowrap align-items-center">

<?php if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND array_key_exists( 'verknuepfungen', $liste['element']['verknuepfungen'] ) AND VERKNUEPFUNGEN[ $liste['element']['verknuepfungen']['verknuepfungen'] ]['typ'] === 'janein_auswahl'
      AND array_key_exists( 'verknuepfung_erstellen', $liste['element']['verknuepfungen'] ) AND $liste['element']['verknuepfungen']['verknuepfung_erstellen'] === TRUE )
    echo view( 'Templates/Liste/verknuepfung_erstellen_janein_auswahl', array( 'verknuepfungen' => $liste['element']['verknuepfungen']['verknuepfungen'], ) ); ?>

                <label class="flex-grow-1<?php
                if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND array_key_exists( 'verknuepfungen', $liste['element']['verknuepfungen'] ) AND VERKNUEPFUNGEN[ $liste['element']['verknuepfungen']['verknuepfungen'] ]['typ'] === 'element_auswahl'
                AND array_key_exists( 'verknuepfung_erstellen', $liste['element']['verknuepfungen'] ) AND $liste['element']['verknuepfungen']['verknuepfung_erstellen'] === TRUE ) {
                    ?> werkzeug<?php }
                ?>"<?php
                if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND array_key_exists( 'verknuepfungen', $liste['element']['verknuepfungen'] ) AND VERKNUEPFUNGEN[ $liste['element']['verknuepfungen']['verknuepfungen'] ]['typ'] === 'element_auswahl'
                AND array_key_exists( 'verknuepfung_erstellen', $liste['element']['verknuepfungen'] ) AND $liste['element']['verknuepfungen']['verknuepfung_erstellen'] === TRUE ) {
                    ?> werkzeug="<?= VERKNUEPFUNGEN[ $liste['element']['verknuepfungen']['verknuepfungen'] ]['verknuepfung'].'_erstellen' ?>" modal_title="<?= WERKZEUGE[ VERKNUEPFUNGEN[ $liste['element']['verknuepfungen']['verknuepfungen'] ]['verknuepfung'].'_erstellen' ]['beschriftung']['beschriftung'] ?>"<?php }
                ?>><i class="bi bi-<?= SYMBOLE[ $liste['liste'] ] ?>"></i> <span class="element_beschriftung"></span></label><?php

                if( array_key_exists( 'link', $liste['element'] ) AND is_array( $liste['element']['link'] ) ) {
                    ?><a class="stretched-link" link='<?= json_encode( $liste['element']['link'], JSON_UNESCAPED_UNICODE ); ?>'></a><?php
                }

                if( array_key_exists( 'zusatzsymbole', $liste['element'] ) AND is_array( $liste['element']['zusatzsymbole'] ) AND count( $liste['element']['zusatzsymbole'] ) > 0 ) {
                    ?><span class="zusatzsymbole float-end stretched-link-unwirksam invisible" zusatzsymbole='<?= json_encode( $liste['element']['zusatzsymbole'], JSON_UNESCAPED_UNICODE ); ?>'></span><?php
                }

                if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND array_key_exists( 'verknuepfung_bemerkung_symbol', $liste['element']['verknuepfungen'] ) AND $liste['element']['verknuepfungen']['verknuepfung_bemerkung_symbol'] === TRUE )
                    echo view( 'Templates/Liste/verknuepfung_bemerkung_symbol', array( 'verknuepfungen' => $liste['element']['verknuepfungen']['verknuepfungen'], ) );
                if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND array_key_exists( 'verknuepfung_status_wert', $liste['element']['verknuepfungen'] ) AND $liste['element']['verknuepfungen']['verknuepfung_status_wert'] === TRUE ) {
                    ?><span class="text-secondary small ms-2 float-end"><span class="verknuepfung_status_wert" verknuepfungen="<?= $liste['element']['verknuepfungen']['verknuepfungen'] ?>"></span></span><?php
                }
                if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND array_key_exists( 'verknuepfung_status_symbol', $liste['element']['verknuepfungen'] ) AND $liste['element']['verknuepfungen']['verknuepfung_status_symbol'] === TRUE ) {
                    ?><span class="verknuepfung_status_symbol ms-2 float-end" verknuepfungen="<?= $liste['element']['verknuepfungen']['verknuepfungen'] ?>"></span><?php
                }
                if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND array_key_exists( 'verknuepfung_werkzeuge', $liste['element']['verknuepfungen'] ) AND is_array( $liste['element']['verknuepfungen']['verknuepfung_werkzeuge'] ) AND count( $liste['element']['verknuepfungen']['verknuepfung_werkzeuge'] ) > 0 ) {
                    ?><span class="verknuepfung_werkzeuge float-end stretched-link-unwirksam invisible" werkzeuge='<?= json_encode( $liste['element']['verknuepfungen']['verknuepfung_werkzeuge'], JSON_UNESCAPED_UNICODE ); ?>' verknuepfungen="<?= $liste['element']['verknuepfungen']['verknuepfungen'] ?>"></span><?php
                }

                if( array_key_exists( 'werkzeuge', $liste['element'] ) AND is_array( $liste['element']['werkzeuge'] ) AND count( $liste['element']['werkzeuge'] ) > 0 ) {
                    ?><span class="werkzeuge float-end stretched-link-unwirksam invisible" werkzeuge='<?= json_encode( $liste['element']['werkzeuge'], JSON_UNESCAPED_UNICODE ); ?>'></span><?php
                } ?>

            </div>
            <?php if( array_key_exists( 'vorschau', $liste['element'] ) AND is_array( $liste['element']['vorschau'] ) AND count( $liste['element']['vorschau'] ) > 0 ) {
                ?><div class="vorschau text-truncate text-secondary small" vorschau='<?= json_encode( $liste['element']['vorschau'], JSON_UNESCAPED_UNICODE ); ?>'></div><?php } ?>

<?php if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND array_key_exists( 'verknuepfungen', $liste['element']['verknuepfungen'] ) AND VERKNUEPFUNGEN[ $liste['element']['verknuepfungen']['verknuepfungen'] ]['typ'] === 'status_auswahl'
      AND array_key_exists( 'verknuepfung_erstellen', $liste['element']['verknuepfungen'] ) AND $liste['element']['verknuepfungen']['verknuepfung_erstellen'] === TRUE )
    echo view( 'Templates/Liste/verknuepfung_erstellen_status_auswahl', array( 'verknuepfungen' => $liste['element']['verknuepfungen']['verknuepfungen'], ) ); ?>

        </div>

    </div>

</div></div>