<div class="form-check form-switch verknuepfungen float-start me-3" data-verknuepfungen="<?= $verknuepfungen ?>">
    <div class="verknuepfung_moeglich stretched-link-unwirksam invisible">
        <input class="form-check-input<?php
        if( VERKNUEPFUNGEN[ $verknuepfungen ]['bestaetigung_einfordern'] === TRUE ) echo ' bestaetigung_einfordern';
        ?> werkzeug" data-werkzeug="<?= LISTEN[ $verknuepfungen ]['element']?>_erstellen" type="checkbox" role="button" />
    </div>
</div>