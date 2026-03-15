<div class="form-floating filtern_vorgegeben invisible mb-3">
    <select class="form-select filtern_vorgegeben_auswahl">
    </select>
    <label>Vorgegebene Filter</label>
</div>

<div class="filtern_eigenschaften">

    <div class="input-group mb-1 blanko invisible" blanko="filtern_eigenschaft" typ="zahl">
        <div class="input-group-text"><i class="bi bi-<?= SYMBOLE['zahlenraum']['bootstrap']; ?>"></i></div>
        <div class="form-floating">
            <input type="number" class="form-control filtern_start" />
            <label><span class="beschriftung"></span> von</label>
        </div>
        <div class="form-floating">
            <input type="number" class="form-control filtern_ende" />
            <label><span class="beschriftung"></span> bis</label>
        </div>
        <button type="button" class="btn btn-outline-<?php
        if( array_key_exists('farbe', WERKZEUGE['filtern_eigenschaft_zuruecksetzen']) ) echo WERKZEUGE['filtern_eigenschaft_zuruecksetzen']['farbe']; else echo "primary";
        ?> werkzeug" werkzeug="filtern_eigenschaft_zuruecksetzen"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['filtern_eigenschaft_zuruecksetzen']['symbol'] ]['bootstrap']; ?>"></i></span></button>
    </div>

    <div class="input-group mb-1 blanko invisible" blanko="filtern_eigenschaft" typ="zeitpunkt">
        <div class="input-group-text"><i class="bi bi-<?= SYMBOLE['zeitraum']['bootstrap']; ?>"></i></div>
        <div class="form-floating">
            <input type="date" class="form-control filtern_start" />
            <label><span class="beschriftung"></span> von</label>
        </div>
        <div class="form-floating">
            <input type="date" class="form-control filtern_ende" />
            <label><span class="beschriftung"></span> bis</label>
        </div>
        <button type="button" class="btn btn-outline-<?php
        if( array_key_exists('farbe', WERKZEUGE['filtern_eigenschaft_zuruecksetzen']) ) echo WERKZEUGE['filtern_eigenschaft_zuruecksetzen']['farbe']; else echo "primary";
        ?> werkzeug" werkzeug="filtern_eigenschaft_zuruecksetzen"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['filtern_eigenschaft_zuruecksetzen']['symbol'] ]['bootstrap']; ?>"></i></span></button>
    </div>

    <div class="card sichtbar mb-1 blanko invisible" blanko="filtern_eigenschaft" typ="janein">
        <div class="card-body filtern_werte p-2">

            <div class="btn-group btn-group-sm me-1 mb-1 blanko invisible" blanko="filtern_wert" role="group">
                <button type="button" class="btn btn-outline-body btn-sm filtern_wert_beschriftung disabled"><span class="beschriftung"></span></button>
                <button type="button" class="btn btn-outline-<?php
                if( array_key_exists('farbe', WERKZEUGE['filtern_wert_inklusiv_exklusiv']) ) echo WERKZEUGE['filtern_wert_inklusiv_exklusiv']['farbe']; else echo "primary";
                ?> btn-sm werkzeug" werkzeug="filtern_wert_inklusiv_exklusiv"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['filtern_wert_inklusiv_exklusiv']['symbol'] ]['bootstrap']; ?>"></i></span></button>
                <button type="button" class="btn btn-outline-<?php
                if( array_key_exists('farbe', WERKZEUGE['filtern_wert_loeschen']) ) echo WERKZEUGE['filtern_wert_loeschen']['farbe']; else echo "primary";
                ?> btn-sm werkzeug" werkzeug="filtern_wert_loeschen"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['filtern_wert_loeschen']['symbol'] ]['bootstrap']; ?>"></i></span></button>
            </div>

            <div class="filtern_exklusiv"></div>
        </div>
        <div class="card-body input-group p-1">
            <div class="form-floating">
                <select class="form-select filtern_auswahl">
                </select>
                <label><span class="beschriftung"></span></label>
            </div>
            <button type="button" class="btn btn-outline-<?php
            if( array_key_exists('farbe', WERKZEUGE['filtern_eigenschaft_zuruecksetzen']) ) echo WERKZEUGE['filtern_eigenschaft_zuruecksetzen']['farbe']; else echo "primary";
            ?> werkzeug" werkzeug="filtern_eigenschaft_zuruecksetzen"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['filtern_eigenschaft_zuruecksetzen']['symbol'] ]['bootstrap']; ?>"></i></span></button>
        </div>
    </div>

    <div class="card sichtbar mb-1 blanko invisible" blanko="filtern_eigenschaft" typ="vorgegebene_werte">
        <div class="card-body filtern_werte p-2">

            <div class="btn-group btn-group-sm me-1 mb-1 blanko invisible" blanko="filtern_wert" role="group">
                <button type="button" class="btn btn-outline-body btn-sm filtern_wert_beschriftung disabled"><span class="beschriftung"></span></button>
                <button type="button" class="btn btn-outline-<?php
                if( array_key_exists('farbe', WERKZEUGE['filtern_wert_inklusiv_exklusiv']) ) echo WERKZEUGE['filtern_wert_inklusiv_exklusiv']['farbe']; else echo "primary";
                ?> btn-sm werkzeug" werkzeug="filtern_wert_inklusiv_exklusiv"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['filtern_wert_inklusiv_exklusiv']['symbol'] ]['bootstrap']; ?>"></i></span></button>
                <button type="button" class="btn btn-outline-<?php
                if( array_key_exists('farbe', WERKZEUGE['filtern_wert_loeschen']) ) echo WERKZEUGE['filtern_wert_loeschen']['farbe']; else echo "primary";
                ?> btn-sm werkzeug" werkzeug="filtern_wert_loeschen"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['filtern_wert_loeschen']['symbol'] ]['bootstrap']; ?>"></i></span></button>
            </div>

            <div class="filtern_exklusiv"></div>
        </div>
        <div class="card-body input-group p-1">
            <div class="form-floating">
                <select class="form-select filtern_auswahl">
                </select>
                <label><span class="beschriftung"></span></label>
            </div>
            <button type="button" class="btn btn-outline-<?php
            if( array_key_exists('farbe', WERKZEUGE['filtern_eigenschaft_zuruecksetzen']) ) echo WERKZEUGE['filtern_eigenschaft_zuruecksetzen']['farbe']; else echo "primary";
            ?> werkzeug" werkzeug="filtern_eigenschaft_zuruecksetzen"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['filtern_eigenschaft_zuruecksetzen']['symbol'] ]['bootstrap']; ?>"></i></span></button>
        </div>
    </div>
<?php /* (noch) kein Filter setzen möglich für text, element_id, element_ids */ ?>
</div>