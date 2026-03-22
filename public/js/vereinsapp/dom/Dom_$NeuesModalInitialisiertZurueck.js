function Dom_$ModalInitialisiertZurueck(modal_title, modal_id) {
    const $modal = MODALS[modal_id].clone().removeClass("blanko invisible autoload").addClass("modal");

    if (typeof modal_title !== "undefined") $modal.find(".modal-title").text(modal_title);

    $modal.removeAttr("id");

    return $modal;
}
