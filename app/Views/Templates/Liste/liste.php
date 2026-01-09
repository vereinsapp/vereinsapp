<?php if( array_key_exists( 'werkzeugkasten', $liste ) ) { ?><div class="text-end"><?php
foreach( $liste['werkzeugkasten'] as $symbol => $werkzeug) { ?><button type="button" class="btn werkzeug text-<?php
    if( array_key_exists( 'farbe', $werkzeug ) ) echo $werkzeug['farbe']; else echo 'primary';
    if( array_key_exists( 'klasse_id', $werkzeug ) ) {
        if( is_array( $werkzeug['klasse_id'] ) ) foreach( $werkzeug['klasse_id'] as $klasse_id ) echo ' '.$klasse_id;
        else echo ' '.$werkzeug['klasse_id'];
    } ?>" data-title="<?= $werkzeug['title']; ?>" data-instanz="<?= $liste['id']; ?>"<?php
    if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php }
    if( array_key_exists( 'weiterleiten', $werkzeug ) ) { ?> data-weiterleiten="<?= $werkzeug['weiterleiten']; ?>"<?php }
    ?>><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ $symbol ]['bootstrap']; ?>"></i></span></button><?php }
?></div><?php } ?>

<?php if( array_key_exists( 'listenstatistik', $liste ) ) { ?><div class="listenstatistik_sammler text-secondary text-end small mb-1"><span class="listenstatistik"<?php
    if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php } ?> data-instanz="<?= $liste['id']; ?>" data-listenstatistik="anzahl"></span> Element(e)<?php
    /* funktioniert aktuell nicht, weil Liste_Aktualisieren inkl. Liste_ListenstatistikAktualisieren aufgerufen wird, bevor Liste_ElementAktualisieren inkl. Liste_VerknuepfungenAuswahlmoeglichkeitenAktualisieren aufgerufen wird */
    /* if( array_key_exists( 'verknuepfungen', $liste ) AND $liste['verknuepfungen']['typ'] === 'check' ) { ?><i class="bi bi-<?= SYMBOLE['spacer']['bootstrap'] ?> spacer"></i><span class="listenstatistik"<?php if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php } ?> data-instanz="<?= $liste['id']; ?>" data-listenstatistik="angewaehlt"></span> Element(e) angewählt<?php } */
    if( array_key_exists( 'summe', $liste['listenstatistik'] ) ) { ?><i class="bi bi-<?= SYMBOLE['spacer']['bootstrap'] ?> spacer"></i>Summe: <span class="listenstatistik"<?php if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php } ?> data-instanz="<?= $liste['id']; ?>" data-listenstatistik="summe" data-eigenschaft="<?= $liste['listenstatistik']['summe']; ?>"></span><?php }
    if( array_key_exists( 'durchschnitt', $liste['listenstatistik'] ) ) { ?><i class="bi bi-<?= SYMBOLE['spacer']['bootstrap'] ?> spacer"></i>Durchschnitt: <span class="listenstatistik"<?php if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php } ?> data-instanz="<?= $liste['id']; ?>" data-listenstatistik="durchschnitt" data-eigenschaft="<?= $liste['listenstatistik']['durchschnitt']; ?>"></span><?php }
?></div><?php } ?>

