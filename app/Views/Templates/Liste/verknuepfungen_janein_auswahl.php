<div class="form-check form-switch verknuepfungen_auswahlmoeglichkeiten float-start me-3" data-verknuepfungen="<?= $verknuepfungen ?>">
    <div class="verknuepfung_moeglich stretched-link-unwirksam invisible">
        <input class="form-check-input chk_verknuepfung_erstellen<?php
        if( VERKNUEPFUNGEN[ $verknuepfungen ]['bestaetigung_einfordern'] === TRUE ) echo ' bestaetigung_einfordern';
        ?>" type="checkbox" role="button" />
    </div>
</div>