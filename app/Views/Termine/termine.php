<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'cards' ); ?>

<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['bevorstehende_termine'], 'typ' => 'kacheln', 'element' =>
    view( 'Templates/Liste/element_kacheln', array( 'liste' => $liste['bevorstehende_termine'] ) ) ) ); ?>

<?php if( auth()->user()->can( 'mitglieder.verwaltung' ) AND auth()->user()->can( 'termine.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'termine_rueckmeldungen_verwalten_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_rueckmeldungen_verwalten'], 'typ' => 'liste', 'element' =>
    view( 'Templates/Liste/element_liste', array( 'liste' => $liste['termine_rueckmeldungen_verwalten'] ) ) ) ) ) ); ?>
<?php if( auth()->user()->can( 'termine.anwesenheiten' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'termine_anwesenheiten_dokumentieren_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_anwesenheiten_dokumentieren'], 'typ' => 'liste', 'element' =>
    view( 'Templates/Liste/element_liste', array( 'liste' => $liste['termine_anwesenheiten_dokumentieren'] ) ) ) ) ) ); ?>
<?php if( auth()->user()->can( 'termine.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'termin_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'formular' => view( 'Termine/termin_basiseigenschaften_formular' ) ) ) ) ); ?>
<?= $this->endSection() ?>