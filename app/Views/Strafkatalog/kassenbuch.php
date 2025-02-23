<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<div class="container mb-3">
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['aktuelles_kassenbuch'] ) ); ?>
</div>

<?php if( auth()->user()->can( 'strafkatalog.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'kassenbucheintrag_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'kassenbuch' ), 'btn' => array( 'klasse_id' => 'btn_kassenbucheintrag_aktion' ), 'formular' =>
    view( 'Strafkatalog/kassenbucheintrag_basiseigenschaften_formular' ) ) ) ) ); ?>
<?= $this->endSection() ?>