<div class="blanko modal invisible<?php if( isset( $autoload ) AND $autoload ) echo ' autoload'; ?> fade" id="<?= $id ?>" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <div class="h5 modal-title"><?php if( isset( $modal_title ) ) echo $modal_title; ?></div>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">

<?= $modal ?>

        <div class="d-grid"><button type="button" class="btn btn-outline-primary mt-3" data-bs-dismiss="modal"><span class="beschriftung">Zurück</span></button></div>
      </div>
    </div>
  </div>
</div>