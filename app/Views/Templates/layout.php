<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">

    <title><?= VEREINSAPP_NAME ?></title>

    <?php foreach( HEAD_STYLESHEET as $stylesheet ): ?><link rel="stylesheet" href="<?= $stylesheet['href']; ?>"<?php if( array_key_exists( 'integrity', $stylesheet ) ) echo ' integrity="'.$stylesheet['integrity'].'"'; ?><?php if( array_key_exists( 'crossorigin', $stylesheet ) ) echo ' crossorigin="'.$stylesheet['crossorigin'].'"'; ?>>
    <?php endforeach; ?>

    <script type='text/javascript'>
<?= view( 'Templates/javascript' ); ?>
    </script>

    <?php foreach( HEAD_SCRIPT as $script ): ?><script src="<?= $script['src']; ?>"<?php if( array_key_exists( 'integrity', $script ) ) echo ' integrity="'.$script['integrity'].'"'; ?><?php if( array_key_exists( 'crossorigin', $script ) ) echo ' crossorigin="'.$script['crossorigin'].'"'; ?>></script>
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
<?= view( 'Templates/modal', array( 'id' => 'BESTAETIGUNG', 'modal' => view( 'Templates/bestaetigung' ) ) ); ?>
<?= view( 'Templates/modal', array( 'id' => 'FILTERN', 'modal' => view( 'Templates/Liste/filtern' ) ) ); ?>
<?= view( 'Templates/modal', array( 'id' => 'SORTIEREN', 'modal' => view( 'Templates/Liste/sortieren' ) ) ); ?>
<?= view( 'Templates/modal', array( 'id' => 'GRUPPIEREN', 'modal' => view( 'Templates/Liste/gruppieren' ) ) ); ?>
<?= view( 'Templates/modal', array( 'id' => 'AUSWAHL', 'modal' => view( 'Templates/Liste/liste', array( 'liste' => array( 'id' => 'AUSWAHLLISTE', 'listenstatistik' => array(), 'werkzeugkasten' => array(
                'filtern' => array( 'klasse_id' => 'btn_filtern_modal_oeffnen', 'title' => 'filtern' ), 'sortieren' => array( 'klasse_id' => 'btn_sortieren_modal_oeffnen', 'title' => 'sortieren' ) ) ) ) ) ) ); ?>
<?php if( auth()->loggedIn() && auth()->user()->requiresPasswordReset() ) echo
    view( 'Templates/modal', array( 'id' => 'passwort_festlegen', 'autoload' => TRUE, 'modal_title' => 'Neues Passwort festlegen', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder', 'element_id' => ICH['id'] ), 'btn' => array( 'klasse_id' => 'btn_mitglied_passwort_festlegen', 'beschriftung' => 'Neues Passwort festlegen' ), 'formular' =>
    view( 'Mitglieder/mitglied_passwort_festlegen_formular' ) ) ) ) ); ?>
    </div>

    <div id="hauptinstanzen" class="invisible">
<?php foreach( HAUPTINSTANZEN as $liste => $eigenschaften ) { $eigenschaften['id'] = 'HAUPTINSTANZ'; echo view( 'Templates/Liste/liste', array( 'liste' => $eigenschaften ) ); } ?>
    </div>

  </body>
</html>