<div class="input-group sortieren_eigenschaft">
    <div class="form-floating">
        <select class="form-select sortieren_wert"></select>
        <label><span class="beschriftung">Sortieren nach</span></label>
    </div>
    <input type="radio" class="btn-check sortieren_richtung" name="sortieren_richtung" id="sortieren_richtung_asc" value="<?= SORT_ASC; ?>">
    <label class="btn btn-outline-primary btn-lg" for="sortieren_richtung_asc"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['asc']; ?>"></i></span></label>
    <input type="radio" class="btn-check sortieren_richtung" name="sortieren_richtung" id="sortieren_richtung_desc" value="<?= SORT_DESC; ?>">
    <label class="btn btn-outline-primary btn-lg" for="sortieren_richtung_desc"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['desc']; ?>"></i></span></label>
    <button type="button" class="btn btn-outline-<?php
    if( array_key_exists('farbe', WERKZEUGE['sortieren_eigenschaft_zuruecksetzen']) ) echo WERKZEUGE['sortieren_eigenschaft_zuruecksetzen']['farbe']; else echo "primary";
    ?> werkzeug" werkzeug="sortieren_eigenschaft_zuruecksetzen"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['sortieren_eigenschaft_zuruecksetzen']['symbol'] ]; ?>"></i></span></button>
</div>