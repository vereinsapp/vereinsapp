<div class="row row-cols-3 g-1 element_navigation" liste="<?= $liste['liste']; ?>"<?php
    foreach( LISTEN as $liste_eigenschaften ) if( array_key_exists( $liste_eigenschaften['element'].'_id', $liste ) ) {
        ?> <?= $liste_eigenschaften['element']; ?>_id="<?= $liste[ $liste_eigenschaften['element'].'_id' ]; ?>"<?php }
    ?> instanz="<?= $liste['instanz']; ?>"<?php
    if( array_key_exists( 'filtern', $liste ) ) { ?> filtern='<?= json_encode( $liste['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    if( array_key_exists( 'sortieren', $liste ) ) { ?> sortieren='<?= json_encode( $liste['sortieren'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    ?>>
    <div class="col-2 d-grid float-start"><a class="btn btn-sm text-primary vorheriges_element"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['pfeil_links']; ?>"></i></span></a></div>
    <div class="col-8 d-grid "><a class="btn zurueck_zur_uebersicht btn-sm text-primary" href="<?= site_url( AKTIVER_CONTROLLER ); ?>"><span class="beschriftung">Zurück zur Übersicht</span></a></div>
    <div class="col-2 d-grid float-end"><a class="btn btn-sm text-primary naechstes_element"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['pfeil_rechts']; ?>"></i></span></a></div>
</div>

