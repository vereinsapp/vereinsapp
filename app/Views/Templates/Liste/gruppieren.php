<div class="input-group gruppieren_eigenschaft">
    <div class="form-floating">
        <select class="form-select gruppieren_wert"></select>
        <label><span class="beschriftung">Gruppieren nach</span></label>
    </div>
    <button type="button" class="btn btn-outline-<?php
    if( array_key_exists('farbe', WERKZEUGE['gruppieren_eigenschaft_zuruecksetzen']) ) echo WERKZEUGE['gruppieren_eigenschaft_zuruecksetzen']['farbe']; else echo "primary";
    ?> werkzeug" werkzeug="gruppieren_eigenschaft_zuruecksetzen"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['gruppieren_eigenschaft_zuruecksetzen']['symbol'] ]['bootstrap']; ?>"></i></span></button>
</div>