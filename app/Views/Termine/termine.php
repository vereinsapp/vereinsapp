<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<div class="container mb-3">
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['bevorstehende_termine'] ) ); ?>
</div>

<?php if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) AND auth()->user()->can( 'aufgaben.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'termine_aufgaben_zuordnen_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_aufgaben_zuordnen'] ) ) ) ); ?>
<?php if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) AND auth()->user()->can( 'aufgaben.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'aufgabe_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'aufgaben' ), 'btn' => array( 'klasse_id' => 'btn_aufgabe_aktion' ), 'formular' =>
    view( 'Aufgaben/aufgabe_basiseigenschaften_formular' ) ) ) ) ); ?>
<?php if( array_key_exists( LISTEN['notenbank']['controller'], CONTROLLERS ) AND auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'setliste_verwalten_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['setliste_verwalten'] ) ) ) ); ?>
<?php if( array_key_exists( LISTEN['notenbank']['controller'], CONTROLLERS ) AND auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'titel_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'notenbank' ), 'btn' => array( 'klasse_id' => 'btn_titel_aktion' ), 'formular' =>
    view( 'Notenbank/titel_basiseigenschaften_formular' ) ) ) ) ); ?>
<?php if( auth()->user()->can( 'mitglieder.verwaltung' ) AND auth()->user()->can( 'termine.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'termine_rueckmeldungen_verwalten_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_rueckmeldungen_verwalten'] ) ) ) ); ?>
<?php if( auth()->user()->can( 'termine.anwesenheiten' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'termine_anwesenheiten_dokumentieren_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_anwesenheiten_dokumentieren'] ) ) ) ); ?>
<?php if( auth()->user()->can( 'termine.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'termin_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'termine' ), 'btn' => array( 'klasse_id' => 'btn_termin_aktion' ), 'formular' =>
    view( 'Termine/termin_basiseigenschaften_formular' ) ) ) ) ); ?>
<?= $this->endSection() ?>