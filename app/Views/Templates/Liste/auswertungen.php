<?php if( array_key_exists( 'werkzeugkasten', $auswertungen ) ) { ?><div class="text-end"><?php
foreach( $auswertungen['werkzeugkasten'] as $werkzeug) { ?><button type="button" class="btn werkzeug <?= WERKZEUGE[ $werkzeug ]['btn']; ?><?php
    if( array_key_exists( 'filtern_localstorage', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['filtern_localstorage'] ) echo ' filtern_localstorage';
    if( array_key_exists( 'sortieren_localstorage', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['sortieren_localstorage'] ) echo ' sortieren_localstorage';
    if( array_key_exists( 'gruppieren_localstorage', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['gruppieren_localstorage'] ) echo ' gruppieren_localstorage';
    if( array_key_exists( 'formular_oeffnen', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['formular_oeffnen'] ) echo ' formular_oeffnen';
    if( array_key_exists( 'bestaetigung_einfordern', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['bestaetigung_einfordern'] ) echo ' bestaetigung_einfordern';
    if( array_key_exists( 'farbe', WERKZEUGE[ $werkzeug ] ) ) echo ' text-'.WERKZEUGE[ $werkzeug ]['farbe']; else echo ' text-primary';
    ?>" data-werkzeug="<?= $werkzeug; ?>" data-modal_title="<?= WERKZEUGE[ $werkzeug ]['beschriftung']; ?>" data-liste="<?= $auswertungen['liste']; ?>" data-instanz="<?= $auswertungen['instanz']; ?>"<?php
    if( array_key_exists( 'weiterleiten', WERKZEUGE[ $werkzeug ] ) ) { ?> data-weiterleiten="<?= WERKZEUGE[ $werkzeug ]['weiterleiten']; ?>"<?php }
    ?>><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE[ $werkzeug ]['symbol'] ]['bootstrap']; ?>"></i></span></button><?php }
?></div><?php } ?>

<ul id="<?= $auswertungen['instanz']; ?>" class="auswertungen text-center<?php
if( array_key_exists( 'sortable', $auswertungen ) AND $auswertungen['sortable'] ) echo ' sortable';
?> p-0 mb-1" data-auswertungen="<?= $auswertungen['auswertungen']; ?>"<?php
if( array_key_exists( 'gruppieren', $auswertungen ) ) { ?> data-gruppieren='<?= $auswertungen['gruppieren']; ?>'<?php }
if( array_key_exists( 'liste', $auswertungen ) ) { ?> data-liste='<?= $auswertungen['liste']; ?>'<?php }
if( array_key_exists( 'filtern', $auswertungen ) ) { ?> data-filtern='<?= json_encode( $auswertungen['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
foreach( LISTEN as $liste_ => $eigenschaften ) if( array_key_exists( LISTEN[ $liste_ ]['element'].'_id', $auswertungen ) ) { ?> data-<?= LISTEN[ $liste_ ]['element']; ?>_id="<?= $auswertungen[ LISTEN[ $liste_ ]['element'].'_id' ]; ?>"<?php }
?>>

<?= view( $view, array( 'auswertung' => array( 'instanz' => $auswertungen['instanz'], 'collapse' => $auswertungen['collapse'], 'progress' => $auswertungen['progress'], ) ) ); ?>

</ul>