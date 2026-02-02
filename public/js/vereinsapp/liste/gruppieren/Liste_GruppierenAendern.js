function Liste_GruppierenAendern($quelle_ziel, ziel_id, liste) {
    // Definition von gruppieren
    const gruppieren = $quelle_ziel.closest(".formular").find(".gruppieren_wert").val();

    // Überschreiben des value mit geänderten gruppieren
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(gruppieren, undefined))
            .trigger("change");

    Schnittstelle_Dom$ModalSchliessen($quelle_ziel.closest(".modal"));
}
