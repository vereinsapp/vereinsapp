<div class="form-check form-switch verknuepfungen_auswahlmoeglichkeiten float-start me-3" data-verknuepfungen="<?= $verknuepfungen['verknuepfungen'] ?>"<?php
foreach( ELEMENTE as $element => $eigenschaften ) if( array_key_exists( $element.'_id', $verknuepfungen ) ) { ?> data-<?= $element; ?>_id="<?= $verknuepfungen[ $element.'_id' ]; ?>"<?php }
?>>
    <div class="verknuepfung_moeglich stretched-link-unwirksam invisible">
        <input class="form-check-input chk_verknuepfung_erstellen" type="checkbox" role="button" />
    </div>
</div>