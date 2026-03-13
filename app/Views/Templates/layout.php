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

    <div class="container d-flex flex-column align-items-center gap-3">
<?= $this->renderSection('cards') ?>

        <div class="text-secondary text-center small mt-5"><div><?= VEREINSAPP_NAME ?> <?= VERSION; ?></div><div class="jetzt"></div></div>
    </div>

    <div id="toasts" class="container toast-container position-fixed end-0 pe-3">
<?= view( 'Templates/toast' ); ?>
    </div>

    <div id="modals">
<?= view( 'Templates/modal', array( 'modal_id' => 'bestaetigung_modal', 'modal' =>
    view( 'Templates/bestaetigung' ) ) ); ?>
<?= view( 'Templates/modal', array( 'modal_id' => 'bemerkung_aendern_modal', 'modal_title' => 'Bemerkung ändern', 'modal' =>
    view( 'Templates/Liste/formular', array( 'formular' => view( 'Templates/Liste/bemerkung_formular' ) ) ) ) ); ?>
<?= view( 'Templates/modal', array( 'modal_id' => 'filtern_manip_modal', 'modal' =>
    view( 'Templates/Liste/filtern' ) ) ); ?>
<?= view( 'Templates/modal', array( 'modal_id' => 'sortieren_manip_modal', 'modal' =>
    view( 'Templates/Liste/sortieren' ) ) ); ?>
<?= view( 'Templates/modal', array( 'modal_id' => 'gruppieren_manip_modal', 'modal' =>
    view( 'Templates/Liste/gruppieren' ) ) ); ?>
<?= view( 'Templates/datenschutz_richtlinie_modal' ); ?>
<?php if( auth()->loggedIn() && auth()->user()->requiresPasswordReset() ) echo
    view( 'Templates/modal', array( 'modal_id' => 'passwort_festlegen', 'autoload' => TRUE, 'modal_title' => 'Neues Passwort festlegen', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder', 'mitglied_id' => ICH_ID, 'werkzeug' => 'passwort_festlegen', ), 'formular' => view( 'Mitglieder/mitglied_passwort_festlegen_formular' ) ) ) ) ); ?>
    </div>

  </body>
</html>