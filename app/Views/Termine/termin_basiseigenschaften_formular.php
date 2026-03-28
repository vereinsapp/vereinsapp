<div class="form-floating mb-2">
    <input type="text" class="form-control eingabe" eingabe="titel" placeholder="<?= EIGENSCHAFTEN['termine']['titel']['beschriftung']; ?>" />
    <label><?= EIGENSCHAFTEN['termine']['titel']['beschriftung']; ?></label>
</div>

<div class="form-floating mb-2">
    <input type="datetime-local" class="form-control eingabe" eingabe="start" />
    <label><?= EIGENSCHAFTEN['termine']['start']['beschriftung']; ?></label>
</div>

<?php if( array_key_exists( 'ende', EIGENSCHAFTEN['termine'] ) ) { ?><div class="form-floating mb-2">
    <input type="datetime-local" class="form-control eingabe" eingabe="ende" />
    <label><?= EIGENSCHAFTEN['termine']['ende']['beschriftung']; ?></label>
</div><?php } ?>

<div class="form-floating mb-2">
    <input type="text" class="form-control eingabe" eingabe="ort" placeholder="<?= EIGENSCHAFTEN['termine']['ort']['beschriftung']; ?>" />
    <label><?= EIGENSCHAFTEN['termine']['ort']['beschriftung']; ?></label>
</div>

<div class="form-floating mb-2">
    <input type="text" class="form-control eingabe" eingabe="bemerkung" placeholder="<?= EIGENSCHAFTEN['termine']['bemerkung']['beschriftung']; ?>" />
    <label><?= EIGENSCHAFTEN['termine']['bemerkung']['beschriftung']; ?></label>
</div>

<div class="form-floating mb-2">
    <select class="form-select eingabe" eingabe="kategorie">
    <?php foreach ( VORGEGEBENE_WERTE['termine']['kategorie'] as $kategorie => $eigenschaften ): ?>
        <option value="<?= $kategorie; ?>"><?= $eigenschaften['beschriftung']; ?></option>
    <?php endforeach; ?>
    </select>
    <label><?= EIGENSCHAFTEN['termine']['kategorie']['beschriftung']; ?></label>
</div>

<div class="row g-2">
    <div class="col"></div>
    <div class="col form-floating mb-2">
        <select class="form-select eingabe" eingabe="oeffentlich_janein">
        <?php foreach ( JANEIN as $janein => $eigenschaften ): ?>
            <option value="<?= $janein; ?>"><?= $eigenschaften['beschriftung']; ?></option>
        <?php endforeach; ?>
        </select>
        <label><?= EIGENSCHAFTEN['termine']['oeffentlich_janein']['beschriftung']; ?></label>
    </div>
</div>

<div class="d-grid mb-2">
    <button type="button" class="btn btn-outline-<?php
    if( array_key_exists('farbe', WERKZEUGE['filtern_manip']) ) echo WERKZEUGE['filtern_manip']['farbe']; else echo "primary";
    ?> eingabe werkzeug" werkzeug="filtern_manip" eingabe="filtern_mitglieder" liste="mitglieder" modal_title="<?= EIGENSCHAFTEN['termine']['filtern_mitglieder']['beschriftung']; ?>">
        <span class="beschriftung"><i class="bi bi-<?= SYMBOLE['filtern_mitglieder']; ?>"></i> <?= EIGENSCHAFTEN['termine']['filtern_mitglieder']['beschriftung']; ?></span>
    </button>
</div>