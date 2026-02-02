function Liste_$GruppierenEigenschaftZuruecksetzen($gruppieren_eigenschaft, ziel_id, liste) {
    // Entfernen des value
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .removeAttr("value")
            .trigger("change");

    Schnittstelle_Dom$ModalSchliessen($gruppieren_eigenschaft.closest(".modal"));
}
