<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<div class="container mb-3">
<?= view( 'Einstellungen/verknuepfung' ); ?>
</div>

<div class="container mb-3">
    <div class="text-secondary text-center mb-1"><hr>Meine Daten</div>
<?= view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder', 'mitglied_id' => ICH_ID ), 'btn' => array( 'klasse_id' => 'btn_mitglied_aendern', 'beschriftung' => 'Meine Daten speichern' ), 'formular' =>
    view( 'Mitglieder/mitglied_basiseigenschaften_formular' ) ) ); ?>
</div>

<div class="container mb-3">
    <div class="ueberschrift text-secondary text-center invisible mb-1" data-liste="verfuegbare_rechte" data-instanz="rechte_vergeben"><hr>Meine Rechte</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['rechte_vergeben'] ) ); ?>
</div>

<div class="container mb-3">
    <div class="text-secondary text-center mb-1"><hr>Mein Passwort</div>
<?= view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder', 'mitglied_id' => ICH_ID ), 'btn' => array( 'klasse_id' => 'btn_mitglied_passwort_aendern', 'beschriftung' => 'Mein Passwort ändern' ), 'formular' =>
    view( 'Mitglieder/mitglied_passwort_aendern_formular' ) ) ); ?>
</div>

<div class="container mb-3">
    <div class="text-secondary text-center mb-1"><hr>Mein LocalStorage</div>
<?= view( 'Einstellungen/localstorage_leeren' ); ?>
</div>
<?= $this->endSection() ?>