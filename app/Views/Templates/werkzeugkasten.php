<div class="offcanvas offcanvas-bottom" data-bs-scroll="true" tabindex="-1" id="werkzeugkasten">
    <div class="row offcanvas-body p-0">
        <div class="col">
            <ul class="list-group list-group-flush" data-bs-dismiss="offcanvas"><?php foreach( $werkzeugkasten as $werkzeug) { ?>
                <li class="list-group-item list-group-item-action werkzeug <?= WERKZEUGE[ $werkzeug ]['klasse']; ?> text-<?php
                if( array_key_exists( 'farbe', WERKZEUGE[ $werkzeug ] ) ) echo WERKZEUGE[ $werkzeug ]['farbe']; else echo 'primary';
                ?>" data-werkzeug="<?= $werkzeug; ?>" <?php
                if( array_key_exists( 'title', WERKZEUGE[ $werkzeug ] ) ) { ?> data-title="<?= WERKZEUGE[ $werkzeug ]['title']; ?>"<?php }
                if( array_key_exists( 'weiterleiten', WERKZEUGE[ $werkzeug ] ) ) { ?> data-weiterleiten="<?= WERKZEUGE[ $werkzeug ]['weiterleiten']; ?>"<?php }
                    ?> role="button">
                    <span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE[ $werkzeug ]['symbol'] ]['bootstrap']; ?>"></i><?php
                    if( array_key_exists( 'title', WERKZEUGE[ $werkzeug ] ) ) echo ' '.WERKZEUGE[ $werkzeug ]['title'];
                    ?></span>
                </li>
            <?php } ?></ul>
        </div>
        <div class="col-auto opacity-50 bg-white me-2">
            <button type="button" class="btn btn-outline-secondary border-top-0 rounded-0 rounded-bottom" data-bs-dismiss="offcanvas"><span class="beschriftung"><i class="bi-<?= SYMBOLE[ 'werkzeuge' ]['bootstrap']; ?> h5"></i></span></button>
        </div>
    </div>
</div>

