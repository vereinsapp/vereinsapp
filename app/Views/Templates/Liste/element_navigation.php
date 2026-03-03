<div class="row row-cols-3 g-1 element_navigation" instanz="<?= $element_navigation['instanz']; ?>"<?php
if( array_key_exists( 'filtern', $element_navigation ) ) { ?> filtern='<?= json_encode( $element_navigation['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
if( array_key_exists( 'sortieren', $element_navigation ) ) { ?> sortieren='<?= json_encode( $element_navigation['sortieren'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
?>>
    <div class="col-2 d-grid float-start"><a class="btn btn-sm text-primary vorheriges_element"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE["pfeil_links"]["bootstrap"]; ?>"></i></span></a></div>
    <div class="col-8 d-grid "><a class="btn zurueck_zur_uebersicht btn-sm text-primary" href="<?= site_url( AKTIVER_CONTROLLER ); ?>"><span class="beschriftung">Zurück zur Übersicht</span></a></div>
    <div class="col-2 d-grid float-end"><a class="btn btn-sm text-primary naechstes_element"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE["pfeil_rechts"]["bootstrap"]; ?>"></i></span></a></div>
</div>

