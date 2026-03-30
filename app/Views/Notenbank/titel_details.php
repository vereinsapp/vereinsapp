<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'cards' ); ?>

<div class="w-100">
<?= view( 'Templates/Liste/element_navigation', array( 'liste' => $liste['aktuelles_verzeichnis'] ) ); ?>
</div>

<div class="row row-cols-1 row-cols-lg-2 gy-3 gx-0 gx-lg-3 w-100">

    <div class="col"><div class="card element" liste="notenbank" titel_id="<?= $liste['aktuelles_verzeichnis']['titel_id']; ?>"><?php
        if( array_key_exists( 'werkzeuge', $liste['aktuelles_verzeichnis']['element'] ) AND is_array( $liste['aktuelles_verzeichnis']['element']['werkzeuge'] ) AND count( $liste['aktuelles_verzeichnis']['element']['werkzeuge'] ) > 0 ) {
            ?><div class="werkzeuge card-header text-end invisible" werkzeuge='<?= json_encode( $liste['aktuelles_verzeichnis']['element']['werkzeuge'], JSON_UNESCAPED_UNICODE ); ?>'></div><?php } ?>
        <div class="card-body p-2">
            <h5 class="card-title text-center text-truncate text-nowrap">
                <span class="beschriftung"><span class="eigenschaft" eigenschaft="titel_nr"></span> <span class="eigenschaft" eigenschaft="titel"></span></span><?php
                if( array_key_exists( 'zusatzsymbole', $liste['aktuelles_verzeichnis']['element'] ) AND is_array( $liste['aktuelles_verzeichnis']['element']['zusatzsymbole'] ) AND count( $liste['aktuelles_verzeichnis']['element']['zusatzsymbole'] ) > 0 ) {
                    ?><span class="zusatzsymbole float-end invisible" zusatzsymbole='<?= json_encode( $liste['aktuelles_verzeichnis']['element']['zusatzsymbole'], JSON_UNESCAPED_UNICODE ); ?>'></span><?php } ?>
            </h5>
            <div class="card-text row row-cols-2 g-0">
                <div class="col text-center"><span class="eigenschaft" eigenschaft="kategorie"></span></div>
                <div class="col text-center"><span class="eigenschaft" eigenschaft="komponist"></span></div>
            </div>
            <div class="card-text text-center fst-italic"><span class="eigenschaft" eigenschaft="bemerkung"></span></div>
        </div>
    </div></div>

    <div class="col">
<?= view( 'Templates/Liste/verzeichnis', array( 'verzeichnis' => array( 'liste' => 'notenbank', 'instanz' => 'aktuelles_verzeichnis', 'titel_id' => $liste['aktuelles_verzeichnis']['titel_id'], ) ) ); ?>
    </div>

</div>

<?php if( auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'titel_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'formular' => view( 'Notenbank/titel_basiseigenschaften_formular' ) ) ) ) ); ?>
<?= $this->endSection() ?>