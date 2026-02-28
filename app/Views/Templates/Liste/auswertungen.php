<?php if( array_key_exists( 'werkzeugkasten', $auswertungen ) ) { ?><div class="text-end"><?php
foreach( $auswertungen['werkzeugkasten'] as $werkzeug) { ?><button type="button" class="btn text-<?php
    if( array_key_exists( 'farbe', WERKZEUGE[ $werkzeug ] ) ) echo WERKZEUGE[ $werkzeug ]['farbe']; else echo 'primary';
    ?> werkzeug" data-werkzeug="<?= $werkzeug; ?>" data-modal_title="<?= WERKZEUGE[ $werkzeug ]['beschriftung']; ?>" data-liste="<?= $auswertungen['liste']; ?>" data-instanz="<?= $auswertungen['instanz']; ?>">
        <span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE[ $werkzeug ]['symbol'] ]['bootstrap']; ?>"></i></span>
    </button><?php }
?></div><?php } ?>

<ul id="<?= $auswertungen['instanz']; ?>" class="auswertungen text-center<?php
if( array_key_exists( 'sortable', $auswertungen ) AND $auswertungen['sortable'] ) echo ' sortable';
?> p-0 mb-1" data-auswertungen="<?= $auswertungen['auswertungen']; ?>" data-liste="<?= $auswertungen['liste']; ?>"<?php
if( array_key_exists( 'gruppieren', $auswertungen ) ) { ?> data-gruppieren='<?= $auswertungen['gruppieren']; ?>'<?php }
if( array_key_exists( 'filtern', $auswertungen ) ) { ?> data-filtern='<?= json_encode( $auswertungen['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
foreach( LISTEN as $liste_ => $eigenschaften ) if( array_key_exists( LISTEN[ $liste_ ]['element'].'_id', $auswertungen ) ) { ?> data-<?= LISTEN[ $liste_ ]['element']; ?>_id="<?= $auswertungen[ LISTEN[ $liste_ ]['element'].'_id' ]; ?>"<?php }
?>>

<?= view( $view, array( 'auswertung' => array( 'instanz' => $auswertungen['instanz'], 'collapse' => $auswertungen['collapse'], 'progress' => $auswertungen['progress'], ) ) ); ?>

</ul>