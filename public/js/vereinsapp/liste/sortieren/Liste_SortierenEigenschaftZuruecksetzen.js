function Liste_SortierenEigenschaftZuruecksetzen($sortieren_eigenschaft, ziel_id, liste) {
    // Entfernen des value
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .removeAttr("value")
            .trigger("change");

    Schnittstelle_DomModalSchliessen($sortieren_eigenschaft.closest(".modal"));
}
