function Liste_GruppierenModalOeffnen($quelle_ziel, title, liste) {
    const $ziel = $quelle_ziel;
    const ziel_id = zufaelligeZeichenketteZurueck(8);
    if ($ziel.exists()) $ziel.attr("id", ziel_id);

    const $neues_gruppieren_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(title, "GRUPPIEREN");
    Schnittstelle_Dom$ModalOeffnen($neues_gruppieren_modal);
    Liste_$GruppierenFormularInitialisieren($neues_gruppieren_modal.find(".formular"), ziel_id, liste);
}
