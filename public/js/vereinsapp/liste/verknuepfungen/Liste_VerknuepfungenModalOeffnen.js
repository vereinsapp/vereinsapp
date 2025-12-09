function Liste_VerknuepfungenModalOeffnen(modal_id, liste_id, title, gegen_element_id, gegen_liste) {
    const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, modal_id);

    const $neue_liste = $neues_modal.find("#" + liste_id + ".liste");
    $neue_liste.attr("data-gegen_liste", gegen_liste).attr("data-gegen_element_id", gegen_element_id);

    Schnittstelle_DomModalOeffnen($neues_modal);
    Schnittstelle_EventVariableUpdDom($neue_liste.attr("data-liste"));
}
