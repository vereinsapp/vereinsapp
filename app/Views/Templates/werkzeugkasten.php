<div class="offcanvas offcanvas-bottom" data-bs-scroll="true" tabindex="-1" id="werkzeugkasten">
    <div class="row offcanvas-body p-0">
        <div class="col">
            <ul class="list-group list-group-flush" data-bs-dismiss="offcanvas"><?php foreach( $werkzeugkasten as $werkzeug) { ?>
                <li class="list-group-item list-group-item-action<?php
                if( array_key_exists( 'formular_oeffnen', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['formular_oeffnen'] ) echo ' formular_oeffnen';
                if( array_key_exists( 'bestaetigung_einfordern', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['bestaetigung_einfordern'] ) echo ' bestaetigung_einfordern';
                if( array_key_exists( 'farbe', WERKZEUGE[ $werkzeug ] ) ) echo ' text-'.WERKZEUGE[ $werkzeug ]['farbe']; else echo ' text-primary';
                ?> werkzeug" data-werkzeug="<?= $werkzeug; ?>" data-modal_title="<?= WERKZEUGE[ $werkzeug ]['beschriftung']; ?>" <?php
                if( array_key_exists( 'weiterleiten', WERKZEUGE[ $werkzeug ] ) ) { ?> data-weiterleiten="<?= WERKZEUGE[ $werkzeug ]['weiterleiten']; ?>"<?php }
                    ?> role="button">
                    <span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE[ $werkzeug ]['symbol'] ]['bootstrap']; ?>"> </i><?= WERKZEUGE[ $werkzeug ]['beschriftung']; ?></span>
                </li>
            <?php } ?></ul>
        </div>
        <div class="col-auto opacity-50 bg-white me-2">
            <button type="button" class="btn btn-outline-secondary border-top-0 rounded-0 rounded-bottom" data-bs-dismiss="offcanvas"><span class="beschriftung"><i class="bi-<?= SYMBOLE[ 'werkzeuge' ]['bootstrap']; ?> h5"></i></span></button>
        </div>
    </div>
</div>

