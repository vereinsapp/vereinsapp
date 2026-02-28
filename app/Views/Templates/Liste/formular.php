<div class="formular"<?php if( isset($data) AND is_array($data) ) foreach( $data as $eigenschaft => $wert) { ?> data-<?= $eigenschaft ?>="<?= $wert ?>"<?php }?>>

<?= $formular ?>

    <div class="d-grid"><button type="button" class="btn btn-outline-success data_vollstaendig"><span class="beschriftung">Speichern</span></button></div>

</div>