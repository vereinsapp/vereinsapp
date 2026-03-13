<?= $this->extend( 'Templates/layout' ) ?>
<?= $this->section( 'cards' ) ?>

<div class="card" style="max-width: 36rem;">
  <div class="h5 card-header text-center text-secondary">Einmal-Link</div>
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

  <div class="mb-2">Wenn du dein Passwort für die <?= VEREINSAPP_NAME ?> vergessen hast, dann kannst du mit deiner Email einen Einmal-Link anfordern:</div>
    <?php helper('form'); ?><?= form_open( 'mitglieder/mitglied_einmal_link_email' ); ?>
      <div class="form-floating mb-2">
        <input type="email" class="form-control" name="email" inputmode="email" autocomplete="email" value="<?= old('email') ?>" required placeholder="Email" />
        <label for="email">Email</label>
      </div>
      <div class="d-grid mb-2"><button type="submit" class="btn btn-outline-success">Einmal-Link anfordern</button></div>
    <?= form_close(); ?>
    <hr>
    <div class="d-grid"><a class="btn btn-outline-primary btn-sm" href="<?= url_to('login') ?>">Zurück zum Login</a></div>

  </div>
</div>

<?= $this->endSection() ?>