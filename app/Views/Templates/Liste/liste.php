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

<?php if( array_key_exists( 'listenstatistik', $liste ) ) { ?><div class="listenstatistik_sammler invisible text-secondary text-end small mb-1"><span class="listenstatistik"<?php
    if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php } ?> data-instanz="<?= $liste['id']; ?>" data-listenstatistik="anzahl"></span> Element(e)<?php
    if( array_key_exists( 'checkliste', $liste ) ) { ?><i class="bi bi-<?= SYMBOLE['spacer']['bootstrap'] ?> spacer"></i><span class="listenstatistik"<?php if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php } ?> data-instanz="<?= $liste['id']; ?>" data-listenstatistik="angewaehlt"></span> Element(e) angewählt<?php }
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
?>>

    <li class="blanko element invisible text-body list-group-item<?php
    if( array_key_exists( 'klasse_id', $liste ) ) {
        if( is_array( $liste['klasse_id'] ) ) foreach( $liste['klasse_id'] as $klasse_id ) echo ' '.$klasse_id;
        else echo ' '.$liste['klasse_id'];
    }
    if( array_key_exists( 'checkliste', $liste ) ) echo ' d-grid';
    ?>"<?php
    if( array_key_exists( 'liste', $liste ) ) { ?> data-liste="<?= $liste['liste']; ?>"<?php }
    if( array_key_exists( 'gegen_liste', $liste ) ) { ?> data-gegen_liste="<?= $liste['gegen_liste']; ?>"<?php }
    if( array_key_exists( 'gegen_element_id', $liste ) ) { ?> data-gegen_element_id="<?= $liste['gegen_element_id']; ?>"<?php }
    if( array_key_exists( 'disabled', $liste ) ) { ?> data-disabled='<?= json_encode( $liste['disabled'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    if( array_key_exists( 'bedingte_formatierung', $liste ) ) { ?> data-bedingte_formatierung='<?= json_encode( $liste['bedingte_formatierung'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    if( array_key_exists( 'title', $liste ) ) { ?> data-title="<?= $liste['title'] ?>"<?php }
    ?>>

        <div class="text-truncate<?php
        if( array_key_exists( 'group-flush', $liste ) AND $liste['group-flush'] ) echo ' h5';
        ?>">
<?php if( array_key_exists( 'checkliste', $liste ) ) { ?>
            <div class="form-check form-switch"><label class="form-check-label d-block"><input class="form-check-input float-start me-3 check" type="checkbox" data-checkliste="<?= $liste['checkliste']; ?>" role="switch" />
<?php } ?>
            <span class="beschriftung"><?php if( array_key_exists( 'beschriftung', $liste ) ) { ?><?= $liste['beschriftung']; ?><?php } ?></span>
<?php if( array_key_exists( 'werkzeugkasten_handle', $liste ) AND $liste['werkzeugkasten_handle'] ) { ?>
            <i class="bi bi-<?= SYMBOLE['werkzeuge']['bootstrap']; ?> text-primary float-end ms-2 stretched-link-unwirksam" data-bs-toggle="offcanvas" data-bs-target="#werkzeugkasten" role="button"></i>
<?php } ?>
<?php if( array_key_exists( 'sortable', $liste ) AND $liste['sortable'] ) { ?>
            <i class="bi bi-<?= SYMBOLE['sortable']['bootstrap']; ?> text-primary float-end ms-2 stretched-link-unwirksam sortable_handle" role="button"></i>
<?php } ?>
<?php if( array_key_exists( 'zusatzsymbol', $liste ) AND is_array( $liste['zusatzsymbol'] ) ) foreach( $liste['zusatzsymbol'] as $zusatzsymbol ) { ?>
            <span class="zusatzsymbol float-end ms-2" data-zusatzsymbol="<?= $zusatzsymbol ?>"></span>
<?php } ?>
            <span class="zusatzsymbol float-end ms-2" data-zusatzsymbol="bemerkung"></span>
<?php if( array_key_exists( 'zusatzinfo', $liste ) AND is_array( $liste['zusatzinfo'] ) ) foreach( $liste['zusatzinfo'] as $zusatzinfo ) { ?>
            <span class="zusatzinfo float-end ms-2" data-zusatzinfo="<?= $zusatzinfo ?>"></span>
<?php } ?>
<?php if( array_key_exists( 'link', $liste ) AND $liste['link'] ) { ?>
            <a class="stretched-link"></a>
<?php }?>
<?php if( array_key_exists( 'checkliste', $liste ) ) { ?>
            </label></div>
<?php } ?>
        </div>
<?php if( array_key_exists( 'vorschau', $liste ) ) { ?>
        <div class="vorschau text-truncate text-secondary mb-1<?php
        if( !array_key_exists( 'group-flush', $liste ) OR !$liste['group-flush'] ) echo ' small';
        ?>"><?php foreach( $liste['vorschau'] as $position => $vorschau ) {
            if( $position !== 0 ) echo '<i class="bi bi-'.SYMBOLE['spacer']['bootstrap'].' spacer"></i>';
            echo '<span class="eigenschaft" data-eigenschaft="'.$vorschau.'"></span>';
        } ?></div>
<?php } ?>

<?php if( array_key_exists( 'views', $liste ) ) foreach( $liste['views'] as $view ) if( array_key_exists( 'data', $view ) ) echo view( $view['view'], $view['data'] ); else echo view( $view['view'] ); ?>

    </li>

</ul>

