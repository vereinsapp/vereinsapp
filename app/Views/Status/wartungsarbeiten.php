<?= $this->extend('Templates/layout') ?>
<?= $this->section('containers') ?>

<div class="container" style="max-width: 36rem;"><div class="card">
    <div class="h5 card-header text-center text-secondary">Hoppla...</div>
    <div class="card-body">Aktuell finden Wartungsarbeiten statt. Bitte hab etwas Geduld und versuche es später nochmal!</div>
</div></div>

<?php if( KASTEN_WEITER_ZUR_WEBSITE_VON_LOGIN ) : ?>
<div class="container mt-5" style="max-width: 36rem;"><div class="card">
    <div class="card-body">
        <div class="mb-2">Du wolltest eigentlich zur öffentlichen Website von <?= VEREIN_NAME ?>?</div>
        <div class="d-grid"><a class="btn btn-outline-primary" href="<?= VEREIN_DOMAIN ?>">Weiter zu <?= VEREIN_DOMAIN ?></a></div>
    </div>
</div></div>
<?php endif ?>

<?= $this->endSection() ?>