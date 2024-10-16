<?php if( array_key_exists( 'werkzeugkasten', $liste ) ) { ?><div class="h5 text-end">
    <?php foreach( $liste['werkzeugkasten'] as $symbol => $werkzeug) { ?><button class="btn werkzeug text-<?php
        if( array_key_exists( 'farbe', $werkzeug ) ) echo $werkzeug['farbe']; else echo 'primary';
        if( array_key_exists( 'klasse_id', $werkzeug ) ) {
            if( is_array( $werkzeug['klasse_id'] ) ) foreach( $werkzeug['klasse_id'] as $klasse_id ) echo ' '.$klasse_id;
            else echo ' '.$werkzeug['klasse_id'];
        }
        ?>" data-liste="<?= $liste['liste']; ?>" data-title="<?= $werkzeug['title']; ?>" data-instanz="<?= $liste['id']; ?>"<?php
        if( array_key_exists( 'farbe', $werkzeug ) ) { ?> data-farbe="<?= $werkzeug['farbe']; ?>"<?php }
        if( array_key_exists( 'weiterleiten', $werkzeug ) ) { ?> data-weiterleiten="<?= $werkzeug['weiterleiten']; ?>"<?php }
        ?>><i class=" bi bi-<?= SYMBOLE[ $symbol ]['bootstrap']; ?>"></i>
    </button><?php } ?>
</div><?php } ?>

<?php if( array_key_exists( 'listenstatistik', $liste ) ) { ?><div class="text-secondary text-end small mb-1">
    <span class="listenstatistik" data-liste="<?= $liste['liste']; ?>" data-instanz="<?= $liste['id']; ?>" data-listenstatistik="anzahl"></span> Element(e)<?php
    if( array_key_exists( 'checkliste', $liste ) ) { ?><i class="bi bi-dot spacer"></i><span class="listenstatistik" data-liste="<?= $liste['liste']; ?>" data-instanz="<?= $liste['id']; ?>" data-listenstatistik="angewaehlt"></span> Element(e) angewählt<?php }
    if( array_key_exists( 'summe', $liste['listenstatistik'] ) ) { ?><i class="bi bi-dot spacer"></i>Summe: <span class="listenstatistik" data-liste="<?= $liste['liste']; ?>" data-instanz="<?= $liste['id']; ?>" data-listenstatistik="summe" data-eigenschaft="<?= $liste['listenstatistik']['summe']; ?>"></span><?php }
    if( array_key_exists( 'durchschnitt', $liste['listenstatistik'] ) ) { ?><i class="bi bi-dot spacer"></i>Durchschnitt: <span class="listenstatistik" data-liste="<?= $liste['liste']; ?>" data-instanz="<?= $liste['id']; ?>" data-listenstatistik="durchschnitt" data-eigenschaft="<?= $liste['listenstatistik']['durchschnitt']; ?>"></span><?php }
    ?>
</div><?php } ?>

<ul id="<?= $liste['id']; ?>" class="liste list-group<?php
if( array_key_exists( 'beschriftung', $liste ) AND array_key_exists( 'h5', $liste['beschriftung'] ) AND $liste['beschriftung']['h5'] ) echo ' list-group-flush';
if( array_key_exists( 'sortable', $liste ) AND $liste['sortable'] ) echo ' sortable';
?> mb-1" data-liste="<?= $liste['liste']; ?>"<?php
if( array_key_exists( 'filtern', $liste ) ) { ?> data-filtern='<?= json_encode( $liste['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
if( array_key_exists( 'sortieren', $liste ) ) { ?> data-sortieren='<?= json_encode( $liste['sortieren'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
?>>

    <li class="blanko element invisible text-body list-group-item<?php
    if( array_key_exists( 'klasse_id', $liste ) ) {
        if( is_array( $liste['klasse_id'] ) ) foreach( $liste['klasse_id'] as $klasse_id ) echo ' '.$klasse_id;
        else echo ' '.$liste['klasse_id'];
    }
    if( array_key_exists( 'beschriftung', $liste ) AND array_key_exists( 'h5', $liste['beschriftung'] ) AND $liste['beschriftung']['h5'] ) echo ' list-group-liste_h5';
    if( array_key_exists( 'checkliste', $liste ) ) echo ' d-grid';
    ?>" data-liste="<?= $liste['liste']; ?>"<?php
    if( array_key_exists( 'gegen_liste', $liste ) ) { ?> data-gegen_liste="<?= $liste['gegen_liste']; ?>"<?php }
    if( array_key_exists( 'gegen_element_id', $liste ) ) { ?> data-gegen_element_id="<?= $liste['gegen_element_id']; ?>"<?php }
    if( array_key_exists( 'disabled', $liste ) ) { ?> data-disabled='<?= json_encode( $liste['disabled'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    if( array_key_exists( 'bedingte_formatierung', $liste ) ) { ?> data-bedingte_formatierung='<?= json_encode( $liste['bedingte_formatierung'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
    if( array_key_exists( 'title', $liste ) ) { ?> data-title="<?= $liste['title'] ?>"<?php }
    ?>>

        <div class="text-truncate <?php if( array_key_exists( 'beschriftung', $liste ) AND array_key_exists( 'h5', $liste['beschriftung'] ) AND $liste['beschriftung']['h5'] ) echo ' h5'; ?>">
            
            <?php if( array_key_exists( 'checkliste', $liste ) ) { ?><div class="form-check form-switch"><label class="form-check-label d-block">
                <input class="form-check-input float-start me-3 check" type="checkbox" data-checkliste="<?= $liste['checkliste']; ?>" role="switch" /><?php } ?>

            <?php if( array_key_exists( 'beschriftung', $liste ) ) { ?><span class="beschriftung"><?= $liste['beschriftung']['beschriftung']; ?></span><?php } ?>

            <?php if( array_key_exists( 'werkzeugkasten_handle', $liste ) AND $liste['werkzeugkasten_handle'] ) { ?><i class="bi bi-<?= SYMBOLE['werkzeuge']['bootstrap']; ?> text-primary float-end ms-2 stretched-link-unwirksam" data-bs-toggle="offcanvas" data-bs-target="#werkzeugkasten" role="button"></i><?php } ?>

            <?php if( array_key_exists( 'sortable', $liste ) AND $liste['sortable'] ) { ?><i class="bi bi-<?= SYMBOLE['sortable']['bootstrap']; ?> text-primary float-end ms-2 stretched-link-unwirksam sortable_handle" role="button"></i><?php } ?>

            <?php if( array_key_exists( 'link', $liste ) AND $liste['link'] ) { ?><a class="stretched-link"></a><?php }?>

            <?php if( array_key_exists( 'zusatzsymbole', $liste ) ) { ?><div class="float-end zusatzsymbole"><?= $liste['zusatzsymbole']; ?></div><?php } ?>

            <?php if( array_key_exists( 'checkliste', $liste ) ) { ?></label></div><?php } ?>
        </div>

        <?php if( array_key_exists( 'vorschau', $liste ) ) { ?><div class="vorschau text-truncate text-secondary<?php
        if( array_key_exists( 'klein', $liste['vorschau'] ) AND $liste['vorschau']['klein'] ) echo ' small';
        if( array_key_exists( 'zentriert', $liste['vorschau'] ) AND $liste['vorschau']['zentriert'] ) echo ' text-center'; ?>">
            <?php if( array_key_exists( 'beschriftung', $liste['vorschau'] ) ) echo $liste['vorschau']['beschriftung']; ?>
        </div><?php } ?>

    </li>

</ul>

