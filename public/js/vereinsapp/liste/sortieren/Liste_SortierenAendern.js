function Liste_SortierenAendern(formular_oeffnen, $quelle_ziel, title, ziel_id, liste) {
    if (formular_oeffnen) {
        const $ziel = $quelle_ziel;
        const ziel_id = zufaelligeZeichenketteZurueck(8);
        if ($ziel.exists()) $ziel.attr("id", ziel_id);

        const $neues_sortieren_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "SORTIEREN");
        Schnittstelle_DomModalOeffnen($neues_sortieren_modal);
        Liste_SortierenFormularInitialisieren($neues_sortieren_modal.find(".formular"), ziel_id, liste);
    } else {
        const $formular = $quelle_ziel.closest(".formular");

        const sortieren = {
            eigenschaft: $formular.find(".sortieren_wert").val(),
            richtung: Number($formular.find(".sortieren_richtung:checked").val()),
        };

        if (typeof ziel_id !== "undefined")
            $("#" + ziel_id)
                .val(JsonStringifiedZurueck(sortieren))
                .trigger("change");

        Schnittstelle_DomModalSchliessen($quelle_ziel.closest(".modal"));
    }
}
