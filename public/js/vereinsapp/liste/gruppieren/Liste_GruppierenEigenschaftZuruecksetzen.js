function Liste_GruppierenEigenschaftZuruecksetzen($gruppieren_eigenschaft, ziel_id, liste) {
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .removeAttr("value")
            .trigger("change");

    Schnittstelle_DomModalSchliessen($gruppieren_eigenschaft.closest(".modal"));
}
