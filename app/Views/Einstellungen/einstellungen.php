<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'cards' ); ?>

<div class="card border-success text-success w-100">
    <div class="card-body">Dein Gerät ist verknüpft mit dem Zugang von <span class="element" liste="mitglieder" mitglied_id="<?= ICH_ID ?>"><span class="eigenschaft" eigenschaft="vorname"></span> <span class="eigenschaft" eigenschaft="nachname"></span></span>.</div>
</div>

<div class="row row-cols-1 row-cols-lg-2 row-cols-xxl-3 gy-3 gx-0 gx-lg-3 w-100">

    <div class="col"><div class="card">
        <div class="card-header text-secondary text-center">Meine Daten</div>
        <div class="card-body">
<?= view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder', 'mitglied_id' => ICH_ID, 'werkzeug' => 'meine_daten_aendern', ), 'formular' => view( 'Mitglieder/mitglied_basiseigenschaften_formular' ) ) ); ?>
        </div>
    </div></div>

<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['rechte_vergeben'] ) ); ?>

    <div class="col"><div class="card">
        <div class="card-header text-secondary text-center">Mein Passwort</div>
        <div class="card-body">
<?= view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'mitglieder', 'mitglied_id' => ICH_ID, 'werkzeug' => 'passwort_aendern', ), 'formular' => view( 'Mitglieder/mitglied_passwort_aendern_formular' ) ) ); ?>
        </div>
    </div></div>

    <div class="col"><div class="card">
        <div class="card-header text-secondary text-center">Mein Gerätespeicher</div>
        <div class="card-body">
            <div class="card-text">Bei Problemen kann es vorkommen, dass ein Administrator dich darum bittet deinen Gerätespeicher zu leeren. Nutze dafür dann den untenstehenden Knopf!</div>
            <div class="card-text mt-3">
                <div class="d-grid"><button type="button" class="btn btn-outline-<?php
                if( array_key_exists('farbe', WERKZEUGE['localstorage_leeren']) ) echo WERKZEUGE['localstorage_leeren']['farbe']; else echo "primary";
                ?> werkzeug" werkzeug="localstorage_leeren" modal_title="<?= WERKZEUGE['localstorage_leeren']['beschriftung']['beschriftung']; ?>">
                    <span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['localstorage_leeren']['symbol'] ]['bootstrap']; ?>"></i> <?= WERKZEUGE['localstorage_leeren']['beschriftung']['beschriftung']; ?></span>
                </button></div>
            </div>
        </div>
    </div></div>

</div>
<?= $this->endSection() ?>