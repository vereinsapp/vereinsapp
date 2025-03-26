function Liste_SortierenEigenschaftLoeschen($sortieren_eigenschaft, ziel_id, liste) {
    if (typeof ziel_id !== "undefined") $("#" + ziel_id).removeAttr("value");

    Schnittstelle_DomModalSchliessen($sortieren_eigenschaft.closest(".modal"));
}
