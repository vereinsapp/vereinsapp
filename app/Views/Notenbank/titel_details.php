<?= $this->extend( 'Templates/layout' ); ?>
<?= $this->section( 'navbar' ); ?><?= view( 'Templates/navbar_int' ); ?><?= $this->endSection(); ?>
<?= $this->section( 'containers' ); ?>

<div class="container mb-3 element" data-liste="notenbank" data-element_id="<?= $element_id; ?>">
<?= view( 'Templates/Liste/element_navigation', array( 'element_navigation' => $element_navigation ) ); ?>
    <div class="text-center">
        <span class="eigenschaft" data-eigenschaft="titel_nr"></span>
    </div>
    <div class="h5 beschriftung text-center">
        <span class="eigenschaft" data-eigenschaft="titel"></span>
    </div>
    <div class="row g-0 my-1">
        <div class="col text-center text-nowrap"><span class="eigenschaft" data-eigenschaft="kategorie"></span></div>
        <div class="col text-center text-nowrap"><span class="eigenschaft" data-eigenschaft="komponist"></span></div>
    </div>
    <div class="row g-0 my-1">
        <div class="col text-center text-nowrap fst-italic"><span class="eigenschaft" data-eigenschaft="bemerkung"></span></div>
    </div>
</div>

<div class="container mb-3">
<?= view( 'Templates/Liste/verzeichnis', array( 'verzeichnis' => $verzeichnis['aktuelles_verzeichnis'] ) ); ?>
</div>

<?php if( array_key_exists( LISTEN['aufgaben']['controller'], CONTROLLERS ) ) { ?><div class="container mb-3">
    <div class="ueberschrift text-secondary text-center invisible mb-1" data-liste="aufgaben" data-instanz="titel_zugeordnete_aufgaben">Zugeordnete Aufgaben</div>
<?= view( 'Templates/Liste/liste', array( 'liste' => $liste['titel_zugeordnete_aufgaben'] ) ); ?>
<?php if( array_key_exists( 'aufgaben.verwaltung', VERFUEGBARE_RECHTE ) AND auth()->user()->can( 'aufgaben.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'aufgabe_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'aufgaben' ), 'btn' => array( 'klasse_id' => 'btn_aufgabe_aktion' ), 'formular' =>
    view( 'Aufgaben/aufgabe_basiseigenschaften_formular' ) ) ) ) ); ?>
</div><?php } ?>

<?php if( auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/modal', array( 'id' => 'titel_basiseigenschaften', 'modal' =>
    view( 'Templates/Liste/formular', array( 'data' => array( 'liste' => 'notenbank' ), 'btn' => array( 'klasse_id' => 'btn_titel_aktion' ), 'formular' =>
    view( 'Notenbank/titel_basiseigenschaften_formular' ) ) ) ) ); ?>

<?php if( isset( $werkzeugkasten ) AND is_array( $werkzeugkasten ) AND count( $werkzeugkasten ) > 0 AND auth()->user()->can( 'notenbank.verwaltung' ) ) echo
    view( 'Templates/werkzeugkasten_handle', array( 'liste' => 'notenbank', 'element_id' => $element_id ) ); ?>
<?= $this->endSection() ?>