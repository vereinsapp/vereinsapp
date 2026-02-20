<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<div class="container mb-3">
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['aktueller_strafkatalog'] ) ); ?>
</div>

<?php if( auth()->user()->can( 'strafkatalog.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'strafen_zuweisen_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['strafen_zuweisen'] ) ) ) ); ?>
<?php if( auth()->user()->can( 'strafkatalog.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'strafe_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'formular' => view( 'Strafkatalog/strafe_basiseigenschaften_formular' ) ) ) ) ); ?>
<?= $this->endSection() ?>