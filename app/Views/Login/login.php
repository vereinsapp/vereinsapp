<?= $this->extend('Templates/layout') ?>
<?= $this->section('containers') ?>

<div class="container" style="max-width: 36rem;"><div class="card">
    <div class="h5 card-header text-center text-secondary">Login</div>
    <div class="card-body">

    <?php if (session('error') !== null) : ?>
        <div class="alert alert-danger" role="alert"><?= session('error') ?></div>
    <?php elseif (session('errors') !== null) : ?>
        <div class="alert alert-danger" role="alert">
        <?php if (is_array(session('errors'))) : ?>
            <?php foreach (session('errors') as $error) : ?>
            <?= $error ?>
            <br>
            <?php endforeach ?>
        <?php else : ?>
            <?= session('errors') ?>
        <?php endif ?>
        </div>
    <?php endif ?>

    <?php if (session('message') !== null) : ?>
        <div class="alert alert-success" role="alert"><?= session('message') ?></div>
    <?php endif ?>

        <div class="mb-2">Um die <?= VEREINSAPP_NAME ?> nutzen zu können musst du dich mit deiner Email und einem gültigen Passwort einloggen:</div>
        <?php helper('form'); ?><?= form_open( 'login' ); ?>
        <div class="form-floating mb-2">
            <input type="email" class="form-control" name="email" inputmode="email" autocomplete="email" value="<?= old('email') ?>" required placeholder="Email" />
            <label for="email">Email</label>
        </div>
        <div class="input-group mb-2">
            <div class="form-floating">
            <input type="password" class="form-control" name="password" inputmode="text" autocomplete="current-password" required placeholder="Passwort" />
            <label for="passwort">Passwort</label>
            </div>
            <span class="input-group-text text-primary werkzeug" data-werkzeug="passwort_anzeigen" role="button"><i class="bi bi-<?= SYMBOLE[ WERKZEUGE['passwort_anzeigen']['symbol'] ]['bootstrap']; ?>"></i></span>
        </div>
        <div class="form-check form-switch mb-2">
            <input class="form-check-input" type="checkbox" value="angemeldet_bleiben" name="remember" id="angemeldet_bleiben" <?php //if (old('remember')): ?> checked<?php //endif ?> role="switch" />
            <label class="form-check-label" for="angemeldet_bleiben">Angemeldet bleiben</label>
        </div>
        <div class="d-grid mb-2"><button type="submit" class="btn btn-outline-success">Einloggen</button></div>
        <?= form_close(); ?>
        <hr>
        <div class="d-grid"><a class="btn btn-outline-primary btn-sm" href="<?= url_to('magic-link') ?>">Einmal-Link anfordern</a></div>

    </div>
</div></div>

<?php if ( KASTEN_WEITER_ZUR_WEBSITE_VON_LOGIN ) : ?>
<div class="container mt-5" style="max-width: 36rem;"><div class="card">
    <div class="card-body">
        <div class="mb-2">Du wolltest eigentlich zur öffentlichen Website von <?= VEREIN_NAME ?>?</div>
        <div class="d-grid"><a class="btn btn-outline-primary" href="<?= VEREIN_DOMAIN ?>">Weiter zu <?= VEREIN_DOMAIN ?></a></div>
    </div>
</div></div>
<?php endif ?>

<?= $this->endSection() ?>