function Schnittstelle_Dom$NeuesModalInitialisiertZurueck(title, modal_id) {
    const $neues_modal = MODALS[modal_id].clone().removeClass("blanko invisible autoload").addClass("modal");

    if (typeof title !== "undefined") $neues_modal.find(".modal-title").text(title);

    $neues_modal.removeAttr("id");

    return $neues_modal;
}
