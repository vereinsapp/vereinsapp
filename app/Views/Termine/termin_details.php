<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'cards' ); ?>

<div class="w-100">
<?= view( 'Templates/Liste/element_navigation', array( 'element_navigation' => $element_navigation ) ); ?>
</div>

<div class="row row-cols-1 row-cols-lg-2 gy-3 gx-0 gx-lg-3 w-100">

    <div class="col"><div class="card element" liste="termine" termin_id="<?= $termin_id; ?>" mitglied_id="<?= ICH_ID; ?>">
        <?php if( isset( $werkzeuge_element ) AND is_array( $werkzeuge_element ) AND count( $werkzeuge_element ) > 0 ) { ?><div class="card-header text-end p-0"><?php
        foreach( $werkzeuge_element as $werkzeug) { ?><button type="button" class="btn text-<?php
            if( array_key_exists( 'farbe', WERKZEUGE[ $werkzeug ] ) ) echo WERKZEUGE[ $werkzeug ]['farbe']; else echo 'primary';
            ?> stretched-link-unwirksam werkzeug" werkzeug="<?= $werkzeug; ?>" modal_title="<?= WERKZEUGE[ $werkzeug ]['beschriftung']; ?>"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE[ $werkzeug ]['symbol'] ]['bootstrap']; ?>"></i></span></button><?php
            } ?></div><?php
        } ?>
        <div class="card-body p-2">
            <h5 class="card-title text-center text-truncate text-nowrap">
                <span class="beschriftung"><span class="eigenschaft" eigenschaft="titel"></span></span>
            </h5>
            <div class="card-text row row-cols-3 g-0">
                <div class="col-5 text-center">
                    <div><i class="bi bi-<?= SYMBOLE["zeitraum"]["bootstrap"]; ?>"></i></div>
                    <div><span class="eigenschaft" eigenschaft="start"></span></div>
                    <?php if( array_key_exists( 'ende', EIGENSCHAFTEN['termine'] ) ) { ?><div class="text-secondary small">bis <span class="eigenschaft" eigenschaft="ende"></span></div><?php } ?>
                </div>
                <div class="col-2 text-center">
                    <span class="zusatzsymbol" zusatzsymbol="kategorie"></span>
                </div>
                <div class="col-5 text-center">
                    <div><i class="bi bi-<?= SYMBOLE["ort"]["bootstrap"]; ?>"></i></div>
                    <div><span class="eigenschaft" eigenschaft="ort"></span></div>
                </div>
            </div>
            <div class="card-text text-center fst-italic"><span class="eigenschaft" eigenschaft="bemerkung"></span></div>
            <div class="card-text mt-1">
<?= view( 'Templates/Liste/verknuepfungen_status_auswahl', array( 'verknuepfungen' => 'termine_rueckmeldungen', ) ); ?>
            </div>
        </div>
    </div></div>

    <div class="col"><div class="card">
        <div class="card-header">
            <div class="nav nav-tabs card-header-tabs">
                <div class="nav-item text-center w-50" data-bs-toggle="collapse" data-bs-target="#rueckmeldungen_container" role="button">
                    <span class="nav-link active">Termin-Rückmeldungen</span>
                </div>
                <div class="nav-item collapsed text-center w-50" data-bs-toggle="collapse" data-bs-target="#anwesenheiten_container" role="button">
                    <span class="nav-link">Termin-Anwesenheiten</span>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="rueckmeldungen_anwesenheiten_parent">
                <div id="rueckmeldungen_container" class="collapse tab_collapse no-transition show" data-bs-parent=".rueckmeldungen_anwesenheiten_parent">
            <?= view( 'Templates/Liste/auswertungen', array( 'auswertungen' => $auswertungen['rueckmeldungen_termin'], 'view' => 'Mitglieder/auswertung_rueckmeldungen' ) ); ?>
                </div>
                <div id="anwesenheiten_container" class="collapse tab_collapse no-transition" data-bs-parent=".rueckmeldungen_anwesenheiten_parent">
            <?= view( 'Templates/Liste/auswertungen', array( 'auswertungen' => $auswertungen['anwesenheiten_termin'], 'view' => 'Mitglieder/auswertung_anwesenheiten' ) ); ?>
                </div>
            </div>
        </div>
    </div></div>

    <?php if( array_key_exists( LISTEN['notenbank']['controller'], CONTROLLERS ) ) { ?><div class="col"><div class="card">
        <div class="card-header text-secondary text-center">Setliste</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['zugeordnete_setliste'], 'typ' => 'liste', 'element' =>
    view( 'Templates/Liste/element_liste', array( 'liste' => $liste['zugeordnete_setliste'] ) ) ) ); ?>
    </div></div><?php } ?>

    <?php if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) { ?><div class="col"><div class="card">
        <div class="card-header text-secondary text-center">Aufgaben</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['zugeordnete_aufgaben'], 'typ' => 'liste', 'element' =>
    view( 'Templates/Liste/element_liste', array( 'liste' => $liste['zugeordnete_aufgaben'] ) ) ) ); ?>
    </div></div><?php } ?>

</div>

<?php if( auth()->user()->can( 'aufgaben.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'termine_aufgaben_zuordnen_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_aufgaben_zuordnen'], 'typ' => 'liste', 'element' =>
    view( 'Templates/Liste/element_liste', array( 'liste' => $liste['termine_aufgaben_zuordnen'] ) ) ) ) ) ); ?>
<?php if( auth()->user()->can( 'aufgaben.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'aufgabe_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'formular' => view( 'Aufgaben/aufgabe_basiseigenschaften_formular' ) ) ) ) ); ?>
<?php if( auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'setliste_verwalten_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['setliste_verwalten'], 'typ' => 'liste', 'element' =>
    view( 'Templates/Liste/element_liste', array( 'liste' => $liste['setliste_verwalten'] ) ) ) ) ) ); ?>
<?php if( auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'titel_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'formular' => view( 'Notenbank/titel_basiseigenschaften_formular' ) ) ) ) ); ?>
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