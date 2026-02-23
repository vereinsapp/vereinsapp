<?php if( array_key_exists( 'werkzeugkasten', $liste ) ) { ?><div class="text-end"><?php
foreach( $liste['werkzeugkasten'] as $werkzeug) { ?><button type="button" class="btn werkzeug <?= WERKZEUGE[ $werkzeug ]['btn']; ?><?php
    if( array_key_exists( 'filtern_localstorage', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['filtern_localstorage'] ) echo ' filtern_localstorage';
    if( array_key_exists( 'sortieren_localstorage', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['sortieren_localstorage'] ) echo ' sortieren_localstorage';
    if( array_key_exists( 'gruppieren_localstorage', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['gruppieren_localstorage'] ) echo ' gruppieren_localstorage';
    if( array_key_exists( 'formular_oeffnen', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['formular_oeffnen'] ) echo ' formular_oeffnen';
    if( array_key_exists( 'bestaetigung_einfordern', WERKZEUGE[ $werkzeug ] ) AND WERKZEUGE[ $werkzeug ]['bestaetigung_einfordern'] ) echo ' bestaetigung_einfordern';
    if( array_key_exists( 'farbe', WERKZEUGE[ $werkzeug ] ) ) echo ' text-'.WERKZEUGE[ $werkzeug ]['farbe']; else echo ' text-primary';
    ?>" data-werkzeug="<?= $werkzeug; ?>" data-modal_title="<?= WERKZEUGE[ $werkzeug ]['beschriftung']; ?>" data-liste="<?= $liste['liste']; ?>" data-instanz="<?= $liste['instanz']; ?>"<?php
    if( array_key_exists( 'weiterleiten', WERKZEUGE[ $werkzeug ] ) ) { ?> data-weiterleiten="<?= WERKZEUGE[ $werkzeug ]['weiterleiten']; ?>"<?php }
    ?>><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE[ $werkzeug ]['symbol'] ]['bootstrap']; ?>"></i></span></button><?php }
?></div><?php } ?>

<?php if( array_key_exists( 'listenstatistik', $liste ) ) { ?><div class="text-end text-secondary small"><span class="listenstatistik"<?php
    if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php } ?> data-instanz="<?= $liste['instanz']; ?>" data-listenstatistik="anzahl"></span> Element(e)<?php
    /* funktioniert aktuell nicht, weil Liste_$ListeAktualisieren inkl. Liste_Liste$ListenstatistikAktualisieren aufgerufen wird, bevor Liste_$ElementAktualisieren inkl. Liste_$VerknuepfungenAuswahlmoeglichkeitenAktualisieren aufgerufen wird */
    /* if( array_key_exists( 'verknuepfungen', $liste ) AND $liste['verknuepfungen']['typ'] === 'janein_auswahl' ) { ?><i class="bi bi-<?= SYMBOLE['spacer']['bootstrap'] ?> spacer"></i><span class="listenstatistik"<?php if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php } ?> data-instanz="<?= $liste['instanz']; ?>" data-listenstatistik="angewaehlt"></span> Element(e) angewählt<?php } */
    if( array_key_exists( 'summe', $liste['listenstatistik'] ) ) { ?><i class="bi bi-<?= SYMBOLE['spacer']['bootstrap'] ?> spacer"></i>Summe: <span class="listenstatistik"<?php if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php } ?> data-instanz="<?= $liste['instanz']; ?>" data-listenstatistik="summe" data-eigenschaft="<?= $liste['listenstatistik']['summe']; ?>"></span><?php }
?></div><?php } ?>

<ul id="<?= $liste['instanz']; ?>" class="liste list-group<?php
if( array_key_exists( 'group-flush', $liste ) AND $liste['group-flush'] ) echo ' list-group-flush';
if( array_key_exists( 'sortable', $liste ) AND $liste['sortable'] ) echo ' sortable';
?> mb-1"<?php
if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php }
if( array_key_exists( 'filtern', $liste ) ) { ?> data-filtern='<?= json_encode( $liste['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
if( array_key_exists( 'sortieren', $liste ) ) { ?> data-sortieren='<?= json_encode( $liste['sortieren'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
foreach( LISTEN as $liste_ => $eigenschaften ) if( array_key_exists( LISTEN[ $liste_ ]['element'].'_id', $liste ) ) { ?> data-<?= LISTEN[ $liste_ ]['element']; ?>_id="<?= $liste[ LISTEN[ $liste_ ]['element'].'_id' ]; ?>"<?php }
if( array_key_exists( 'disabled_ids', $liste ) ) { ?> data-disabled_ids='<?= json_encode( $liste['disabled_ids'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
if( array_key_exists( 'eigenschaften_bedingt_formatiert', $liste ) ) { ?> data-eigenschaften_bedingt_formatiert='<?= json_encode( $liste['eigenschaften_bedingt_formatiert'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
?>>

    <li class="text-body list-group-item<?php
    if( array_key_exists( 'verknuepfungen', $liste ) AND VERKNUEPFUNGEN[ $liste['verknuepfungen'] ]['typ'] === 'element_auswahl' ) echo ' btn_verknuepfung_erstellen';
    if( array_key_exists( 'verknuepfungen', $liste ) AND VERKNUEPFUNGEN[ $liste['verknuepfungen'] ]['typ'] === 'element_auswahl' AND VERKNUEPFUNGEN[ $liste['verknuepfungen'] ]['bestaetigung_einfordern'] === TRUE ) echo ' bestaetigung_einfordern';
    ?> blanko invisible" data-blanko="element"<?php
    if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php }
    if( array_key_exists( 'modal_title', $liste ) ) { ?> data-modal_title="<?= $liste['modal_title'] ?>"<?php }
    if( array_key_exists( 'verknuepfungen', $liste ) AND VERKNUEPFUNGEN[ $liste['verknuepfungen'] ]['typ'] === 'element_auswahl' ) { ?> data-verknuepfungen="<?= $liste['verknuepfungen'] ?>"<?php }
    ?>>

        <div class="text-truncate d-flex flex-nowrap <?php
        if( array_key_exists( 'group-flush', $liste ) AND $liste['group-flush'] ) echo ' h5';
        ?>">
<?php if( array_key_exists( 'verknuepfungen', $liste ) AND VERKNUEPFUNGEN[ $liste['verknuepfungen'] ]['typ'] === 'janein_auswahl' ) echo view( 'Templates/Liste/verknuepfungen_janein_auswahl', array( 'verknuepfungen' => $liste['verknuepfungen'], ) ); ?>
            <label class="flex-grow-1">
                <span class="beschriftung"><?php if( array_key_exists( 'beschriftung', $liste ) ) { ?><?= $liste['beschriftung']; ?><?php } ?></span>
            </label>
            <span class="zusatzsymbol float-end flex-shrink-0 ms-2 stretched-link-unwirksam" data-zusatzsymbol="bemerkung"></span>
<?php if( array_key_exists( 'zusatzsymbol', $liste ) AND is_array( $liste['zusatzsymbol'] ) ) foreach( $liste['zusatzsymbol'] as $zusatzsymbol ) { ?>
            <span class="zusatzsymbol float-end flex-shrink-0 ms-2 stretched-link-unwirksam" data-zusatzsymbol="<?= $zusatzsymbol ?>"></span>
<?php } 
      if( array_key_exists( 'sortable', $liste ) AND $liste['sortable'] ) { ?>
            <i class="bi bi-<?= SYMBOLE['sortable']['bootstrap']; ?> text-primary float-end flex-shrink-0 ms-2 stretched-link-unwirksam sortable_handle" role="button"></i>
<?php }
      if( array_key_exists( 'werkzeugkasten_handle', $liste ) AND $liste['werkzeugkasten_handle'] ) { ?>
            <i class="bi bi-<?= SYMBOLE['werkzeuge']['bootstrap']; ?> text-primary float-end flex-shrink-0 ms-2 stretched-link-unwirksam" data-bs-toggle="offcanvas" data-bs-target="#werkzeugkasten" role="button"></i>
<?php }
      if( array_key_exists( 'link', $liste ) AND is_array( $liste['link'] ) ) { ?>
            <a class="stretched-link" data-link='<?= json_encode( $liste['link'], JSON_UNESCAPED_UNICODE ); ?>'></a>
<?php } ?>
        </div>
<?php if( array_key_exists( 'vorschau', $liste ) ) { ?>
        <div class="vorschau text-truncate text-secondary mb-1<?php if( !array_key_exists( 'group-flush', $liste ) OR !$liste['group-flush'] ) echo ' small'; ?>"><?php
            foreach( $liste['vorschau'] as $vorschau ) { ?><span class="eigenschaft" data-eigenschaft="<?= $vorschau ?>"></span><i class="bi bi-<?= SYMBOLE['spacer']['bootstrap']; ?> spacer"></i><?php }
        ?></div>
<?php } ?>

<?php if( array_key_exists( 'verknuepfungen', $liste ) AND VERKNUEPFUNGEN[ $liste['verknuepfungen'] ]['typ'] === 'status_auswahl' ) echo view( 'Templates/Liste/verknuepfungen_status_auswahl', array( 'verknuepfungen' => $liste['verknuepfungen'], ) ); ?>

    </li>

</ul>

