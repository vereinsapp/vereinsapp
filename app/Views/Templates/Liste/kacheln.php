<div id="<?= $liste['instanz']; ?>" class="liste w-100<?php
    if( array_key_exists( 'sortable', $liste ) AND $liste['sortable'] ) echo ' sortable';
    ?>" liste="<?= $liste['liste']; ?>"<?php
    if( array_key_exists( 'filtern', $liste ) ) { ?> filtern='<?= json_encode( $liste['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    if( array_key_exists( 'sortieren', $liste ) ) { ?> sortieren='<?= json_encode( $liste['sortieren'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    foreach( LISTEN as $liste_ => $eigenschaften ) if( array_key_exists( LISTEN[ $liste_ ]['element'].'_id', $liste ) ) { ?> <?= LISTEN[ $liste_ ]['element']; ?>_id="<?= $liste[ LISTEN[ $liste_ ]['element'].'_id' ]; ?>"<?php }
    if( array_key_exists( 'disabled_ids', $liste ) ) { ?> disabled_ids='<?= json_encode( $liste['disabled_ids'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    ?>>
    <?php if( ( array_key_exists( 'listenstatistik', $liste ) AND is_array( $liste['listenstatistik'] ) AND count( $liste['listenstatistik'] ) > 0 ) OR ( array_key_exists( 'werkzeuge_liste', $liste ) AND is_array( $liste['werkzeuge_liste'] ) AND count( $liste['werkzeuge_liste'] ) > 0 ) ) { ?><div class="meta w-100"><?php
        if( array_key_exists( 'werkzeuge_liste', $liste ) AND is_array( $liste['werkzeuge_liste'] ) AND count( $liste['werkzeuge_liste'] ) > 0 )
            foreach( array_reverse( $liste['werkzeuge_liste'] ) as $werkzeug) { ?><i class="bi bi-<?= SYMBOLE[ WERKZEUGE[ $werkzeug ]['symbol'] ]['bootstrap']; ?> text-<?php
                if( array_key_exists( 'farbe', WERKZEUGE[ $werkzeug ] ) ) echo WERKZEUGE[ $werkzeug ]['farbe']; else echo 'primary';
                ?> float-end ms-3 werkzeug" werkzeug="<?= $werkzeug; ?>" modal_title="<?= WERKZEUGE[ $werkzeug ]['beschriftung']; ?>" instanz="<?= $liste['instanz']; ?>" role="button"></i><?php
            }
        if( array_key_exists( 'listenstatistik', $liste ) AND is_array( $liste['listenstatistik'] ) AND count( $liste['listenstatistik'] ) > 0 ) { ?><span class="text-secondary float-end ms-3"><?php
            if( array_key_exists( 'anzahl', $liste['listenstatistik'] ) ) { ?><span class="listenstatistik" listenstatistik="anzahl"></span> Element(e)<?php }
            if( array_key_exists( 'anzahl', $liste['listenstatistik'] ) AND array_key_exists( 'summe', $liste['listenstatistik'] ) ) { ?><i class="bi bi-<?= SYMBOLE['spacer']['bootstrap'] ?> spacer"></i><?php }
            if( array_key_exists( 'summe', $liste['listenstatistik'] ) ) { ?>Summe: <span class="listenstatistik" listenstatistik="summe" eigenschaft="<?= $liste['listenstatistik']['summe']; ?>"></span><?php }
        ?></span><?php }
    ?></div><?php } ?>
    <div class="elemente row row-cols-1 row-cols-lg-2 row-cols-xxl-3 gy-3 gx-0 gx-lg-3 w-100">

        <div class="col blanko invisible" blanko="element" liste="<?= $liste['liste']; ?>" instanz="<?= $liste['instanz']; ?>">
            <div class="card">
                <?php if( array_key_exists( 'werkzeuge_element', $liste ) AND is_array( $liste['werkzeuge_element'] ) AND count( $liste['werkzeuge_element'] ) > 0 ) { ?><div class="card-header text-center"><?php
                    foreach( array_reverse( $liste['werkzeuge_element'] ) as $werkzeug) { ?><i class="bi bi-<?= SYMBOLE[ WERKZEUGE[ $werkzeug ]['symbol'] ]['bootstrap']; ?> text-<?php
                        if( array_key_exists( 'farbe', WERKZEUGE[ $werkzeug ] ) ) echo WERKZEUGE[ $werkzeug ]['farbe']; else echo 'primary';
                        ?> stretched-link-unwirksam float-end ms-3 werkzeug" werkzeug="<?= $werkzeug; ?>" modal_title="<?= WERKZEUGE[ $werkzeug ]['beschriftung']; ?>" instanz="<?= $liste['instanz']; ?>" role="button"></i><?php
                    } ?>
                </div><?php
                } ?>
                <div class="card-body p-2">
                    <h5 class="card-title text-truncate text-nowrap">
                        <span class="beschriftung"><?= $liste['beschriftung']; ?></span>
                        <?php if( array_key_exists( 'zusatzsymbol', $liste ) AND is_array( $liste['zusatzsymbol'] ) AND count( $liste['zusatzsymbol'] ) > 0 ) foreach( $liste['zusatzsymbol'] as $zusatzsymbol ) { ?><span class="zusatzsymbol float-end stretched-link-unwirksam" zusatzsymbol="<?= $zusatzsymbol ?>"></span><?php } ?>
                        <?php if( array_key_exists( 'link', $liste ) AND is_array( $liste['link'] ) ) { ?><a class="stretched-link" link='<?= json_encode( $liste['link'], JSON_UNESCAPED_UNICODE ); ?>'></a><?php } ?>
                    </h5>
                    <?php if( array_key_exists( 'vorschau', $liste ) ) { ?><div class="card-text mt-1 vorschau text-truncate text-secondary"><?php
                        foreach( $liste['vorschau'] as $vorschau ) { ?><span class="eigenschaft" eigenschaft="<?= $vorschau ?>"></span><i class="bi bi-<?= SYMBOLE['spacer']['bootstrap']; ?> spacer"></i><?php }
                    ?></div><?php } ?>
                    <?php if( array_key_exists( 'verknuepfungen', $liste ) AND VERKNUEPFUNGEN[ $liste['verknuepfungen'] ]['typ'] === 'status_auswahl' ) { ?><div class="card-text mt-1">
                        <?= view( 'Templates/Liste/verknuepfungen_status_auswahl', array( 'verknuepfungen' => $liste['verknuepfungen'], ) ); ?>
                    </div><?php }?>
                </div>
            </div>
        </div>

    </div>

</div>