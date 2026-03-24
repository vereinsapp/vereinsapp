<div id="<?= $auswertungen['instanz']; ?>" class="auswertungen w-100" auswertungen="<?= $auswertungen['auswertungen']; ?>" liste="<?= $auswertungen['liste']; ?>"<?php
    if( array_key_exists( 'filtern', $auswertungen ) AND is_array( $auswertungen['filtern'] ) AND count( $auswertungen['filtern'] ) > 0 ) {
        ?> filtern='<?= json_encode( $auswertungen['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    if( array_key_exists( 'gruppieren', $auswertungen ) AND is_string( $auswertungen['gruppieren'] ) ) {
        ?> gruppieren='<?= $auswertungen['gruppieren']; ?>'<?php }
    foreach( LISTEN as $liste_ => $eigenschaften ) if( array_key_exists( LISTEN[ $liste_ ]['element'].'_id', $auswertungen ) ) {
        ?> <?= LISTEN[ $liste_ ]['element']; ?>_id="<?= $auswertungen[ LISTEN[ $liste_ ]['element'].'_id' ]; ?>"<?php }
    ?>>
    <div class="meta w-100 text-center invisible"><?php
    if( array_key_exists( 'werkzeuge', $auswertungen ) AND is_array( $auswertungen['werkzeuge'] ) AND count( $auswertungen['werkzeuge'] ) > 0 ) {
        ?><span class="werkzeuge float-end" werkzeuge='<?= json_encode( $auswertungen['werkzeuge'], JSON_UNESCAPED_UNICODE ); ?>'></span><?php }
    ?></div>
    <div class="auswertungen row w-100 g-0">

<?= view( $view, array( 'auswertung' => array( 'instanz' => $auswertungen['instanz'], 'collapse' => $auswertungen['collapse'], 'progress' => $auswertungen['progress'], ) ) ); ?>

    </div>

</div>