<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'cards' ); ?>

<div class="w-100">
<?= view( 'Templates/Liste/element_navigation', array( 'element_navigation' => $element_navigation ) ); ?>
</div>

<div class="row row-cols-1 row-cols-lg-2 gy-3 gx-0 gx-lg-3 w-100">

    <div class="col"><div class="card element" liste="notenbank" titel_id="<?= $titel_id; ?>">
        <?php if( isset( $werkzeuge_element ) AND is_array( $werkzeuge_element ) AND count( $werkzeuge_element ) > 0 ) { ?><div class="card-header text-end p-0"><?php
        foreach( $werkzeuge_element as $werkzeug) { ?><button type="button" class="btn text-<?php
            if( array_key_exists( 'farbe', WERKZEUGE[ $werkzeug ] ) ) echo WERKZEUGE[ $werkzeug ]['farbe']; else echo 'primary';
            ?> stretched-link-unwirksam werkzeug" werkzeug="<?= $werkzeug; ?>" modal_title="<?= WERKZEUGE[ $werkzeug ]['beschriftung']; ?>"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE[ $werkzeug ]['symbol'] ]['bootstrap']; ?>"></i></span></button><?php
            } ?></div><?php
        } ?>
        <div class="card-body p-2">
            <h5 class="card-title text-center text-truncate text-nowrap">
                <span class="beschriftung"><span class="eigenschaft" eigenschaft="titel_nr"></span> <span class="eigenschaft" eigenschaft="titel"></span></span>
            </h5>
            <div class="card-text row row-cols-2 g-0">
                <div class="col text-center"><span class="eigenschaft" eigenschaft="kategorie"></span></div>
                <div class="col text-center"><span class="eigenschaft" eigenschaft="komponist"></span></div>
            </div>
            <div class="card-text text-center fst-italic"><span class="eigenschaft" eigenschaft="bemerkung"></span></div>
        </div>
    </div></div>

    <div class="col">
    <?= view( 'Templates/Liste/verzeichnis', array( 'verzeichnis' => $verzeichnis['aktuelles_verzeichnis'] ) ); ?>
    </div>

</div>

<?php if( auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'titel_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'formular' => view( 'Notenbank/titel_basiseigenschaften_formular' ) ) ) ) ); ?>
<?= $this->endSection() ?>