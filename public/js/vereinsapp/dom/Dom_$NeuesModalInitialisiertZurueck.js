function Dom_$NeuesModalInitialisiertZurueck(modal_title, modal_id) {
    const $neues_modal = MODALS[modal_id].clone().removeClass("blanko invisible autoload").addClass("modal");

    if (typeof modal_title !== "undefined") $neues_modal.find(".modal-title").text(modal_title);

    $neues_modal.removeAttr("id");

    return $neues_modal;
}
