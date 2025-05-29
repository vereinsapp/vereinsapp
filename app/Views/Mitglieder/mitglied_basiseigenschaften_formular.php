<div class="form-floating mb-2">
    <input type="text" class="form-control eingabe" data-eingabe="vorname" placeholder="<?= EIGENSCHAFTEN['mitglieder']['vorname']['beschriftung']; ?>" />
    <label><?= EIGENSCHAFTEN['mitglieder']['vorname']['beschriftung']; ?></label>
</div>

<div class="form-floating mb-2">
    <input type="text" class="form-control eingabe" data-eingabe="nachname" placeholder="<?= EIGENSCHAFTEN['mitglieder']['nachname']['beschriftung']; ?>" />
    <label><?= EIGENSCHAFTEN['mitglieder']['nachname']['beschriftung']; ?></label>
</div>

<div class="row g-2">
    <div class="col form-floating mb-2">
        <input type="date" class="form-control eingabe" data-eingabe="geburt" />
        <label><?= EIGENSCHAFTEN['mitglieder']['geburt']['beschriftung']; ?></label>
    </div>
    <div class="col form-floating mb-2">
        <select class="form-select eingabe" data-eingabe="geschlecht">
        <?php foreach ( VORGEGEBENE_WERTE['mitglieder']['geschlecht'] as $geschlecht => $eigenschaften ): ?>
            <option value="<?= $geschlecht; ?>"><?= $eigenschaften['beschriftung']; ?></option>
        <?php endforeach; ?>
        </select>
        <label><?= EIGENSCHAFTEN['mitglieder']['geschlecht']['beschriftung']; ?></label>
    </div>
</div>

<div class="form-floating mb-2">
    <input type="email" class="form-control eingabe" data-eingabe="email" placeholder="<?= EIGENSCHAFTEN['mitglieder']['email']['beschriftung']; ?>" />
    <label><?= EIGENSCHAFTEN['mitglieder']['email']['beschriftung']; ?></label>
</div>

<div class="row g-2">
    <div class="col-4 form-floating mb-2">
        <input type="number" class="form-control eingabe" data-eingabe="postleitzahl" placeholder="<?= EIGENSCHAFTEN['mitglieder']['postleitzahl']['beschriftung']; ?>" min="10000" max="99999" />
        <label><?= EIGENSCHAFTEN['mitglieder']['postleitzahl']['beschriftung']; ?></label>
    </div>
    <div class="col-8 form-floating mb-2">
        <input type="text" class="form-control eingabe" data-eingabe="wohnort" placeholder="<?= EIGENSCHAFTEN['mitglieder']['wohnort']['beschriftung']; ?>" />
        <label><?= EIGENSCHAFTEN['mitglieder']['wohnort']['beschriftung']; ?></label>
    </div>
</div>

<?php if( array_key_exists( 'register', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="form-floating mb-2">
    <select class="form-select eingabe" data-eingabe="register">
    <?php foreach ( VORGEGEBENE_WERTE['mitglieder']['register'] as $register => $eigenschaften ): ?>
        <option value="<?= $register; ?>"><?= $eigenschaften['beschriftung']; ?></option>
    <?php endforeach; ?>
    </select>
    <label><?= EIGENSCHAFTEN['mitglieder']['register']['beschriftung']; ?></label>
</div><?php } ?>

<?php if( array_key_exists( 'auto', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="form-floating mb-2">
    <select class="form-select eingabe" data-eingabe="auto">
    <?php foreach ( VORGEGEBENE_WERTE['mitglieder']['auto'] as $auto => $eigenschaften ): ?>
        <option value="<?= $auto; ?>"><?= $eigenschaften['beschriftung']; ?></option>
    <?php endforeach; ?>
    </select>
    <label><?= EIGENSCHAFTEN['mitglieder']['auto']['beschriftung']; ?></label>
</div><?php } ?>

<?php if( array_key_exists( 'funktion', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="form-floating mb-2">
    <select class="form-select eingabe" data-eingabe="funktion">
    <?php foreach ( VORGEGEBENE_WERTE['mitglieder']['funktion'] as $funktion => $eigenschaften ): ?>
        <option value="<?= $funktion; ?>"><?= $eigenschaften['beschriftung']; ?></option>
    <?php endforeach; ?>
    </select>
    <label><?= EIGENSCHAFTEN['mitglieder']['funktion']['beschriftung']; ?></label>
</div><?php } ?>

<?php if( array_key_exists( 'vorstandschaft_janein', EIGENSCHAFTEN['mitglieder'] ) AND array_key_exists( 'aktiv_janein', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="row g-2"><?php } ?>
    <?php if( array_key_exists( 'vorstandschaft_janein', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="col form-floating mb-2">
        <select class="form-select eingabe" data-eingabe="vorstandschaft_janein">
        <?php foreach ( JANEIN as $janein => $eigenschaften ): ?>
            <option value="<?= $janein; ?>"><?= $eigenschaften['beschriftung']; ?></option>
        <?php endforeach; ?>
        </select>
        <label><?= EIGENSCHAFTEN['mitglieder']['vorstandschaft_janein']['beschriftung']; ?></label>
    </div><?php } ?>
    <?php if( array_key_exists( 'aktiv_janein', EIGENSCHAFTEN['mitglieder'] ) ) { ?><div class="col form-floating mb-2">
        <select class="form-select eingabe" data-eingabe="aktiv_janein">
        <?php foreach ( JANEIN as $janein => $eigenschaften ): ?>
            <option value="<?= $janein; ?>"><?= $eigenschaften['beschriftung']; ?></option>
        <?php endforeach; ?>
        </select>
        <label><?= EIGENSCHAFTEN['mitglieder']['aktiv_janein']['beschriftung']; ?></label>
    </div><?php } ?>
<?php if( array_key_exists( 'vorstandschaft_janein', EIGENSCHAFTEN['mitglieder'] ) AND array_key_exists( 'aktiv_janein', EIGENSCHAFTEN['mitglieder'] ) ) { ?></div><?php } ?>

<?php if( array_key_exists( 'real_janein', EIGENSCHAFTEN['mitglieder'] ) AND auth()->user()->can( 'global.einstellungen' ) AND auth()->user()->can( 'mitglieder.verwaltung' ) ) { ?><div class="row g-2">
    <div class="col"></div>
    <div class="col form-floating mb-2">
        <select class="form-select eingabe" data-eingabe="real_janein">
        <?php foreach ( JANEIN as $janein => $eigenschaften ): ?>
            <option value="<?= $janein; ?>"><?= $eigenschaften['beschriftung']; ?></option>
        <?php endforeach; ?>
        </select>
        <label><?= EIGENSCHAFTEN['mitglieder']['real_janein']['beschriftung']; ?></label>
    </div>
</div><?php } ?>