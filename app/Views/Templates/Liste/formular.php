<div class="formular"<?php if( isset($data) AND is_array($data) ) foreach( $data as $eigenschaft => $wert) { ?> data-<?= $eigenschaft ?>="<?= $wert ?>"<?php }?>>

<?= $formular ?>

    <div class="d-grid formular_werkzeug"><button type="button" class="btn werkzeug btn-outline-success"><span class="beschriftung">Speichern</span></button></div>

</div>