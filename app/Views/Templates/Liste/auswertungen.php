<div id="<?= $auswertungen['instanz']; ?>" class="auswertungen w-100<?php
    if( array_key_exists( 'sortable', $auswertungen ) AND $auswertungen['sortable'] ) echo ' sortable';
    ?>" auswertungen="<?= $auswertungen['auswertungen']; ?>" liste="<?= $auswertungen['liste']; ?>"<?php
    if( array_key_exists( 'filtern', $auswertungen ) ) { ?> filtern='<?= json_encode( $auswertungen['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    if( array_key_exists( 'gruppieren', $auswertungen ) ) { ?> gruppieren='<?= $auswertungen['gruppieren']; ?>'<?php }
    foreach( LISTEN as $liste_ => $eigenschaften ) if( array_key_exists( LISTEN[ $liste_ ]['element'].'_id', $auswertungen ) ) { ?> <?= LISTEN[ $liste_ ]['element']; ?>_id="<?= $auswertungen[ LISTEN[ $liste_ ]['element'].'_id' ]; ?>"<?php }
    ?>>
    <?php if( array_key_exists( 'werkzeuge_auswertungen', $auswertungen ) AND is_array( $auswertungen['werkzeuge_auswertungen'] ) AND count( $auswertungen['werkzeuge_auswertungen'] ) > 0 ) { ?><div class="meta w-100"><?php
        foreach( array_reverse( $auswertungen['werkzeuge_auswertungen'] ) as $werkzeug) { ?><i class="bi bi-<?= SYMBOLE[ WERKZEUGE[ $werkzeug ]['symbol'] ]['bootstrap']; ?> text-<?php
            if( array_key_exists( 'farbe', WERKZEUGE[ $werkzeug ] ) ) echo WERKZEUGE[ $werkzeug ]['farbe']; else echo 'primary';
            ?> float-end ms-3 werkzeug" werkzeug="<?= $werkzeug; ?>" modal_title="<?= WERKZEUGE[ $werkzeug ]['beschriftung']; ?>" instanz="<?= $auswertungen['instanz']; ?>" role="button"></i><?php
        }
    ?></div><?php } ?>
    <div class="elemente row w-100 g-0">

<?= view( $view, array( 'auswertung' => array( 'instanz' => $auswertungen['instanz'], 'collapse' => $auswertungen['collapse'], 'progress' => $auswertungen['progress'], ) ) ); ?>

    </div>

</div>