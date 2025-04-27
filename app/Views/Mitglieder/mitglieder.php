<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<div class="container mb-3">
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['alle_mitglieder'] ) ); ?>
</div>

<?php if( array_key_exists( LISTEN['anwesenheiten']['controller'], CONTROLLERS ) ) echo
    view( 'Templates/modal', array( 'id' => 'mitglieder_anwesenheiten_dokumentieren', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['anwesenheiten_dokumentieren'] ) ) ) ); ?>
<?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'mitglied_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder' ), 'btn' => array( 'klasse_id' => 'btn_mitglied_aktion' ), 'formular' =>
    view( 'Mitglieder/mitglied_basiseigenschaften_formular' ) ) ) ) ); ?>
<?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'mitglieder_einmal_link_anzeigen', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder' ), 'btn' => array( 'klasse_id' => 'btn_mitglied_einmal_link_anzeigen', 'beschriftung' => 'Einmal-Link anzeigen' ), 'formular' =>
    view( 'Mitglieder/mitglied_einmal_link_anzeigen_formular' ) ) ) ) ); ?>

<?php if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) echo
    view( 'Templates/modal', array( 'id' => 'zugeordnete_aufgaben_anzeigen', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['alle_mitglieder_zugeordnete_aufgaben'] ) ) ) ); ?>
<?php if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) echo
    view( 'Templates/modal', array( 'id' => 'mitglieder_aufgaben_erledigt_anzeigen', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['mitglieder_aufgaben_erledigt'] ) ) ) ); ?>
<?= $this->endSection() ?>