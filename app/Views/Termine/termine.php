<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<div class="container mb-3">
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['bevorstehende_termine'] ) ); ?>
</div>

<?php if( auth()->user()->can( 'termine.verwaltung' ) ) echo
        view( 'Templates/modal', array( 'id' => 'termin_basiseigenschaften', 'modal' =>
        view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'termine' ), 'btn' => array( 'klasse_id' => 'btn_termin_aktion' ), 'formular' =>
        view( 'Termine/termin_basiseigenschaften_formular' ) ) ) ) ); ?>
<?= view( 'Templates/modal', array( 'id' => 'termine_anwesenheiten_dokumentieren', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['anwesenheiten_dokumentieren'] ) ) ) ); ?>
    
<?php if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) )
    view( 'Templates/modal', array( 'id' => 'zugeordnete_aufgaben_anzeigen', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['zugeordnete_aufgaben'] ) ) ) ); ?>
<?php if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) )
    view( 'Templates/modal', array( 'id' => 'mitglieder_aufgaben_erledigt_anzeigen', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['mitglieder_aufgaben_erledigt'] ) ) ) ); ?>
<?= $this->endSection() ?>