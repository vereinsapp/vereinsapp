<div id="<?= $verzeichnis['instanz']; ?>" class="verzeichnis list-group<?php
?>" liste="<?= $verzeichnis['liste']; ?>"<?php
if( array_key_exists( 'filtern', $verzeichnis ) ) { ?> filtern='<?= json_encode( $verzeichnis['filtern'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
if( array_key_exists( 'sortieren', $verzeichnis ) ) { ?> sortieren='<?= json_encode( $verzeichnis['sortieren'], JSON_UNESCAPED_UNICODE ); ?>'<?php }
foreach( LISTEN as $liste_ => $eigenschaften ) if( array_key_exists( LISTEN[ $liste_ ]['element'].'_id', $verzeichnis ) ) { ?> <?= LISTEN[ $liste_ ]['element']; ?>_id="<?= $verzeichnis[ LISTEN[ $liste_ ]['element'].'_id' ]; ?>"<?php }
?>>

    <div class="text-body list-group-item p-0 blanko invisible" blanko="unterverzeichnis" liste="<?= $verzeichnis['liste']; ?>" instanz="<?= $verzeichnis['instanz']; ?>">

        <div class="card border-0">
            <div class="card-header border-0 bg-transparent text-truncate" data-bs-toggle="collapse" role="button"><i class="bi bi-<?= SYMBOLE["verzeichnis"]["bootstrap"]; ?> toggle_symbol text-primary" toggle_symbol="<?= SYMBOLE['verzeichnis_geoeffnet']['bootstrap']; ?>"></i></span> <span class="beschriftung"></span></div>
            <div class="list-group verzeichnis p-1 pt-0 collapse verzeichnis_collapse">

                <div class="text-body list-group-item<?php
                    if( array_key_exists( 'link', $verzeichnis ) AND $verzeichnis['link'] ) { ?> list-group-item-action<?php } ?> blanko invisible" blanko="datei" liste="<?= $verzeichnis['liste']; ?>" instanz="<?= $verzeichnis['instanz']; ?>"<?php
                    if( array_key_exists( 'link', $verzeichnis ) AND $verzeichnis['link'] ) { ?> role="button"<?php } ?>>
                    <span class="zusatzsymbol" zusatzsymbol="datei"></span> <span class="beschriftung"></span><span class="audio"></span>
<?php if( array_key_exists( 'link', $verzeichnis ) AND $verzeichnis['link'] ) { ?>
                    <a class="stretched-link" target="_blank"></a>
<?php } ?>
<?php if( array_key_exists( 'vorschau', $verzeichnis ) ) { ?>
                    <div class="vorschau text-truncate text-secondary small"><?php foreach( $verzeichnis['vorschau'] as $position => $vorschau ) {
                        if( $position !== 0 ) echo '<i class="bi bi-'.SYMBOLE['spacer']['bootstrap'].' spacer"></i>';
                        echo '<span class="eigenschaft" eigenschaft="'.$vorschau.'"></span>';
                    } ?></div><?php } ?>

                </div>

            </div>
        </div>

    </div>

</div>
