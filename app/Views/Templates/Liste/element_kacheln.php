<div class="col blanko invisible" blanko="element" liste="<?= $liste['liste']; ?>" instanz="<?= $liste['instanz']; ?>">
    <div class="card">
        <?php if( array_key_exists( 'werkzeuge_element', $liste ) AND is_array( $liste['werkzeuge_element'] ) AND count( $liste['werkzeuge_element'] ) > 0 ) { ?><div class="card-header text-end p-0"><?php
            foreach( $liste['werkzeuge_element'] as $werkzeug) { ?><button type="button" class="btn text-<?php
                if( array_key_exists( 'farbe', WERKZEUGE[ $werkzeug ] ) ) echo WERKZEUGE[ $werkzeug ]['farbe']; else echo 'primary';
                ?> stretched-link-unwirksam werkzeug" werkzeug="<?= $werkzeug; ?>" modal_title="<?= WERKZEUGE[ $werkzeug ]['beschriftung']; ?>"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE[ $werkzeug ]['symbol'] ]['bootstrap']; ?>"></i></span></button><?php
                } ?></div><?php
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