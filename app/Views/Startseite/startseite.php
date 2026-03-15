<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'cards' ); ?>

<div class="text-center">
<?php if( KASTEN_WEITER_ZUR_WEBSITE_VON_STARTSEITE ) : ?>
    <div class="row row-cols-2 g-0">
        <div class="col-6" style="position: relative;">
            <img style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" src="<?= base_url( VEREINSAPP_LOGO ) ?>" /></div>
        <div class="col-6"><a class="btn" style="position: relative;" href="<?= VEREIN_DOMAIN ?>">
            <img class="opacity-25" src="<?= base_url( VEREINSAPP_LOGO ) ?>" />
            <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" class="h5 text-primary">Weiter zur öffentlichen Website</span>
        </a></div>
    </div>
<?php else : ?>
    <img src="<?= base_url( VEREINSAPP_LOGO ) ?>" />
<?php endif ?>
</div>

<div class="row row-cols-1 row-cols-lg-2 row-cols-xxl-3 gy-3 gx-0 gx-lg-3 w-100">

<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['anstehende_geburtstage'] ) ); ?>

<?php if( array_key_exists( LISTEN['termine']['controller'], CONTROLLERS ) ) echo
    view( 'Templates/Liste/liste', array( 'liste' => $liste['bevorstehende_termine_startseite'] ) ); ?>

<?php if( array_key_exists( LISTEN['termine_rueckmeldungen']['controller'], CONTROLLERS ) ) echo
    view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_ausstehende_rueckmeldung'] ) ); ?>

</div>
<?= $this->endSection() ?>

