function Liste_SortierenAendern($quelle_ziel, ziel_id, liste) {
    // Definition von sortieren
    const $formular = $quelle_ziel.closest(".formular");
    const sortieren = {
        eigenschaft: $formular.find(".sortieren_wert").val(),
        richtung: Number($formular.find(".sortieren_richtung:checked").val()),
    };

    // Überschreiben des value mit geänderten sortieren
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(sortieren, undefined))
            .trigger("change");

    Schnittstelle_Dom$ModalSchliessen($quelle_ziel.closest(".modal"));
}
