<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<div class="container mb-3 element" data-liste="mitglieder" data-mitglied_id="<?= $mitglied_id; ?>">
    <?= view( 'Templates/Liste/element_navigation', array( 'element_navigation' => $element_navigation ) ); ?>
    <div class="h5 beschriftung text-center">
        <span class="eigenschaft" data-eigenschaft="vorname"></span> <span class="eigenschaft" data-eigenschaft="nachname"></span>
    </div>
    <div class="row row-cols-2 g-0">
      <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['vorname']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="vorname"></span></div>
      <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['nachname']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="nachname"></span></div>
      <?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['email']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="email"></span></div><?php } ?>
      <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['geburt']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="geburt"></span></div>
      <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['alter']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="alter"></span></div>
      <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['geschlecht']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="geschlecht"></span></div>
      <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['postleitzahl']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="postleitzahl"></span></div>
      <div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['wohnort']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="wohnort"></span></div>
      <?php if( array_key_exists( 'register', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['register']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="register"></span></div><?php } ?>
      <?php if( array_key_exists( 'auto', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['auto']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="auto"></span></div><?php } ?>
      <?php if( array_key_exists( 'funktion', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['funktion']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="funktion"></span></div><?php } ?>
      <?php if( array_key_exists( 'vorstandschaft_janein', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['vorstandschaft_janein']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="vorstandschaft_janein"></span></div><?php } ?>
      <?php if( array_key_exists( 'aktiv_janein', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['aktiv_janein']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="aktiv_janein"></span></div><?php } ?>
      <?php if( array_key_exists( 'real_janein', EIGENSCHAFTEN['mitglieder'] ) AND auth()->user()->can( 'mitglieder.verwaltung' ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['real_janein']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="real_janein"></span></div><?php } ?>
      <?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['erstellung']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="erstellung"></span></div><?php } ?>
      <?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['letzte_aktivitaet']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="letzte_aktivitaet"></span></div><?php } ?>
    </div>
    <div class="row g-0 my-1">
        <div class="col text-center text-nowrap fst-italic"><span class="eigenschaft" data-eigenschaft="bemerkung"></span></div>
    </div>
</div>

<?php if( array_key_exists( LISTEN['termine_rueckmeldungen']['controller'], CONTROLLERS ) AND array_key_exists( LISTEN['termine_anwesenheiten']['controller'], CONTROLLERS ) ) { ?><div class="container mb-3">
    <ul class="nav nav-tabs">
        <li class="col-6 nav-item collapsed text-center" data-bs-toggle="collapse" data-bs-target="#rueckmeldungen_container" role="button">
            <a class="nav-link">Termin-Rückmeldungen</a>
        </li>
        <li class="col-6 nav-item text-center" data-bs-target="#anwesenheiten_container" role="button">
            <a class="nav-link active">Termin-Anwesenheiten</a>
        </li>
    </ul>
</div>

<div class="container rueckmeldungen_anwesenheiten_parent mb-3">
    <div id="rueckmeldungen_container" class="collapse tab_collapse no-transition" data-bs-parent=".rueckmeldungen_anwesenheiten_parent">
<?= view( 'Templates/Liste/auswertungen', array( 'auswertungen' => $auswertungen['rueckmeldungen_mitglied'], 'view' => 'Mitglieder/auswertung_rueckmeldungen' ) ); ?>
    </div>
    <div id="anwesenheiten_container" class="collapse tab_collapse no-transition show" data-bs-parent=".rueckmeldungen_anwesenheiten_parent">
<?= view( 'Templates/Liste/auswertungen', array( 'auswertungen' => $auswertungen['anwesenheiten_mitglied'], 'view' => 'Mitglieder/auswertung_anwesenheiten' ) ); ?>
    </div>
</div><?php } ?>

<?php if( auth()->user()->can( 'termine.verwaltung' ) AND auth()->user()->can( 'mitglieder.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'termine_rueckmeldungen_verwalten_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_rueckmeldungen_verwalten'] ) ) ) ); ?>
<?php if( auth()->user()->can( 'strafkatalog.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'offene_kassenbucheintraege_verwalten_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['offene_kassenbucheintraege_verwalten'] ) ) ) ); ?>
<?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'mitglied_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder' ), 'btn' => array( 'klasse_id' => 'btn_mitglied_aktion' ), 'formular' =>
    view( 'Mitglieder/mitglied_basiseigenschaften_formular' ) ) ) ) ); 
      elseif( (int)$mitglied_id === (int)ICH_ID ) echo
    view( 'Templates/modal', array( 'id' => 'mitglied_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder', 'mitglied_id' => ICH_ID ), 'btn' => array( 'klasse_id' => 'btn_mitglied_aendern', 'beschriftung' => 'Meine Daten ändern' ), 'formular' =>
    view( 'Mitglieder/mitglied_basiseigenschaften_formular' ) ) ) ) ); ?>
<?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'mitglieder_einmal_link_anzeigen', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder' ), 'btn' => array( 'klasse_id' => 'btn_mitglied_einmal_link_anzeigen', 'beschriftung' => 'Einmal-Link anzeigen' ), 'formular' =>
    view( 'Mitglieder/mitglied_einmal_link_anzeigen_formular' ) ) ) ) ); ?>  
<?php if( auth()->user()->can( 'global.einstellungen' ) OR auth()->user()->can( 'mitglieder.rechte' ) ) echo
    view( 'Templates/modal', array( 'id' => 'rechte_vergeben_modal', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['rechte_vergeben'] ) ) ) ); ?>

<?php if( isset( $werkzeugkasten ) AND is_array( $werkzeugkasten ) AND count( $werkzeugkasten ) > 0 ) echo
    view( 'Templates/werkzeugkasten_handle', array( 'werkzeugkasten_handle' => array( 'liste' => 'mitglieder', 'mitglied_id' => $mitglied_id ) ) ); ?>
<?= $this->endSection() ?>