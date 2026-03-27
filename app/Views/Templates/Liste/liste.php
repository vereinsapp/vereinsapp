<div id="<?= $liste['instanz']; ?>" class="liste col" liste="<?= $liste['liste']; ?>"<?php
    if( array_key_exists( 'filtern', $liste ) AND is_array( $liste['filtern'] ) AND count( $liste['filtern'] ) > 0 ) {
        ?> filtern='<?= json_encode( $liste['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    if( array_key_exists( 'sortieren', $liste ) AND is_array( $liste['sortieren'] ) AND count( $liste['sortieren'] ) > 0 ) {
        ?> sortieren='<?= json_encode( $liste['sortieren'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    foreach( LISTEN as $liste_ => $eigenschaften ) if( array_key_exists( LISTEN[ $liste_ ]['element'].'_id', $liste ) ) {
        ?> <?= LISTEN[ $liste_ ]['element']; ?>_id="<?= $liste[ LISTEN[ $liste_ ]['element'].'_id' ]; ?>"<?php }
    if( array_key_exists( 'disabled_ids', $liste ) AND is_array( $liste['disabled_ids'] ) AND count( $liste['disabled_ids'] ) > 0 ) {
        ?> disabled_ids='<?= json_encode( $liste['disabled_ids'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    ?>><div class="card">
    <div class="meta card-header text-center invisible"><?php
    if( array_key_exists( 'werkzeuge', $liste ) AND is_array( $liste['werkzeuge'] ) AND count( $liste['werkzeuge'] ) > 0 ) {
        ?><span class="werkzeuge float-end" werkzeuge='<?= json_encode( $liste['werkzeuge'], JSON_UNESCAPED_UNICODE ); ?>'></span><?php }
    if( array_key_exists( 'ueberschrift', $liste ) ) {
        ?><span class="ueberschrift text-secondary"><?= $liste['ueberschrift']; ?></span><?php }
    ?></div>
    <div class="elemente list-group list-group-flush<?php
    if( array_key_exists( 'werkzeuge', $liste['element'] ) AND is_array( $liste['element']['werkzeuge'] ) AND in_array( 'sortable', $liste['element']['werkzeuge'] ) )
        echo ' sortable';
    ?>" liste="<?= $liste['liste']; ?>">

        <div class="list-group-item blanko invisible" blanko="element" liste="<?= $liste['liste']; ?>" instanz="<?= $liste['instanz']; ?>">

            <div class="text-truncate d-flex flex-nowrap align-items-center">
<?php if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND VERKNUEPFUNGEN[ $liste['element']['verknuepfungen'] ]['typ'] === 'janein_auswahl' ) echo view( 'Templates/Liste/verknuepfungen_janein_auswahl', array( 'verknuepfungen' => $liste['element']['verknuepfungen'], ) ); ?>
                <label class="flex-grow-1<?php
                if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND VERKNUEPFUNGEN[ $liste['element']['verknuepfungen'] ]['typ'] === 'element_auswahl' )
                    echo ' werkzeug';
                ?>"<?php
                if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND VERKNUEPFUNGEN[ $liste['element']['verknuepfungen'] ]['typ'] === 'element_auswahl' ) {
                    ?> werkzeug="<?= LISTEN[ $liste['element']['verknuepfungen'] ]['element'].'_erstellen' ?>" modal_title="<?= WERKZEUGE[ LISTEN[ $liste['element']['verknuepfungen'] ]['element'].'_erstellen' ]['beschriftung']['beschriftung'] ?>" verknuepfungen="<?= $liste['element']['verknuepfungen'] ?>"<?php }
                ?>><span class="beschriftung"><?php if( array_key_exists( 'beschriftung', $liste['element'] ) ) { ?><?= $liste['element']['beschriftung']; ?><?php } ?></span></label><?php
                if( array_key_exists( 'zusatzsymbol', $liste['element'] ) AND is_array( $liste['element']['zusatzsymbol'] ) AND count( $liste['element']['zusatzsymbol'] ) > 0 )
                    foreach( $liste['element']['zusatzsymbol'] as $zusatzsymbol ) { ?><span class="zusatzsymbol float-end ms-2 stretched-link-unwirksam" zusatzsymbol="<?= $zusatzsymbol ?>"></span><?php }
                if( array_key_exists( 'link', $liste['element'] ) AND is_array( $liste['element']['link'] ) ) {
                    ?><a class="stretched-link" link='<?= json_encode( $liste['element']['link'], JSON_UNESCAPED_UNICODE ); ?>'></a><?php }
                if( array_key_exists( 'werkzeuge', $liste['element'] ) AND is_array( $liste['element']['werkzeuge'] ) AND count( $liste['element']['werkzeuge'] ) > 0 ) {
                    ?><span class="werkzeuge float-end stretched-link-unwirksam invisible" werkzeuge='<?= json_encode( $liste['element']['werkzeuge'], JSON_UNESCAPED_UNICODE ); ?>'></span><?php } ?>
            </div>
            <?php if( array_key_exists( 'vorschau', $liste['element'] ) ) {
                ?><div class="vorschau text-truncate text-secondary small"><?php
                foreach( $liste['element']['vorschau'] as $vorschau ) {
                    ?><span class="eigenschaft" eigenschaft="<?= $vorschau ?>"></span><i class="bi bi-<?= ICONS['spacer']; ?> spacer"></i><?php }
                ?></div><?php }
            ?>
<?php if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND VERKNUEPFUNGEN[ $liste['element']['verknuepfungen'] ]['typ'] === 'status_auswahl' ) echo view( 'Templates/Liste/verknuepfungen_status_auswahl', array( 'verknuepfungen' => $liste['element']['verknuepfungen'], ) ); ?>
        </div>

    </div>

</div></div>