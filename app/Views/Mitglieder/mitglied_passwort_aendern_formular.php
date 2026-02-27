<div class="input-group mb-2">
    <div class="form-floating">
        <input type="password" class="form-control eingabe" data-eingabe="passwort_alt" placeholder="<?= EIGENSCHAFTEN['mitglieder']['passwort_alt']['beschriftung']; ?>" />
        <label><?= EIGENSCHAFTEN['mitglieder']['passwort_alt']['beschriftung']; ?></label>
    </div>
    <span class="input-group-text text-<?php
if( array_key_exists('farbe', WERKZEUGE['passwort_anzeigen']) ) echo WERKZEUGE['passwort_anzeigen']['farbe']; else echo "primary";
?> werkzeug" data-werkzeug="passwort_anzeigen" role="button"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['passwort_anzeigen']['symbol'] ]['bootstrap']; ?>"></i></span>
</div>

<div class="input-group mb-2">
    <div class="form-floating">
        <input type="password" class="form-control eingabe" data-eingabe="passwort_neu" placeholder="<?= EIGENSCHAFTEN['mitglieder']['passwort_neu']['beschriftung']; ?>" />
        <label><?= EIGENSCHAFTEN['mitglieder']['passwort_neu']['beschriftung']; ?></label>
    </div>
    <span class="input-group-text text-<?php
    if( array_key_exists('farbe', WERKZEUGE['passwort_anzeigen']) ) echo WERKZEUGE['passwort_anzeigen']['farbe']; else echo "primary";
    ?> werkzeug" data-werkzeug="passwort_anzeigen" role="button"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['passwort_anzeigen']['symbol'] ]['bootstrap']; ?>"></i></span>
</div>

<div class="input-group mb-2">
    <div class="form-floating">
        <input type="password" class="form-control eingabe" data-eingabe="passwort_neu2" placeholder="<?= EIGENSCHAFTEN['mitglieder']['passwort_neu2']['beschriftung']; ?>" />
        <label><?= EIGENSCHAFTEN['mitglieder']['passwort_neu2']['beschriftung']; ?></label>
    </div>
    <span class="input-group-text text-<?php
    if( array_key_exists('farbe', WERKZEUGE['passwort_anzeigen']) ) echo WERKZEUGE['passwort_anzeigen']['farbe']; else echo "primary";
    ?> werkzeug" data-werkzeug="passwort_anzeigen" role="button"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['passwort_anzeigen']['symbol'] ]['bootstrap']; ?>"></i></span>
</div>