<ul id="<?= $liste['id']; ?>" class="liste list-group<?php
if( array_key_exists( 'group-flush', $liste ) AND $liste['group-flush'] ) echo ' list-group-flush';
if( array_key_exists( 'sortable', $liste ) AND $liste['sortable'] ) echo ' sortable';
?> mb-1"<?php
if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php }
if( array_key_exists( 'filtern', $liste ) ) { ?> data-filtern='<?= json_encode( $liste['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
if( array_key_exists( 'sortieren', $liste ) ) { ?> data-sortieren='<?= json_encode( $liste['sortieren'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
if( array_key_exists( 'gegen_liste', $liste ) ) { ?> data-gegen_liste="<?= $liste['gegen_liste']; ?>"<?php }
if( array_key_exists( 'gegen_element_id', $liste ) ) { ?> data-gegen_element_id="<?= $liste['gegen_element_id']; ?>"<?php }
if( array_key_exists( 'element_ids_disabled', $liste ) ) { ?> data-element_ids_disabled='<?= json_encode( $liste['element_ids_disabled'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
if( array_key_exists( 'eigenschaften_bedingt_formatiert', $liste ) ) { ?> data-eigenschaften_bedingt_formatiert='<?= json_encode( $liste['eigenschaften_bedingt_formatiert'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
?>>

    <li class="blanko element invisible text-body list-group-item<?php
    if( array_key_exists( 'klasse_id', $liste ) ) {
        if( is_array( $liste['klasse_id'] ) ) foreach( $liste['klasse_id'] as $klasse_id ) echo ' '.$klasse_id;
        else echo ' '.$liste['klasse_id'];
    }
    ?>"<?php
    if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php }
    if( array_key_exists( 'title', $liste ) ) { ?> data-title="<?= $liste['title'] ?>"<?php }
    ?>>

        <div class="text-truncate d-flex flex-nowrap <?php
        if( array_key_exists( 'group-flush', $liste ) AND $liste['group-flush'] ) echo ' h5';
        ?>">
<?php if( array_key_exists( 'verknuepfungen', $liste ) AND array_key_exists( 'typ', $liste['verknuepfungen'] ) AND $liste['verknuepfungen']['typ'] === 'check' )
    echo view( 'Templates/Liste/verknuepfungen_'.$liste['verknuepfungen']['typ'], array( 'verknuepfungen' => $liste['verknuepfungen']['verknuepfungen'], ) ); ?>
            <label class="flex-grow-1">
                <span class="beschriftung"><?php if( array_key_exists( 'beschriftung', $liste ) ) { ?><?= $liste['beschriftung']; ?><?php } ?></span>
            </label>
<?php if( array_key_exists( 'zusatzinfo', $liste ) AND is_array( $liste['zusatzinfo'] ) ) foreach( $liste['zusatzinfo'] as $zusatzinfo ) { ?>
            <span class="zusatzinfo float-end flex-shrink-0 ms-2 stretched-link-unwirksam" data-zusatzinfo="<?= $zusatzinfo ?>"></span>
<?php } ?>
            <span class="zusatzsymbol float-end flex-shrink-0 ms-2 stretched-link-unwirksam" data-zusatzsymbol="bemerkung"></span>
<?php if( array_key_exists( 'zusatzsymbol', $liste ) AND is_array( $liste['zusatzsymbol'] ) ) foreach( $liste['zusatzsymbol'] as $zusatzsymbol ) { ?>
            <span class="zusatzsymbol float-end flex-shrink-0 ms-2 stretched-link-unwirksam" data-zusatzsymbol="<?= $zusatzsymbol ?>"></span>
<?php } 
      if( array_key_exists( 'zusatzinfo', $liste ) AND is_array( $liste['zusatzinfo'] ) ) foreach( $liste['zusatzinfo'] as $zusatzinfo ) { ?>
            <span class="zusatzinfo float-end flex-shrink-0 ms-2 stretched-link-unwirksam" data-zusatzinfo="<?= $zusatzinfo ?>"></span>
<?php }
      if( array_key_exists( 'sortable', $liste ) AND $liste['sortable'] ) { ?>
            <i class="bi bi-<?= SYMBOLE['sortable']['bootstrap']; ?> text-primary float-end flex-shrink-0 ms-2 stretched-link-unwirksam sortable_handle" role="button"></i>
<?php }
      if( array_key_exists( 'werkzeugkasten_handle', $liste ) AND $liste['werkzeugkasten_handle'] ) { ?>
            <i class="bi bi-<?= SYMBOLE['werkzeuge']['bootstrap']; ?> text-primary float-end flex-shrink-0 ms-2 stretched-link-unwirksam" data-bs-toggle="offcanvas" data-bs-target="#werkzeugkasten" role="button"></i>
<?php }
      if( array_key_exists( 'link', $liste ) AND is_array( $liste['link'] ) ) { ?>
            <a class="stretched-link" data-link='<?= json_encode( $liste['link'], JSON_UNESCAPED_UNICODE ); ?>'></a>
<?php }?>
</div>
<?php if( array_key_exists( 'vorschau', $liste ) ) { ?>
        <div class="vorschau text-truncate text-secondary mb-1<?php
        if( !array_key_exists( 'group-flush', $liste ) OR !$liste['group-flush'] ) echo ' small';
        ?>"><?php foreach( $liste['vorschau'] as $position => $vorschau ) {
            if( $position !== 0 ) echo '<i class="bi bi-'.SYMBOLE['spacer']['bootstrap'].' spacer"></i>';
            echo '<span class="eigenschaft" data-eigenschaft="'.$vorschau.'"></span>';
        } ?></div>
<?php } ?>

<?php if( array_key_exists( 'verknuepfungen', $liste ) AND array_key_exists( 'typ', $liste['verknuepfungen'] ) AND $liste['verknuepfungen']['typ'] === 'auswahlmoeglichkeiten' )
    echo view( 'Templates/Liste/verknuepfungen_'.$liste['verknuepfungen']['typ'], array( 'verknuepfungen' => $liste['verknuepfungen']['verknuepfungen'], 'auswahlmoeglichkeiten' => $liste['verknuepfungen']['auswahlmoeglichkeiten'], ) ); ?>

    </li>

</ul>

