<div class="offcanvas offcanvas-bottom" data-bs-scroll="true" tabindex="-1" id="werkzeugkasten">
    <div class="row offcanvas-body p-0">
        <div class="col">
            <ul class="list-group list-group-flush" data-bs-dismiss="offcanvas"><?php foreach( $werkzeugkasten as $werkzeug) { ?>
                <li class="list-group-item list-group-item-action werkzeug <?= WERKZEUGE[ $werkzeug ]['btn']; ?><?php
                if( array_key_exists( 'filtern_localstorage', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['filtern_localstorage'] ) echo ' filtern_localstorage';
                if( array_key_exists( 'sortieren_localstorage', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['sortieren_localstorage'] ) echo ' sortieren_localstorage';
                if( array_key_exists( 'gruppieren_localstorage', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['gruppieren_localstorage'] ) echo ' gruppieren_localstorage';
                if( array_key_exists( 'formular_oeffnen', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['formular_oeffnen'] ) echo ' formular_oeffnen';
                if( array_key_exists( 'bestaetigung_einfordern', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['bestaetigung_einfordern'] ) echo ' bestaetigung_einfordern';
                if( array_key_exists( 'farbe', WERKZEUGE[ $werkzeug ] ) ) echo ' text-'.WERKZEUGE[ $werkzeug ]['farbe']; else echo ' text-primary';
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

