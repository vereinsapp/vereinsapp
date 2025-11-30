<?php if( array_key_exists( 'werkzeugkasten', $auswertungen ) ) { ?><div class="text-end"><?php
foreach( $auswertungen['werkzeugkasten'] as $symbol => $werkzeug) { ?><button type="button" class="btn werkzeug text-<?php
    if( array_key_exists( 'farbe', $werkzeug ) ) echo $werkzeug['farbe']; else echo 'primary';
    if( array_key_exists( 'klasse_id', $werkzeug ) ) {
        if( is_array( $werkzeug['klasse_id'] ) ) foreach( $werkzeug['klasse_id'] as $klasse_id ) echo ' '.$klasse_id;
        else echo ' '.$werkzeug['klasse_id'];
    } ?>" data-title="<?= $werkzeug['title']; ?>" data-instanz="<?= $auswertungen['id']; ?>"<?php
    if( array_key_exists( 'liste', $auswertungen ) ) { ?> data-liste="<?= $auswertungen['liste']; ?>"<?php }
    if( array_key_exists( 'weiterleiten', $werkzeug ) ) { ?> data-weiterleiten="<?= $werkzeug['weiterleiten']; ?>"<?php }
    ?>><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ $symbol ]['bootstrap']; ?>"></i></span></button><?php }
?></div><?php } ?>

<ul id="<?= $auswertungen['id']; ?>" class="auswertungen text-center<?php
if( array_key_exists( 'sortable', $auswertungen ) AND $auswertungen['sortable'] ) echo ' sortable';
?> p-0 mb-1" data-auswertungen="<?= $auswertungen['auswertungen']; ?>" data-auswahlmoeglichkeiten='<?= json_encode( $auswertungen['auswahlmoeglichkeiten'], JSON_UNESCAPED_UNICODE ); ?>'<?php
if( array_key_exists( 'gruppieren', $auswertungen ) ) { ?> data-gruppieren='<?= $auswertungen['gruppieren']; ?>'<?php }
if( array_key_exists( 'liste', $auswertungen ) ) { ?> data-liste='<?= $auswertungen['liste']; ?>'<?php }
if( array_key_exists( 'filtern', $auswertungen ) ) { ?> data-filtern='<?= json_encode( $auswertungen['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
if( array_key_exists( 'gegen_liste', $auswertungen ) ) { ?> data-gegen_liste="<?= $auswertungen['gegen_liste']; ?>"<?php }
if( array_key_exists( 'gegen_element_id', $auswertungen ) ) { ?> data-gegen_element_id="<?= $auswertungen['gegen_element_id']; ?>"<?php }
?>>

<?= view( $view ); ?>

</ul>

<?= view( $view.'_zusammenfassung', array( 'zusammenfassung' => array( 'instanz' => $auswertungen['id'], 'auswertungen' => $auswertungen['auswertungen'], 'liste' => $auswertungen['liste'], 'beschriftung' => "Summe", ), ) ); ?>

