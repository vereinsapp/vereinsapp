<div id="<?= $verzeichnis['instanz']; ?>" class="verzeichnis list-group" liste="<?= $verzeichnis['liste']; ?>"<?php
foreach( LISTEN as $liste_ => $eigenschaften ) if( array_key_exists( LISTEN[ $liste_ ]['element'].'_id', $verzeichnis ) ) { ?> <?= LISTEN[ $liste_ ]['element']; ?>_id="<?= $verzeichnis[ LISTEN[ $liste_ ]['element'].'_id' ]; ?>"<?php }
?>>

    <div class="text-body list-group-item p-0 blanko invisible" blanko="unterverzeichnis" liste="<?= $verzeichnis['liste']; ?>" instanz="<?= $verzeichnis['instanz']; ?>">
        <div class="card border-0">
            <div class="card-header border-0 bg-transparent text-truncate" data-bs-toggle="collapse" role="button">
                <i class="bi bi-<?= SYMBOLE["verzeichnis"]; ?> toggle_symbol text-primary" toggle_symbol="<?= SYMBOLE['verzeichnis_geoeffnet']; ?>"></i> <span class="beschriftung"></span>
            </div>
            <div class="list-group verzeichnis p-1 pt-0 collapse verzeichnis_collapse">

                <div class="text-body list-group-item list-group-item-action blanko invisible" blanko="datei" liste="<?= $verzeichnis['liste']; ?>" instanz="<?= $verzeichnis['instanz']; ?>" role="button">
                    <i class="bi text-primary"></i> <span class="beschriftung"></span>
                    <a class="stretched-link" target="_blank"></a>
                </div>

            </div>
        </div>
    </div>

</div>
