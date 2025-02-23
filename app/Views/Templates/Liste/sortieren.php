<div class="input-group formular">
    <select class="form-select sortieren_eigenschaft"></select>
    <input type="radio" class="btn-check sortieren_richtung" name="sortieren_richtung" id="sortieren_richtung_asc" value="<?= SORT_ASC; ?>">
    <label class="btn btn-outline-primary" for="sortieren_richtung_asc"><i class="bi bi-<?= SYMBOLE['asc']['bootstrap']; ?>"></i></label>
    <input type="radio" class="btn-check sortieren_richtung" name="sortieren_richtung" id="sortieren_richtung_desc" value="<?= SORT_DESC; ?>">
    <label class="btn btn-outline-primary" for="sortieren_richtung_desc"><i class="bi bi-<?= SYMBOLE['desc']['bootstrap']; ?>"></i></label>
</div>