<div id="<?= $liste['instanz']; ?>" class="liste w-100" liste="<?= $liste['liste']; ?>"<?php
    if( array_key_exists( 'filtern', $liste ) AND is_array( $liste['filtern'] ) AND count( $liste['filtern'] ) > 0 ) {
        ?> filtern='<?= json_encode( $liste['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    if( array_key_exists( 'sortieren', $liste ) AND is_array( $liste['sortieren'] ) AND count( $liste['sortieren'] ) > 0 ) {
        ?> sortieren='<?= json_encode( $liste['sortieren'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    foreach( LISTEN as $liste_ => $eigenschaften ) if( array_key_exists( LISTEN[ $liste_ ]['element'].'_id', $liste ) ) {
        ?> <?= LISTEN[ $liste_ ]['element']; ?>_id="<?= $liste[ LISTEN[ $liste_ ]['element'].'_id' ]; ?>"<?php }
    if( array_key_exists( 'disabled_ids', $liste ) AND is_array( $liste['disabled_ids'] ) AND count( $liste['disabled_ids'] ) > 0 ) {
        ?> disabled_ids='<?= json_encode( $liste['disabled_ids'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    ?>>
    <div class="meta w-100 text-center invisible"><?php
    if( array_key_exists( 'werkzeuge', $liste ) AND is_array( $liste['werkzeuge'] ) AND count( $liste['werkzeuge'] ) > 0 ) {
        ?><span class="werkzeuge float-end" werkzeuge='<?= json_encode( $liste['werkzeuge'], JSON_UNESCAPED_UNICODE ); ?>'></span><?php }
    if( array_key_exists( 'listenstatistik', $liste ) AND is_array( $liste['listenstatistik'] ) AND count( $liste['listenstatistik'] ) > 0 ) {
        ?><span class="listenstatistik_todo text-secondary float-end"><?php
        if( array_key_exists( 'anzahl', $liste['listenstatistik'] ) ) { ?><span class="listenstatistik" listenstatistik="anzahl"></span> Element(e)<?php }
        if( array_key_exists( 'anzahl', $liste['listenstatistik'] ) AND array_key_exists( 'summe', $liste['listenstatistik'] ) ) { ?><i class="bi bi-<?= ICONS['spacer'] ?> spacer"></i><?php }
        if( array_key_exists( 'summe', $liste['listenstatistik'] ) ) { ?>Summe: <span class="listenstatistik" listenstatistik="summe" eigenschaft="<?= $liste['listenstatistik']['summe']; ?>"></span><?php }
        ?></span><?php }
    ?></div>
    <div class="elemente row row-cols-1 row-cols-lg-2 row-cols-xxl-3 gy-3 gx-0 gx-lg-3 w-100">

        <div class="col blanko invisible" blanko="element" liste="<?= $liste['liste']; ?>" instanz="<?= $liste['instanz']; ?>">
            <div class="card"><?php
            if( array_key_exists( 'werkzeuge', $liste['element'] ) AND is_array( $liste['element']['werkzeuge'] ) AND count( $liste['element']['werkzeuge'] ) > 0 ) {
                ?><div class="werkzeuge card-header text-end stretched-link-unwirksam invisible" werkzeuge='<?= json_encode( $liste['element']['werkzeuge'], JSON_UNESCAPED_UNICODE ); ?>'></div><?php } ?>
                <div class="card-body p-2">
                    <h5 class="card-title text-truncate text-nowrap">
                        <span class="beschriftung"><?= $liste['element']['beschriftung']; ?></span>
                        <?php if( array_key_exists( 'zusatzsymbol', $liste['element'] ) AND is_array( $liste['element']['zusatzsymbol'] ) AND count( $liste['element']['zusatzsymbol'] ) > 0 ) foreach( $liste['element']['zusatzsymbol'] as $zusatzsymbol ) { ?><span class="zusatzsymbol float-end stretched-link-unwirksam" zusatzsymbol="<?= $zusatzsymbol ?>"></span><?php } ?>
                        <?php if( array_key_exists( 'link', $liste['element'] ) AND is_array( $liste['element']['link'] ) ) { ?><a class="stretched-link" link='<?= json_encode( $liste['element']['link'], JSON_UNESCAPED_UNICODE ); ?>'></a><?php } ?>
                    </h5>
                    <?php if( array_key_exists( 'vorschau', $liste['element'] ) AND is_array( $liste['element']['vorschau'] ) AND count( $liste['element']['vorschau'] ) > 0 ) { ?><div class="card-text mt-1 vorschau text-truncate text-secondary"><?php
                        foreach( $liste['element']['vorschau'] as $vorschau ) { ?><span class="eigenschaft" eigenschaft="<?= $vorschau ?>"></span><i class="bi bi-<?= ICONS['spacer']; ?> spacer"></i><?php }
                    ?></div><?php } ?>
                    <?php if( array_key_exists( 'verknuepfungen', $liste['element'] ) AND VERKNUEPFUNGEN[ $liste['element']['verknuepfungen'] ]['typ'] === 'status_auswahl' ) { ?><div class="card-text mt-1">
<?= view( 'Templates/Liste/verknuepfungen_status_auswahl', array( 'verknuepfungen' => $liste['element']['verknuepfungen'], ) ); ?>
                    </div><?php }?>
                </div>
            </div>
        </div>

    </div>

</div>