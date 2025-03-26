function Liste_GruppierenEigenschaftLoeschen($gruppieren_eigenschaft, ziel_id, liste) {
    if (typeof ziel_id !== "undefined") $("#" + ziel_id).removeAttr("value");

    Schnittstelle_DomModalSchliessen($gruppieren_eigenschaft.closest(".modal"));
}
