<?php if( array_key_exists( 'werkzeugkasten', $auswertungen ) ) { ?><div class="text-end"><?php
foreach( $auswertungen['werkzeugkasten'] as $werkzeug_id => $werkzeug) { ?><button type="button" class="btn werkzeug text-<?php
    if( array_key_exists( 'farbe', $werkzeug ) ) echo $werkzeug['farbe']; else echo 'primary';
    if( is_array( $werkzeug['klasse_id'] ) ) foreach( $werkzeug['klasse_id'] as $klasse_id ) echo ' '.$klasse_id; else echo ' '.$werkzeug['klasse_id'];
    ?>" data-werkzeug="<?= $werkzeug_id; ?>" data-liste="<?= $auswertungen['liste']; ?>" data-instanz="<?= $auswertungen['instanz']; ?>"<?php
    if( array_key_exists( 'title', $werkzeug ) ) { ?> data-title="<?= $werkzeug['title']; ?>"<?php }
    ?>><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ $werkzeug['symbol'] ]['bootstrap']; ?>"></i></span></button><?php }
?></div><?php } ?>

<ul id="<?= $auswertungen['instanz']; ?>" class="auswertungen text-center<?php
if( array_key_exists( 'sortable', $auswertungen ) AND $auswertungen['sortable'] ) echo ' sortable';
?> p-0 mb-1" data-auswertungen="<?= $auswertungen['auswertungen']; ?>"<?php
if( array_key_exists( 'gruppieren', $auswertungen ) ) { ?> data-gruppieren='<?= $auswertungen['gruppieren']; ?>'<?php }
if( array_key_exists( 'liste', $auswertungen ) ) { ?> data-liste='<?= $auswertungen['liste']; ?>'<?php }
if( array_key_exists( 'filtern', $auswertungen ) ) { ?> data-filtern='<?= json_encode( $auswertungen['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
foreach( ELEMENTE as $element => $eigenschaften ) if( array_key_exists( $element.'_id', $auswertungen ) ) { ?> data-<?= $element; ?>_id="<?= $auswertungen[ $element.'_id' ]; ?>"<?php }
?>>

<?= view( $view, array( 'auswertung' => array( 'instanz' => $auswertungen['instanz'], 'collapse' => $auswertungen['collapse'], 'progress' => $auswertungen['progress'], ) ) ); ?>

</ul>