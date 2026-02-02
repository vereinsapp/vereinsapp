function Liste_SortierenModalOeffnen($quelle_ziel, title, liste) {
    const $ziel = $quelle_ziel;
    const ziel_id = zufaelligeZeichenketteZurueck(8);
    if ($ziel.exists()) $ziel.attr("id", ziel_id);

    const $neues_sortieren_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(title, "SORTIEREN");
    Schnittstelle_Dom$ModalOeffnen($neues_sortieren_modal);
    Liste_$SortierenFormularInitialisieren($neues_sortieren_modal.find(".formular"), ziel_id, liste);
}
