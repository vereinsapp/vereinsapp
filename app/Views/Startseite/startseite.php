<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= $this->include( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ) ?>

<div class="container mb-3 text-center">
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

<div class="container mb-3">
    <div class="ueberschrift text-secondary text-center invisible mb-1" data-liste="mitglieder" data-instanz="anstehende_geburtstage">Geburtstage in den nächsten 14 Tagen</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['anstehende_geburtstage'] ) ); ?>
</div>

<?php if( array_key_exists( LISTEN['termine']['controller'], CONTROLLERS ) ) { ?><div class="container mb-3">
    <div class="ueberschrift text-secondary text-center invisible mb-1" data-liste="termine" data-instanz="bevorstehende_termine_startseite">Termine in den nächsten 14 Tagen</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['bevorstehende_termine_startseite'] ) ); ?>
</div><?php } ?>

<?php if( array_key_exists( LISTEN['termine_rueckmeldungen']['controller'], CONTROLLERS ) ) { ?><div class="container mb-3">
    <div class="ueberschrift text-secondary text-center invisible mb-1" data-liste="termine" data-instanz="termine_ausstehende_rueckmeldung">Termine ohne Rückmeldung</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_ausstehende_rueckmeldung'] ) ); ?>
</div><?php } ?>

<?= $this->endSection() ?>

