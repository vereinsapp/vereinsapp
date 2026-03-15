<div class="mb-2">Du kannst ein neues Passwort festlegen, weil du bspw. gerade einen Einmal-Link verwendet hast.</div>

<div class="input-group mb-2">
    <div class="form-floating">
        <input type="password" class="form-control eingabe" eingabe="passwort_neu" placeholder="Neues Passwort" />
        <label>Neues Passwort</label>
    </div>
    <div class="input-group-text text-<?php
    if( array_key_exists('farbe', WERKZEUGE['passwort_anzeigen']) ) echo WERKZEUGE['passwort_anzeigen']['farbe']; else echo "primary";
    ?> werkzeug" werkzeug="passwort_anzeigen" role="button"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['passwort_anzeigen']['symbol'] ]['bootstrap']; ?>"></i></div>
</div>

<div class="input-group mb-2">
    <div class="form-floating">
        <input type="password" class="form-control eingabe" eingabe="passwort_neu2" placeholder="Neues Passwort (Wiederholung)" />
        <label>Neues Passwort (Wiederholung)</label>
    </div>
    <div class="input-group-text text-<?php
    if( array_key_exists('farbe', WERKZEUGE['passwort_anzeigen']) ) echo WERKZEUGE['passwort_anzeigen']['farbe']; else echo "primary";
    ?> werkzeug" werkzeug="passwort_anzeigen" role="button"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['passwort_anzeigen']['symbol'] ]['bootstrap']; ?>"></i></div>
</div>