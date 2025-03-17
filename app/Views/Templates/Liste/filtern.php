<div class="formular">

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
        <button type="button" class="btn_filtern_loeschen btn btn-outline-danger"><i class="bi bi-<?= SYMBOLE['loeschen']['bootstrap']; ?>"></i></button>
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
        <button type="button" class="btn_filtern_loeschen btn btn-outline-danger"><i class="bi bi-<?= SYMBOLE['loeschen']['bootstrap']; ?>"></i></button>
    </div>

    <div class="card sichtbar blanko filtern_eigenschaft invisible mb-1" data-typ="vorgegebene_werte">
        <div class="card-body filtern_werte p-2">

                <div class="btn-group btn-group-sm blanko filtern_wert me-1 mb-1" role="group">
                    <button type="button" class="btn beschriftung btn-sm btn-outline-body disabled"></button>
                    <button type="button" class="btn btn_filtern_wert_inklusiv_exklusiv btn-sm btn-outline-primary"><i class="bi bi-<?= SYMBOLE['inklusiv_exklusiv']['bootstrap'] ?>"></i></button>
                    <button type="button" class="btn btn_filtern_wert_loeschen btn-sm btn-outline-danger"><i class="bi bi-<?= SYMBOLE['loeschen']['bootstrap'] ?>"></i></button>
                </div>

            </span><span class="filtern_exklusiv"></span>
        </div>
        <div class="card-body input-group p-1">
            <div class="form-floating">
                <select class="form-select filtern_auswahl">
                </select>
                <label><span class="beschriftung"></span></label>
            </div>
            <button type="button" class="btn_filtern_loeschen btn btn-outline-danger"><i class="bi bi-<?= SYMBOLE['loeschen']['bootstrap']; ?>"></i></button>
            </div>
    </div>

</div>