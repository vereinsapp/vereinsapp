<div class="form-floating mb-2">
    <input type="text" class="form-control eingabe" eingabe="titel" placeholder="<?= EIGENSCHAFTEN['notenbank']['titel']['beschriftung']; ?>" />
    <label><?= EIGENSCHAFTEN['notenbank']['titel']['beschriftung']; ?></label>
</div>

<div class="form-floating mb-2">
    <input type="number" class="form-control eingabe" eingabe="titel_nr" placeholder="<?= EIGENSCHAFTEN['notenbank']['titel_nr']['beschriftung']; ?>" />
    <label><?= EIGENSCHAFTEN['notenbank']['titel_nr']['beschriftung']; ?></label>
</div>

<div class="form-floating mb-2">
    <select class="form-select eingabe" eingabe="kategorie">
    <?php foreach ( VORGEGEBENE_WERTE['notenbank']['kategorie'] as $wert => $beschriftung ): ?>
        <option value="<?= $wert; ?>"><?= $beschriftung; ?></option>
    <?php endforeach; ?>
    </select>
    <label><?= EIGENSCHAFTEN['notenbank']['kategorie']['beschriftung']; ?></label>
</div>

<div class="form-floating mb-2">
    <input type="text" class="form-control eingabe" eingabe="komponist" placeholder="<?= EIGENSCHAFTEN['notenbank']['komponist']['beschriftung']; ?>" />
    <label><?= EIGENSCHAFTEN['notenbank']['komponist']['beschriftung']; ?></label>
</div>

<div class="form-floating mb-2">
    <input type="text" class="form-control eingabe" eingabe="bemerkung" placeholder="<?= EIGENSCHAFTEN['notenbank']['bemerkung']['beschriftung']; ?>" />
    <label><?= EIGENSCHAFTEN['notenbank']['bemerkung']['beschriftung']; ?></label>
</div>