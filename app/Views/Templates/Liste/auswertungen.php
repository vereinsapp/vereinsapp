<div id="<?= $auswertungen['instanz']; ?>" class="auswertungen w-100" auswertungen="<?= $auswertungen['auswertungen']; ?>" liste="<?= $auswertungen['liste']; ?>"<?php
    if( array_key_exists( 'filtern', $auswertungen ) ) { ?> filtern='<?= json_encode( $auswertungen['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    if( array_key_exists( 'gruppieren', $auswertungen ) ) { ?> gruppieren='<?= $auswertungen['gruppieren']; ?>'<?php }
    foreach( LISTEN as $liste_ => $eigenschaften ) if( array_key_exists( LISTEN[ $liste_ ]['element'].'_id', $auswertungen ) ) { ?> <?= LISTEN[ $liste_ ]['element']; ?>_id="<?= $auswertungen[ LISTEN[ $liste_ ]['element'].'_id' ]; ?>"<?php }
    if( array_key_exists( 'werkzeuge', $auswertungen ) AND is_array( $auswertungen['werkzeuge'] ) AND count( $auswertungen['werkzeuge'] ) > 0 ) { ?> werkzeuge='<?= json_encode( array_reverse( $auswertungen['werkzeuge'] ), JSON_UNESCAPED_UNICODE ); ?>'<?php }
    ?>>
    <div class="meta w-100 invisible"></div>
    <div class="auswertungen row w-100 g-0">

<?= view( $view, array( 'auswertung' => array( 'instanz' => $auswertungen['instanz'], 'collapse' => $auswertungen['collapse'], 'progress' => $auswertungen['progress'], ) ) ); ?>

    </div>

</div>