<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<?php if( NOTENBANK_VERZEICHNIS != NULL AND !empty(NOTENBANK_VERZEICHNIS) ) { ?><div class="container mb-3">
<?= view( 'Notenbank/verzeichnis_oeffnen' ); ?>
</div><?php } ?>

<div class="container mb-3">
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['aktuelles_verzeichnis'] ) ); ?>
</div>

<?php if( auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'titel_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'notenbank' ), 'btn' => array( 'klasse_id' => 'btn_titel_aktion' ), 'formular' =>
    view( 'Notenbank/titel_basiseigenschaften_formular' ) ) ) ) ); ?>

<?php if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) echo
    view( 'Templates/modal', array( 'id' => 'zugeordnete_aufgaben_anzeigen', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['aktuelles_verzeichnis_zugeordnete_aufgaben'] ) ) ) ); ?>
<?php if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) echo
    view( 'Templates/modal', array( 'id' => 'mitglieder_aufgaben_erledigt_anzeigen', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['mitglieder_aufgaben_erledigt'] ) ) ) ); ?>
<?= $this->endSection() ?>

