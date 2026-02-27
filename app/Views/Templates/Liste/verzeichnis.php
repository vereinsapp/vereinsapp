<ul id="<?= $verzeichnis['instanz']; ?>" class="verzeichnis list-group<?php
?> mb-1" data-liste="<?= $verzeichnis['liste']; ?>"<?php
if( array_key_exists( 'filtern', $verzeichnis ) ) { ?> data-filtern='<?= json_encode( $verzeichnis['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
if( array_key_exists( 'sortieren', $verzeichnis ) ) { ?> data-sortieren='<?= json_encode( $verzeichnis['sortieren'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
foreach( LISTEN as $liste_ => $eigenschaften ) if( array_key_exists( LISTEN[ $liste_ ]['element'].'_id', $verzeichnis ) ) { ?> data-<?= LISTEN[ $liste_ ]['element']; ?>_id="<?= $verzeichnis[ LISTEN[ $liste_ ]['element'].'_id' ]; ?>"<?php }
?>>

    <li class="text-body list-group-item p-0 blanko invisible" data-blanko="unterverzeichnis" data-liste="<?= $verzeichnis['liste']; ?>" data-instanz="<?= $verzeichnis['instanz']; ?>">

        <div class="card border-0">
            <div class="card-header border-0 bg-transparent text-truncate" data-bs-toggle="collapse" role="button"><i class="bi bi-<?= SYMBOLE["verzeichnis"]["bootstrap"]; ?> toggle_symbol text-primary" data-toggle_symbol="<?= SYMBOLE['verzeichnis_geoeffnet']['bootstrap']; ?>"></i></span> <span class="beschriftung"></span></div>
            <ul class="list-group verzeichnis p-1 pt-0 collapse verzeichnis_collapse">

                <li class="text-body list-group-item<?php
                    if( array_key_exists( 'link', $verzeichnis ) AND $verzeichnis['link'] ) { ?> list-group-item-action<?php } ?> blanko invisible" data-blanko="datei" data-liste="<?= $verzeichnis['liste']; ?>" data-instanz="<?= $verzeichnis['instanz']; ?>"<?php
                    if( array_key_exists( 'link', $verzeichnis ) AND $verzeichnis['link'] ) { ?> role="button"<?php } ?>>
                    <span class="zusatzsymbol" data-zusatzsymbol="datei"></span> <span class="beschriftung"></span><span class="audio"></span>
<?php if( array_key_exists( 'link', $verzeichnis ) AND $verzeichnis['link'] ) { ?>
                    <a class="stretched-link" target="_blank"></a>
<?php } ?>
<?php if( array_key_exists( 'vorschau', $verzeichnis ) ) { ?>
                    <div class="vorschau text-truncate text-secondary small"><?php foreach( $verzeichnis['vorschau'] as $position => $vorschau ) {
                        if( $position !== 0 ) echo '<i class="bi bi-'.SYMBOLE['spacer']['bootstrap'].' spacer"></i>';
                        echo '<span class="eigenschaft" data-eigenschaft="'.$vorschau.'"></span>';
                    } ?></div><?php } ?>

                </li>

            </ul>
        </div>

    </li>

</ul>
