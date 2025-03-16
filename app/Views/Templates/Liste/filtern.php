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
    </div>

    <div class="card sichtbar blanko filtern_eigenschaft invisible mb-1" data-typ="vorgegebene_werte">
        <div class="card-body">
            <span class="filtern_inklusiv">

                <div class="input-group input-group-sm blanko filtern_wert" role="group">
                    <span class="input-group-text beschriftung"></span>
                    <button type="button" class="btn btn_filtern_wert_inklusiv_exklusiv btn-sm btn-outline-primary"><i class="bi bi-<?= SYMBOLE['inklusiv_exklusiv']['bootstrap'] ?>"></i></button>
                    <button type="button" class="btn btn_filtern_wert_loeschen btn-sm btn-outline-danger"><i class="bi bi-<?= SYMBOLE['loeschen']['bootstrap'] ?>"></i></button>
                </div>

            </span><span class="filtern_exklusiv"></span>
        </div>
        <div class="card-body p-1">
            <div class="form-floating">
                <select class="form-select filtern_auswahl">
                </select>
                <label><span class="beschriftung"></span></label>
            </div>
        </div>
    </div>

</div>