<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'cards' ); ?>

<div class="w-100">
<?= view( 'Templates/Liste/element_navigation', array( 'liste' => $liste['alle_mitglieder'] ) ); ?>
</div>

<div class="row row-cols-1 row-cols-lg-2 gy-3 gx-0 gx-lg-3 w-100">

    <div class="col"><div class="card element" liste="mitglieder" mitglied_id="<?= $liste['alle_mitglieder']['mitglied_id']; ?>"><?php
        if( array_key_exists( 'werkzeuge', $liste['alle_mitglieder']['element'] ) AND is_array( $liste['alle_mitglieder']['element']['werkzeuge'] ) AND count( $liste['alle_mitglieder']['element']['werkzeuge'] ) > 0 ) {
            ?><div class="werkzeuge card-header text-end invisible" werkzeuge='<?= json_encode( $liste['alle_mitglieder']['element']['werkzeuge'], JSON_UNESCAPED_UNICODE ); ?>'></div><?php } ?>
        <div class="card-body p-2">
            <h5 class="card-title text-center text-truncate text-nowrap">
                <span class="beschriftung"><span class="eigenschaft" eigenschaft="vorname"></span> <span class="eigenschaft" eigenschaft="nachname"></span></span><?php
                if( array_key_exists( 'zusatzsymbole', $liste['alle_mitglieder']['element'] ) AND is_array( $liste['alle_mitglieder']['element']['zusatzsymbole'] ) AND count( $liste['alle_mitglieder']['element']['zusatzsymbole'] ) > 0 ) {
                    ?><span class="zusatzsymbole float-end invisible" zusatzsymbole='<?= json_encode( $liste['alle_mitglieder']['element']['zusatzsymbole'], JSON_UNESCAPED_UNICODE ); ?>'></span><?php } ?>
            </h5>
            <div class="card-text row row-cols-2 g-0">
                <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['vorname']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="vorname"></span></div>
                <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['nachname']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="nachname"></span></div>
                <?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['email']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="email"></span></div><?php } ?>
                <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['geburt']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="geburt"></span></div>
                <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['alter']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="alter"></span></div>
                <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['geschlecht']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="geschlecht"></span></div>
                <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['postleitzahl']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="postleitzahl"></span></div>
                <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['wohnort']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="wohnort"></span></div>
                <?php if( array_key_exists( 'register', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['register']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="register"></span></div><?php } ?>
                <?php if( array_key_exists( 'auto', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['auto']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="auto"></span></div><?php } ?>
                <?php if( array_key_exists( 'funktion', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['funktion']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="funktion"></span></div><?php } ?>
                <?php if( array_key_exists( 'vorstandschaft_janein', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['vorstandschaft_janein']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="vorstandschaft_janein"></span></div><?php } ?>
                <?php if( array_key_exists( 'aktiv_janein', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['aktiv_janein']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="aktiv_janein"></span></div><?php } ?>
                <?php if( array_key_exists( 'real_janein', EIGENSCHAFTEN['mitglieder'] ) AND auth()->user()->can( 'mitglieder.verwaltung' ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['real_janein']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="real_janein"></span></div><?php } ?>
                <?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['erstellung']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="erstellung"></span></div><?php } ?>
                <?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['letzte_aktivitaet']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" eigenschaft="letzte_aktivitaet"></span></div><?php } ?>
            </div>
            <div class="card-text text-center fst-italic"><span class="eigenschaft" eigenschaft="bemerkung"></span></div>
        </div>
    </div></div>

    <?php if( array_key_exists( LISTEN['termine_rueckmeldungen']['controller'], CONTROLLERS ) AND array_key_exists( LISTEN['termine_anwesenheiten']['controller'], CONTROLLERS ) ) { ?><div class="col"><div class="card">
        <div class="card-header">
            <div class="nav nav-tabs card-header-tabs">
                <div class="nav-item collapsed text-center w-50" data-bs-toggle="collapse" data-bs-target="#rueckmeldungen_container" role="button">
                    <span class="nav-link">Termin-Rückmeldungen</span>
                </div>
                <div class="nav-item text-center w-50" data-bs-toggle="collapse" data-bs-target="#anwesenheiten_container" role="button">
                    <span class="nav-link active">Termin-Anwesenheiten</span>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="rueckmeldungen_anwesenheiten_parent">
                <div id="rueckmeldungen_container" class="collapse tab_collapse no-transition" data-bs-parent=".rueckmeldungen_anwesenheiten_parent">
            <?= view( 'Templates/Liste/auswertungen', array( 'auswertungen' => $auswertungen['rueckmeldungen_mitglied'], 'view' => 'Mitglieder/auswertung_rueckmeldungen' ) ); ?>
                </div>
                <div id="anwesenheiten_container" class="collapse tab_collapse no-transition show" data-bs-parent=".rueckmeldungen_anwesenheiten_parent">
            <?= view( 'Templates/Liste/auswertungen', array( 'auswertungen' => $auswertungen['anwesenheiten_mitglied'], 'view' => 'Mitglieder/auswertung_anwesenheiten' ) ); ?>
                </div>
            </div>
        </div>
    </div></div><?php } ?>

</div>

<?php if( auth()->user()->can( 'termine.verwaltung' ) AND auth()->user()->can( 'mitglieder.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'termine_rueckmeldungen_verwalten_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_rueckmeldungen_verwalten'], ) ) ) ); ?>
<?php if( auth()->user()->can( 'termine.anwesenheiten' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'termine_anwesenheiten_dokumentieren_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_anwesenheiten_dokumentieren'], ) ) ) ); ?>
<?php if( auth()->user()->can( 'termine.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'termin_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'formular' => view( 'Termine/termin_basiseigenschaften_formular' ) ) ) ) ); ?>
<?php if( auth()->user()->can( 'strafkatalog.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'strafen_zuweisen_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['strafen_zuweisen'], ) ) ) ); ?>
<?php if( auth()->user()->can( 'strafkatalog.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'strafe_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'formular' => view( 'Strafkatalog/strafe_basiseigenschaften_formular' ) ) ) ) ); ?>
<?php if( auth()->user()->can( 'mitglieder.verwaltung' ) OR (int)$mitglied_id === (int)ICH_ID ) echo
    view( 'Templates/modal', array( 'modal_id' => 'mitglied_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'formular' => view( 'Mitglieder/mitglied_basiseigenschaften_formular' ) ) ) ) ); ?>
<?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'mitglied_einmal_link_anzeigen_modal', 'modal' =>
    view( 'Mitglieder/mitglied_einmal_link_anzeigen' ) ) ); ?>
<?php if( auth()->user()->can( 'global.einstellungen' ) OR auth()->user()->can( 'mitglieder.rechte' ) ) echo
    view( 'Templates/modal', array( 'modal_id' => 'rechte_vergeben_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['rechte_vergeben'], ) ) ) ); ?>
<?= $this->endSection() ?>