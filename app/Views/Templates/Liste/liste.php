<?php if( array_key_exists( 'werkzeuge_liste', $liste ) AND is_array( $liste['werkzeuge_liste'] ) AND count( $liste['werkzeuge_liste'] ) > 0 ) {
?><div class="text-end w-100"><?php foreach( $liste['werkzeuge_liste'] as $werkzeug) { ?><button type="button" class="btn text-<?php
    if( array_key_exists( 'farbe', WERKZEUGE[ $werkzeug ] ) ) echo WERKZEUGE[ $werkzeug ]['farbe']; else echo 'primary';
    ?> werkzeug" werkzeug="<?= $werkzeug; ?>" modal_title="<?= WERKZEUGE[ $werkzeug ]['beschriftung']; ?>" instanz="<?= $liste['instanz']; ?>">
        <span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE[ $werkzeug ]['symbol'] ]['bootstrap']; ?>"></i></span>
    </button><?php }
?></div><?php } ?>

<?php if( array_key_exists( 'listenstatistik', $liste ) AND is_array( $liste['listenstatistik'] ) AND count( $liste['listenstatistik'] ) > 0 ) {
?><div class="text-end text-secondary small w-100"><?php
    if( array_key_exists( 'anzahl', $liste['listenstatistik'] ) ) { ?><span class="listenstatistik" instanz="<?= $liste['instanz']; ?>" listenstatistik="anzahl"></span> Element(e)<?php }
    if( array_key_exists( 'anzahl', $liste['listenstatistik'] ) AND array_key_exists( 'summe', $liste['listenstatistik'] ) ) { ?><i class="bi bi-<?= SYMBOLE['spacer']['bootstrap'] ?> spacer"></i><?php }
    if( array_key_exists( 'summe', $liste['listenstatistik'] ) ) { ?>Summe: <span class="listenstatistik" instanz="<?= $liste['instanz']; ?>" listenstatistik="summe" eigenschaft="<?= $liste['listenstatistik']['summe']; ?>"></span><?php }
?></div><?php } ?>

<div id="<?= $liste['instanz']; ?>" class="liste<?php
if( isset( $typ ) AND $typ === 'liste' ) echo ' list-group list-group-flush';
else if( isset( $typ ) AND $typ === 'kacheln' ) echo ' row row-cols-1 row-cols-lg-2 row-cols-xxl-3 gy-3 gx-0 gx-lg-3 w-100';
if( array_key_exists( 'sortable', $liste ) AND $liste['sortable'] ) echo ' sortable';
?>" liste="<?= $liste['liste']; ?>"<?php
if( array_key_exists( 'filtern', $liste ) ) { ?> filtern='<?= json_encode( $liste['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
if( array_key_exists( 'sortieren', $liste ) ) { ?> sortieren='<?= json_encode( $liste['sortieren'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
foreach( LISTEN as $liste_ => $eigenschaften ) if( array_key_exists( LISTEN[ $liste_ ]['element'].'_id', $liste ) ) { ?> <?= LISTEN[ $liste_ ]['element']; ?>_id="<?= $liste[ LISTEN[ $liste_ ]['element'].'_id' ]; ?>"<?php }
if( array_key_exists( 'disabled_ids', $liste ) ) { ?> disabled_ids='<?= json_encode( $liste['disabled_ids'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
?>>

<?= $element ?>

</div>

