<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<div class="container mb-3 element" data-liste="mitglieder" data-element_id="<?= $element_id; ?>">
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
      <?php if( array_key_exists( 'real_janein', EIGENSCHAFTEN['mitglieder'] ) AND auth()->user()->can( 'global.einstellungen' ) AND auth()->user()->can( 'mitglieder.verwaltung' ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['real_janein']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="real_janein"></span></div><?php } ?>
      <?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['erstellung']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="erstellung"></span></div><?php } ?>
      <?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) { ?><div class="col-4 text-secondary small"><?= EIGENSCHAFTEN['mitglieder']['letzte_aktivitaet']['beschriftung']; ?>:</div><div class="col-8"><span class="eigenschaft" data-eigenschaft="letzte_aktivitaet"></span></div><?php } ?>
    </div>
    <div class="row g-0 my-1">
        <div class="col text-center text-nowrap fst-italic"><span class="eigenschaft" data-eigenschaft="bemerkung"></span></div>
    </div>
</div>

<?php if( auth()->user()->can( 'mitglieder.rechte' ) ) { ?><div class="container mb-3">
    <div class="ueberschrift text-secondary text-center invisible mb-1" data-liste="verfuegbare_rechte" data-instanz="rechte_vergeben">Rechte</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['rechte_vergeben'] ) ); ?>
</div><?php } ?>

<?php if( array_key_exists( 'termine.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'termine.verwaltung' ) ) { ?><div class="container mb-3">
    <div class="ueberschrift text-secondary text-center invisible mb-1" data-liste="termine" data-instanz="bevorstehende_termine_mitglied">Termine</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['bevorstehende_termine_mitglied'] ) ); ?>
</div><?php } ?>

<?php if( array_key_exists( 'strafkatalog.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'strafkatalog.verwaltung' ) ) { ?><div class="container mb-3">
    <div class="ueberschrift text-secondary text-center invisible mb-1" data-liste="kassenbuch" data-instanz="kassenbuch_offene_eintraege_mitglied">Offene Kassenbucheinträge</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['kassenbuch_offene_eintraege_mitglied'] ) ); ?>
</div><?php } ?>

<?php if( array_key_exists( 'aufgaben.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'aufgaben.verwaltung' ) ) { ?><div class="container mb-3">
    <div class="ueberschrift text-secondary text-center invisible mb-1" data-liste="aufgaben" data-instanz="aufgaben_offen_mitglied_geplant">Offene Aufgaben</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['aufgaben_offen_mitglied_geplant'] ) ); ?>
</div><?php } ?>

<?php if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) { ?><div class="container mb-3">
    <div class="ueberschrift text-secondary text-center invisible mb-1" data-liste="aufgaben" data-instanz="mitglied_zugeordnete_aufgaben">Zugeordnete Aufgaben</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['mitglied_zugeordnete_aufgaben'] ) ); ?>
<?php if( array_key_exists( 'aufgaben.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'aufgaben.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'aufgabe_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'aufgaben' ), 'btn' => array( 'klasse_id' => 'btn_aufgabe_aktion' ), 'formular' =>
    view( 'Aufgaben/aufgabe_basiseigenschaften_formular' ) ) ) ) ); ?>
</div><?php } ?>

<?php if( array_key_exists( LISTEN['anwesenheiten']['controller'], CONTROLLERS ) ) echo
    view( 'Templates/modal', array( 'id' => 'mitglieder_anwesenheiten_dokumentieren', 'modal' =>
    view( 'Templates/Liste/liste', array( 'liste' => $liste['anwesenheiten_dokumentieren'] ) ) ) ); ?>
<?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'mitglied_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder' ), 'btn' => array( 'klasse_id' => 'btn_mitglied_aktion' ), 'formular' =>
    view( 'Mitglieder/mitglied_basiseigenschaften_formular' ) ) ) ) ); 
      elseif( $element_id == ICH['id'] ) echo
    view( 'Templates/modal', array( 'id' => 'mitglied_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder', 'element_id' => ICH['id'] ), 'btn' => array( 'klasse_id' => 'btn_mitglied_aendern', 'beschriftung' => 'Meine Daten ändern' ), 'formular' =>
    view( 'Mitglieder/mitglied_basiseigenschaften_formular' ) ) ) ) ); ?>
<?php if( auth()->user()->can( 'mitglieder.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'mitglieder_einmal_link_anzeigen', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder' ), 'btn' => array( 'klasse_id' => 'btn_mitglied_einmal_link_anzeigen', 'beschriftung' => 'Einmal-Link anzeigen' ), 'formular' =>
    view( 'Mitglieder/mitglied_einmal_link_anzeigen_formular' ) ) ) ) ); ?>  

<?php if( isset( $werkzeugkasten ) AND is_array( $werkzeugkasten ) AND count( $werkzeugkasten ) > 0 ) echo view( 'Templates/werkzeugkasten_handle', array( 'liste' => 'mitglieder', 'element_id' => $element_id ) ); ?>
<?= $this->endSection() ?>