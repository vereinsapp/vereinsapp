<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'cards' ); ?>

<?php if( NOTENBANK_VERZEICHNIS != NULL AND !empty(NOTENBANK_VERZEICHNIS) ) { ?>
<div class="w-100"><a href="<?= base_url( NOTENBANK_VERZEICHNIS ); ?>" type="button" class="btn btn-outline-primary" target="_blank">
    <span class="beschriftung"><i class="bi bi-<?= SYMBOLE['notenbank']['bootstrap']; ?>"></i> Verzeichnis öffnen</span>
</a></div>
<?php } ?>

<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['aktuelles_verzeichnis'], 'typ' => 'kacheln', 'element' =>
    view( 'Templates/Liste/element_kacheln', array( 'liste' => $liste['aktuelles_verzeichnis'] ) ) ) ); ?>

<?php if( auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'titel_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'formular' => view( 'Notenbank/titel_basiseigenschaften_formular' ) ) ) ) ); ?>
<?= $this->endSection() ?>

