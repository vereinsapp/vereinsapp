<div class="formular"<?php if( isset($data) AND is_array($data) ) foreach( $data as $eigenschaft => $wert) { ?> data-<?= $eigenschaft ?>="<?= $wert ?>"<?php }?>>

<?= $formular ?>

    <div class="d-grid"><button type="button" class="btn <?php if( isset($btn) AND array_key_exists( 'klasse_id', $btn ) ) echo $btn['klasse_id']; ?> btn-outline-success"><span class="beschriftung"><?php
    if( isset($btn['beschriftung']) AND array_key_exists( 'beschriftung', $btn ) ) echo $btn['beschriftung']; else echo 'Speichern';
    ?></span></button></div>

</div>