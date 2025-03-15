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

    <div class="input-group blanko filtern_eigenschaft invisible mb-1" data-typ="vorgegebene_werte">
        <div class="form-floating">
            <select class="form-select filtern_wert" data-operator="==">
            </select>
            <label><span class="beschriftung"></span></label>
        </div>
        <button type="button" class="btn_filtern_erstellen btn btn-outline-success"><i class="bi bi-<?= SYMBOLE['erstellen']['bootstrap']; ?>"></i></button>
    </div>

</div>