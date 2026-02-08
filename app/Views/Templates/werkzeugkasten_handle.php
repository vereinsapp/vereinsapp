<div class="fixed-bottom">
    <button type="button" class="btn btn-outline-secondary border-bottom-0 rounded-0 rounded-top float-end me-2 opacity-50" data-bs-toggle="offcanvas" data-bs-target="#werkzeugkasten"<?php
    if( isset( $werkzeugkasten_handle ) AND is_array( $werkzeugkasten_handle ) ) foreach( $werkzeugkasten_handle as $data => $wert ) { ?> data-<?= $data; ?>="<?= $wert; ?>"<?php }
    ?>>
        <span class="beschriftung"><i class="bi-<?= SYMBOLE[ 'werkzeuge' ]['bootstrap']; ?> h5"></i></span>
    </button>
</div>

