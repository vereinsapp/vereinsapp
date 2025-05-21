function Liste_SortierenModalOeffnen($quelle_ziel, title, liste) {
    const $ziel = $quelle_ziel;
    const ziel_id = zufaelligeZeichenketteZurueck(8);
    if ($ziel.exists()) $ziel.attr("id", ziel_id);

    const $neues_sortieren_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "SORTIEREN");
    Schnittstelle_DomModalOeffnen($neues_sortieren_modal);
    Liste_SortierenFormularInitialisieren($neues_sortieren_modal.find(".formular"), ziel_id, liste);
}
