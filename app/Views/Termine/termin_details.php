<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<div class="container mb-3 element" data-liste="termine" data-element_id="<?= $element_id; ?>" data-mitglied_id="<?= ICH['id']; ?>">
<?= view( 'Templates/Liste/element_navigation', array( 'element_navigation' => $element_navigation ) ); ?>
    <div class="h5 beschriftung text-center"><span class="eigenschaft" data-eigenschaft="titel"></span></div>
    <div class="row g-0 my-1">
        <div class="col-5 text-center text-nowrap">
            <div><i class="bi bi-<?= SYMBOLE["zeitraum"]["bootstrap"]; ?>"></i></div>
            <div class="eigenschaft" data-eigenschaft="start"></div>
            <?php if( array_key_exists( 'ende', EIGENSCHAFTEN['termine'] ) ) { ?><div class="text-secondary small">bis <span class="eigenschaft" data-eigenschaft="ende"></span></div><?php } ?>
        </div>
        <div class="col-2 text-center text-nowrap"><span class="zusatzsymbol" data-zusatzsymbol="kategorie"></span></div>
        <div class="col-5 text-center text-nowrap">
            <div><i class="bi bi-<?= SYMBOLE["ort"]["bootstrap"]; ?>"></i></div>
            <div><span class="eigenschaft" data-eigenschaft="ort"></span></div>
        </div>
    </div>
    <div class="row g-0 my-1">
        <div class="col text-center text-nowrap fst-italic"><span class="eigenschaft" data-eigenschaft="bemerkung"></span></div>
    </div>
<?= view( 'Templates/Liste/verknuepfungen_auswahlmoeglichkeiten', array( 'verknuepfungen' => array( 'verknuepfungen' => 'termine_rueckmeldungen', 'mitglied_id' => ICH['id'], ), ) ); ?>
</div>

<div class="container mb-3">
    <ul class="nav nav-tabs">
        <li class="col-6 nav-item text-center" data-bs-target="#rueckmeldungen_container" role="button">
            <a class="nav-link active">Rückmeldungen</a>
        </li>
        <li class="col-6 nav-item collapsed text-center" data-bs-toggle="collapse" data-bs-target="#anwesenheiten_container" role="button">
            <a class="nav-link">Anwesenheiten</a>
        </li>
    </ul>
</div>

<div class="container rueckmeldungen_anwesenheiten_parent mb-3">
    <div id="rueckmeldungen_container" class="collapse tab_collapse no-transition show" data-bs-parent=".rueckmeldungen_anwesenheiten_parent">
<?= view( 'Templates/Liste/auswertungen', array( 'auswertungen' => $auswertungen['rueckmeldungen_termin'], 'view' => 'Termine/auswertung_rueckmeldungen' ) ); ?>
    </div>
    <div id="anwesenheiten_container" class="collapse tab_collapse no-transition" data-bs-parent=".rueckmeldungen_anwesenheiten_parent">
<?= view( 'Templates/Liste/auswertungen', array( 'auswertungen' => $auswertungen['anwesenheiten_termin'], 'view' => 'Termine/auswertung_anwesenheiten' ) ); ?>
    </div>
</div>

<?php if( array_key_exists( LISTEN['notenbank']['controller'], CONTROLLERS ) ) { ?><div class="container mb-3">
    <div class="ueberschrift text-secondary text-center mb-1">Setliste</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['zugeordnete_setliste'] ) ); ?>
</div><?php } ?>

<?php if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) { ?><div class="container mb-3">
    <div class="ueberschrift text-secondary text-center mb-1">Aufgaben</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['zugeordnete_aufgaben'] ) ); ?>
</div><?php } ?>

<?php if( array_key_exists( 'aufgaben.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'aufgaben.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'termine_aufgaben_zuordnen_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_aufgaben_zuordnen'] ) ) ) ); ?>
<?php if( array_key_exists( 'aufgaben.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'aufgaben.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'aufgabe_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'aufgaben' ), 'btn' => array( 'klasse_id' => 'btn_aufgabe_aktion' ), 'formular' =>
    view( 'Aufgaben/aufgabe_basiseigenschaften_formular' ) ) ) ) ); ?>
<?php if( array_key_exists( 'notenbank.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'setliste_verwalten_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['setliste_verwalten'] ) ) ) ); ?>
<?php if( array_key_exists( 'notenbank.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'titel_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'notenbank' ), 'btn' => array( 'klasse_id' => 'btn_titel_aktion' ), 'formular' =>
    view( 'Notenbank/titel_basiseigenschaften_formular' ) ) ) ) ); ?>
<?php if( array_key_exists( 'mitglieder.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'mitglieder.verwaltung' ) AND auth()->user()->can( 'termine.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'termine_rueckmeldungen_verwalten_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_rueckmeldungen_verwalten'] ) ) ) ); ?>
<?php if( auth()->user()->can( 'termine.anwesenheiten' ) ) echo
    view( 'Templates/modal', array( 'id' => 'termine_anwesenheiten_dokumentieren_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_anwesenheiten_dokumentieren'] ) ) ) ); ?>
<?php if( auth()->user()->can( 'termine.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'termin_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'termine' ), 'btn' => array( 'klasse_id' => 'btn_termin_aktion' ), 'formular' =>
    view( 'Termine/termin_basiseigenschaften_formular' ) ) ) ) ); ?>

<?php if( isset( $werkzeugkasten ) AND is_array( $werkzeugkasten ) AND count( $werkzeugkasten ) > 0 ) echo
    view( 'Templates/werkzeugkasten_handle', array( 'liste' => 'termine', 'element_id' => $element_id ) ); ?>
<?= $this->endSection() ?>