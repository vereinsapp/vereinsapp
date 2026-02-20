<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<div class="container mb-3 element" data-liste="notenbank" data-titel_id="<?= $titel_id; ?>">
<?= view( 'Templates/Liste/element_navigation', array( 'element_navigation' => $element_navigation ) ); ?>
    <div class="text-center">
        <span class="eigenschaft" data-eigenschaft="titel_nr"></span>
    </div>
    <div class="h5 beschriftung text-center">
        <span class="eigenschaft" data-eigenschaft="titel"></span>
    </div>
    <div class="row g-0 my-1">
        <div class="col text-center text-nowrap"><span class="eigenschaft" data-eigenschaft="kategorie"></span></div>
        <div class="col text-center text-nowrap"><span class="eigenschaft" data-eigenschaft="komponist"></span></div>
    </div>
    <div class="row g-0 my-1">
        <div class="col text-center text-nowrap fst-italic"><span class="eigenschaft" data-eigenschaft="bemerkung"></span></div>
    </div>
</div>

<div class="container mb-3">
<?= view( 'Templates/Liste/verzeichnis', array( 'verzeichnis' => $verzeichnis['aktuelles_verzeichnis'] ) ); ?>
</div>

<?php if( auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'setliste_verwalten_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['setliste_verwalten'] ) ) ) ); ?>
<?php if( auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'titel_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'formular' => view( 'Notenbank/titel_basiseigenschaften_formular' ) ) ) ) ); ?>

<?php if( isset( $werkzeugkasten ) AND is_array( $werkzeugkasten ) AND count( $werkzeugkasten ) > 0 ) echo
    view( 'Templates/werkzeugkasten_handle', array( 'werkzeugkasten_handle' => array( 'liste' => 'notenbank', 'titel_id' => $titel_id ) ) ); ?>
<?= $this->endSection() ?>