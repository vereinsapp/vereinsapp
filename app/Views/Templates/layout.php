<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">

    <title><?= VEREINSAPP_NAME ?></title>

    <?php foreach( config('Vereinsapp_css')->pfad as $href ): ?><link rel="stylesheet" href="<?= base_url($href); ?>">
    <?php endforeach; ?>

    <script type='text/javascript'>
<?= view( 'Templates/javascript' ); ?>
    </script>

    <?php foreach( config('Vereinsapp_javascript')->pfad as $script ): ?><script src="<?= base_url($script); ?>"></script>
    <?php endforeach; ?>
    <?php if( auth()->loggedIn() ) foreach( config('Vereinsapp_javascript')->pfad_loggedin as $script ): ?><script src="<?= base_url($script); ?>"></script>
    <?php endforeach; ?>

  </head>

  <body>
    <?= $this->renderSection('navbar') ?>

    <?= $this->renderSection('containers') ?>

<?php if( isset( $werkzeugkasten ) ) echo view( 'Templates/werkzeugkasten' ); ?>

    <div class="text-secondary mt-5 small text-center"><?= VEREINSAPP_NAME ?> <?= VERSION; ?></div>
    <div class="text-secondary small text-center jetzt"></div>

    <div id="toasts" class="toast-container position-fixed end-0 pe-3">
<?= view( 'Templates/toast' ); ?>
    </div>

    <div id="modals">
<?= view( 'Templates/modal', array( 'modal_id' => 'BESTAETIGUNG', 'modal' => view( 'Templates/bestaetigung' ) ) ); ?>
<?= view( 'Templates/modal', array( 'modal_id' => 'BEMERKUNG', 'modal_title' => 'Bemerkung ändern', 'modal' => view( 'Templates/Liste/formular', array( 'btn' => array( 'klasse_id' => 'btn_element_bemerkung_aendern' ), 'formular' => view( 'Templates/Liste/bemerkung_formular' ) ) ) ) ); ?>
<?= view( 'Templates/modal', array( 'modal_id' => 'FILTERN', 'modal' => view( 'Templates/Liste/filtern' ) ) ); ?>
<?= view( 'Templates/modal', array( 'modal_id' => 'SORTIEREN', 'modal' => view( 'Templates/Liste/sortieren' ) ) ); ?>
<?= view( 'Templates/modal', array( 'modal_id' => 'GRUPPIEREN', 'modal' => view( 'Templates/Liste/gruppieren' ) ) ); ?>
<?= view( 'Templates/modal', array( 'modal_id' => 'AUSWAHL', 'modal' => view( 'Templates/Liste/liste', array( 'liste' => array( 'instanz' => 'AUSWAHLLISTE', 'listenstatistik' => array(), 'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => array('btn_filtern_manip', 'filtern_localstorage'), 'title' => 'filtern' ), 'sortieren' => array( 'klasse_id' => array('btn_sortieren_manip', 'sortieren_localstorage'), 'title' => 'sortieren' ) ) ) ) ) ) ); ?>
<?php if( auth()->loggedIn() && auth()->user()->requiresPasswordReset() ) echo
    view( 'Templates/modal', array( 'modal_id' => 'passwort_festlegen', 'autoload' => TRUE, 'modal_title' => 'Neues Passwort festlegen', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder', 'mitglied_id' => ICH_ID ), 'btn' => array( 'klasse_id' => 'btn_mitglied_passwort_festlegen', 'beschriftung' => 'Neues Passwort festlegen' ), 'formular' =>
    view( 'Mitglieder/mitglied_passwort_festlegen_formular' ) ) ) ) ); ?>
    </div>

    <div id="hauptinstanzen" class="invisible">
<?php foreach( HAUPTINSTANZEN as $liste => $eigenschaften ) { $eigenschaften['instanz'] = 'HAUPTINSTANZ'; echo view( 'Templates/Liste/liste', array( 'liste' => $eigenschaften ) ); } ?>
    </div>

  </body>
</html>