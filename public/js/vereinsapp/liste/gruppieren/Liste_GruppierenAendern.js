function Liste_GruppierenAendern(formular_oeffnen, $quelle_ziel, title, ziel_id, liste) {
    if (formular_oeffnen) {
        const $ziel = $quelle_ziel;
        const ziel_id = zufaelligeZeichenketteZurueck(8);
        if ($ziel.exists()) $ziel.attr("id", ziel_id);

        const $neues_gruppieren_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "GRUPPIEREN");
        Schnittstelle_DomModalOeffnen($neues_gruppieren_modal);
        Liste_GruppierenFormularInitialisieren($neues_gruppieren_modal.find(".formular"), ziel_id, liste);
    } else {
        const $formular = $quelle_ziel.closest(".formular");

        const gruppieren = $formular.find(".gruppieren_wert").val();

        if (typeof ziel_id !== "undefined")
            $("#" + ziel_id)
                .val(JsonStringifiedZurueck(gruppieren))
                .trigger("change");

        Schnittstelle_DomModalSchliessen($quelle_ziel.closest(".modal"));
    }
}
