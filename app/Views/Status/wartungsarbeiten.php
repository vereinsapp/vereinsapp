<?= $this->extend( 'Templates/layout' ) ?>
<?= $this->section( 'cards' ) ?>

<div class="card" style="max-width: 36rem;">
    <div class="h5 card-header text-center text-secondary">Hoppla...</div>
    <div class="card-body">Aktuell finden Wartungsarbeiten statt. Bitte hab etwas Geduld und versuche es später nochmal!</div>
</div>

<?php if( KASTEN_WEITER_ZUR_WEBSITE_VON_LOGIN ) : ?>
<div class="card mt-5" style="max-width: 36rem;">
    <div class="card-body">
        <div class="mb-2">Du wolltest eigentlich zur öffentlichen Website von <?= VEREIN_NAME ?>?</div>
        <div class="d-grid"><a class="btn btn-outline-primary" href="<?= VEREIN_DOMAIN ?>">Weiter zu <?= VEREIN_DOMAIN ?></a></div>
    </div>
</div>
<?php endif ?>

<?= $this->endSection() ?>