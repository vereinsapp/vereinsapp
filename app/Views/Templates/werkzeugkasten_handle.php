<div class="fixed-bottom">
    <button type="button" class="btn btn-outline-secondary border-bottom-0 rounded-0 rounded-top float-end me-2 opacity-50" data-bs-toggle="offcanvas" data-bs-target="#werkzeugkasten"<?php
    if( array_key_exists( 'liste', $werkzeugkasten_handle ) ) { ?> data-liste="<?= $werkzeugkasten_handle['liste']; ?>"<?php }
    foreach( ELEMENTE as $element => $eigenschaften ) if( array_key_exists( $element.'_id', $werkzeugkasten_handle ) ) { ?> data-<?= $element; ?>_id="<?= $werkzeugkasten_handle[ $element.'_id' ]; ?>"<?php }
    ?>>
        <span class="beschriftung"><i class="bi-<?= SYMBOLE[ 'werkzeuge' ]['bootstrap']; ?> h5"></i></span>
    </button>
</div>

