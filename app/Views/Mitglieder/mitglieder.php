<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<div class="container mb-3">
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['alle_mitglieder'] ) ); ?>
</div>

<?php if( auth()->user()->can( 'termine.verwaltung' ) AND auth()->user()->can( 'mitglieder.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'termine_rueckmeldungen_verwalten_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_rueckmeldungen_verwalten'] ) ) ) ); ?>
<?php if( auth()->user()->can( 'termine.anwesenheiten' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'termine_anwesenheiten_dokumentieren_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_anwesenheiten_dokumentieren'] ) ) ) ); ?>
<?php if( auth()->user()->can( 'strafkatalog.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'strafen_zuweisen_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['strafen_zuweisen'] ) ) ) ); ?>
<?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'mitglied_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'formular' => view( 'Mitglieder/mitglied_basiseigenschaften_formular' ) ) ) ) ); ?>
<?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'mitglied_einmal_link_anzeigen_modal', 'modal' =>
    view( 'Mitglieder/mitglied_einmal_link_anzeigen' ) ) ); ?>
<?php if( auth()->user()->can( 'global.einstellungen' ) OR auth()->user()->can( 'mitglieder.rechte' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'rechte_vergeben_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['rechte_vergeben'] ) ) ) ); ?>
<?= $this->endSection() ?>