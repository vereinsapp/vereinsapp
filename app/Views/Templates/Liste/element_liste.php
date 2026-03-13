<div class="list-group-item<?php
if( array_key_exists( 'verknuepfungen', $liste ) AND VERKNUEPFUNGEN[ $liste['verknuepfungen'] ]['typ'] === 'element_auswahl' ) echo ' werkzeug';
?> text-body blanko invisible" blanko="element" liste="<?= $liste['liste']; ?>" instanz="<?= $liste['instanz']; ?>"<?php
if( array_key_exists( 'verknuepfungen', $liste ) AND VERKNUEPFUNGEN[ $liste['verknuepfungen'] ]['typ'] === 'element_auswahl' ) { ?> werkzeug="<?= LISTEN[ $liste['verknuepfungen'] ]['element']?>_erstellen" verknuepfungen="<?= $liste['verknuepfungen'] ?>"<?php }
if( array_key_exists( 'modal_title', $liste ) ) { ?> modal_title="<?= $liste['modal_title'] ?>"<?php }
?>>

    <div class="text-truncate d-flex flex-nowrap">

<?php if( array_key_exists( 'verknuepfungen', $liste ) AND VERKNUEPFUNGEN[ $liste['verknuepfungen'] ]['typ'] === 'janein_auswahl' ) echo view( 'Templates/Liste/verknuepfungen_janein_auswahl', array( 'verknuepfungen' => $liste['verknuepfungen'], ) ); ?>

        <label class="flex-grow-1"><span class="beschriftung"><?php if( array_key_exists( 'beschriftung', $liste ) ) { ?><?= $liste['beschriftung']; ?><?php } ?></span></label>
        <?php if( array_key_exists( 'zusatzsymbol', $liste ) AND is_array( $liste['zusatzsymbol'] ) AND count( $liste['zusatzsymbol'] ) > 0 ) foreach( $liste['zusatzsymbol'] as $zusatzsymbol ) { ?><span class="zusatzsymbol float-end ms-2 stretched-link-unwirksam" zusatzsymbol="<?= $zusatzsymbol ?>"></span><?php }
              if( array_key_exists( 'sortable', $liste ) AND $liste['sortable'] ) { ?><i class="bi bi-<?= SYMBOLE['sortable']['bootstrap']; ?> sortable_handle text-primary float-end ms-2 stretched-link-unwirksam " role="button"></i><?php }
              if( array_key_exists( 'link', $liste ) AND is_array( $liste['link'] ) ) { ?><a class="stretched-link" link='<?= json_encode( $liste['link'], JSON_UNESCAPED_UNICODE ); ?>'></a><?php } ?>

    </div>

    <?php if( array_key_exists( 'vorschau', $liste ) ) { ?><div class="vorschau text-truncate text-secondary small"><?php
        foreach( $liste['vorschau'] as $vorschau ) { ?><span class="eigenschaft" eigenschaft="<?= $vorschau ?>"></span><i class="bi bi-<?= SYMBOLE['spacer']['bootstrap']; ?> spacer"></i><?php }
    ?></div><?php } ?>

<?php if( array_key_exists( 'verknuepfungen', $liste ) AND VERKNUEPFUNGEN[ $liste['verknuepfungen'] ]['typ'] === 'status_auswahl' ) echo view( 'Templates/Liste/verknuepfungen_status_auswahl', array( 'verknuepfungen' => $liste['verknuepfungen'], ) ); ?>

</div>