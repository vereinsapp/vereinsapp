<div class="formular">

    <div class="form-floating filtern_vorgegeben invisible mb-3">
        <select class="form-select filtern_vorgegeben_auswahl">
        </select>
        <label>Vorgegebene Filter</label>
    </div>

    <div class="input-group blanko filtern_eigenschaft invisible mb-1" data-typ="zahl">
        <span class="input-group-text"><i class="bi bi-<?= SYMBOLE['zahlenraum']['bootstrap']; ?>"></i></span>
        <div class="form-floating">
            <input type="number" class="form-control filtern_start" />
            <label><span class="beschriftung"></span> von</label>
        </div>
        <div class="form-floating">
            <input type="number" class="form-control filtern_ende" />
            <label><span class="beschriftung"></span> bis</label>
        </div>
        <button type="button" class="btn btn_filtern_eigenschaft_zuruecksetzen btn-outline-danger"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['loeschen']['bootstrap']; ?>"></i></span></button>
    </div>

    <div class="input-group blanko filtern_eigenschaft invisible mb-1" data-typ="zeitpunkt">
        <span class="input-group-text"><i class="bi bi-<?= SYMBOLE['zeitraum']['bootstrap']; ?>"></i></span>
        <div class="form-floating">
            <input type="date" class="form-control filtern_start" />
            <label><span class="beschriftung"></span> von</label>
        </div>
        <div class="form-floating">
            <input type="date" class="form-control filtern_ende" />
            <label><span class="beschriftung"></span> bis</label>
        </div>
        <button type="button" class="btn btn_filtern_eigenschaft_zuruecksetzen btn-outline-danger"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['loeschen']['bootstrap']; ?>"></i></span></button>
    </div>

    <div class="card sichtbar blanko filtern_eigenschaft invisible mb-1" data-typ="vorgegebene_werte">
        <div class="card-body filtern_werte p-2">

                <div class="btn-group btn-group-sm blanko filtern_wert me-1 mb-1" role="group">
                    <button type="button" class="btn btn_beschriftung btn-sm btn-outline-body disabled"><span class="beschriftung"></span></button>
                    <button type="button" class="btn btn_filtern_wert_inklusiv_exklusiv btn-sm btn-outline-primary"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['inklusiv_exklusiv']['bootstrap'] ?>"></i></span></button>
                    <button type="button" class="btn btn_filtern_wert_loeschen btn-sm btn-outline-danger"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['loeschen']['bootstrap'] ?>"></i></span></button>
                </div>

            </span><span class="filtern_exklusiv"></span>
        </div>
        <div class="card-body input-group p-1">
            <div class="form-floating">
                <select class="form-select filtern_auswahl">
                </select>
                <label><span class="beschriftung"></span></label>
            </div>
            <button type="button" class="btn btn_filtern_eigenschaft_zuruecksetzen btn-outline-danger"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['loeschen']['bootstrap']; ?>"></i></span></button>
            </div>
    </div>

    <div class="card sichtbar blanko filtern_eigenschaft invisible mb-1" data-typ="janein">
        <div class="card-body filtern_werte p-2">

                <div class="btn-group btn-group-sm blanko filtern_wert me-1 mb-1" role="group">
                    <button type="button" class="btn btn_beschriftung btn-sm btn-outline-body disabled"><span class="beschriftung"></span></button>
                    <button type="button" class="btn btn_filtern_wert_inklusiv_exklusiv btn-sm btn-outline-primary"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['inklusiv_exklusiv']['bootstrap'] ?>"></i></span></button>
                    <button type="button" class="btn btn_filtern_wert_loeschen btn-sm btn-outline-danger"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['loeschen']['bootstrap'] ?>"></i></span></button>
                </div>

            </span><span class="filtern_exklusiv"></span>
        </div>
        <div class="card-body input-group p-1">
            <div class="form-floating">
                <select class="form-select filtern_auswahl">
                </select>
                <label><span class="beschriftung"></span></label>
            </div>
            <button type="button" class="btn btn_filtern_eigenschaft_zuruecksetzen btn-outline-danger"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['loeschen']['bootstrap']; ?>"></i></span></button>
            </div>
    </div>
<?php /* (noch) kein Filter setzen möglich für text, element_id, element_ids */ ?>
</div>