<?= $this->section('navbar') ?>

<nav class="navbar navbar-expand-md fixed-top navbar-light bg-light">
    <div class="container-fluid">
        <div class="navbar-brand">
            <a href="<?= site_url(); ?>"><img class="title" src="<?= base_url( VEREINSAPP_LOGO ); ?>" style="width:30px;" /></a>
        </div>
        <div>
            <i class="bi-<?php if( array_key_exists( AKTIVER_CONTROLLER, CONTROLLERS ) AND array_key_exists( 'symbol', CONTROLLERS[ AKTIVER_CONTROLLER ] ) ) echo CONTROLLERS[ AKTIVER_CONTROLLER ]['symbol']; ?> me-1"></i>
            <span class="navbar-text"><?php if( array_key_exists( AKTIVER_CONTROLLER, CONTROLLERS ) AND array_key_exists( 'beschriftung', CONTROLLERS[ AKTIVER_CONTROLLER ] ) ) echo CONTROLLERS[ AKTIVER_CONTROLLER ]['beschriftung']; ?></span>
            <span id="status" class="ms-1 text-success"><i class="bi-<?= SYMBOLE["status"]["bootstrap"]; ?>"></i></span>
        </div>
        <div class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" role="button">
            <span class="navbar-toggler-icon"></span>
        </div>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto"><?php foreach ( MENUE as $eintrag ) {
                switch( $eintrag['typ'] ) {
                    case 'controller':
                        if( !array_key_exists( $eintrag['data'], CONTROLLERS ) OR !array_key_exists( 'beschriftung', CONTROLLERS[ $eintrag['data'] ] ) OR !array_key_exists( 'symbol', CONTROLLERS[ $eintrag['data'] ] ) ) continue 2;

                        $url = site_url( $eintrag['data'] );
                        $beschriftung = CONTROLLERS[ $eintrag['data'] ]['beschriftung'];
                        $symbol = CONTROLLERS[ $eintrag['data'] ]['symbol'];
                        break;
                    case 'intern':
                        $url = site_url( $eintrag['data']['url'] );
                        $beschriftung = $eintrag['data']['beschriftung'];
                        $symbol = $eintrag['data']['symbol'];
                        break;
                    case 'extern':
                        $url = $eintrag['data']['url'];
                        $beschriftung = $eintrag['data']['beschriftung'];
                        $symbol = $eintrag['data']['symbol'];
                        break;
                } ?><li class="nav-item"><a class="nav-link" href="<?= $url ?>"><i class="bi-<?= $symbol ?> float-start me-1"></i><?= $beschriftung ?></a></li>
            <?php }; ?></ul>
        </div>
    </div>
</nav>

<?= $this->endSection() ?>
