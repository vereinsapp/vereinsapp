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

    <div class="col"><div class="card">
        <div class="card-header ueberschrift text-secondary text-center invisible" instanz="anstehende_geburtstage">Geburtstage in den nächsten 14 Tagen</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['anstehende_geburtstage'], 'typ' => 'liste', 'element' =>
    view( 'Templates/Liste/element_liste', array( 'liste' => $liste['anstehende_geburtstage'] ) ) ) ); ?>
    </div></div>

    <?php if( array_key_exists( LISTEN['termine']['controller'], CONTROLLERS ) ) { ?><div class="col"><div class="card">
        <div class="card-header ueberschrift text-secondary text-center invisible" instanz="bevorstehende_termine_startseite">Termine in den nächsten 14 Tagen</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['bevorstehende_termine_startseite'], 'typ' => 'liste', 'element' =>
    view( 'Templates/Liste/element_liste', array( 'liste' => $liste['bevorstehende_termine_startseite'] ) ) ) ); ?>
    </div></div><?php } ?>

    
    <?php if( array_key_exists( LISTEN['termine_rueckmeldungen']['controller'], CONTROLLERS ) ) { ?><div class="col"><div class="card">
        <div class="card-header ueberschrift text-secondary text-center invisible" instanz="termine_ausstehende_rueckmeldung">Termine ohne Rückmeldung</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['termine_ausstehende_rueckmeldung'], 'typ' => 'liste', 'element' =>
    view( 'Templates/Liste/element_liste', array( 'liste' => $liste['termine_ausstehende_rueckmeldung'] ) ) ) ); ?>
    </div></div><?php } ?>

</div>
<?= $this->endSection() ?>

