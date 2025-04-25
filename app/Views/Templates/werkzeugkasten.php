<div class="offcanvas offcanvas-bottom" data-bs-scroll="true" tabindex="-1" id="werkzeugkasten">
    <div class="row offcanvas-body p-0">
        <div class="col">
            <ul class="list-group list-group-flush" data-bs-dismiss="offcanvas"><?php foreach( $werkzeugkasten as $symbol => $werkzeug): ?>
                <li class="werkzeug list-group-item list-group-item-action text-<?php
                    if( array_key_exists( 'farbe', $werkzeug ) ) echo $werkzeug['farbe']; else echo 'primary';
                    if( array_key_exists( 'klasse_id', $werkzeug ) ) {
                        if( is_array( $werkzeug['klasse_id'] ) ) foreach( $werkzeug['klasse_id'] as $klasse_id ) echo ' '.$klasse_id;
                        else echo ' '.$werkzeug['klasse_id'];
                    }
                    ?>" data-title="<?= $werkzeug['title']; ?>"<?php
                    if( array_key_exists( 'weiterleiten', $werkzeug ) ) { ?> data-weiterleiten="<?= $werkzeug['weiterleiten']; ?>"<?php }
                    ?> role="button">
                    <i class="bi bi-<?= SYMBOLE[ $symbol ]['bootstrap']; ?> float-start me-2"></i>
                    <?= $werkzeug['title']; ?>
                </li>
            <?php endforeach; ?></ul>
        </div>
        <div class="col-auto opacity-50 bg-white me-2">
            <button type="button" class="btn btn-outline-secondary border-top-0 rounded-0 rounded-bottom" data-bs-dismiss="offcanvas"><i class="bi-<?= SYMBOLE[ 'werkzeuge' ]['bootstrap']; ?> h5"></i></button>
        </div>
    </div>
</div>

