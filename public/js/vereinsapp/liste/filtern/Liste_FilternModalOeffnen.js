function Liste_FilternModalOeffnen($quelle_ziel, title, liste) {
    const $ziel = $quelle_ziel;
    const ziel_id = zufaelligeZeichenketteZurueck(8);
    if ($ziel.exists()) $ziel.attr("id", ziel_id);

    const $neues_filtern_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(title, "FILTERN");
    Schnittstelle_Dom$ModalOeffnen($neues_filtern_modal);
    Liste_$FilternFormularInitialisieren($neues_filtern_modal.find(".formular"), ziel_id, liste);
}
